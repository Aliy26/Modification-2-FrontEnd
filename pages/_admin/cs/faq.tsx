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
import { GET_NOTICES } from "../../../apollo/user/query";
import {
  EventNoticeInquiry,
  Notice,
} from "../../../libs/types/notices/notices";
import { NoticeCategory, NoticeStatus } from "../../../libs/enums/notice.enum";
import { T } from "../../../libs/types/common";
import { useRouter } from "next/router";
import { UPDATE_NOTICE_BY_ADMIN } from "../../../apollo/admin/mutation";
import { sweetErrorHandling } from "../../../libs/sweetAlert";

const FaqArticles: NextPage = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
  const [faqs, setFaqs] = useState<Notice[]>([]);
  const input: EventNoticeInquiry = {
    noticeCategory: NoticeCategory.FAQ,
  };
  const router = useRouter();
  const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);

  /** APOLLO REQUESTS **/

  const {
    loading: getNoticesLoading,
    data: getNoticesData,
    error: getNoticesError,
    refetch: getNoticesRefetch,
  } = useQuery(GET_NOTICES, {
    fetchPolicy: "cache-and-network",
    variables: { input: input },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setFaqs(data?.getNotices);
    },
  });

  console.log(faqs, "<<<<<<<");

  /** LIFECYCLES **/

  useEffect(() => {
    getNoticesRefetch();
  }, [input]);

  /** HANDLERS **/

  const menuIconClickHandler = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const menuIconCloseHandler = () => {
    setAnchorEl([]);
  };

  const updateNoticeHandler = async (updateData: EventNoticeInquiry) => {
    try {
      console.log("updateNotice");
      await updateNotice({
        variables: {
          input: updateData,
        },
      });
    } catch (err: any) {
      console.log("ERROR updateNoticeHandler");
      sweetErrorHandling(err).then();
    }
  };

  return (
    // @ts-ignore
    <Box component={"div"} className={"content"}>
      <Box component={"div"} className={"title flex_space"}>
        <Typography variant={"h2"}>FAQ Management</Typography>
        <Button
          className="btn_add"
          variant={"contained"}
          size={"medium"}
          onClick={() => router.push(`/_admin/cs/faq_create`)}
        >
          <AddRoundedIcon sx={{ mr: "8px" }} />
          ADD
        </Button>
      </Box>
      <Box component={"div"} className={"table-wrap"}>
        <Box component={"div"} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={"value"}>
            <Box component={"div"}>
              <List className={"tab-menu"}>
                <ListItem
                  // onClick={(e) => handleTabChange(e, 'all')}
                  value="all"
                  className={"all" === "all" ? "li on" : "li"}
                >
                  All ({faqs.length})
                </ListItem>
                <ListItem
                  // onClick={(e) => handleTabChange(e, 'active')}
                  value="active"
                  className={"all" === "all" ? "li on" : "li"}
                >
                  Active (
                  {
                    faqs.filter(
                      (ele: Notice) => ele.noticeStatus === NoticeStatus.ACTIVE
                    ).length
                  }
                  )
                </ListItem>
                <ListItem
                  // onClick={(e) => handleTabChange(e, 'blocked')}
                  value="hold"
                  className={"all" === "all" ? "li on" : "li"}
                >
                  Hold (
                  {
                    faqs.filter(
                      (ele: Notice) => ele.noticeStatus === NoticeStatus.HOLD
                    ).length
                  }
                  )
                </ListItem>
                <ListItem
                  // onClick={(e) => handleTabChange(e, 'deleted')}
                  value="deleted"
                  className={"all" === "all" ? "li on" : "li"}
                >
                  Deleted (
                  {
                    faqs.filter(
                      (ele: Notice) => ele.noticeStatus === NoticeStatus.DELETE
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
                    value={"searchCategory"}
                  >
                    <MenuItem value={"mb_nick"}>mb_nick</MenuItem>
                    <MenuItem value={"mb_id"}>mb_id</MenuItem>
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
              anchorEl={anchorEl}
              menuIconClickHandler={menuIconClickHandler}
              menuIconCloseHandler={menuIconCloseHandler}
              // generateMentorTypeHandle={generateMentorTypeHandle}
            />

            <TablePagination
              rowsPerPageOptions={[20, 40, 60]}
              component="div"
              count={4}
              rowsPerPage={10}
              page={1}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default withAdminLayout(FaqArticles);
