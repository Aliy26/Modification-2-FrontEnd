import {
  ProductCategory,
  ProductStatus,
  PropertyType,
} from "../../enums/property.enum";
import { Direction } from "../../enums/common.enum";

export interface PropertyInput {
  propertyType: PropertyType;
  propertyLocation: ProductCategory;
  propertyAddress: string;
  propertyTitle: string;
  propertyPrice: number;
  propertySquare: number;
  propertyBeds: number;
  propertyRooms: number;
  propertyImages: string[];
  propertyDesc?: string;
  propertyBarter?: boolean;
  propertyRent?: boolean;
  memberId?: string;
  constructedAt?: Date;
}

interface PISearch {
  memberId?: string;
  locationList?: ProductCategory[];
  typeList?: PropertyType[];
  roomsList?: Number[];
  options?: string[];
  bedsList?: Number[];
  pricesRange?: Range;
  periodsRange?: PeriodsRange;
  squaresRange?: Range;
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
  propertyStatus?: ProductStatus;
}

export interface AgentPropertiesInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: APISearch;
}

interface ALPISearch {
  propertyStatus?: ProductStatus;
  propertyLocationList?: ProductCategory[];
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
  start: Date | number;
  end: Date | number;
}
