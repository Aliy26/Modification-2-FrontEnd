import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getJwtToken, logOut, updateUserInfo } from "../auth";
import { Stack, Box, Avatar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CaretDown } from "phosphor-react";
import useDeviceDetect from "../hooks/useDeviceDetect";
import Link from "next/link";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";
import { Logout } from "@mui/icons-material";
import { REACT_APP_API_URL } from "../config";
import { GET_NOTIFICATIONS } from "../../apollo/user/query";
import { T } from "../types/common";
import { Notification } from "../types/notification/notification";
import {
  NotificationStatus,
  NotificationType,
} from "../enums/notification.enum";
import { RippleBadge } from "../../scss/MaterialTheme/styled";
import { UPDATE_NOTIFICATION } from "../../apollo/user/mutation";

const Top = () => {
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [lang, setLang] = useState<string | null>("en");
  const drop = Boolean(anchorEl2);
  const [colorChange, setColorChange] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any | HTMLElement>(null);
  const drop2 = Boolean(anchorEl);
  let open = Boolean(anchorEl);
  const [bgColor, setBgColor] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
  const logoutOpen = Boolean(logoutAnchor);

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

  const {
    loading: getNotificationsLoading,
    data: getNotificationsData,
    error: getNotificationsError,
    refetch: getNotificationsRefetch,
  } = useQuery(GET_NOTIFICATIONS, {
    fetchPolicy: "cache-and-network",
    variables: {},
    skip: !user._id,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setNotifications(data?.getNotifications?.list);
    },
  });

  console.log(notifications);
  /** LIFECYCLES **/

  useEffect(() => {
    if (localStorage.getItem("locale") === null) {
      localStorage.setItem("locale", "en");
      setLang("en");
    } else {
      setLang(localStorage.getItem("locale"));
    }
  }, [router]);

  useEffect(() => {
    switch (router.pathname) {
      case "/product/detail":
        setBgColor(true);
        break;
      default:
        break;
    }
  }, [router]);

  useEffect(() => {
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);
  }, []);

  /** HANDLERS **/
  const langClick = (e: any) => {
    setAnchorEl2(e.currentTarget);
  };

  const langClose = () => {
    setAnchorEl2(null);
  };

  const menuClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  const langChoice = useCallback(
    async (e: any) => {
      setLang(e.target.id);
      localStorage.setItem("locale", e.target.id);
      setAnchorEl2(null);
      await router.push(router.asPath, router.asPath, { locale: e.target.id });
    },
    [router]
  );

  const handleMemberPage = async (memberid: string, id: string) => {
    await router.push(`/member?memberId=${memberid}`);
    await updateNotification({
      variables: {
        input: id,
      },
    });
  };

  const handlePropertyPage = async (productId: string, id: string) => {
    await router.push(`/product/detail?id=${productId}`);
    await updateNotification({
      variables: {
        input: id,
      },
    });
  };

  const handleArticle = async (id: string) => {
    await router.push("/community");
    await updateNotification({
      variables: {
        input: id,
      },
    });
    await getNotificationsRefetch();
  };

  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHover = (event: any) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      top: "109px",
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 160,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeNavbarColor);
  }

  if (device == "mobile") {
    return (
      <Stack className={"top"}>
        <Link href={"/"}>
          <div>{t("Home")}</div>
        </Link>
        <Link href={"/product"}>
          <div>{t("Products")}</div>
        </Link>
        <Link href={"/agent"}>
          <div> {t("Agents")} </div>
        </Link>
        <Link href={"/community?articleCategory=FREE"}>
          <div> {t("Community")} </div>
        </Link>
        <Link href={"/cs"}>
          <div> {t("CS")} </div>
        </Link>
      </Stack>
    );
  } else {
    return (
      <Stack className={"navbar"}>
        <Stack
          className={`navbar-main ${colorChange ? "transparent" : ""} ${
            bgColor ? "transparent" : ""
          }`}
        >
          <Stack className={"container"}>
            <Box component={"div"} className={"logo-box"}>
              <Link href={"/"}>
                <div className="company-name">
                  <img src="/img/logo/logo3.svg" alt="" />
                  <h2>Apt Decor`</h2>
                </div>
              </Link>
            </Box>
            <Box component={"div"} className={"router-box"}>
              <Link href={"/"}>
                <div>{t("Home")}</div>
              </Link>
              <Link href={"/product"}>
                <div>{t("Products")}</div>
              </Link>
              <Link href={"/agent"}>
                <div> {t("Agents")} </div>
              </Link>
              <Link href={"/community?articleCategory=FREE"}>
                <div> {t("Community")} </div>
              </Link>
              {user?._id && (
                <Link href={"/mypage"}>
                  <div> {t("My Page")} </div>
                </Link>
              )}
              <Link href={"/cs"}>
                <div> {t("CS")} </div>
              </Link>
            </Box>
            <Box component={"div"} className={"user-box"}>
              {user?._id ? (
                <>
                  <div
                    className={"login-user"}
                    onClick={(event: any) =>
                      setLogoutAnchor(event.currentTarget)
                    }
                  >
                    <img
                      src={
                        user?.memberImage
                          ? `${REACT_APP_API_URL}/${user?.memberImage}`
                          : "/img/profile/defaultUser.svg"
                      }
                      alt=""
                    />
                  </div>

                  <Menu
                    id="basic-menu"
                    anchorEl={logoutAnchor}
                    open={logoutOpen}
                    onClose={() => {
                      setLogoutAnchor(null);
                    }}
                    sx={{ mt: "5px" }}
                  >
                    <MenuItem onClick={() => logOut()}>
                      <Logout
                        fontSize="small"
                        style={{ color: "blue", marginRight: "10px" }}
                      />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href={"/account/join"}>
                  <div className={"join-box"}>
                    <AccountCircleOutlinedIcon />
                    <span>
                      {t("Login")} / {t("Register")}
                    </span>
                  </div>
                </Link>
              )}

              <div className={"lan-box"}>
                {user?._id && (
                  <div className="ripple-badge" onClick={menuClick}>
                    <RippleBadge
                      className="badge-content"
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "70px",
                      }}
                      badgeContent={
                        notifications.filter(
                          (ele: Notification) =>
                            ele.notificationStatus !== NotificationStatus.READ
                        ).length
                      }
                      onClick={menuClick}
                    />
                    <NotificationsOutlinedIcon
                      className={"notification-icon"}
                      onClick={menuClick}
                    />
                  </div>
                )}

                <Button
                  disableRipple
                  className="btn-lang"
                  onClick={langClick}
                  endIcon={
                    <CaretDown size={14} color="#616161" weight="fill" />
                  }
                >
                  <Box component={"div"} className={"flag"}>
                    {lang !== null ? (
                      <img src={`/img/flag/lang${lang}.png`} alt={"usaFlag"} />
                    ) : (
                      <img src={`/img/flag/langen.png`} alt={"usaFlag"} />
                    )}
                  </Box>
                </Button>
                {user._id && (
                  <StyledMenu
                    anchorEl={anchorEl}
                    open={drop2}
                    onClose={menuClose}
                  >
                    <div className="notification-container">
                      <div className="divider">
                        {notifications.length === 0 ? (
                          <span>No notifications</span>
                        ) : (
                          <span>Notifications</span>
                        )}
                      </div>

                      {notifications.map((ele: Notification, index) => {
                        const memberImage = (
                          <Avatar
                            className="avatar"
                            alt="user-photo"
                            src={`${REACT_APP_API_URL}/${ele.authorData?.memberImage}`}
                            onClick={() => {
                              handleMemberPage(
                                ele.authorData?._id as string,
                                ele._id as string
                              );
                            }}
                          />
                        );

                        return (
                          <div key={index} className="notification">
                            {(() => {
                              if (
                                ele.notificationType === NotificationType.LIKE
                              ) {
                                return (
                                  <div className="notice-line">
                                    <span>{memberImage} </span>
                                    {ele.notificationStatus === "UNREAD" ? (
                                      <span className="dot"></span>
                                    ) : (
                                      ""
                                    )}
                                    <p>
                                      <strong>
                                        <span
                                          onClick={() => {
                                            handleMemberPage(
                                              ele.authorData?._id as string,
                                              ele._id as string
                                            );
                                          }}
                                        >
                                          {ele.authorData?.memberNick}
                                        </span>
                                      </strong>{" "}
                                      liked your{" "}
                                      {ele.productId ? (
                                        <>
                                          <i
                                            className="title-italic"
                                            onClick={() => {
                                              handlePropertyPage(
                                                ele.productId as string,
                                                ele._id as string
                                              );
                                            }}
                                          >
                                            {ele.propertyData?.productName}
                                          </i>{" "}
                                          product
                                        </>
                                      ) : ele.articleId ? (
                                        <>
                                          <i
                                            className="title-italic"
                                            onClick={() => {
                                              handleArticle(ele._id as string);
                                            }}
                                          >
                                            {ele.articleData?.articleTitle}
                                          </i>{" "}
                                          article
                                        </>
                                      ) : (
                                        "your profile"
                                      )}
                                    </p>
                                  </div>
                                );
                              } else if (
                                ele.notificationType === NotificationType.FOLLOW
                              ) {
                                return (
                                  <div className="notice-line">
                                    {memberImage}{" "}
                                    {ele.notificationStatus === "UNREAD" ? (
                                      <span className="dot"></span>
                                    ) : (
                                      ""
                                    )}
                                    <p
                                      onClick={() => {
                                        handleMemberPage(
                                          ele.authorData?._id as string,
                                          ele._id as string
                                        );
                                      }}
                                    >
                                      <strong>
                                        {ele.authorData?.memberNick}
                                      </strong>{" "}
                                      followed you
                                    </p>
                                  </div>
                                );
                              } else if (
                                ele.notificationType ===
                                NotificationType.COMMENT
                              ) {
                                return (
                                  <div className="notice-line">
                                    {memberImage}{" "}
                                    {ele.notificationStatus === "UNREAD" ? (
                                      <span className="dot"></span>
                                    ) : (
                                      ""
                                    )}
                                    <p>
                                      <strong
                                        onClick={() => {
                                          handleMemberPage(
                                            ele.authorData?._id as string,
                                            ele._id as string
                                          );
                                        }}
                                      >
                                        {ele.authorData?.memberNick}{" "}
                                      </strong>
                                      commented on your{" "}
                                      {ele.productId ? (
                                        <>
                                          <i
                                            className="comment-italic"
                                            onClick={() => {
                                              handlePropertyPage(
                                                ele.productId as string,
                                                ele._id as string
                                              );
                                            }}
                                          >
                                            {ele.propertyData?.productName}
                                          </i>{" "}
                                          property: "{ele.notificationDesc}"
                                        </>
                                      ) : ele.articleId ? (
                                        <>
                                          <i
                                            className="comment-italic"
                                            onClick={() => {
                                              handleArticle(ele._id as string);
                                            }}
                                          >
                                            {ele.articleData?.articleTitle}
                                          </i>{" "}
                                          article: "{ele.notificationDesc}"
                                        </>
                                      ) : (
                                        <>profile: "{ele.notificationDesc}"</>
                                      )}
                                    </p>
                                  </div>
                                );
                              } else {
                                return <p>New notification</p>;
                              }
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  </StyledMenu>
                )}
                <StyledMenu
                  anchorEl={anchorEl2}
                  open={drop}
                  onClose={langClose}
                  sx={{ position: "absolute" }}
                >
                  <MenuItem disableRipple onClick={langChoice} id="en">
                    <img
                      className="img-flag"
                      src={"/img/flag/langen.png"}
                      onClick={langChoice}
                      id="en"
                      alt={"usaFlag"}
                    />
                    {t("English")}
                  </MenuItem>
                  <MenuItem disableRipple onClick={langChoice} id="kr">
                    <img
                      className="img-flag"
                      src={"/img/flag/langkr.png"}
                      onClick={langChoice}
                      id="uz"
                      alt={"koreanFlag"}
                    />
                    {t("Korean")}
                  </MenuItem>
                  <MenuItem disableRipple onClick={langChoice} id="ru">
                    <img
                      className="img-flag"
                      src={"/img/flag/langru.png"}
                      onClick={langChoice}
                      id="ru"
                      alt={"russiaFlag"}
                    />
                    {t("Russian")}
                  </MenuItem>
                </StyledMenu>
              </div>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default withRouter(Top);
