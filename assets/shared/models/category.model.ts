import { CategoryDto } from "~/assets/shared/dto/category.dto";
import { ApiId } from "~/assets/shared/models/api.model";

export interface CategoryDepthModel extends CategoryDto {
  depth?: number;
  path?: CategoryPathItem[];
  allProductTypeIds?: string[];
  allCategoriesIds?: string[];
}

export interface CategoryPathItem extends ApiId {
  name: string;
}

export interface CategoryDepthModelPrev extends ApiId {
  name: string;
  description?: string;
  productTypeId?: string;
  depth?: number;
  path?: CategoryPathItem[];
  allProductTypeIds?: string[];
  allCategoriesIds?: string[];
}

export interface ProcessCategoriesResModel {
  maxDepth: number;
  tree?: CategoryDepthModel;
  list?: CategoryDepthModelPrev[];
}
