import React from "react";
import { NextPage } from "next";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import useDeviceDetect from "../../../../libs/hooks/useDeviceDetect";
import { userVar } from "../../../../apollo/store";
const NoticeEditor = dynamic(() => import("./NoticeEditor"), { ssr: false });

import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

const WriteFAQ: NextPage = () => {
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const router = useRouter();

  if (device === "mobile") {
    return <>ARTICLE PAGE MOBILE</>;
  } else
    return (
      <div id="write-article-page">
        <Stack className="main-title-box">
          <Stack
            flexDirection={"column"}
            alignItems={"center"}
            className="right-box"
          >
            <Typography className="main-title">Create NOTICE</Typography>
          </Stack>
        </Stack>
        <NoticeEditor />
      </div>
    );
};

export default WriteFAQ;
