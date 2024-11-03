import {
  ProductCategory,
  ProductStatus,
  PropertyType,
} from "../../enums/property.enum";

export interface PropertyUpdate {
  _id: string;
  propertyType?: PropertyType;
  propertyStatus?: ProductStatus;
  propertyLocation?: ProductCategory;
  propertyAddress?: string;
  propertyTitle?: string;
  propertyPrice?: number;
  propertySquare?: number;
  propertyBeds?: number;
  propertyRooms?: number;
  propertyImages?: string[];
  propertyDesc?: string;
  propertyBarter?: boolean;
  propertyRent?: boolean;
  soldAt?: Date;
  deletedAt?: Date;
  constructedAt?: Date;
}
