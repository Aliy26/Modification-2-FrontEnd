import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import withAdminLayout from "../../../libs/components/layout/LayoutAdmin";
import { Box, Button, InputAdornment, Stack } from "@mui/material";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TabContext } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import TablePagination from "@mui/material/TablePagination";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { FaqArticlesPanelList } from "../../../libs/components/admin/cs/FaqList";
import { useMutation, useQuery } from "@apollo/client";
import { GET_NOTICES, GET_NOTICES_BY_ADMIN } from "../../../apollo/user/query";
import {
  AllNoticesInquiry,
  EventNoticeInquiry,
  Notice,
} from "../../../libs/types/notices/notices";
import {
  FAQFeild,
  NoticeCategory,
  NoticeStatus,
} from "../../../libs/enums/notice.enum";
import { T } from "../../../libs/types/common";
import { useRouter } from "next/router";
import {
  DELETE_NOTICE,
  UPDATE_NOTICE_BY_ADMIN,
} from "../../../apollo/admin/mutation";
import {
  sweetConfirmAlert,
  sweetErrorHandling,
} from "../../../libs/sweetAlert";
import dynamic from "next/dynamic";
const NoticeEditer = dynamic(() => import("./add/NoticeEditor"), {
  ssr: false,
});

const FaqArticles: NextPage = ({ initialInquiry, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [noticesInquiry, setNoticesInquiry] =
    useState<AllNoticesInquiry>(initialInquiry);
  const [faqs, setFaqs] = useState<Notice[]>([]);
  const [faqsTotal, setFaqsTotal] = useState<number>(0);
  const input: EventNoticeInquiry = {
    noticeCategory: NoticeCategory.FAQ,
  };
  const [allNotices, setAllNotices] = useState<Notice[]>([]);
  const router = useRouter();
  const [searchType, setSearchType] = useState("ALL");
  const [value, setValue] = useState(
    noticesInquiry?.search?.noticeStatus
      ? noticesInquiry?.search?.noticeStatus
      : "ALL"
  );
  const [deleteNotce] = useMutation(DELETE_NOTICE);
  const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);

  /** APOLLO REQUESTS **/

  const {
    loading: getNoticesByAdminLoading,
    data: getNoticesByAdminData,
    error: getNoticesByAdminError,
    refetch: getNoticesByAdminRefetch,
  } = useQuery(GET_NOTICES_BY_ADMIN, {
    fetchPolicy: "cache-and-network",
    variables: { input: noticesInquiry },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setFaqs(data?.getAllNoticesByAdmin?.list);
      setFaqsTotal(data?.getAllNoticesByAdmin?.metaCounter[0]?.total ?? 0);
    },
  });

  const noticeInput: EventNoticeInquiry = {
    noticeCategory: NoticeCategory.FAQ,
  };

  const {
    loading: getAllNoticeLoading,
    data: getAllNoticeData,
    error: getAllNoticeError,
    refetch: getAllNoticeRefetch,
  } = useQuery(GET_NOTICES, {
    fetchPolicy: "cache-and-network",
    variables: { input: noticeInput },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setAllNotices(data?.getNotices);
    },
  });

  /** LIFECYCLES **/

  useEffect(() => {
    getNoticesByAdminRefetch();
  }, [noticesInquiry]);

  /** HANDLERS **/

  const menuIconClickHandler = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const menuIconCloseHandler = () => {
    setAnchorEl([]);
  };

  const searchTypeHandler = async (newValue: string) => {
    try {
      setSearchType(newValue);
      if (newValue !== "ALL") {
        setNoticesInquiry({
          ...noticesInquiry,
          page: 1,
          search: {
            ...noticesInquiry.search,
            field: newValue as FAQFeild,
          },
        });
      } else {
        setNoticesInquiry({
          ...noticesInquiry,
          search: {
            ...noticesInquiry.search,
            field: undefined,
          },
        });
      }
    } catch (err: any) {
      console.log("searchTypeHandler:", err.message);
    }
  };

  const tabChangeHandler = async (event: any, newValue: string) => {
    setValue(newValue);

    setNoticesInquiry({ ...noticesInquiry, page: 1 });

    switch (newValue) {
      case "ACTIVE":
        setNoticesInquiry({
          ...noticesInquiry,
          search: {
            noticeStatus: NoticeStatus.ACTIVE,
            noticeCategory: NoticeCategory.FAQ,
          },
        });
        break;
      case "HOLD":
        setNoticesInquiry({
          ...noticesInquiry,
          search: {
            noticeStatus: NoticeStatus.HOLD,
            noticeCategory: NoticeCategory.FAQ,
          },
        });
        break;
      case "DELETE":
        setNoticesInquiry({
          ...noticesInquiry,
          search: {
            noticeStatus: NoticeStatus.DELETE,
            noticeCategory: NoticeCategory.FAQ,
          },
        });
        break;
      default:
        setNoticesInquiry({
          ...noticesInquiry,
          search: {
            ...noticesInquiry.search,
            noticeStatus: undefined,
            noticeCategory: NoticeCategory.FAQ,
          },
        });
    }
  };

  const updateNoticeHandler = async (updateData: EventNoticeInquiry) => {
    try {
      console.log("updateNotice");
      await updateNotice({
        variables: {
          input: updateData,
        },
      });
      setAnchorEl([]);
      await getNoticesByAdminRefetch();
    } catch (err: any) {
      console.log("ERROR updateNoticeHandler");
      sweetErrorHandling(err).then();
    }
  };

  const changePageHandler = async (event: unknown, newPage: number) => {
    setNoticesInquiry((noticesInquiry) => ({
      ...noticesInquiry,
      page: newPage + 1,
    }));
  };

  const changeRowsPerPageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value);

    console.log("I am the limit value getting sent!", event.target.value);
    setNoticesInquiry((noticesInquiry) => ({
      ...noticesInquiry,
      limit: newLimit,
      page: 1,
    }));
    console.log("noticeInquiry:", noticesInquiry);
  };

  const deleteNoticeHandler = async (id: string) => {
    try {
      console.log("deleteNotice");

      if (await sweetConfirmAlert("Are you sure to remove?")) {
        await deleteNotce({
          variables: {
            input: id,
          },
        });

        await getNoticesByAdminRefetch;
      }
    } catch (err: any) {
      console.log("Error deleteNotice");
      sweetErrorHandling(err).then();
    }
  };

  return (
    // @ts-ignore
    <div>
      <Button
        className="btn_add"
        variant={"contained"}
        sx={{ color: "white" }}
        size={"medium"}
        onClick={() => router.push(`/_admin/cs/add`)}
      >
        <AddRoundedIcon sx={{ mr: "8px" }} />
        ADD
      </Button>
      <Box component={"div"} className={"content"}>
        <Box component={"div"} className={"title flex_space"}>
          <Typography variant={"h2"}>FAQ Management</Typography>
        </Box>
        <Box component={"div"} className={"table-wrap"}>
          <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={"value"}>
              <Box component={"div"}>
                <List className={"tab-menu"}>
                  <ListItem
                    onClick={(e: any) => tabChangeHandler(e, "ALL")}
                    value="ALL"
                    className={"all" === "all" ? "li on" : "li"}
                  >
                    All ({allNotices.length})
                  </ListItem>
                  <ListItem
                    onClick={(e: any) => tabChangeHandler(e, "ACTIVE")}
                    value="ACTIVE"
                    className={"all" === "all" ? "li on" : "li"}
                  >
                    Active (
                    {
                      allNotices.filter(
                        (ele: Notice) =>
                          ele.noticeStatus === NoticeStatus.ACTIVE
                      ).length
                    }
                    )
                  </ListItem>
                  <ListItem
                    onClick={(e: any) => tabChangeHandler(e, "HOLD")}
                    value="HOLD"
                    className={"all" === "all" ? "li on" : "li"}
                  >
                    Hold (
                    {
                      allNotices.filter(
                        (ele: Notice) => ele.noticeStatus === NoticeStatus.HOLD
                      ).length
                    }
                    )
                  </ListItem>
                  <ListItem
                    onClick={(e: any) => tabChangeHandler(e, "DELETE")}
                    value="DELETE"
                    className={"all" === "all" ? "li on" : "li"}
                  >
                    Deleted (
                    {
                      allNotices.filter(
                        (ele: Notice) =>
                          ele.noticeStatus === NoticeStatus.DELETE
                      ).length
                    }
                    )
                  </ListItem>
                </List>
                <Divider />
                {
                  <Stack className={"search-area"} sx={{ m: "24px" }}>
                    <Select
                      sx={{ width: "160px", mr: "20px" }}
                      value={searchType}
                    >
                      <MenuItem
                        value={"ALL"}
                        onClick={() => searchTypeHandler("ALL")}
                      >
                        ALL
                      </MenuItem>
                      {Object.values(FAQFeild).map((field: string) => (
                        <MenuItem
                          value={field}
                          onClick={() => searchTypeHandler(field)}
                          key={field}
                        >
                          {field}
                        </MenuItem>
                      ))}
                    </Select>

                    <OutlinedInput
                      value={"searchInput"}
                      // onChange={(e) => handleInput(e.target.value)}
                      sx={{ width: "100%" }}
                      className={"search"}
                      placeholder="Search user name"
                      onKeyDown={(event) => {
                        // if (event.key == 'Enter') searchTargetHandler().then();
                      }}
                      endAdornment={
                        <>
                          {true && <CancelRoundedIcon onClick={() => {}} />}
                          <InputAdornment position="end" onClick={() => {}}>
                            <img
                              src="/img/icons/search_icon.png"
                              alt={"searchIcon"}
                            />
                          </InputAdornment>
                        </>
                      }
                    />
                  </Stack>
                }
                <Divider />
              </Box>
              <FaqArticlesPanelList
                faqs={faqs}
                updateNoticeHandler={updateNoticeHandler}
                // dense={dense}
                // membersData={membersData}
                // searchMembers={searchMembers}
                deleteNoticeHandler={deleteNoticeHandler}
                anchorEl={anchorEl}
                menuIconClickHandler={menuIconClickHandler}
                menuIconCloseHandler={menuIconCloseHandler}
                // generateMentorTypeHandle={generateMentorTypeHandle}
              />

              <TablePagination
                rowsPerPageOptions={[1, 2, 3, 5, 20, 40, 60]}
                component="div"
                count={faqsTotal}
                rowsPerPage={noticesInquiry?.limit}
                page={noticesInquiry?.page - 1}
                onPageChange={changePageHandler}
                onRowsPerPageChange={changeRowsPerPageHandler}
              />
            </TabContext>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

FaqArticles.defaultProps = {
  initialInquiry: {
    page: 1,
    limit: 5,
    search: {
      noticeCategory: "FAQ",
    },
  },
};

export default withAdminLayout(FaqArticles);
