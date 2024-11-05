import React, { useEffect } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";
import { Stack } from "@mui/material";
import FiberContainer from "../common/FiberContainer";
import HeaderFilter from "../homepage/HeaderFilter";
import { userVar } from "../../../apollo/store";
import { useReactiveVar } from "@apollo/client";
import { getJwtToken, updateUserInfo } from "../../auth";
import Chat from "../Chat";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { useRouter } from "next/router";

const withLayoutMain = (Component: any) => {
  return (props: any) => {
    const device = useDeviceDetect();
    const user = useReactiveVar(userVar);
    const router = useRouter();

    /** LIFECYCLES **/
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
    }, []);

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
              {/* <FiberContainer />  */}

              <div className="promo" onClick={handleProductPage}>
                <p>
                  Elevate Your Space! Shop Stylish Furniture & Essential
                  Appliances Now!
                </p>
              </div>

              <Stack className={"container"}>{/* <HeaderFilter /> */}</Stack>
            </Stack>

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
