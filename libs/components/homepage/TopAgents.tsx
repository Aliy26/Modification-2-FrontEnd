import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Stack, Box, Link } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import TopAgentCard from "./TopAgentCard";
import { Member } from "../../types/member/member";
import { AgentsInquiry } from "../../types/member/member.input";
import { T } from "../../types/common";
import { GET_AGENTS } from "../../../apollo/user/query";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

interface TopAgentsProps {
  initialInput: AgentsInquiry;
}

const TopAgents = (props: TopAgentsProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [topAgents, setTopAgents] = useState<Member[]>([]);
  const { t } = useTranslation("common");

  /** APOLLO REQUESTS **/
  const {
    loading: getAgentsLoading,
    data: getAgentsData,
    error: getAgentsError,
    refetch: getAgentsRefetch,
  } = useQuery(GET_AGENTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: initialInput },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setTopAgents(data?.getAgents?.list);
    },
  });
  /** HANDLERS **/

  useEffect(() => {
    if (getAgentsError) {
      console.error("GraphQL error", getAgentsError);
    }
  }, [getAgentsError]);

  if (device === "mobile") {
    return (
      <Stack className={"top-agents"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <span>Our Top Retailers</span>
          </Stack>
          <Stack className={"wrapper"}>
            <Swiper
              className={"top-agents-swiper"}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={29}
              modules={[Autoplay]}
            >
              {topAgents.map((agent: Member) => {
                return (
                  <SwiperSlide className={"top-agents-slide"} key={agent?._id}>
                    <TopAgentCard agent={agent} key={agent?.memberNick} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack className={"top-agents"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <Box component={"div"} className={"left"}>
              <span>{t("Our Top 100% Verified Retailers!")}</span>
              <p>
                {t(
                  "Follow our Retailers & get notified each time they post a new product!"
                )}
              </p>
            </Box>
            <Box component={"div"} className={"right"}>
              <div className={"more-box"}>
                <Link href="/agent">
                  <span>{t("See All Retailers")}</span>
                </Link>
                <img src="/img/icons/rightup.svg" alt="" />
              </div>
            </Box>
          </Stack>
          <Stack className={"wrapper"}>
            <Box component={"div"} className={"switch-btn swiper-agents-prev"}>
              <ArrowBackIosNewIcon />
            </Box>
            <Box component={"div"} className={"card-wrapper"}>
              <Swiper
                className={"top-agents-swiper"}
                slidesPerView={"auto"}
                spaceBetween={29}
                modules={[Autoplay, Navigation, Pagination]}
                navigation={{
                  nextEl: ".swiper-agents-next",
                  prevEl: ".swiper-agents-prev",
                }}
              >
                {topAgents.map((agent: Member) => {
                  return (
                    <SwiperSlide
                      className={"top-agents-slide"}
                      key={agent?._id}
                    >
                      <TopAgentCard agent={agent} key={agent?.memberNick} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
            <Box component={"div"} className={"switch-btn swiper-agents-next"}>
              <ArrowBackIosNewIcon />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

TopAgents.defaultProps = {
  initialInput: {
    page: 1,
    limit: 10,
    sort: "memberRank",
    direction: "DESC",
    search: {},
  },
};

export default TopAgents;
