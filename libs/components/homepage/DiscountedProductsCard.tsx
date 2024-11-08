import React from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Product } from "../../types/product/product";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { REACT_APP_API_URL, topPropertyRank } from "../../config";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";

interface PopularProductCardProps {
  product: Product;
}

const PopularProductCard = (props: PopularProductCardProps) => {
  const { product } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);

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
      <Stack className="popular-card-box">
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
          {product?.productRank && product?.productRank >= topPropertyRank ? (
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
      <Stack className="popular-card-box">
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
          {product?.productRank && product?.productRank >= topPropertyRank ? (
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

          <Divider sx={{ mt: "15px", mb: "17px" }} />
          <div className={"bott"}>
            <p>
              Discounted price: <span>${product.productPrice}</span>
            </p>
            <div className="view-like-box">
              <Typography className="view-cnt">
                {product?.productViews}
              </Typography>
              <RemoveRedEyeIcon />
            </div>
          </div>
        </Box>
      </Stack>
    );
  }
};

export default PopularProductCard;
