import React from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Product } from "../../types/product/product";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { REACT_APP_API_URL } from "../../config";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { useTranslation } from "react-i18next";

interface LimitedProductsCardProps {
  product: Product;
  likeProductHandler: any;
}

const LimitedProductsCard = (props: LimitedProductsCardProps) => {
  const { product, likeProductHandler } = props;
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

  if (device === "mobile") {
    return (
      <Stack className="top-card-box">
        <Box
          component={"div"}
          className={"card-img"}
          style={{
            backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})`,
          }}
          onClick={() => {
            pushDetailHandler(product._id);
          }}
        >
          <div>₩{product?.productPrice}</div>
        </Box>
        <Box component={"div"} className={"info"}>
          <strong
            className={"title"}
            onClick={() => {
              pushDetailHandler(product._id);
            }}
          >
            {product?.productName}
          </strong>
          <p className={"desc"}>{product?.productBrand}</p>

          <Divider sx={{ mt: "15px", mb: "17px" }} />
          <div className={"bott"}>
            <p>
              {" "}
              {product.productRent ? "Rent" : ""}{" "}
              {product.productRent && product.productInstallment && "/"}{" "}
              {product.productInstallment ? "Installment" : ""}
            </p>
            <div className="view-like-box">
              <IconButton color={"default"}>
                <RemoveRedEyeIcon />
              </IconButton>
              <Typography className="view-cnt">
                {product?.productViews}
              </Typography>
              <IconButton
                color={"default"}
                onClick={() => {
                  likeProductHandler(user, product?._id);
                }}
              >
                {product?.meLiked && product?.meLiked[0]?.myFavorite ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
              <Typography className="view-cnt">
                {product?.productLikes}
              </Typography>
            </div>
          </div>
        </Box>
      </Stack>
    );
  } else {
    return (
      <Stack className="top-card-box">
        <Box
          component={"div"}
          className={"card-img"}
          style={{
            backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})`,
          }}
          onClick={() => {
            pushDetailHandler(product._id);
          }}
        >
          <div>
            ₩ {""}
            {product.discountedPrice
              ? product?.discountedPrice
              : product.productPrice}
          </div>
        </Box>
        <Box component={"div"} className={"info"}>
          <strong
            className={"title"}
            onClick={() => {
              pushDetailHandler(product._id);
            }}
          >
            {product?.productName}
          </strong>
          <p className={"desc"}>{product?.productBrand}</p>
          <p className={"desc"}>
            <span>{t("stockLeft", { count: product.productStock })}</span>
          </p>

          <Divider sx={{ mt: "15px", mb: "17px" }} />
          <div className={"bott"}>
            <p>
              {t("Posted by")} {product?.memberData?.memberNick}
            </p>
            <div className="view-like-box">
              <IconButton color={"default"}>
                <RemoveRedEyeIcon />
              </IconButton>
              <Typography className="view-cnt">
                {product?.productViews}
              </Typography>
              <IconButton
                color={"default"}
                onClick={() => {
                  likeProductHandler(user, product?._id);
                }}
              >
                {product?.meLiked && product?.meLiked[0]?.myFavorite ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
              <Typography className="view-cnt">
                {product?.productLikes}
              </Typography>
            </div>
          </div>
        </Box>
      </Stack>
    );
  }
};

export default LimitedProductsCard;
