import {
  ProductCategory,
  ProductStatus,
  ProductType,
} from "../../enums/product.enum";

export interface PropertyUpdate {
  _id: string;
  productType?: ProductType;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  productName?: string;
  productPrice?: number;
  discountedPrice?: number;
  productStock?: number;
  productImages?: string[];
  productDesc?: string;
  productInstallment?: boolean;
  productrent?: boolean;
  manufacturedIn?: number;
  soldAt?: Date;
  deletedAt?: Date;
}
