import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Stack,
  Typography,
  Select,
  TextField,
} from "@mui/material";
import { BoardArticleCategory } from "../../../../libs/enums/board-article.enum";
import { Editor } from "@toast-ui/react-editor";
import { getJwtToken } from "../../../../libs/auth";
import { REACT_APP_API_URL } from "../../../../libs/config";
import { useRouter } from "next/router";
import axios from "axios";
import { T } from "../../../../libs/types/common";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useMutation } from "@apollo/client";
import { CREATE_NOTICE } from "../../../../apollo/admin/mutation";
import { Message } from "../../../../libs/enums/common.enum";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../../libs/sweetAlert";
import { FAQFeild, NoticeCategory } from "../../../../libs/enums/notice.enum";

const NoticeEditor = () => {
  const editorRef = useRef<Editor>(null),
    token = getJwtToken(),
    router = useRouter();
  const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(
    BoardArticleCategory.FREE
  );
  const [noticeCategory, setNoticeCategory] = useState<NoticeCategory>(
    NoticeCategory.FAQ
  );
  const [field, setField] = useState<FAQFeild>(FAQFeild.AGENT);

  /** APOLLO REQUESTS **/
  const [createNotice] = useMutation(CREATE_NOTICE);

  const memoizedValues = useMemo(() => {
    const noticeTitle = "",
      noticeContent = "",
      eventCity = "",
      field = "",
      noticeImage = "";

    return { noticeTitle, noticeContent, noticeImage, field, eventCity };
  }, []);

  /** HANDLERS **/

  const backToAdminPage = async () => {
    await router.push("/_admin/cs/faq");
  };

  const uploadImage = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append(
        "operations",
        JSON.stringify({
          query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target) 
				  }`,
          variables: {
            file: null,
            target: "event",
          },
        })
      );
      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.file"],
        })
      );
      formData.append("0", image);

      const response = await axios.post(
        `${process.env.REACT_APP_API_GRAPHQL_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "apollo-require-preflight": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseImage = response.data.data.imageUploader;
      console.log("=responseImage: ", responseImage);
      memoizedValues.noticeImage = responseImage;

      return `${REACT_APP_API_URL}/${responseImage}`;
    } catch (err) {
      console.log("Error, uploadImage:", err);
    }
  };

  console.log("image:", memoizedValues.noticeImage);

  const changeCategoryHandler = (e: any) => {
    setNoticeCategory(e.target.value);
  };

  const changeFieldHandler = (e: any) => {
    setField(e.target.value);
  };

  const noticeTitleHandler = (e: T) => {
    console.log(e.target.value);
    memoizedValues.noticeTitle = e.target.value;
  };

  const noticeCityHandler = (e: T) => {
    console.log(e.target.value, "New York");
    memoizedValues.eventCity = e.target.value;
  };

  console.log(memoizedValues.eventCity, "KKKK");

  const handleRegisterButton = async () => {
    try {
      const editor = editorRef.current;
      const noticeContentHTML = editor?.getInstance().getHTML() as string;
      // Create a temporary DOM element to parse and extract the text
      const tempElement = document.createElement("div");
      tempElement.innerHTML = noticeContentHTML;
      const noticeContent = tempElement.textContent || ""; // Get plain text
      memoizedValues.noticeContent = noticeContent;

      if (
        memoizedValues.noticeContent === "" &&
        memoizedValues.noticeTitle === ""
      ) {
        throw new Error(Message.INSERT_ALL_INPUTS);
      }

      await createNotice({
        variables: {
          input: { ...memoizedValues, noticeCategory, field },
        },
      });

      await sweetTopSmallSuccessAlert("Notice has been created!", 700);
      await router.push(
        `/_admin/cs/${noticeCategory === "FAQ" ? "faq" : "event"}`
      );
    } catch (err: any) {
      console.log("ERROR, handleRegisterButton", err.message);
      sweetErrorHandling(new Error(Message.INSERT_ALL_INPUTS)).then();
    }
  };

  const doDisabledCheck = () => {
    if (
      memoizedValues.noticeContent === "" ||
      memoizedValues.noticeTitle === ""
    ) {
      return true;
    }
  };

  return (
    <Stack>
      <button className="back-to-admin" onClick={backToAdminPage}>
        <span>
          <img src="/img/icons/arrow-left.svg" /> Go Back{" "}
        </span>
      </button>
      <Stack
        direction="row"
        style={{ margin: "40px" }}
        justifyContent="space-evenly"
      >
        <Box
          component={"div"}
          className={"form_row"}
          style={{ width: "300px" }}
        >
          <Typography style={{ color: "#7f838d", margin: "10px" }} variant="h3">
            Category
          </Typography>
          <FormControl sx={{ width: "100%", background: "white" }}>
            <Select
              value={noticeCategory}
              onChange={changeCategoryHandler}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={NoticeCategory.FAQ}>
                <span>FAQ</span>
              </MenuItem>
              <MenuItem value={NoticeCategory.EVENT}>Event</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {noticeCategory === NoticeCategory.FAQ ? (
          <Box
            component={"div"}
            className={"form_row"}
            style={{ width: "300px" }}
          >
            <Typography
              style={{ color: "#7f838d", margin: "10px" }}
              variant="h3"
            >
              Field
            </Typography>
            <FormControl sx={{ width: "100%", background: "white" }}>
              <Select
                value={field}
                onChange={changeFieldHandler}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={FAQFeild.AGENT}>Agents</MenuItem>
                <MenuItem value={FAQFeild.BUYERS}>Buyers</MenuItem>
                <MenuItem value={FAQFeild.COMMUNITY}>Community</MenuItem>
                <MenuItem value={FAQFeild.MEMBERSHIP}>Membership</MenuItem>
                <MenuItem value={FAQFeild.OTHER}>Other</MenuItem>
                <MenuItem value={FAQFeild.PAYMENT}>Payment</MenuItem>
                <MenuItem value={FAQFeild.PRODUCT}>Product</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Box
            component={"div"}
            style={{ width: "300px", flexDirection: "column" }}
          >
            <Typography
              style={{ color: "#7f838d", margin: "10px" }}
              variant="h3"
            >
              City
            </Typography>
            <TextField
              onChange={noticeCityHandler}
              id="filled-basic"
              label="Type Title"
              style={{ width: "300px", background: "white" }}
            />
          </Box>
        )}
        <Box
          component={"div"}
          style={{ width: "300px", flexDirection: "column" }}
        >
          <Typography style={{ color: "#7f838d", margin: "10px" }} variant="h3">
            {noticeCategory === "FAQ" ? "Question" : "Title"}
          </Typography>
          <TextField
            onChange={noticeTitleHandler}
            id="filled-basic"
            label="Type Title"
            style={{ width: "300px", background: "white" }}
          />
        </Box>
      </Stack>
      <div className="main-container">
        <div className="editor-container">
          <Editor
            initialValue={"Type here"}
            placeholder={"Type here"}
            previewStyle={"vertical"}
            height={"600px"}
            // @ts-ignore
            initialEditType={"WYSIWYG"}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["image", "table", "link"],
              ["ul", "ol", "task"],
            ]}
            ref={editorRef}
            hooks={{
              addImageBlobHook: async (image: any, callback: any) => {
                const uploadedImageURL = await uploadImage(image);
                callback(uploadedImageURL);
                return false;
              },
            }}
            events={{
              load: function (param: any) {},
            }}
          />
        </div>
      </div>
      <Stack direction="row" justifyContent="center">
        <button className="notice-button" onClick={handleRegisterButton}>
          Create
        </button>
      </Stack>
    </Stack>
  );
};

export default NoticeEditor;
