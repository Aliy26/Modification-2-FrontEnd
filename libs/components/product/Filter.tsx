import React, { useCallback, useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Checkbox,
  OutlinedInput,
  Tooltip,
  IconButton,
} from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { ProductCategory, ProductType } from "../../enums/product.enum";
import { ProductsInquiry } from "../../types/product/product.input";
import { useRouter } from "next/router";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { propertySquare } from "../../config";
import RefreshIcon from "@mui/icons-material/Refresh";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "200px",
    },
  },
};

interface FilterType {
  searchFilter: ProductsInquiry;
  setSearchFilter: any;
  initialInput: ProductsInquiry;
}

const Filter = (props: FilterType) => {
  const { searchFilter, setSearchFilter, initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [propertyLocation, setPropertyLocation] = useState<ProductCategory[]>(
    Object.values(ProductCategory)
  );
  const [productType, setProductsType] = useState<ProductType[]>(
    Object.values(ProductType)
  );
  const [searchText, setSearchText] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [hideAdvanced, setHideAdvanced] = useState<boolean>(false);

  /** LIFECYCLES **/
  useEffect(() => {
    if (searchFilter?.search?.typeList?.length == 0) {
      delete searchFilter.search.typeList;
      setShowMore(false);
      router
        .push(
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.typeList?.length == 0) {
      delete searchFilter.search.typeList;
      router
        .push(
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.categoryList?.length == 0) {
      delete searchFilter.search.categoryList;
      router
        .push(
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    if (searchFilter?.search?.options?.length == 0) {
      delete searchFilter.search.options;
      router
        .push(
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
            },
          })}`,
          { scroll: false }
        )
        .then();
    }

    // if (searchFilter?.search?.bedsList?.length == 0) {
    //   delete searchFilter.search.bedsList;
    //   router
    //     .push(
    //       `/product?input=${JSON.stringify({
    //         ...searchFilter,
    //         search: {
    //           ...searchFilter.search,
    //         },
    //       })}`,
    //       `/product?input=${JSON.stringify({
    //         ...searchFilter,
    //         search: {
    //           ...searchFilter.search,
    //         },
    //       })}`,
    //       { scroll: false }
    //     )
    //     .then();
    // }

    if (searchFilter?.search?.typeList) setShowMore(true);
  }, [searchFilter]);

  /** HANDLERS **/
  const propertyLocationSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                categoryList: [
                  ...(searchFilter?.search?.categoryList || []),
                  value,
                ],
              },
            })}`,
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                categoryList: [
                  ...(searchFilter?.search?.categoryList || []),
                  value,
                ],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.categoryList?.includes(value)) {
          await router.push(
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                categoryList: searchFilter?.search?.categoryList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                categoryList: searchFilter?.search?.categoryList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.typeList?.length == 0) {
          alert("error");
        }

        console.log("propertyLocationSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, propertyLocationSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  const propertyTypeSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: [...(searchFilter?.search?.typeList || []), value],
              },
            })}`,
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: [...(searchFilter?.search?.typeList || []), value],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.typeList?.includes(value)) {
          await router.push(
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: searchFilter?.search?.typeList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                typeList: searchFilter?.search?.typeList?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        if (searchFilter?.search?.typeList?.length == 0) {
          alert("error");
        }

        console.log("propertyTypeSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, propertyTypeSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  // const propertyRoomSelectHandler = useCallback(
  //   async (number: Number) => {
  //     try {
  //       if (number != 0) {
  //         if (searchFilter?.search?.roomsList?.includes(number)) {
  //           await router.push(
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 roomsList: searchFilter?.search?.roomsList?.filter(
  //                   (item: Number) => item !== number
  //                 ),
  //               },
  //             })}`,
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 roomsList: searchFilter?.search?.roomsList?.filter(
  //                   (item: Number) => item !== number
  //                 ),
  //               },
  //             })}`,
  //             { scroll: false }
  //           );
  //         } else {
  //           await router.push(
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 roomsList: [
  //                   ...(searchFilter?.search?.roomsList || []),
  //                   number,
  //                 ],
  //               },
  //             })}`,
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 roomsList: [
  //                   ...(searchFilter?.search?.roomsList || []),
  //                   number,
  //                 ],
  //               },
  //             })}`,
  //             { scroll: false }
  //           );
  //         }
  //       } else {
  //         delete searchFilter?.search.roomsList;
  //         setSearchFilter({ ...searchFilter });
  //         await router.push(
  //           `/product?input=${JSON.stringify({
  //             ...searchFilter,
  //             search: {
  //               ...searchFilter.search,
  //             },
  //           })}`,
  //           `/product?input=${JSON.stringify({
  //             ...searchFilter,
  //             search: {
  //               ...searchFilter.search,
  //             },
  //           })}`,
  //           { scroll: false }
  //         );
  //       }

  //       console.log("propertyRoomSelectHandler:", number);
  //     } catch (err: any) {
  //       console.log("ERROR, propertyRoomSelectHandler:", err);
  //     }
  //   },
  //   [searchFilter]
  // );

  const propertyOptionSelectHandler = useCallback(
    async (e: any) => {
      try {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
          await router.push(
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                options: [...(searchFilter?.search?.options || []), value],
              },
            })}`,
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                options: [...(searchFilter?.search?.options || []), value],
              },
            })}`,
            { scroll: false }
          );
        } else if (searchFilter?.search?.options?.includes(value)) {
          await router.push(
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                options: searchFilter?.search?.options?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            `/product?input=${JSON.stringify({
              ...searchFilter,
              search: {
                ...searchFilter.search,
                options: searchFilter?.search?.options?.filter(
                  (item: string) => item !== value
                ),
              },
            })}`,
            { scroll: false }
          );
        }

        console.log("productOptionSelectHandler:", e.target.value);
      } catch (err: any) {
        console.log("ERROR, propertyOptionSelectHandler:", err);
      }
    },
    [searchFilter]
  );

  // const propertyBedSelectHandler = useCallback(
  //   async (number: Number) => {
  //     try {
  //       if (number != 0) {
  //         if (searchFilter?.search?.bedsList?.includes(number)) {
  //           await router.push(
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 bedsList: searchFilter?.search?.bedsList?.filter(
  //                   (item: Number) => item !== number
  //                 ),
  //               },
  //             })}`,
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 bedsList: searchFilter?.search?.bedsList?.filter(
  //                   (item: Number) => item !== number
  //                 ),
  //               },
  //             })}`,
  //             { scroll: false }
  //           );
  //         } else {
  //           await router.push(
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 bedsList: [...(searchFilter?.search?.bedsList || []), number],
  //               },
  //             })}`,
  //             `/product?input=${JSON.stringify({
  //               ...searchFilter,
  //               search: {
  //                 ...searchFilter.search,
  //                 bedsList: [...(searchFilter?.search?.bedsList || []), number],
  //               },
  //             })}`,
  //             { scroll: false }
  //           );
  //         }
  //       } else {
  //         delete searchFilter?.search.bedsList;
  //         setSearchFilter({ ...searchFilter });
  //         await router.push(
  //           `/product?input=${JSON.stringify({
  //             ...searchFilter,
  //             search: {
  //               ...searchFilter.search,
  //             },
  //           })}`,
  //           `/product?input=${JSON.stringify({
  //             ...searchFilter,
  //             search: {
  //               ...searchFilter.search,
  //             },
  //           })}`,
  //           { scroll: false }
  //         );
  //       }

  //       console.log("productBedSelectHandler:", number);
  //     } catch (err: any) {
  //       console.log("ERROR, productBedSelectHandler:", err);
  //     }
  //   },
  //   [searchFilter]
  // );

  // const propertySquareHandler = useCallback(
  //   async (e: any, type: string) => {
  //     const value = e.target.value;

  //     if (type == "start") {
  //       await router.push(
  //         `/product?input=${JSON.stringify({
  //           ...searchFilter,
  //           search: {
  //             ...searchFilter.search,
  //             squaresRange: {
  //               ...searchFilter.search.squaresRange,
  //               start: value,
  //             },
  //           },
  //         })}`,
  //         `/product?input=${JSON.stringify({
  //           ...searchFilter,
  //           search: {
  //             ...searchFilter.search,
  //             squaresRange: {
  //               ...searchFilter.search.squaresRange,
  //               start: value,
  //             },
  //           },
  //         })}`,
  //         { scroll: false }
  //       );
  //     } else {
  //       await router.push(
  //         `/product?input=${JSON.stringify({
  //           ...searchFilter,
  //           search: {
  //             ...searchFilter.search,
  //             squaresRange: { ...searchFilter.search.squaresRange, end: value },
  //           },
  //         })}`,
  //         `/product?input=${JSON.stringify({
  //           ...searchFilter,
  //           search: {
  //             ...searchFilter.search,
  //             squaresRange: { ...searchFilter.search.squaresRange, end: value },
  //           },
  //         })}`,
  //         { scroll: false }
  //       );
  //     }
  //   },
  //   [searchFilter]
  // );

  const propertyPriceHandler = useCallback(
    async (value: number, type: string) => {
      if (type == "start") {
        await router.push(
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              pricesRange: {
                ...searchFilter.search.pricesRange,
                start: value * 1,
              },
            },
          })}`,
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              pricesRange: {
                ...searchFilter.search.pricesRange,
                start: value * 1,
              },
            },
          })}`,
          { scroll: false }
        );
      } else {
        await router.push(
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              pricesRange: {
                ...searchFilter.search.pricesRange,
                end: value * 1,
              },
            },
          })}`,
          `/product?input=${JSON.stringify({
            ...searchFilter,
            search: {
              ...searchFilter.search,
              pricesRange: {
                ...searchFilter.search.pricesRange,
                end: value * 1,
              },
            },
          })}`,
          { scroll: false }
        );
      }
    },
    [searchFilter]
  );

  const refreshHandler = async () => {
    try {
      setSearchText("");
      await router.push(
        `/product?input=${JSON.stringify(initialInput)}`,
        `/product?input=${JSON.stringify(initialInput)}`,
        { scroll: false }
      );
    } catch (err: any) {
      console.log("ERROR, refreshHandler:", err);
    }
  };

  if (device === "mobile") {
    return <div>PRODUCTS FILTER</div>;
  } else {
    return (
      <div>
        <Stack className={"find-your-home"} mb={"40px"}>
          <Typography className={"title-main"}>Find Your Product!</Typography>
          <Stack className={"input-box"}>
            <OutlinedInput
              value={searchText}
              type={"text"}
              className={"search-input"}
              placeholder={"What are you looking for?"}
              onChange={(e: any) => setSearchText(e.target.value)}
              onKeyDown={(event: any) => {
                if (event.key == "Enter") {
                  setSearchFilter({
                    ...searchFilter,
                    search: { ...searchFilter.search, text: searchText },
                  });
                }
              }}
              endAdornment={
                <>
                  <CancelRoundedIcon
                    onClick={() => {
                      setSearchText("");
                      setSearchFilter({
                        ...searchFilter,
                        search: { ...searchFilter.search, text: "" },
                      });
                    }}
                  />
                </>
              }
            />
            <img src={"/img/icons/search_icon.png"} alt={"reset"} />
            <Tooltip title="Reset">
              <IconButton onClick={refreshHandler}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <button
          style={{ background: hideAdvanced ? "green" : "" }}
          className="advanced-button"
          onClick={() => {
            setHideAdvanced((prev) => !prev);
          }}
        >
          {hideAdvanced ? "Open" : "Hide"} {""}Advanced Search
        </button>
        <Stack
          className={`filter-main ${hideAdvanced ? "" : "show"}`}
          sx={{ display: hideAdvanced ? "none" : "flex" }}
        >
          <Stack className={"find-your-home"} mb={"30px"}>
            <p
              className={"title"}
              style={{ textShadow: "0px 3px 4px #b9b9b9" }}
            >
              Category
            </p>
            <Stack
              className={`property-location`}
              style={{ height: showMore ? "210px" : "115px" }}
              onMouseEnter={() => setShowMore(true)}
              onMouseLeave={() => {
                if (!searchFilter?.search?.categoryList) {
                  setShowMore(false);
                }
              }}
            >
              {propertyLocation.map((location: string) => {
                return (
                  <Stack className={"input-box"} key={location}>
                    <Checkbox
                      id={location}
                      className="property-checkbox"
                      color="default"
                      size="small"
                      value={location}
                      checked={(
                        searchFilter?.search?.categoryList || []
                      ).includes(location as ProductCategory)}
                      onChange={propertyLocationSelectHandler}
                    />
                    <label htmlFor={location} style={{ cursor: "pointer" }}>
                      <Typography className="property-type">
                        {location}
                      </Typography>
                    </label>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack className={"find-your-home"} mb={"30px"}>
            <Typography className={"title"}>Product Type</Typography>
            {productType.map((type: string) => (
              <Stack className={"input-box"} key={type}>
                <Checkbox
                  id={type}
                  className="property-checkbox"
                  color="default"
                  size="small"
                  value={type}
                  onChange={propertyTypeSelectHandler}
                  checked={(searchFilter?.search?.typeList || []).includes(
                    type as ProductType
                  )}
                />
                <label style={{ cursor: "pointer" }}>
                  <Typography className="property_type">{type}</Typography>
                </label>
              </Stack>
            ))}
          </Stack>
          {/* <div className="numbers-container">
            <Stack className={"find-your-home rooms"} mb={"30px"}>
              <Typography className={"title"}>Rooms</Typography>
              <Stack className="button-group">
                <Button
                  sx={{
                    border: !searchFilter?.search?.roomsList
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                  }}
                  onClick={() => propertyRoomSelectHandler(0)}
                >
                  Any
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.roomsList?.includes(1)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.roomsList?.includes(1)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyRoomSelectHandler(1)}
                >
                  1
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.roomsList?.includes(2)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.roomsList?.includes(2)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyRoomSelectHandler(2)}
                >
                  2
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.roomsList?.includes(3)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.roomsList?.includes(3)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyRoomSelectHandler(3)}
                >
                  3
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.roomsList?.includes(4)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.roomsList?.includes(4)
                      ? undefined
                      : "none",
                    borderRight: searchFilter?.search?.roomsList?.includes(4)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyRoomSelectHandler(4)}
                >
                  4
                </Button>
                <Button
                  sx={{
                    border: searchFilter?.search?.roomsList?.includes(5)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                  }}
                  onClick={() => propertyRoomSelectHandler(5)}
                >
                  5+
                </Button>
              </Stack>
            </Stack>
            <Stack className={"find-your-home"} mb={"30px"}>
              <Typography className={"title"}>Bedrooms</Typography>
              <Stack className="button-group">
                <Button
                  sx={{
                    border: !searchFilter?.search?.bedsList
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                  }}
                  onClick={() => propertyBedSelectHandler(0)}
                >
                  Any
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.bedsList?.includes(1)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.bedsList?.includes(1)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyBedSelectHandler(1)}
                >
                  1
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.bedsList?.includes(2)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.bedsList?.includes(2)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyBedSelectHandler(2)}
                >
                  2
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.bedsList?.includes(3)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.bedsList?.includes(3)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyBedSelectHandler(3)}
                >
                  3
                </Button>
                <Button
                  sx={{
                    borderRadius: 0,
                    border: searchFilter?.search?.bedsList?.includes(4)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.bedsList?.includes(4)
                      ? undefined
                      : "none",
                    // borderRight: false ? undefined : 'none',
                  }}
                  onClick={() => propertyBedSelectHandler(4)}
                >
                  4
                </Button>
                <Button
                  sx={{
                    border: searchFilter?.search?.bedsList?.includes(5)
                      ? "2px solid #181A20"
                      : "1px solid #b9b9b9",
                    borderLeft: searchFilter?.search?.bedsList?.includes(5)
                      ? undefined
                      : "none",
                  }}
                  onClick={() => propertyBedSelectHandler(5)}
                >
                  5+
                </Button>
              </Stack>
            </Stack>
          </div> */}
          <Stack className={"find-your-home"} mb={"30px"}>
            <Typography className={"title"}>Options</Typography>
            <Stack className={"input-box"}>
              <Checkbox
                id={"Installment"}
                className="property-checkbox"
                color="default"
                size="small"
                value={"productInstallment"}
                checked={(searchFilter?.search?.options || []).includes(
                  "productInstallment"
                )}
                onChange={propertyOptionSelectHandler}
              />
              <label htmlFor={"Installment"} style={{ cursor: "pointer" }}>
                <Typography className="propert-type">Installment</Typography>
              </label>
            </Stack>
            <Stack className={"input-box"}>
              <Checkbox
                id={"Rent"}
                className="property-checkbox"
                color="default"
                size="small"
                value={"productRent"}
                checked={(searchFilter?.search?.options || []).includes(
                  "productRent"
                )}
                onChange={propertyOptionSelectHandler}
              />
              <label htmlFor={"Rent"} style={{ cursor: "pointer" }}>
                <Typography className="propert-type">Rent</Typography>
              </label>
            </Stack>
          </Stack>
          <div className="range-container">
            <Stack className={"find-your-home"}>
              <Typography className={"title"}>Price Range</Typography>
              <Stack className="square-year-input">
                <input
                  type="number"
                  style={{ marginBottom: "5px" }}
                  placeholder="$ min"
                  min={0}
                  value={searchFilter?.search?.pricesRange?.start ?? 0}
                  onChange={(e: any) => {
                    if (e.target.value >= 0) {
                      propertyPriceHandler(e.target.value, "start");
                    }
                  }}
                />
                <div className="central-divider"></div>
                <input
                  type="number"
                  placeholder="$ max"
                  value={searchFilter?.search?.pricesRange?.end ?? 0}
                  onChange={(e: any) => {
                    if (e.target.value >= 0) {
                      propertyPriceHandler(e.target.value, "end");
                    }
                  }}
                />
              </Stack>
            </Stack>
            <Stack className={"find-your-home"}>
              <Typography className={"title"}>Manufactured Year</Typography>
              <Stack className="square-year-input">
                <input
                  type="number"
                  placeholder="$ min"
                  min={0}
                  value={searchFilter?.search?.periodsRange?.start ?? 0}
                  onChange={(e: any) => {
                    if (e.target.value >= 0) {
                      propertyPriceHandler(e.target.value, "start");
                    }
                  }}
                />
                <div className="central-divider"></div>
                <input
                  type="number"
                  placeholder="$ max"
                  value={searchFilter?.search?.periodsRange?.end ?? 0}
                  onChange={(e: any) => {
                    if (e.target.value >= 0) {
                      propertyPriceHandler(e.target.value, "end");
                    }
                  }}
                />
              </Stack>
            </Stack>
          </div>
        </Stack>
      </div>
    );
  }
};

export default Filter;
