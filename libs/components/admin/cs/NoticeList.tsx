import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Table,
  TableContainer,
  Button,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Notice } from "../../../types/notices/notices";
import moment from "moment";
import { NoticeStatus } from "../../../enums/notice.enum";

interface Data {
  city: string;
  title: string;
  content: string;
  date: string;
  status: string;
  id?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "Title",
  },

  {
    id: "content",
    numeric: true,
    disablePadding: false,
    label: "Content",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "CREATED DATE",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "STATUS",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface FaqArticlesPanelListType {
  faqs: Notice[];
  dense?: boolean;
  membersData?: any;
  searchMembers?: any;
  anchorEl?: any;
  updateNoticeHandler: any;
  // handleMenuIconClick?: any;
  // handleMenuIconClose?: any;
  deleteNoticeHandler: any;
  menuIconClickHandler: any;
  menuIconCloseHandler: any;
  generateMentorTypeHandle?: any;
}

export const EventsPanelList = (props: FaqArticlesPanelListType) => {
  const {
    faqs,
    dense,
    membersData,
    searchMembers,
    deleteNoticeHandler,
    updateNoticeHandler,
    anchorEl,
    menuIconClickHandler,
    menuIconCloseHandler,
    generateMentorTypeHandle,
  } = props;
  const router = useRouter();

  /** APOLLO REQUESTS **/
  /** LIFECYCLES **/
  /** HANDLERS **/

  return (
    <Stack>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          {/*@ts-ignore*/}
          <EnhancedTableHead />
          <TableBody>
            {faqs.map((notice: Notice, index: number) => {
              const member_image = "/img/profile/defaultUser.svg";

              let status_class_name = "";

              return (
                <TableRow
                  hover
                  key={notice._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{notice.eventCity}</TableCell>
                  <TableCell align="left">{notice.noticeTitle}</TableCell>
                  <TableCell align="left" className={"name"}>
                    <Stack direction={"row"}>
                      {/* <Link href={`/_admin/users/detail?mb_id=$'{member._id'}`}>
                        <div>
                          <Avatar
                            alt="Remy Sharp"
                            src={member_image}
                            sx={{ ml: "2px", mr: "10px" }}
                          />
                        </div>
                      </Link> */}
                      <Link href={`/_admin/users/detail?mb_id=${"member._id"}`}>
                        <div>{notice.noticeContent}</div>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    {moment(notice.createdAt).format("MMMM DD YYYY")}
                  </TableCell>

                  <TableCell align="center">
                    <div style={{ display: "flex" }}>
                      <Button
                        onClick={(e: any) => menuIconClickHandler(e, index)}
                        className={
                          notice.noticeStatus == "ACTIVE"
                            ? "badge success"
                            : "badge warning"
                        }
                      >
                        {notice.noticeStatus}
                      </Button>
                      {notice.noticeStatus == "DELETE" ? (
                        <DeleteIcon
                          onClick={() => {
                            deleteNoticeHandler(notice._id as string);
                          }}
                          fontSize="small"
                          sx={{ cursor: "pointer" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <Menu
                      className={"menu-modal"}
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={menuIconCloseHandler}
                      TransitionComponent={Fade}
                      sx={{ p: 1 }}
                    >
                      {Object.values(NoticeStatus)
                        .filter((ele) => ele !== notice.noticeStatus)
                        .map((status: string) => (
                          <MenuItem
                            onClick={() =>
                              updateNoticeHandler({
                                _id: notice._id,
                                noticeStatus: status,
                              })
                            }
                            // className={"badge success"}
                            key={status}
                          >
                            <Typography
                              variant={"subtitle1"}
                              component={"span"}
                            >
                              {status}
                            </Typography>
                          </MenuItem>
                        ))}
                      {/* <MenuItem
                        onClick={(e: any) =>
                          generateMentorTypeHandle(
                            "member._id",
                            "user",
                            "remove"
                          )
                        }
                      ></MenuItem> */}
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
