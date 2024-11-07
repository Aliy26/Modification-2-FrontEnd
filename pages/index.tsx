import { NextPage } from "next";
import useDeviceDetect from "../libs/hooks/useDeviceDetect";
import withLayoutMain from "../libs/components/layout/LayoutHome";
import CommunityBoards from "../libs/components/homepage/CommunityBoards";
import TopAgents from "../libs/components/homepage/TopAgents";
import Events from "../libs/components/homepage/Events";
import BestSeller from "../libs/components/homepage/BestSeller";
import LimitedProducts from "../libs/components/homepage/LimitedProducts";
import { Stack } from "@mui/material";
import Advertisement from "../libs/components/homepage/Advertisement";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DiscountedProducts from "../libs/components/homepage/DiscountedProducts";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const Home: NextPage = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return (
      <Stack className={"home-page"}>
        <DiscountedProducts />
        <Advertisement />
        <LimitedProducts />
        <BestSeller />
        <TopAgents />
      </Stack>
    );
  } else {
    return (
      <Stack className={"home-page"}>
        <DiscountedProducts />
        <Advertisement />
        <LimitedProducts />
        <BestSeller />
        <TopAgents />
        <CommunityBoards />
        <Events />
      </Stack>
    );
  }
};

export default withLayoutMain(Home);
