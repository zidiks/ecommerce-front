import { CategoryDto } from "~/assets/shared/dto/category.dto";

export interface CategoryDepthModel extends CategoryDto {
  depth?: number;
}

export interface ProcessCategoriesResModel {
  maxDepth: number;
  tree?: CategoryDepthModel;
}
