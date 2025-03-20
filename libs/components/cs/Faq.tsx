import React, { SyntheticEvent, useState } from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { AccordionDetails, Box, Stack, Typography } from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { EventNoticeInquiry, Notice } from "../../types/notices/notices";
import { useQuery } from "@apollo/client";
import { GET_NOTICE_FIELDS, GET_NOTICES } from "../../../apollo/user/query";
import {
  FAQFeild,
  NoticeCategory,
  NoticeStatus,
} from "../../enums/notice.enum";
import { T } from "../../types/common";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: "1.4rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#fff",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const Faq = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [category, setCategory] = useState<string>("AGENT");
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [faqs, setFaqs] = useState<Notice[]>([]);
  const [field, setField] = useState<FAQFeild[]>([]);

  const input: EventNoticeInquiry = {
    noticeCategory: NoticeCategory.FAQ,
    noticeStatus: NoticeStatus.ACTIVE,
  };

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

  const {
    loading: getNoticeFieldsLoading,
    data: getNoticeFieldsData,
    error: getNoticeFieldsError,
    refetch: getNoticeFieldsRefetch,
  } = useQuery(GET_NOTICE_FIELDS, {
    fetchPolicy: "cache-and-network",
    variables: { input: true },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setField(data?.getNoticeFields);
    },
  });

  /** LIFECYCLES **/

  /** HANDLERS **/
  const changeCategoryHandler = (category: string) => {
    setCategory(category);
  };

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  if (device === "mobile") {
    return <div>FAQ MOBILE</div>;
  } else {
    return (
      <div>
        {!faqs.length ? (
          <Stack className="no-data">
            <h1>FAQ is not available at this point!</h1>
          </Stack>
        ) : (
          <Stack className={"faq-content"}>
            <Box className={"categories"} component={"div"}>
              {field.map((cat) => (
                <div
                  key={cat}
                  className={category === cat ? "active" : ""}
                  onClick={() => changeCategoryHandler(cat)}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </div>
              ))}
            </Box>
            <Box className={"wrap"} component={"div"}>
              {faqs
                .filter((ele: Notice) => ele.field === category)
                .map((ele: Notice) => (
                  <Accordion
                    expanded={expanded === ele?._id}
                    onChange={handleChange(ele?._id)}
                    key={ele?._id}
                  >
                    <AccordionSummary
                      id="panel1d-header"
                      className="question"
                      aria-controls="panel1d-content"
                    >
                      <Typography className="badge" variant={"h4"}>
                        Q
                      </Typography>
                      <Typography> {ele?.noticeTitle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Stack className={"answer flex-box"}>
                        <Typography
                          className="badge"
                          variant={"h4"}
                          color={"primary"}
                        >
                          A
                        </Typography>
                        <Typography> {ele?.noticeContent}</Typography>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
          </Stack>
        )}
      </div>
    );
  }
};

export default Faq;
