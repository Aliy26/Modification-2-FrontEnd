import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import Notice from "../../libs/components/cs/Notice";
import Faq from "../../libs/components/cs/Faq";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const CS: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const { t } = useTranslation("common");

  /** HANDLERS **/
  const changeTabHandler = (tab: string) => {
    router.push(
      {
        pathname: "/cs",
        query: { tab: tab },
      },
      undefined,
      { scroll: false }
    );
  };
  const tab = router.query.tab ?? "faq";

  if (device === "mobile") {
    return <h1>{t("CS Center")}</h1>;
  } else {
    return (
      <Stack className={"cs-page"}>
        <Stack className={"container"}>
          <Box component={"div"} className={"cs-main-info"}>
            <Box component={"div"} className={"info"}>
              <span>{t("CS Center")}</span>
              <p>{t("We're here to help with any questions you have.")}</p>
            </Box>
            <Box component={"div"} className={"btns"}>
              <div
                className={tab == "faq" ? "active" : ""}
                onClick={() => {
                  changeTabHandler("faq");
                }}
              >
                {t("FAQ")}
              </div>
              <div
                className={tab == "notice" ? "active" : ""}
                onClick={() => {
                  changeTabHandler("notice");
                }}
              >
                {t("Notice")}
              </div>
            </Box>
          </Box>

          <Box component={"div"} className={"cs-content"}>
            {tab === "notice" && <Notice />}

            {tab === "faq" && <Faq />}
          </Box>
        </Stack>
      </Stack>
    );
  }
};

export default withLayoutBasic(CS);
