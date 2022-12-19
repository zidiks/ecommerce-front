import { ProductTypePropertyType } from "~/assets/shared/enums/product-property.enum";

export interface FilterModel {
  code: string;
  name: string;
  stringifyId?: string;
  stringifyLabel?: string;
  default?: any;
  prefix?: string;
  type: ProductTypePropertyType;
  options?: FilterOptionModel[];
}

export interface FilterOptionModel {
  value: number | string;
  label: string | number;
}
