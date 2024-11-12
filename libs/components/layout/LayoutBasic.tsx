import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";
import { Stack } from "@mui/material";
import { getJwtToken, updateUserInfo } from "../../auth";
import Chat from "../Chat";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { useTranslation } from "next-i18next";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const withLayoutBasic = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    const { t, i18n } = useTranslation("common");
    const device = useDeviceDetect();
    const [authHeader, setAuthHeader] = useState<boolean>(false);
    const user = useReactiveVar(userVar);

    const memoizedValues = useMemo(() => {
      let title = "",
        desc = "",
        bgImage = "";

      switch (router.pathname) {
        case "/product":
          title = "Discover something new today!";
          desc =
            "Check out our latest products and find the perfect addition to your collection!";
          bgImage = "/img/banner/organic.webp";
          break;
        case "/agent":
          title = "Retailers";
          desc = "Follow our Retailers to get notified of their latest posts!";
          bgImage = "/img/banner/appliances.png";
          break;
        case "/agent/detail":
          title = "Retailer Page";
          desc =
            "Be sure to contact our retailer to get any information you need about the product you like!";
          bgImage = "/img/banner/appliances2.png";
          break;
        case "/mypage":
          title = "my page";
          desc = "Home / For Rent";
          bgImage = "/img/banner/appliances3.webp";
          break;
        case "/community":
          title = "Community";
          desc =
            "Share your unique voice with a community eager to learn from your insights!";
          bgImage = "/img/banner/community1.jpg";
          break;
        case "/community/detail":
          title = "Community Detail";
          desc = "Home / For Rent";
          bgImage = "/img/banner/community-detail.jpg";
          break;
        case "/cs":
          title = "CS";
          desc = "We are glad to see you again!";
          bgImage = "/img/banner/community1.jpg";
          break;
        case "/account/join":
          title = "Login/Signup";
          desc = "Authentication Process";
          bgImage = "/img/banner/header2.svg";
          setAuthHeader(true);
          break;
        case "/member":
          title = "Member Page";
          desc = "Home / For Rent";
          bgImage = "/img/banner/office.jpg";
          break;
        default:
          break;
      }

      return { title, desc, bgImage };
    }, [router.pathname]);

    /** LIFECYCLES **/
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
    }, []);

    /** HANDLERS **/

    if (device == "mobile") {
      return (
        <>
          <Head>
            <title>AptDecor</title>
            <meta name={"title"} content={`AptDecor`} />
          </Head>
          <Stack id="mobile-wrap">
            <Stack id={"top"}>
              <Top />
            </Stack>

            <Stack id={"main"}>
              <Component {...props} />
            </Stack>

            <Stack id={"footer"}>
              <Footer />
            </Stack>
          </Stack>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>AptDecor</title>
            <meta name={"title"} content={`AptDecor`} />
          </Head>
          <Stack id="pc-wrap">
            <Stack id={"top"}>
              <Top />
            </Stack>

            <Stack
              className={`header-basic ${authHeader && "auth"}`}
              style={{
                backgroundImage: `url(${memoizedValues.bgImage})`,
                backgroundSize: "cover",
                boxShadow: "inset 10px 40px 150px 40px rgb(24 22 36)",
              }}
            >
              <Stack className={"container"}>
                <strong>{t(memoizedValues.title)}</strong>
                <span>{t(memoizedValues.desc)}</span>
              </Stack>
            </Stack>

            <Stack id={"main"}>
              <Component {...props} />
            </Stack>

            <Chat />

            <Stack id={"footer"}>
              <Footer />
            </Stack>
          </Stack>
        </>
      );
    }
  };
};

export default withLayoutBasic;
