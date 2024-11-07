import React from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useRef, useEffect } from "react";
import { Stack } from "@mui/material";

const Advertisement = () => {
  const device = useDeviceDetect();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startFrom = 2;
    if (videoRef.current) {
      videoRef.current.currentTime = startFrom;
    }
  }, []);

  if (device == "mobile") {
    return (
      <Stack className={"video-frame"}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/video/ads.mov" type="video/mp4" />
        </video>
      </Stack>
    );
  } else {
    return (
      <div className="video-container">
        <Stack className={"video-frame"}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/video/samsung.mov" type="video/mp4" />
          </video>
        </Stack>
        <Stack className="video-frame2">
          <div>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/video/ads.mov" type="video/mp4" />
            </video>
          </div>
          <div>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/video/furniture.mov" type="video/mp4" />
            </video>
          </div>
        </Stack>
      </div>
    );
  }
};

export default Advertisement;
