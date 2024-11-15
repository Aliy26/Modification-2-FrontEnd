import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
  ProductType,
} from "../../enums/product.enum";
import { Direction } from "../../enums/common.enum";

export interface ProductInput {
  productType: ProductType;
  productCategory: ProductCategory;
  productName: string;
  productBrand: ProductBrand;
  productPrice: number;
  productStock?: number;
  productImages: string[];
  productDesc?: string;
  productInstallment?: boolean;
  productRent?: boolean;
  memberId?: string;
  manufacturedIn?: number;
}

interface PISearch {
  memberId?: string;
  categoryList?: ProductCategory[];
  typeList?: ProductType[];
  options?: string[];
  pricesRange?: Range;
  periodsRange?: PeriodsRange;
  text?: string;
}

export interface ProductsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: PISearch;
}

interface APISearch {
  productStatus?: ProductStatus;
}

export interface AgentPropertiesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: APISearch;
}

interface ALPISearch {
  productStatus?: ProductStatus;
  productCategoryList?: ProductCategory[];
}

export interface AllPropertiesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: ALPISearch;
}

interface Range {
  start: number;
  end: number;
}

interface PeriodsRange {
  start: number;
  end: number;
}
