import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import ProductCard from "../../libs/components/product/ProductCard";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import Filter from "../../libs/components/product/Filter";
import { useRouter } from "next/router";
import { ProductsInquiry } from "../../libs/types/product/product.input";
import { Product } from "../../libs/types/product/product";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Direction, Message } from "../../libs/enums/common.enum";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../apollo/user/query";
import { T } from "../../libs/types/common";
import { LIKE_TARGET_PRODUCT } from "../../apollo/user/mutation";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "../../libs/sweetAlert";

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const ProductList: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [filterSortName, setFilterSortName] = useState("New");

  /** APOLLO REQUESTS **/
  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

  const {
    loading: getProductsLoading,
    data: getProductsData,
    error: getProductsError,
    refetch: getProductsRefetch,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProducts(data?.getProducts?.list);
      setTotal(data?.getProducts?.metaCounter[0].total);
    },
  });

  /** LIFECYCLES **/
  useEffect(() => {
    if (router.query.input) {
      const inputObj = JSON.parse(router?.query?.input as string);
      setSearchFilter(inputObj);
    }

    setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
  }, [router]);

  useEffect(() => {
    console.log("searchFilter", searchFilter);
    getProductsRefetch({ input: searchFilter });
  }, [searchFilter]);

  /** HANDLERS **/
  const handlePaginationChange = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    searchFilter.page = value;
    await router.push(
      `/product?input=${JSON.stringify(searchFilter)}`,
      `/product?input=${JSON.stringify(searchFilter)}`,
      {
        scroll: false,
      }
    );
    setCurrentPage(value);
  };

  const likeProductHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      // execute likeTargetProduct
      await likeTargetProduct({
        variables: { input: id },
      });

      // execute getPropertiesRefetch
      await getProductsRefetch({ _id: id });
      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("Error, likeProductHandler", err.message);
      sweetMixinErrorAlert(err.message);
    }
  };

  const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setSortingOpen(true);
  };

  const sortingCloseHandler = () => {
    setSortingOpen(false);
    setAnchorEl(null);
  };

  const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    switch (e.currentTarget.id) {
      case "new":
        setSearchFilter({
          ...searchFilter,
          sort: "createdAt",
          direction: Direction.DESC,
        });
        setFilterSortName("New");
        break;
      case "lowest":
        setSearchFilter({
          ...searchFilter,
          sort: "productPrice",
          direction: Direction.ASC,
        });
        setFilterSortName("Lowest Price");
        break;
      case "highest":
        setSearchFilter({
          ...searchFilter,
          sort: "productPrice",
          direction: Direction.DESC,
        });
        setFilterSortName("Highest Price");
    }
    setSortingOpen(false);
    setAnchorEl(null);
  };

  if (device === "mobile") {
    return (
      <div id="property-list-page-mobile" style={{ padding: "16px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Products</Typography>
          <Button
            onClick={sortingClickHandler}
            endIcon={<KeyboardArrowDownRoundedIcon />}
            variant="outlined"
            size="small"
            sx={{ borderRadius: "20px", fontSize: "14px" }}
          >
            {/* {searchFilter.sortBy || "Sort by"} */}
          </Button>
        </Stack>

        {/* Filter Component */}
        <Stack className="filter-config" mb={2}>
          <Filter
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            initialInput={initialInput}
          />
        </Stack>

        {/* Property Cards */}
        <Stack className="property-cards" spacing={2}>
          {products?.length === 0 ? (
            <div className={"no-data"} style={{ textAlign: "center" }}>
              <img src="/img/icons/icoAlert.svg" alt="No Data" />
              <Typography variant="body2">No Products found!</Typography>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                product={product}
                likeProductHandler={likeProductHandler}
                key={product?._id}
                // isMobile={true} // Pass a prop to customize for mobile
              />
            ))
          )}
        </Stack>

        {/* Pagination */}
        {products.length !== 0 && (
          <Stack
            className="pagination-config"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Pagination
              page={currentPage}
              count={Math.ceil(total / searchFilter.limit)}
              // onChange={(e, page) => handlePaginationChange(page)}
              shape="circular"
              color="primary"
              size="small"
            />
            <Typography variant="body2" sx={{ fontSize: "14px" }}>
              Total {total} {total > 1 ? "properties" : "property"} available
            </Typography>
          </Stack>
        )}
      </div>
    );
  } else {
    return (
      <div id="property-list-page" style={{ position: "relative" }}>
        <div className="container">
          <Box component={"div"} className={"right"}>
            <span>Sort by</span>
            <div>
              <Button
                onClick={sortingClickHandler}
                endIcon={<KeyboardArrowDownRoundedIcon />}
              >
                {filterSortName}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={sortingOpen}
                onClose={sortingCloseHandler}
                sx={{ paddingTop: "5px" }}
              >
                <MenuItem
                  onClick={sortingHandler}
                  id={"new"}
                  disableRipple
                  sx={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                >
                  New
                </MenuItem>
                <MenuItem
                  onClick={sortingHandler}
                  id={"lowest"}
                  disableRipple
                  sx={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                >
                  Lowest Price
                </MenuItem>
                <MenuItem
                  onClick={sortingHandler}
                  id={"highest"}
                  disableRipple
                  sx={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
                >
                  Highest Price
                </MenuItem>
              </Menu>
            </div>
          </Box>
          <Stack className={"property-page"}>
            <Stack className={"filter-config"}>
              {/* @ts-ignore */}
              <Filter
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                initialInput={initialInput}
              />
            </Stack>
            <Stack className="main-config" mb={"76px"}>
              <Stack className={"list-config"}>
                {products?.length === 0 ? (
                  <div className={"no-data"}>
                    <img src="/img/icons/icoAlert.svg" alt="" />
                    <p>No Products found!</p>
                  </div>
                ) : (
                  products.map((product: Product) => {
                    return (
                      <ProductCard
                        product={product}
                        likeProductHandler={likeProductHandler}
                        key={product?._id}
                      />
                    );
                  })
                )}
              </Stack>
              <Stack className="pagination-config">
                {products.length !== 0 && (
                  <Stack className="pagination-box">
                    <Pagination
                      page={currentPage}
                      count={Math.ceil(total / searchFilter.limit)}
                      onChange={handlePaginationChange}
                      shape="circular"
                      color="primary"
                    />
                  </Stack>
                )}

                {products.length !== 0 && (
                  <Stack className="total-result">
                    <Typography>
                      Total {total} propert{total > 1 ? "ies" : "y"} available
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
};

ProductList.defaultProps = {
  initialInput: {
    page: 1,
    limit: 12,
    sort: "productViews",
    direction: "DESC",
    search: {},
  },
};

export default withLayoutBasic(ProductList);
