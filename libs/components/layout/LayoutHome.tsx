import React, { useEffect, useState } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";
import { Stack } from "@mui/material";
import HeaderFilter from "../homepage/HeaderFilter";
import { userVar } from "../../../apollo/store";
import { useQuery, useReactiveVar } from "@apollo/client";
import { getJwtToken, updateUserInfo } from "../../auth";
import Chat from "../Chat";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import { Autoplay } from "swiper";
import { Product } from "../../types/product/product";
import { GET_PRODUCTS } from "../../../apollo/user/query";
import { T } from "../../types/common";
import HeaderSwiperCard from "../homepage/HeaderSwiperCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
const withLayoutMain = (Component: any) => {
  return (props: any) => {
    const { t, i18n } = useTranslation("common");
    const [popularProducts, setPopularProducts] = useState<Product[]>([]);
    const device = useDeviceDetect();
    const user = useReactiveVar(userVar);
    const router = useRouter();
    const initialInput = {
      page: 1,
      limit: 7,
      sort: "createdAt",
      direction: "DESC",
      search: {},
    };
    /** LIFECYCLES **/
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
    }, []);

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

    const handleProductPage = () => {
      router.push("/product");
    };

    if (device == "mobile") {
      return (
        <>
          <Head>
            <title>AptDecor</title>
            <meta name={"title"} content={`Nestar`} />
          </Head>
          <Stack id="mobile-wrap">
            <Stack id={"top"}>
              <Top />
            </Stack>

            <Stack id={"main"}>
              <Component {...props} />
            </Stack>

            <Stack id={"footer"}>
              <Footer />
            </Stack>
          </Stack>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>AptDecor</title>
            <meta name={"title"} content={`Nestar`} />
          </Head>
          <Stack id="pc-wrap">
            <Stack id={"top"}>
              <Top />
            </Stack>

            <Stack className={"header-main"}>
              <motion.div
                className="checkout"
                initial={{ x: "0%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 3.0, ease: "easeOut" }}
              >
                <h3>{t("Checkout our newly added products!")}</h3>
              </motion.div>
              <div className="swiper-container">
                <motion.div
                  className="intro"
                  initial={{ x: "0%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <h2>
                    {t(
                      "Welcome to AptDecor — your one-stop shop for stylish home appliances and modern furniture that bring comfort and elegance to every space."
                    )}
                  </h2>
                </motion.div>

                <div className="header-left">
                  <Swiper
                    className={"left-swiper"}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={25}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                  >
                    {popularProducts.map((product: Product) => {
                      return (
                        <SwiperSlide
                          key={product._id}
                          className={"popular-property-slide"}
                        >
                          <HeaderSwiperCard product={product} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>

              <motion.div
                className="promo"
                onClick={handleProductPage}
                initial={{ x: "40%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <p>
                  {t(
                    "Elevate Your Space! Shop Stylish Furniture & Essential Appliances Now!"
                  )}
                </p>
              </motion.div>
              <Stack className={"container"}>{/* <HeaderFilter /> */}</Stack>
            </Stack>
            <div className="filter-container">
              <HeaderFilter />
            </div>
            <Stack id={"main"}>
              <Component {...props} />
            </Stack>

            <Chat />

            <Stack id={"footer"}>
              <Footer />
            </Stack>
          </Stack>
        </>
      );
    }
  };
};

export default withLayoutMain;
