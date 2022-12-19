import { ApiId } from "~/assets/shared/models/api.model";
import { ProductTypePropertyType } from "~/assets/shared/enums/product-property.enum";

export interface TypePropertyModel extends ApiId {
  showCard: boolean;
  showFilter: boolean;
  name: string;
  description: string;
  type: ProductTypePropertyType;
  options: (string | number)[];
}
