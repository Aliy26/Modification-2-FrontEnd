import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stack, Box, Modal, Divider, Button } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { propertyYears } from "../../config";
import {
  ProductBrand,
  ProductCategory,
  ProductType,
} from "../../enums/product.enum";
import { ProductsInquiry } from "../../types/product/product.input";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  borderRadius: "12px",
  outline: "none",
  boxShadow: 24,
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "200px",
    },
  },
};

const thisYear = new Date().getFullYear();

interface HeaderFilterProps {
  initialInput: ProductsInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const { t, i18n } = useTranslation("common");
  const [searchFilter, setSearchFilter] =
    useState<ProductsInquiry>(initialInput);
  const locationRef: any = useRef();
  const typeRef: any = useRef();
  const roomsRef: any = useRef();
  const router = useRouter();
  const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const [brand, setBrand] = useState<ProductBrand[]>(
    Object.values(ProductBrand)
  );
  const [productCategory, setProductCategory] = useState<ProductCategory[]>(
    Object.values(ProductCategory)
  );
  const [propertyType, setPropertyType] = useState<ProductType[]>(
    Object.values(ProductType)
  );
  const [yearCheck, setYearCheck] = useState({ start: 1970, end: thisYear });
  const [optionCheck, setOptionCheck] = useState("all");

  /** LIFECYCLES **/
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!locationRef?.current?.contains(event.target)) {
        setOpenLocation(false);
      }

      if (!typeRef?.current?.contains(event.target)) {
        setOpenType(false);
      }

      if (!roomsRef?.current?.contains(event.target)) {
        setOpenRooms(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);

  /** HANDLERS **/
  const advancedFilterHandler = (status: boolean) => {
    setOpenLocation(false);
    setOpenRooms(false);
    setOpenType(false);
    setOpenAdvancedFilter(status);
  };

  const locationStateChangeHandler = () => {
    setOpenLocation((prev) => !prev);
    setOpenRooms(false);
    setOpenType(false);
  };

  const typeStateChangeHandler = () => {
    setOpenType((prev) => !prev);
    setOpenLocation(false);
    setOpenRooms(false);
  };

  const roomStateChangeHandler = () => {
    setOpenRooms((prev) => !prev);
    setOpenType(false);
    setOpenLocation(false);
  };

  const disableAllStateHandler = () => {
    setOpenRooms(false);
    setOpenType(false);
    setOpenLocation(false);
  };

  const propertyLocationSelectHandler = useCallback(
    async (value: any) => {
      try {
        setSearchFilter({
          ...searchFilter,
          search: {
            ...searchFilter.search,
            categoryList: [value],
          },
        });
        typeStateChangeHandler();
      } catch (err: any) {
        console.log("ERROR, propertyLocationSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const propertyTypeSelectHandler = useCallback(
    async (value: any) => {
      try {
        setSearchFilter({
          ...searchFilter,
          search: {
            ...searchFilter.search,
            typeList: [value],
          },
        });
        roomStateChangeHandler();
      } catch (err: any) {
        console.log("ERROR, propertyTypeSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const propertyRoomSelectHandler = useCallback(
    async (value: ProductBrand) => {
      try {
        setSearchFilter({
          ...searchFilter,
          search: {
            ...searchFilter.search,
            productBrand: value,
          },
        });
        disableAllStateHandler();
      } catch (err: any) {
        console.log("ERROR, propertyRoomSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const propertyOptionSelectHandler = useCallback(
    async (e: any) => {
      try {
        const value = e.target.value;
        setOptionCheck(value);

        if (value !== "all") {
          setSearchFilter({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              options: [value],
            },
          });
        } else {
          delete searchFilter.search.options;
          setSearchFilter({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          });
        }
      } catch (err: any) {
        console.log("ERROR, propertyOptionSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const yearStartChangeHandler = async (event: any) => {
    setYearCheck({ ...yearCheck, start: Number(event.target.value) });

    setSearchFilter({
      ...searchFilter,
      search: {
        ...searchFilter.search,
        periodsRange: { start: Number(event.target.value), end: yearCheck.end },
      },
    });
  };

  const yearEndChangeHandler = async (event: any) => {
    setYearCheck({ ...yearCheck, end: Number(event.target.value) });

    setSearchFilter({
      ...searchFilter,
      search: {
        ...searchFilter.search,
        periodsRange: {
          start: yearCheck.start,
          end: Number(event.target.value),
        },
      },
    });
  };

  const resetFilterHandler = () => {
    setSearchFilter(initialInput);
    setOptionCheck("all");
    setYearCheck({ start: 1970, end: thisYear });
  };

  const pushSearchHandler = async () => {
    try {
      if (searchFilter?.search?.categoryList?.length == 0) {
        delete searchFilter.search.categoryList;
      }

      if (searchFilter?.search?.typeList?.length == 0) {
        delete searchFilter.search.typeList;
      }

      if (searchFilter?.search?.options?.length == 0) {
        delete searchFilter.search.options;
      }

      if (searchFilter?.search?.options?.length == 0) {
        delete searchFilter.search.options;
      }

      if (searchFilter?.search?.options?.length == 0) {
        delete searchFilter.search.options;
      }

      await router.push(
        `/product?input=${JSON.stringify(searchFilter)}`,
        `/product?input=${JSON.stringify(searchFilter)}`
      );
    } catch (err: any) {
      console.log("ERROR, pushSearchHandler:", err);
    }
  };

  if (device === "mobile") {
    return <div>HEADER FILTER MOBILE</div>;
  } else {
    return (
      <>
        <Stack className={"search-box"}>
          <Stack className={"select-box"}>
            <Box
              component={"div"}
              className={`box ${openLocation ? "on" : ""}`}
              onClick={locationStateChangeHandler}
            >
              <span>
                {searchFilter?.search?.categoryList
                  ? searchFilter?.search?.categoryList[0]
                  : t("Category")}{" "}
              </span>
              <ExpandMoreIcon />
            </Box>
            <Box
              className={`box ${openType ? "on" : ""}`}
              onClick={typeStateChangeHandler}
            >
              <span>
                {" "}
                {searchFilter?.search?.typeList
                  ? searchFilter?.search?.typeList[0]
                  : t("Product type")}{" "}
              </span>
              <ExpandMoreIcon />
            </Box>
            <Box
              className={`box ${openRooms ? "on" : ""}`}
              onClick={roomStateChangeHandler}
            >
              <span>
                {searchFilter?.search?.productBrand
                  ? `${searchFilter?.search?.productBrand}`
                  : t("Brands")}
              </span>
              <ExpandMoreIcon />
            </Box>
          </Stack>
          <Stack className={"search-box-other"}>
            <Box
              className={"advanced-filter"}
              onClick={() => advancedFilterHandler(true)}
            >
              <img src="/img/icons/switch.svg" alt="" />
              <span>{t("Advanced")}</span>
            </Box>
            <Box className={"search-btn"} onClick={pushSearchHandler}>
              <img src="/img/icons/search_white.svg" alt="" />
            </Box>
          </Stack>

          {/*MENU */}
          <div
            className={`filter-location ${openLocation ? "on" : ""}`}
            ref={locationRef}
          >
            {productCategory.map((category: string) => {
              return (
                <div
                  onClick={() => propertyLocationSelectHandler(category)}
                  key={category}
                >
                  <img src={`img/banner/categories/${category}.webp`} alt="" />
                  <span>{t(`categories.${category}`, category)}</span>
                </div>
              );
            })}
          </div>

          <div className={`filter-type ${openType ? "on" : ""}`} ref={typeRef}>
            {propertyType.map((type: string) => {
              return (
                <div
                  style={{
                    backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.webp)`,
                  }}
                  onClick={() => propertyTypeSelectHandler(type)}
                  key={type}
                >
                  <span>{type}</span>
                </div>
              );
            })}
          </div>

          <div
            className={`filter-rooms ${openRooms ? "on" : ""}`}
            ref={roomsRef}
          >
            {brand.map((ele: ProductBrand) => {
              return (
                <span onClick={() => propertyRoomSelectHandler(ele)} key={ele}>
                  {ele}
                </span>
              );
            })}
          </div>
        </Stack>

        {/* ADVANCED FILTER MODAL */}
        <Modal
          open={openAdvancedFilter}
          onClose={() => advancedFilterHandler(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* @ts-ignore */}
          <Box sx={style}>
            <Box className={"advanced-filter-modal"}>
              <div
                className={"close"}
                onClick={() => advancedFilterHandler(false)}
              >
                <CloseIcon />
              </div>
              <div className={"top"}>
                <span>Find your home</span>
                <div className={"search-input-box"}>
                  <img src="/img/icons/search.svg" alt="" />
                  <input
                    value={searchFilter?.search?.text ?? ""}
                    type="text"
                    placeholder={"What are you looking for?"}
                    onChange={(e: any) => {
                      setSearchFilter({
                        ...searchFilter,
                        search: {
                          ...searchFilter.search,
                          text: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <Divider sx={{ mt: "30px", mb: "35px" }} />
              <div className={"middle"}>
                <div className={"row-box"}>
                  <div className={"box"}>
                    <span>options</span>
                    <div className={"inside"}>
                      <FormControl>
                        <Select
                          value={optionCheck}
                          onChange={propertyOptionSelectHandler}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={"all"}>All Options</MenuItem>
                          <MenuItem value={"propertyBarter"}>
                            Installment
                          </MenuItem>
                          <MenuItem value={"propertyRent"}>Rent</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className={"row-box"} style={{ marginTop: "44px" }}>
                  <div className={"box"}>
                    <span>Year Built</span>
                    <div className={"inside space-between align-center"}>
                      <FormControl sx={{ width: "122px" }}>
                        <Select
                          value={yearCheck.start.toString()}
                          onChange={yearStartChangeHandler}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          MenuProps={MenuProps}
                        >
                          {propertyYears?.slice(0)?.map((year: number) => (
                            <MenuItem
                              value={year}
                              disabled={yearCheck.end <= year}
                              key={year}
                            >
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div className={"minus-line"}></div>
                      <FormControl sx={{ width: "122px" }}>
                        <Select
                          value={yearCheck.end.toString()}
                          onChange={yearEndChangeHandler}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          MenuProps={MenuProps}
                        >
                          {propertyYears
                            ?.slice(0)
                            .reverse()
                            .map((year: number) => (
                              <MenuItem
                                value={year}
                                disabled={yearCheck.start >= year}
                                key={year}
                              >
                                {year}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
              <Divider sx={{ mt: "60px", mb: "18px" }} />
              <div className={"bottom"}>
                <div onClick={resetFilterHandler}>
                  <img src="/img/icons/reset.svg" alt="" />
                  <span>Reset all filters</span>
                </div>
                <Button
                  startIcon={<img src={"/img/icons/search.svg"} />}
                  className={"search-btn"}
                  onClick={pushSearchHandler}
                >
                  Search
                </Button>
              </div>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }
};

HeaderFilter.defaultProps = {
  initialInput: {
    page: 1,
    limit: 9,
    search: {},
  },
};

export default HeaderFilter;
