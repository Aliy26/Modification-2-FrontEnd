import React from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Stack, Box, Typography } from "@mui/material";
import Link from "next/link";
import { Messages, REACT_APP_API_URL } from "../../config";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { SUBSCRIBE, UNSUBSCRIBE } from "../../../apollo/user/mutation";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import { useTranslation } from "react-i18next";

interface AgentCardProps {
  agent: any;
  likeMemberHandler: any;
  getAgentsRefetch: () => void;
}

const AgentCard = (props: AgentCardProps) => {
  const { agent, likeMemberHandler, getAgentsRefetch } = props;
  const [followAgent] = useMutation(SUBSCRIBE);
  const [unfollowAgent] = useMutation(UNSUBSCRIBE);
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const { t } = useTranslation("common");

  const unsubscribeHandler = async (id: string): Promise<void> => {
    try {
      console.log(id, "############");
      if (!id) throw new Error(Messages.error1);
      if (!user._id) throw new Error(Messages.error2);
      await unfollowAgent({
        variables: {
          input: id,
        },
      });
      getAgentsRefetch();
      await sweetTopSmallSuccessAlert("Unsubscribed!", 800);
    } catch (err: any) {
      console.log("Error unsubscribe", err);
      await sweetErrorHandling(err);
    }
  };

  const subscribeHandler = async (id: string): Promise<void> => {
    try {
      console.log(id, "%%%%%%%%%%%%");
      if (!id) throw new Error(Messages.error1);
      if (!user._id) throw new Error(Messages.error2);

      await followAgent({
        variables: {
          input: id,
        },
      });

      getAgentsRefetch();
      await sweetTopSmallSuccessAlert("Subscribed!", 800);
    } catch (err: any) {
      console.log("Error: subscribeHandler", err);
      await sweetErrorHandling(err);
    }
  };

  const imagePath: string = agent?.memberImage
    ? `${REACT_APP_API_URL}/${agent?.memberImage}`
    : "/img/profile/defaultUser.svg";

  if (device === "mobile") {
    return <div>AGENT CARD</div>;
  } else {
    return (
      <Stack className="agent-general-card">
        <Link
          href={{
            pathname: "/agent/detail",
            query: { agentId: agent?._id },
          }}
        >
          <Box
            component={"div"}
            className={"agent-img"}
            style={{
              backgroundImage: `url(${imagePath})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div>{agent?.memberProperties} properties</div> */}
          </Box>
        </Link>

        <Stack className={"agent-desc"}>
          <Box component={"div"} className={"agent-info"}>
            <Link
              href={{
                pathname: "/agent/detail",
                query: { agentId: agent?._id },
              }}
            >
              <strong>{agent?.memberFullName ?? agent?.memberNick}</strong>
            </Link>
          </Box>
          <Box component={"div"} className={"buttons"}>
            <IconButton
              color={"default"}
              onClick={() => {
                likeMemberHandler(user, agent?._id);
              }}
            >
              {agent?.meLiked && agent?.meLiked[0]?.myFavorite ? (
                <FavoriteIcon color={"primary"} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography className="view-cnt">{agent?.memberLikes}</Typography>
          </Box>
        </Stack>
        {user._id !== agent._id ? (
          <div className="btn-container">
            <button
              className={`follow-btn ${
                agent?.meFollowed[0]?.myFollowing ? "unfollow" : ""
              }`}
              onClick={() => {
                {
                  agent?.meFollowed[0]?.myFollowing
                    ? unsubscribeHandler(agent?._id as string)
                    : subscribeHandler(agent._id as string);
                }
              }}
            >
              {agent?.meFollowed && agent?.meFollowed[0]?.myFollowing
                ? t("unfollow")
                : t("follow")}
            </button>
          </div>
        ) : (
          ""
        )}
      </Stack>
    );
  }
};

export default AgentCard;
