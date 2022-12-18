import { ProductTypePropertyType } from "~/assets/shared/enums/product-property.enum";

export interface FilterModel {
  name: string;
  stringifyId?: string;
  stringifyLabel?: string;
  default?: any;
  type: ProductTypePropertyType;
  options?: (string | number)[];
}
