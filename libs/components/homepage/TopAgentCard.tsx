import React from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Member } from "../../types/member/member";

interface TopAgentProps {
  agent: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
  const { agent } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const agentImage = agent?.memberImage
    ? `${process.env.REACT_APP_API_URL}/${agent?.memberImage}`
    : "/img/profile/defaultUser.svg";

  /** HANDLERS **/

  if (device === "mobile") {
    return (
      <Stack className="top-agent-card">
        <img src={agentImage} alt="" />

        <strong>{agent?.memberNick}</strong>
        <span>{agent?.memberType}</span>
      </Stack>
    );
  } else {
    return (
      <Stack className="top-agent-card">
        <img src={agentImage} alt="" className="agentImage" />
        <img
          src="/img/icons/verified.svg"
          alt="verified"
          className="verified"
        />

        <strong>{agent?.memberNick}</strong>
        <span>{agent.memberProducts} active products</span>
      </Stack>
    );
  }
};

export default TopAgentCard;
