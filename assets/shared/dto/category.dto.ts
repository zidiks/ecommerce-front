import { ApiId } from "~/assets/shared/models/api.model";

export interface CategoryDto extends ApiId {
  name: string;
  handle: string;
  description?: string;
  productTypeId?: string;
  root?: boolean;
  children?: CategoryDto[];
}
