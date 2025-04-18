import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Product } from "../../types/product/product";
import { ProductsInquiry } from "../../types/product/product.input";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../apollo/user/query";
import { T } from "../../types/common";
import { LIKE_TARGET_PRODUCT } from "../../../apollo/user/mutation";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../sweetAlert";
import { Message } from "../../enums/common.enum";
import MostViewedCard from "./MostViewedCard";
import { useTranslation } from "react-i18next";

interface MostViewed {
  initialInput: ProductsInquiry;
}

const MostViewed = (props: MostViewed) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  /** APOLLO REQUESTS **/
  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
  const { t } = useTranslation("common");

  const {
    loading: getProductsLoading,
    data: getProductsData,
    error: getProductsError,
    refetch: getProductsRefetch,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: { input: initialInput },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setBestSellers(data?.getProducts?.list);
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

  if (bestSellers) console.log("bestSellers:", bestSellers);
  if (!bestSellers) return null;

  if (device === "mobile") {
    return (
      <Stack className={"trend-properties"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <span>{t("Most Viewed Products")}</span>
          </Stack>
          <Stack className={"card-box"}>
            {bestSellers.length === 0 ? (
              <Box component={"div"} className={"empty-list"}>
                Trends Empty
              </Box>
            ) : (
              <Swiper
                className={"trend-property-swiper"}
                slidesPerView={"auto"}
                centeredSlides={true}
                spaceBetween={15}
                modules={[Autoplay]}
              >
                {bestSellers.map((product: Product) => {
                  return (
                    <SwiperSlide
                      key={product._id}
                      className={"trend-property-slide"}
                    >
                      <MostViewedCard
                        product={product}
                        likeProductHandler={likeProductHandler}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack className={"trend-properties"}>
        <Stack className={"container"}>
          <Stack className={"info-box"}>
            <Box component={"div"} className={"left"}>
              <span>{t("Most Viewed Products")}</span>
              <p>{t("Trend is based on item views")}</p>
            </Box>
            <Box component={"div"} className={"right"}>
              <div className={"pagination-box"}>
                <WestIcon className={"swiper-trend-prev"} />
                <div className={"swiper-trend-pagination"}></div>
                <EastIcon className={"swiper-trend-next"} />
              </div>
            </Box>
          </Stack>
          <Stack className={"card-box"}>
            {bestSellers.length === 0 ? (
              <Box component={"div"} className={"empty-list"}>
                Trends Empty
              </Box>
            ) : (
              <Swiper
                className={"trend-property-swiper"}
                slidesPerView={"auto"}
                spaceBetween={15}
                modules={[Autoplay, Navigation, Pagination]}
                navigation={{
                  nextEl: ".swiper-trend-next",
                  prevEl: ".swiper-trend-prev",
                }}
                pagination={{
                  el: ".swiper-trend-pagination",
                }}
              >
                {bestSellers.map((product: Product) => {
                  return (
                    <SwiperSlide
                      key={product._id}
                      className={"trend-property-slide"}
                    >
                      <MostViewedCard
                        product={product}
                        likeProductHandler={likeProductHandler}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

MostViewed.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "productViews",
    direction: "DESC",
    search: {},
  },
};

export default MostViewed;
