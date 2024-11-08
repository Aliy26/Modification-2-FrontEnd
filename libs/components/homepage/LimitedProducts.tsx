import React, { useEffect, useState } from "react";
import { Stack, Box } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import TopPropertyCard from "./LimitedProductsCard";
import { ProductsInquiry } from "../../types/product/product.input";
import { Product } from "../../types/product/product";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../apollo/user/query";
import { T } from "../../types/common";
import { LIKE_TARGET_PRODUCT } from "../../../apollo/user/mutation";
import { Message } from "../../enums/common.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import LimitedProductsCard from "./LimitedProductsCard";

interface LimitedProductsProps {
  initialInput: ProductsInquiry;
}

const LimitedProducts = (props: LimitedProductsProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const [limitedProducts, setLimitedProducts] = useState<Product[]>([]);
  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

  /** APOLLO REQUESTS **/
  const {
    loading: getProductsLoading,
    data: getProductsData,
    error: getProductsError,
    refetch: getProductsRefetch,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-and-network",
    variables: { input: initialInput },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setLimitedProducts(data?.getProducts?.list);
    },
  });

  /** HANDLERS **/
  const likeProductHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      // execute likeTargetProduct
      await likeTargetProduct({
        variables: { input: id },
      });

      // execute getPropertiesRefetch
      await getProductsRefetch({ input: initialInput });
      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("Error, likeProductHandler", err.message);
      sweetMixinErrorAlert(err.message);
    }
  };

  if (device === "mobile") {
    return (
      <Stack className={"top-properties"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <span>Limited Quantity Products</span>
          </Stack>
          <Stack className={"card-box"}>
            <Swiper
              className={"top-property-swiper"}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={15}
              modules={[Autoplay]}
            >
              {limitedProducts.map((product: Product) => {
                return (
                  <SwiperSlide
                    className={"top-property-slide"}
                    key={product?._id}
                  >
                    <LimitedProductsCard
                      product={product}
                      likeProductHandler={likeProductHandler}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack className={"top-properties"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <Box component={"div"} className={"left"}>
              <span>Limited Quantity Products</span>
              <p>
                Check out our Products that are high in demend before they run
                out of stock!
              </p>
            </Box>
            <Box component={"div"} className={"right"}>
              <div className={"pagination-box"}>
                <WestIcon className={"swiper-top-prev"} />
                <div className={"swiper-top-pagination"}></div>
                <EastIcon className={"swiper-top-next"} />
              </div>
            </Box>
          </Stack>
          <Stack className={"card-box"}>
            <Swiper
              className={"top-property-swiper"}
              slidesPerView={"auto"}
              spaceBetween={15}
              modules={[Autoplay, Navigation, Pagination]}
              navigation={{
                nextEl: ".swiper-top-next",
                prevEl: ".swiper-top-prev",
              }}
              pagination={{
                el: ".swiper-top-pagination",
              }}
            >
              {limitedProducts.map((product: Product) => {
                return (
                  <SwiperSlide
                    className={"top-property-slide"}
                    key={product?._id}
                  >
                    <TopPropertyCard
                      product={product}
                      likeProductHandler={likeProductHandler}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

LimitedProducts.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "productRank",
    direction: "DESC",
    search: {},
  },
};

export default LimitedProducts;
