import { BaseProductProperty } from "~/shared/enums/base-product-property.enum";
import { ComparisonOperator } from "~/shared/enums/mongoose-query.enum";
import { BrandModel } from "~/api/dto/brand.dto";
import { ApiId, ApiTimestamp } from "~/shared/models/api.model";

export interface ProductModel extends ApiId, ApiTimestamp {
  name: string;
  media: string[];
  price: number;
  brand?: BrandModel;
  description: string;
  categoryId: string;
  productTypeId: string;
  productProps: ProductPropertyValueModel[];
}

export interface ProductPropertyValueModel {
  productTypePropertyId: string;
  value: string | string[] | number | boolean;
}

export interface GetProductsOptions {
  search?: string;
  sort?: {
    property: BaseProductProperty;
    direction: -1 | 1;
  };
  pagination?: {
    page: number;
    limit: number;
  }
  preview?: boolean;
  baseProperties?: GetProductsBasePropertiesDTO;
  customProperties?: GetProductsCustomPropertiesDTO;
}

export type  GetProductsComparison = Partial<Record<ComparisonOperator,  GetProductsComparisonValue>>;

export type  GetProductsComparisonValue = string | number | boolean | (string | number)[];

export type GetProductsBasePropertiesDTO = Partial<Record<BaseProductProperty,  GetProductsComparison>>;

export type GetProductsCustomPropertiesDTO = Partial<Record<string,  GetProductsComparison>>;
