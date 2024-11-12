import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../../types/product/product";
import { formatterStr } from "../../utils";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { ProductStatus } from "../../enums/product.enum";

interface PropertyCardProps {
  product: Product;
  deletePropertyHandler?: any;
  memberPage?: boolean;
  updatePropertyHandler?: any;
}

export const PropertyCard = (props: PropertyCardProps) => {
  const { product, deletePropertyHandler, memberPage, updatePropertyHandler } =
    props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const pushEditProperty = async (id: string) => {
    console.log("+pushEditProperty: ", id);
    await router.push({
      pathname: "/mypage",
      query: { category: "addProperty", productId: id },
    });
  };

  const pushPropertyDetail = async (id: string) => {
    if (memberPage)
      await router.push({
        pathname: "/product/detail",
        query: { id: id },
      });
    else return;
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (device === "mobile") {
    return <div>MOBILE PROPERTY CARD</div>;
  } else
    return (
      <Stack className="property-card-box">
        <Stack
          className="image-box"
          onClick={() => pushPropertyDetail(product?._id)}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/${product.productImages[0]}`}
            alt=""
          />
        </Stack>
        <Stack
          className="information-box"
          onClick={() => pushPropertyDetail(product?._id)}
        >
          <Typography className="name">{product.productName}</Typography>
          <Typography className="address">
            {product.productBrand
              ? product.productBrand
              : "No brand was provided"}
          </Typography>
          <Typography className="price">
            <strong>${formatterStr(product?.productPrice)}</strong>
          </Typography>
        </Stack>
        <Stack className="date-box">
          <Typography className="date">
            <Moment format="DD MMMM, YYYY">{product.createdAt}</Moment>
          </Typography>
        </Stack>
        <Stack className="status-box">
          <Stack
            className="coloured-box"
            sx={{ background: "#E5F0FD" }}
            onClick={handleClick}
          >
            <Typography className="status" sx={{ color: "#3554d1" }}>
              {product.productStatus}
            </Typography>
          </Stack>
        </Stack>
        {!memberPage && product.productStatus !== "SOLD" && (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                width: "70px",
                mt: 1,
                ml: "10px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              },
              style: {
                padding: 0,
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            {product.productStatus === "ACTIVE" && (
              <>
                <MenuItem
                  disableRipple
                  onClick={() => {
                    handleClose();
                    updatePropertyHandler(ProductStatus.SOLD, product?._id);
                  }}
                >
                  Sold
                </MenuItem>
              </>
            )}
          </Menu>
        )}

        <Stack className="views-box">
          <Typography className="views">
            {product.productViews.toLocaleString()}
          </Typography>
        </Stack>
        {!memberPage && product.productStatus === ProductStatus.ACTIVE && (
          <Stack className="action-box">
            <IconButton
              className="icon-button"
              onClick={() => pushEditProperty(product._id)}
            >
              <ModeIcon className="buttons" />
            </IconButton>
            <IconButton
              className="icon-button"
              onClick={() => deletePropertyHandler(product._id)}
            >
              <DeleteIcon className="buttons" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    );
};
