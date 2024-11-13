import React, { useState } from "react";
import { useRouter } from "next/router";
import { Stack, Typography, Box, List, ListItem, Button } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Link from "next/link";
import { Member } from "../../types/member/member";
import { REACT_APP_API_URL } from "../../config";
import { GET_MEMBER } from "../../../apollo/user/query";
import { useQuery } from "@apollo/client";
import { T } from "../../types/common";
import { MemberType } from "../../enums/member.enum";

interface MemberMenuProps {
  subscribeHandler: any;
  unsubscribeHandler: any;
}

const MemberMenu = (props: MemberMenuProps) => {
  const { subscribeHandler, unsubscribeHandler } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const category: any = router.query?.category;
  const [member, setMember] = useState<Member | null>(null);
  const { memberId } = router.query;

  /** APOLLO REQUESTS **/
  const {
    loading: getMemberLoading,
    data: getMemberData,
    error: getMemberError,
    refetch: getMemberRefetch,
  } = useQuery(GET_MEMBER, {
    fetchPolicy: "network-only",
    variables: {
      input: memberId,
    },
    skip: !memberId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setMember(data?.getMember);
    },
  });

  if (device === "mobile") {
    return <div>MEMBER MENU MOBILE</div>;
  } else {
    return (
      <Stack width={"100%"} padding={"30px 24px"}>
        <Stack className={"profile"}>
          <Stack className={"user-info"}>
            <Typography className={"view-list"}>
              {member?.memberType}
            </Typography>
            <Box component={"div"} className={"user-phone"}>
              <img src={"/img/icons/user.svg"} alt={"icon"} />
              <Typography className={"p-number user-name"}>
                <span>Name:</span> {member?.memberNick}
              </Typography>
            </Box>
            <Box component={"div"} className={"user-phone"}>
              <img src={"/img/icons/call.svg"} alt={"icon"} />
              <Typography className={"p-number user-name"}>
                <span>Contact:</span> {member?.memberPhone}
              </Typography>
            </Box>
            {member?.memberType === MemberType.AGENT ? (
              <Box component={"div"} className={"user-phone"}>
                <img src={"/img/icons/fax.svg"} alt={"icon"} />
                <Typography className={"p-number user-name"}>
                  <span>Fax:</span> {member?.memberPhone}
                </Typography>
              </Box>
            ) : (
              ""
            )}
            <Box component={"div"} className={"user-phone"}>
              <img src={"/img/icons/email.svg"} alt={"icon"} />
              <Typography className={"p-number user-name"}>
                <span>Email:</span> {member?.memberEmail}
              </Typography>
            </Box>
            {member?.memberAddress ? (
              <Box component={"div"} className={"user-phone"}>
                <img src={"/img/icons/home.svg"} alt={"icon"} />
                <Typography className={"p-number user-name"}>
                  <span>Address:</span> {member?.memberAddress}
                </Typography>
              </Box>
            ) : (
              ""
            )}
            {member?.memberType === MemberType.AGENT ? (
              <Box component={"div"} className={"user-phone"}>
                <img src={"/img/icons/auto-responder.svg"} alt={"icon"} />
                <Typography className={"p-number user-name"}>
                  Typically replies in: 5mins
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </Stack>
          <div className="img-box">
            <Box component={"div"} className={"profile-img"}>
              <img
                src={
                  member?.memberImage
                    ? `${REACT_APP_API_URL}/${member?.memberImage}`
                    : "/img/profile/defaultUser.svg"
                }
                alt={"member-photo"}
              />
            </Box>
            <Stack className="follow-button-box">
              {member?.meFollowed && member?.meFollowed[0]?.myFollowing ? (
                <>
                  <button
                    style={{
                      background: "royalblue",
                    }}
                    onClick={() =>
                      unsubscribeHandler(
                        member?._id,
                        getMemberRefetch,
                        memberId
                      )
                    }
                  >
                    Unfollow
                  </button>
                </>
              ) : (
                <button
                  style={{
                    background: "#ff5d18",
                  }}
                  onClick={() =>
                    subscribeHandler(member?._id, getMemberRefetch, memberId)
                  }
                >
                  Follow
                </button>
              )}
            </Stack>
          </div>
        </Stack>
        <Stack className={"sections"}>
          {member?.memberType === MemberType.AGENT ? (
            <Stack
              className={`section ${category === "products" ? "focus" : ""}`}
              sx={{ marginTop: "10px" }}
            >
              <div>
                <List className={"sub-section"}>
                  <ListItem>
                    <Link
                      href={{
                        pathname: "/member",
                        query: { ...router.query, category: "products" },
                      }}
                      scroll={false}
                      style={{ width: "100%" }}
                    >
                      <div className={"flex-box"}>
                        {category === "products" ? (
                          <img
                            className={"com-icon"}
                            src={"/img/icons/discoveryWhite.svg"}
                            alt={"com-icon"}
                          />
                        ) : (
                          <img
                            className={"com-icon"}
                            src={"/img/icons/discovery.svg"}
                            alt={"com-icon"}
                          />
                        )}

                        <Typography
                          className={"sub-title"}
                          variant={"subtitle1"}
                          component={"p"}
                        >
                          Products
                        </Typography>
                      </div>
                    </Link>
                  </ListItem>
                </List>
              </div>
            </Stack>
          ) : (
            ""
          )}
          <Stack
            className={`section ${category === "followers" ? "focus" : ""}`}
          >
            <div>
              <List className={"sub-section"}>
                <ListItem className={category === "followers" ? "focus" : ""}>
                  <Link
                    href={{
                      pathname: "/member",
                      query: { ...router.query, category: "followers" },
                    }}
                    scroll={false}
                    style={{ width: "100%" }}
                  >
                    <div className={"flex-box"}>
                      {category === "followers" ? (
                        <img
                          className={"com-icon"}
                          src={"/img/icons/discoveryWhite.svg"}
                          alt={"com-icon"}
                        />
                      ) : (
                        <img
                          className={"com-icon"}
                          src={"/img/icons/discovery.svg"}
                          alt={"com-icon"}
                        />
                      )}

                      <Typography
                        className={"sub-title"}
                        variant={"subtitle1"}
                        component={"p"}
                      >
                        Followers
                      </Typography>
                    </div>
                  </Link>
                </ListItem>
              </List>
            </div>
          </Stack>
          <Stack
            className={`section ${category === "followings" ? "focus" : ""}`}
          >
            <div>
              <List className={"sub-section"}>
                <ListItem className={category === "followings" ? "focus" : ""}>
                  <Link
                    href={{
                      pathname: "/member",
                      query: { ...router.query, category: "followings" },
                    }}
                    scroll={false}
                    style={{ width: "100%" }}
                  >
                    <div className={"flex-box"}>
                      {category === "followings" ? (
                        <img
                          className={"com-icon"}
                          src={"/img/icons/discoveryWhite.svg"}
                          alt={"com-icon"}
                        />
                      ) : (
                        <img
                          className={"com-icon"}
                          src={"/img/icons/discovery.svg"}
                          alt={"com-icon"}
                        />
                      )}

                      <Typography
                        className={"sub-title"}
                        variant={"subtitle1"}
                        component={"p"}
                      >
                        Followings
                      </Typography>
                    </div>
                  </Link>
                </ListItem>
              </List>
            </div>
          </Stack>
          <Stack
            className={`section ${category === "articles" ? "focus" : ""}`}
          >
            <div>
              <List className={"sub-section"}>
                <ListItem className={category === "articles" ? "focus" : ""}>
                  <Link
                    href={{
                      pathname: "/member",
                      query: { ...router.query, category: "articles" },
                    }}
                    scroll={false}
                    style={{ width: "100%" }}
                  >
                    <div className={"flex-box"}>
                      {category === "articles" ? (
                        <img
                          className={"com-icon"}
                          src={"/img/icons/discoveryWhite.svg"}
                          alt={"com-icon"}
                        />
                      ) : (
                        <img
                          className={"com-icon"}
                          src={"/img/icons/discovery.svg"}
                          alt={"com-icon"}
                        />
                      )}

                      <Typography
                        className={"sub-title"}
                        variant={"subtitle1"}
                        component={"p"}
                      >
                        Articles
                      </Typography>
                    </div>
                  </Link>
                </ListItem>
              </List>
            </div>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default MemberMenu;
