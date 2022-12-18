import { ProductTypePropertyType } from "~/assets/shared/enums/product-property.enum";

export interface FilterModel {
  name: string;
  stringifyId?: boolean;
  default?: any;
  type: ProductTypePropertyType;
  options?: (string | number)[];
}
