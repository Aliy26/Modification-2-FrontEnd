import React from "react";
import { Stack, Box, Divider, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Product } from "../../types/product/product";
import { REACT_APP_API_URL, topPropertyRank } from "../../config";
import { formatterStr } from "../../utils";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../../../apollo/store";
import { useRouter } from "next/router";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface PropertyBigCardProps {
  property: Product;
  likeProductHandler: any;
}

const PropertyBigCard = (props: PropertyBigCardProps) => {
  const { property, likeProductHandler } = props;
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const router = useRouter();

  /** HANDLERS **/
  const goPropertyDetatilPage = (productId: string) => {
    router.push(`/product/detail?id=${productId}`);
  };

  if (device === "mobile") {
    return <div>APARTMEND BIG CARD</div>;
  } else {
    return (
      // <Stack
      //   className="property-big-card-box"
      //   onClick={() => goPropertyDetatilPage(property?._id)}
      // >
      //   <Box
      //     component={"div"}
      //     className={"card-img"}
      //     style={{
      //       backgroundImage: `url(${REACT_APP_API_URL}/${property?.productImages?.[0]})`,
      //     }}
      //   >
      //     {property && property?.productRank >= topPropertyRank && (
      //       <div className={"status"}>
      //         <img src="/img/icons/electricity.svg" alt="" />
      //         <span>top</span>
      //       </div>
      //     )}

      //     <div className={"price"}>${formatterStr(property?.productPrice)}</div>
      //   </Box>
      //   <Box component={"div"} className={"info"}>
      //     <p>
      //       <strong className={"title"}>{property?.productName}</strong>
      //       <p className={"desc"}>{property?.productBrand}</p>
      //     </p>

      //     <Divider sx={{ mt: "15px", mb: "17px" }} />
      //     <div className={"bott"}>
      //       <div className="buttons-box">
      //         <div>
      //           <IconButton color={"default"}>
      //             <RemoveRedEyeIcon />
      //           </IconButton>
      //           <Typography className="view-cnt">
      //             {property?.productViews}
      //           </Typography>
      //         </div>
      //         <div>
      //           <IconButton
      //             color={"default"}
      //             onClick={(e: any) => {
      //               e.stopPropagation();
      //               likeProductHandler(user, property?._id);
      //             }}
      //           >
      //             {property?.meLiked && property?.meLiked[0]?.myFavorite ? (
      //               <FavoriteIcon style={{ color: "red" }} />
      //             ) : (
      //               <FavoriteIcon />
      //             )}
      //           </IconButton>
      //           <Typography className="view-cnt">
      //             {property?.productLikes}
      //           </Typography>
      //         </div>
      //       </div>
      //     </div>
      //   </Box>
      // </Stack>
      <Stack
        className="property-card"
        onClick={() => goPropertyDetatilPage(property?._id)}
      >
        <Box
          component="div"
          className="card-image"
          style={{
            backgroundImage: `url(${REACT_APP_API_URL}/${property?.productImages?.[0]})`,
          }}
        >
          {property && property?.productRank >= topPropertyRank && (
            <div className="status">
              <img src="/img/icons/electricity.svg" alt="" />
              <span>Top Property</span>
            </div>
          )}
          <div className="price">${formatterStr(property?.productPrice)}</div>
        </Box>

        <Box component="div" className="info">
          <p className="title">{property?.productName}</p>
          <p className="desc">{property?.productBrand}</p>

          <Divider sx={{ my: "10px" }} />

          <div className="bottom-info">
            <div className="view-like">
              <IconButton color="default">
                <RemoveRedEyeIcon />
              </IconButton>
              <Typography className="view-count">
                {property?.productViews}
              </Typography>
            </div>
            <div className="like">
              <IconButton
                color="default"
                onClick={(e: any) => {
                  e.stopPropagation();
                  likeProductHandler(user, property?._id);
                }}
              >
                {property?.meLiked && property?.meLiked[0]?.myFavorite ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
              <Typography className="like-count">
                {property?.productLikes}
              </Typography>
            </div>
          </div>
        </Box>
      </Stack>
    );
  }
};

export default PropertyBigCard;
