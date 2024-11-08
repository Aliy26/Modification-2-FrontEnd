import {
  ProductBrand,
  ProductCategory,
  ProductStatus,
  ProductType,
} from "../../enums/product.enum";
import { Member } from "../member/member";

export interface MeLiked {
  memberId: string;
  likeRefId: string;
  myFavorite: boolean;
}

export interface TotalCounter {
  total: number;
}

export interface Product {
  _id: string;
  productType: ProductType;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productName: string;
  productPrice: number;
  discountedPrice: number;
  productBrand: ProductBrand;
  productViews: number;
  productLikes: number;
  productComments: number;
  productStock: number;
  productSoldCout: number;
  productRank: number;
  productImages: string[];
  productDesc?: string;
  productInstallment?: boolean;
  productRent: boolean;
  manufacturedIn?: number;
  memberId: string;
  soldAt?: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  /** from aggregation **/
  meLiked?: MeLiked[];
  memberData?: Member;
}

export interface Products {
  list: Product[];
  metaCounter: TotalCounter[];
}
