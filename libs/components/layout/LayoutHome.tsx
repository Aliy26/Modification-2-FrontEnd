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
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const withLayoutMain = (Component: any) => {
  return (props: any) => {
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
              <div className="checkout">
                <h3>Checkout our newly added products!</h3>
              </div>
              <div className="swiper-container">
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

              <div className="promo" onClick={handleProductPage}>
                <p>
                  Elevate Your Space! Shop Stylish Furniture & Essential
                  Appliances Now!
                </p>
              </div>
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
