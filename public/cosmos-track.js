/**
 * CosMos AI - Client-Side Tracking Script
 * Version: 4.0.0
 *
 * Key Features:
 * - Tracks ALL visitors (with or without UTM parameters)
 * - Direct visits marked as utm_source: '(direct)', utm_medium: '(none)'
 * - 30-minute visit window (refreshes within window don't increment visit_count)
 * - Page count per session
 * - Exit page tracking
 * - Automatic route change detection
 */

(function () {
  "use strict";

  const CONFIG = {
    allowedDomains: [
      "aptdecor.uz",
      "www.aptdecor.uz",
      "jcg.asia",
      "www.jcg.asia",
      "localhost:3001",
    ],

    apiEndpoint: "https://dev.cosmosai.co.kr/api/track",
    apiEndpointInternal: "https://dev.cosmosai.co.kr/api/track-internal",

    requireUTMParams: false, // Now tracks ALL visitors, not just UTM ones
    enableDomainValidation: true,

    cookieDomain: window.location.hostname,
    visitorCookieName: "cosmos_visitor_id",
    sessionCookieName: "cosmos_session_id",
    visitCountCookieName: "cosmos_visit_count",
    firstVisitCookieName: "cosmos_first_visit",
    lastVisitCookieName: "cosmos_last_visit",
    lastActivityCookieName: "cosmos_last_activity",
    cookieExpireDays: 730,
    sessionTimeoutMinutes: 30,
    visitTimeoutMinutes: 0.5,
    pageViewDebounceMs: 500,
  };

  // ============================================================
  // DOMAIN VALIDATION
  // ============================================================
  const currentDomain =
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");
  const isAllowedDomain = CONFIG.allowedDomains.some(
    (domain) => currentDomain === domain || currentDomain.endsWith("." + domain)
  );

  const isInternalDomain =
    currentDomain.includes("localhost:3000") ||
    currentDomain.includes("cosmos") ||
    currentDomain.includes("vercel.app");

  if (CONFIG.enableDomainValidation && !isAllowedDomain && !isInternalDomain) {
    console.log(
      "[CosMos] Tracking disabled - unauthorized domain:",
      currentDomain
    );
    return;
  }

  if (isInternalDomain) {
    CONFIG.apiEndpoint = CONFIG.apiEndpointInternal;
    console.log(
      "[CosMos] Using internal testing endpoint:",
      CONFIG.apiEndpoint
    );
  } else {
    console.log("[CosMos] Using production endpoint:", CONFIG.apiEndpoint);
  }

  // ============================================================
  // UTILITY FUNCTIONS
  // ============================================================
  const utils = {
    generateUUID: function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    setCookie: function (name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie =
        name +
        "=" +
        value +
        ";expires=" +
        expires.toUTCString() +
        ";path=/;SameSite=Lax";
    },
    getCookie: function (name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
      }
      return null;
    },
    deleteCosmosCookies: function () {
      const cookies = document.cookie.split(";");
      cookies.forEach((c) => {
        const cookieName = c.split("=")[0].trim();
        if (cookieName.startsWith("cosmos_")) {
          document.cookie =
            cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      });
    },
    getUrlParams: function () {
      const params = {};
      const queryString = window.location.search.substring(1);
      const pairs = queryString.split("&");
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split("=");
        if (pair[0])
          params[decodeURIComponent(pair[0])] = decodeURIComponent(
            pair[1] || ""
          );
      }
      return params;
    },
    getReferrerDomain: function () {
      if (!document.referrer) return "";
      try {
        const url = new URL(document.referrer);
        return url.hostname;
      } catch {
        return "";
      }
    },
    getDeviceType: function () {
      const ua = navigator.userAgent.toLowerCase();
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua))
        return "tablet";
      if (
        /mobile|iphone|ipod|android|blackberry|iemobile|kindle|silk-accelerated|(hpw|web)os|opera m(obi|ini)/i.test(
          ua
        )
      )
        return "mobile";
      return "desktop";
    },
    getScreenResolution: function () {
      return window.screen.width + "x" + window.screen.height;
    },
    getBrowser: function () {
      const ua = navigator.userAgent;
      if (ua.indexOf("YaBrowser") > -1 || ua.indexOf("Yandex") > -1)
        return "Yandex";
      if (ua.indexOf("Edg/") > -1 || ua.indexOf("Edge/") > -1) return "Edge";
      if (ua.indexOf("OPR") > -1 || ua.indexOf("Opera") > -1) return "Opera";
      if (ua.indexOf("Firefox") > -1) return "Firefox";
      if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1)
        return "Safari";
      if (ua.indexOf("Chrome") > -1) return "Chrome";
      if (ua.indexOf("MSIE") > -1 || ua.indexOf("Trident/") > -1)
        return "Internet Explorer";
      return "Unknown";
    },
    getOS: function () {
      const ua = navigator.userAgent;
      if (ua.indexOf("Win") > -1) return "Windows";
      if (ua.indexOf("Mac") > -1 && ua.indexOf("Mobile") === -1) return "macOS";
      if (ua.indexOf("Linux") > -1 && ua.indexOf("Android") === -1)
        return "Linux";
      if (ua.indexOf("Android") > -1) return "Android";
      if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) return "iOS";
      return "Unknown";
    },
    getTimestamp: () => Math.floor(Date.now() / 1000),
  };

  // ============================================================
  // TRACKING CLASS
  // ============================================================
  const CosmosTracker = {
    visitorId: null,
    sessionId: null,
    visitCount: 0,
    isNewVisitor: false,
    firstVisitTime: null,
    lastVisitTime: null,
    lastActivityTime: null,
    isTrackingEnabled: false,
    pageLoadTime: null,
    lastPageviewSent: 0,
    pageSequence: 0,
    sessionPageCount: 0,

    init: function () {
      this.pageLoadTime = Date.now();
      this.trackPageview();
    },

    setupVisitorTracking: function () {
      this.visitorId = utils.getCookie(CONFIG.visitorCookieName);
      const now = utils.getTimestamp();

      if (!this.visitorId) {
        this.visitorId = utils.generateUUID();
        this.isNewVisitor = true;
        this.visitCount = 1;
        this.firstVisitTime = now;
        this.lastActivityTime = now;

        utils.setCookie(
          CONFIG.visitorCookieName,
          this.visitorId,
          CONFIG.cookieExpireDays
        );
        utils.setCookie(
          CONFIG.visitCountCookieName,
          "1",
          CONFIG.cookieExpireDays
        );
        utils.setCookie(
          CONFIG.firstVisitCookieName,
          this.firstVisitTime.toString(),
          CONFIG.cookieExpireDays
        );
        utils.setCookie(
          CONFIG.lastActivityCookieName,
          this.lastActivityTime.toString(),
          CONFIG.cookieExpireDays
        );
      } else {
        this.visitCount = parseInt(
          utils.getCookie(CONFIG.visitCountCookieName) || "1"
        );
        this.firstVisitTime = parseInt(
          utils.getCookie(CONFIG.firstVisitCookieName) || now.toString()
        );
        this.lastActivityTime = parseInt(
          utils.getCookie(CONFIG.lastActivityCookieName) || "0"
        );

        const minutesSinceLastActivity = (now - this.lastActivityTime) / 60;

        if (minutesSinceLastActivity > CONFIG.visitTimeoutMinutes) {
          this.visitCount++;
          this.isNewVisitor = false;
          utils.setCookie(
            CONFIG.visitCountCookieName,
            this.visitCount.toString(),
            CONFIG.cookieExpireDays
          );
        } else {
          this.isNewVisitor = false;
        }

        this.lastActivityTime = now;
        utils.setCookie(
          CONFIG.lastActivityCookieName,
          this.lastActivityTime.toString(),
          CONFIG.cookieExpireDays
        );
      }

      this.lastVisitTime = now;
      utils.setCookie(
        CONFIG.lastVisitCookieName,
        this.lastVisitTime.toString(),
        CONFIG.cookieExpireDays
      );
    },

    setupSessionTracking: function () {
      this.sessionId = utils.getCookie(CONFIG.sessionCookieName);

      if (!this.sessionId) {
        this.sessionId = utils.generateUUID();
        utils.setCookie(
          CONFIG.sessionCookieName,
          this.sessionId,
          CONFIG.sessionTimeoutMinutes / (24 * 60)
        );
        sessionStorage.setItem("cosmos_session_page_count", "0");
      }

      this.sessionPageCount = parseInt(
        sessionStorage.getItem("cosmos_session_page_count") || "0"
      );
    },

    setupPageSequenceTracking: function () {
      this.pageSequence = parseInt(
        sessionStorage.getItem("cosmos_page_seq") || "0"
      );
      this.pageSequence++;
      sessionStorage.setItem("cosmos_page_seq", this.pageSequence.toString());
    },

    trackPageview: function () {
      const now = Date.now();
      if (now - this.lastPageviewSent < CONFIG.pageViewDebounceMs) {
        return;
      }
      this.lastPageviewSent = now;

      const urlParams = utils.getUrlParams();

      const hasUTMParams =
        urlParams.utm_campaign || urlParams.utm_source || urlParams.utm_medium;
      const storedUTMSource = sessionStorage.getItem("cosmos_utm_source") || "";
      const storedUTMCampaign =
        sessionStorage.getItem("cosmos_utm_campaign") || "";
      const hasStoredUTM = storedUTMSource || storedUTMCampaign;
      const tempPageSeq =
        parseInt(sessionStorage.getItem("cosmos_page_seq") || "0") + 1;

      let isDirectTraffic = false;

      if (tempPageSeq === 1 && !hasUTMParams && !hasStoredUTM) {
        isDirectTraffic = true;
        sessionStorage.setItem("cosmos_utm_source", "(direct)");
        sessionStorage.setItem("cosmos_utm_medium", "(none)");
        sessionStorage.setItem("cosmos_utm_campaign", "");
        sessionStorage.setItem("cosmos_utm_term", "");
        sessionStorage.setItem("cosmos_utm_content", "");
        sessionStorage.setItem("cosmos_is_direct", "1");
      }

      if (!this.isTrackingEnabled) {
        this.setupVisitorTracking();
        this.setupSessionTracking();
        this.setupBeforeUnload();
        this.isTrackingEnabled = true;
        console.log(
          "[CosMos] ✅ Tracking enabled. Source:",
          isDirectTraffic ? "Direct" : "UTM"
        );
      }

      this.setupPageSequenceTracking();
      this.sessionPageCount++;
      sessionStorage.setItem(
        "cosmos_session_page_count",
        this.sessionPageCount.toString()
      );

      if (hasUTMParams) {
        sessionStorage.setItem("cosmos_utm_source", urlParams.utm_source || "");
        sessionStorage.setItem("cosmos_utm_medium", urlParams.utm_medium || "");
        sessionStorage.setItem(
          "cosmos_utm_campaign",
          urlParams.utm_campaign || ""
        );
        sessionStorage.setItem("cosmos_utm_term", urlParams.utm_term || "");
        sessionStorage.setItem(
          "cosmos_utm_content",
          urlParams.utm_content || ""
        );
        sessionStorage.removeItem("cosmos_is_direct");
      }

      const finalUTMSource =
        urlParams.utm_source ||
        sessionStorage.getItem("cosmos_utm_source") ||
        "";
      const finalUTMMedium =
        urlParams.utm_medium ||
        sessionStorage.getItem("cosmos_utm_medium") ||
        "";
      const finalUTMCampaign =
        urlParams.utm_campaign ||
        sessionStorage.getItem("cosmos_utm_campaign") ||
        "";
      const finalUTMTerm =
        urlParams.utm_term || sessionStorage.getItem("cosmos_utm_term") || "";
      const finalUTMContent =
        urlParams.utm_content ||
        sessionStorage.getItem("cosmos_utm_content") ||
        "";

      const previousPageUrl = sessionStorage.getItem("cosmos_last_page") || "";
      const isLandingPage = this.pageSequence === 1 ? 1 : 0;

      let referrerDomain = utils.getReferrerDomain();
      if (isDirectTraffic && !document.referrer) {
        referrerDomain = "(direct)";
      }

      const eventData = {
        timestamp: utils.getTimestamp(),
        session_id: this.sessionId,
        user_id: this.visitorId,
        visit_count: this.visitCount,
        is_new_visitor: this.isNewVisitor ? 1 : 0,
        event_type: "pageview",
        page_url: window.location.href,
        page_title: document.title,
        page_path: window.location.pathname,
        page_sequence: this.pageSequence,
        is_landing_page: isLandingPage,
        previous_page_url: previousPageUrl,
        session_page_count: this.sessionPageCount,
        referrer: document.referrer || "",
        referrer_domain: referrerDomain,
        utm_source: finalUTMSource,
        utm_medium: finalUTMMedium,
        utm_campaign: finalUTMCampaign,
        utm_term: finalUTMTerm,
        utm_content: finalUTMContent,
        user_agent: navigator.userAgent,
        device_type: utils.getDeviceType(),
        browser: utils.getBrowser(),
        os: utils.getOS(),
        screen_resolution: utils.getScreenResolution(),
        time_on_page: 0,
      };

      this.sendEvent(eventData);
      sessionStorage.setItem("cosmos_last_page", window.location.href);
    },

    sendEvent: function (data) {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });
        navigator.sendBeacon(CONFIG.apiEndpoint, blob);
      } else {
        fetch(CONFIG.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(() => {});
      }
    },

    setupBeforeUnload: function () {
      const self = this;
      window.addEventListener("beforeunload", function () {
        if (!self.isTrackingEnabled) return;

        const timeOnPage = Math.floor((Date.now() - self.pageLoadTime) / 1000);

        const finalUTMSource =
          sessionStorage.getItem("cosmos_utm_source") || "";
        const finalUTMMedium =
          sessionStorage.getItem("cosmos_utm_medium") || "";
        const finalUTMCampaign =
          sessionStorage.getItem("cosmos_utm_campaign") || "";
        const finalUTMTerm = sessionStorage.getItem("cosmos_utm_term") || "";
        const finalUTMContent =
          sessionStorage.getItem("cosmos_utm_content") || "";

        const previousPageUrl =
          sessionStorage.getItem("cosmos_last_page") || "";
        const isLandingPage = self.pageSequence === 1 ? 1 : 0;

        let referrerDomain = utils.getReferrerDomain();
        if (
          sessionStorage.getItem("cosmos_is_direct") === "1" &&
          !document.referrer
        ) {
          referrerDomain = "(direct)";
        }

        const eventData = {
          timestamp: utils.getTimestamp(),
          session_id: self.sessionId,
          user_id: self.visitorId,
          visit_count: self.visitCount,
          is_new_visitor: self.isNewVisitor ? 1 : 0,
          page_url: window.location.href,
          page_title: document.title,
          page_path: window.location.pathname,
          page_sequence: self.pageSequence,
          is_landing_page: isLandingPage,
          previous_page_url: previousPageUrl,
          session_page_count: self.sessionPageCount,
          is_exit_page: 1,
          referrer: document.referrer || "",
          referrer_domain: referrerDomain,
          utm_source: finalUTMSource,
          utm_medium: finalUTMMedium,
          utm_campaign: finalUTMCampaign,
          utm_term: finalUTMTerm,
          utm_content: finalUTMContent,
          user_agent: navigator.userAgent,
          device_type: utils.getDeviceType(),
          screen_resolution: utils.getScreenResolution(),
          browser: utils.getBrowser(),
          os: utils.getOS(),
          language: navigator.language || "",
          event_type: "page_exit",
          time_on_page: timeOnPage,
        };

        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(eventData)], {
            type: "application/json",
          });
          navigator.sendBeacon(CONFIG.apiEndpoint, blob);
        }
      });
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => CosmosTracker.init());
  } else {
    CosmosTracker.init();
  }

  window.CosmosTracker = CosmosTracker;
})();
