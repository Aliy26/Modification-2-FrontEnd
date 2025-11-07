import React from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Product } from "../../types/product/product";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NEXT_PUBLIC_API_URL, topProductRank } from "../../config";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface HeaderSwiperCard {
  product: Product;
}

const HeaderSwiperCard = (props: HeaderSwiperCard) => {
  const { product } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const { t } = useTranslation("common");

  /** HANDLERS **/

  const pushDetailHandler = async (productId: string) => {
    console.log("ID:", productId);
    await router.push({
      pathname: "/product/detail",
      query: { id: productId },
    });
  };

  const pushAgentPage = async (agentId: string) => {
    await router.push({
      pathname: `/agent/detail`,
      query: { agentId: agentId },
    });
  };

  if (device === "mobile") {
    return (
      <Stack className="popular-card-box">
        <Box
          component={"div"}
          className={"card-img"}
          style={{
            backgroundImage: `url(${NEXT_PUBLIC_API_URL}/${product?.productImages[0]})`,
          }}
          onClick={() => {
            pushDetailHandler(product._id);
          }}
        >
          {product?.productRank && product?.productRank >= topProductRank ? (
            <div className={"status"}>
              <img src="/img/icons/electricity.svg" alt="" />
              <span>top</span>
            </div>
          ) : (
            ""
          )}

          <div className={"price"}>${product.productPrice}</div>
        </Box>
        <Box component={"div"} className={"info"}>
          <strong
            className={"title"}
            onClick={() => {
              pushDetailHandler(product._id);
            }}
          >
            {product.productName}
          </strong>

          <div className={"options"}>
            <div>
              <img src="/img/icons/bed.svg" alt="" />
            </div>
            <div>
              <img src="/img/icons/room.svg" alt="" />
            </div>
            <div>
              <img src="/img/icons/expand.svg" alt="" />
            </div>
          </div>
          <Divider sx={{ mt: "15px", mb: "17px" }} />
          <div className={"bott"}>
            <p>{product?.productRent ? "rent" : "sale"}</p>
            <div className="view-like-box">
              <IconButton color={"default"}>
                <RemoveRedEyeIcon />
              </IconButton>
              <Typography className="view-cnt">
                {product?.productViews}
              </Typography>
            </div>
          </div>
        </Box>
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Box
          component={"div"}
          className={"card-img"}
          style={{
            backgroundImage: `url(${NEXT_PUBLIC_API_URL}/${product?.productImages[0]})`,
          }}
          onClick={() => {
            pushDetailHandler(product._id);
          }}
        >
          {product?.productRank && product?.productRank >= topProductRank ? (
            <div className={"status"}>
              <img src="/img/icons/electricity.svg" alt="" />
              <span>top</span>
            </div>
          ) : (
            ""
          )}
          <div className={"price"}>${product.productPrice}</div>
        </Box>
        <Box component={"div"} className={"info"}>
          <div className="name-date">
            <strong
              className={"title"}
              onClick={() => {
                pushDetailHandler(product._id);
              }}
            >
              {product.productName}
            </strong>
            <span>
              {t("added")}{" "}
              {moment().diff(product?.createdAt, "days") === 0
                ? t("today")
                : moment().diff(product?.createdAt, "days") === 1
                ? t("yesterday")
                : t("daysAgo", {
                    count: moment().diff(product?.createdAt, "days"),
                  })}{" "}
            </span>
          </div>

          <Divider sx={{ mt: "10px", mb: "12px" }} />
          <div className={"bott"}>
            <p>
              <span>{product?.productDesc}</span>
            </p>
            <span
              className="view-cnt"
              onClick={() => pushAgentPage(product?.memberData?._id as string)}
            >
              by {product?.memberData?.memberNick}
            </span>
          </div>
          <div className="view-like-box"></div>
        </Box>
      </Stack>
    );
  }
};

export default HeaderSwiperCard;
