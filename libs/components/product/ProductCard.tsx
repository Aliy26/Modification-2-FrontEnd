import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Product } from "../../types/product/product";
import Link from "next/link";
import { formatterStr } from "../../utils";
import { REACT_APP_API_URL, topPropertyRank } from "../../config";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface PropertyCardType {
  product: Product;
  likeProductHandler?: any;
  myFavorites?: boolean;
  recentlyVisited?: boolean;
}

const ProductCard = (props: PropertyCardType) => {
  const { product, likeProductHandler, myFavorites, recentlyVisited } = props;
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const imagePath: string = product?.productImages[0]
    ? `${REACT_APP_API_URL}/${product?.productImages[0]}`
    : "/img/banner/header1.svg";

  if (device === "mobile") {
    return <div>PROPERTY CARD</div>;
  } else {
    return (
      <Stack className="card-config">
        <Stack className="top">
          <Link
            href={{
              pathname: "/product/detail",
              query: { id: product?._id },
            }}
          >
            <img src={imagePath} alt="card-img" className="card-img" />
          </Link>
          {product && product?.productRank > topPropertyRank && (
            <Box component={"div"} className={"top-badge"}>
              <img src="/img/icons/electricity.svg" alt="" />
              <Typography>TOP</Typography>
            </Box>
          )}
          <Box component={"div"} className={"sale-box"}>
            {product.discountedPrice > 0 ? (
              <>
                <img src="/img/icons/sale.svg" alt="sale" />
              </>
            ) : (
              ""
            )}
          </Box>
          <Box component={"div"} className={"price-box"}>
            <Typography>
              $
              {formatterStr(
                product?.discountedPrice
                  ? product.discountedPrice
                  : product.productPrice
              )}
            </Typography>
          </Box>
        </Stack>
        <Stack className="bottom">
          <Stack className="name-address">
            <Stack className="name">
              <Link
                href={{
                  pathname: "/product/detail",
                  query: { id: product?._id },
                }}
              >
                <Typography>{product.productName}</Typography>
              </Link>
            </Stack>
            <Stack className="address">
              <Typography>{product.productBrand}</Typography>
            </Stack>
          </Stack>
          <Stack className="divider"></Stack>
          <Stack className="type-buttons">
            <Stack className="type">
              <Typography
                sx={{ fontWeight: 500, fontSize: "13px" }}
                className={product.productRent ? "" : "disabled-type"}
              >
                Rent
              </Typography>
              <Typography
                sx={{ fontWeight: 500, fontSize: "13px" }}
                className={product.productInstallment ? "" : "disabled-type"}
              >
                Installment
              </Typography>
            </Stack>
            {!recentlyVisited && (
              <Stack className="buttons">
                <IconButton color={"default"}>
                  <RemoveRedEyeIcon />
                </IconButton>
                <Typography className="view-cnt">
                  {product?.productViews}
                </Typography>
                <IconButton
                  color={"default"}
                  onClick={() => likeProductHandler(user, product?._id)}
                >
                  {myFavorites ? (
                    <FavoriteIcon color="primary" />
                  ) : product?.meLiked && product?.meLiked[0]?.myFavorite ? (
                    <FavoriteIcon color="primary" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <Typography className="view-cnt">
                  {product?.productLikes}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default ProductCard;