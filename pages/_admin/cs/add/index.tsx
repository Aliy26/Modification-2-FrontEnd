import React from "react";
import { NextPage } from "next";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import useDeviceDetect from "../../../../libs/hooks/useDeviceDetect";
import { userVar } from "../../../../apollo/store";

import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";

import CreateNotice from "./CreateNotice";

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
            <Typography
              className="main-title"
              sx={{ fontWeight: 700, fontSize: "28px", marginTop: "35px" }}
            >
              Create NOTICE
            </Typography>
          </Stack>
        </Stack>
        <CreateNotice />
      </div>
    );
};

export default WriteFAQ;
