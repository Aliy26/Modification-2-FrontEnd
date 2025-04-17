import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import PopularProductCard from "./DiscountedProductsCard";
import { Product } from "../../types/product/product";
import Link from "next/link";
import { ProductsInquiry } from "../../types/product/product.input";
import { GET_PRODUCTS } from "../../../apollo/user/query";
import { useQuery } from "@apollo/client";
import { T } from "../../types/common";
import { useTranslation } from "react-i18next";

interface DiscountedProductsProp {
  initialInput: ProductsInquiry;
}

const DiscountedProducts = (props: DiscountedProductsProp) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const { t } = useTranslation("common");

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
      setPopularProducts(data?.getProducts?.list);
    },
  });
  /** HANDLERS **/

  if (!popularProducts) return null;

  if (device === "mobile") {
    return (
      <Stack className={"popular-properties"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <span>Top Picks on Sale</span>
          </Stack>
          <Stack className={"card-box"}>
            <Swiper
              className={"popular-property-swiper"}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={25}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {popularProducts.map((product: Product) => {
                return (
                  <SwiperSlide
                    key={product._id}
                    className={"popular-property-slide"}
                  >
                    <PopularProductCard product={product} />
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
      <Stack className={"popular-properties"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <Box component={"div"} className={"left"}>
              <span>{t("Top Picks on Sale")}</span>
            </Box>
            <Box component={"div"} className={"right"}>
              <div className={"more-box"}>
                <Link href={"/property"}>
                  <span>See All Categories</span>
                </Link>
                <img src="/img/icons/rightup.svg" alt="" />
              </div>
            </Box>
          </Stack>
          <Stack className={"card-box"}>
            <Swiper
              className={"popular-property-swiper"}
              slidesPerView={"auto"}
              spaceBetween={25}
              modules={[Autoplay, Navigation, Pagination]}
              navigation={{
                nextEl: ".swiper-popular-next",
                prevEl: ".swiper-popular-prev",
              }}
              pagination={{
                el: ".swiper-popular-pagination",
              }}
            >
              {popularProducts.map((product: Product) => {
                return (
                  <SwiperSlide
                    key={product._id}
                    className={"popular-property-slide"}
                  >
                    <PopularProductCard product={product} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
          <Stack className={"pagination-box"}>
            <WestIcon className={"swiper-popular-prev"} />
            <div className={"swiper-popular-pagination"}></div>
            <EastIcon className={"swiper-popular-next"} />
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

DiscountedProducts.defaultProps = {
  initialInput: {
    page: 1,
    limit: 7,
    sort: "updatedAt",
    direction: "DESC",
    search: {
      discountedPrice: true,
    },
  },
};

export default DiscountedProducts;
