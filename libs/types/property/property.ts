import {
  PropertyLocation,
  PropertyStatus,
  PropertyType,
} from "../../enums/property.enum";
import { Member } from "../member/member";

export interface MeLiked {
  memberId: string;
  likeRefId: string;
  myFavorite: boolean;
}

export interface TotalCounter {
  total: number;
}

export interface Property {
  _id: string;
  productType: PropertyType;
  productStatus: PropertyStatus;
  productName: string;
  productPrice: number;
  productViews: number;
  productLikes: number;
  productComments: number;
  productRank: number;
  productBrand: string;
  productImages: string[];
  productDesc?: string;
  productInstallment?: boolean;
  productRent: boolean;
  manufacturedIn?: number;
  memberId: string;
  soldAt?: Date;
  deletedAt?: Date;
  constructedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  meLiked?: MeLiked[];
  memberData?: Member;
}

export interface Properties {
  list: Property[];
  metaCounter: TotalCounter[];
}
