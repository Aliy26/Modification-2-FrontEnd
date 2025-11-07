import React from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Member } from "../../types/member/member";
import { useTranslation } from "react-i18next";

interface TopAgentProps {
  agent: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
  const { agent } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const agentImage = agent?.memberImage
    ? `${process.env.NEXT_PUBLIC_API_URL}/${agent?.memberImage}`
    : "/img/profile/defaultUser.svg";
  const { t } = useTranslation("common");
  /** HANDLERS **/
  const handleAgentPage = async (id: string) => {
    await router.push(`/agent/detail?agentId=${id}`);
  };

  if (device === "mobile") {
    return (
      <Stack className="top-agent-card">
        <img
          src={agentImage}
          alt=""
          onClick={() => {
            handleAgentPage(agent._id as string);
          }}
        />

        <strong
          onClick={() => {
            handleAgentPage(agent._id as string);
          }}
        >
          {agent?.memberNick}
        </strong>
        <span>Retailer</span>
      </Stack>
    );
  } else {
    return (
      <Stack className="top-agent-card">
        <img
          src={agentImage}
          alt=""
          className="agentImage"
          onClick={() => {
            handleAgentPage(agent._id as string);
          }}
        />
        <img
          src="/img/icons/verified.svg"
          alt="verified"
          className="verified"
        />

        <strong
          onClick={() => {
            handleAgentPage(agent._id as string);
          }}
        >
          {agent?.memberNick}
        </strong>
        <span>{t("actives", { count: agent.memberProducts })}</span>
      </Stack>
    );
  }
};

export default TopAgentCard;
