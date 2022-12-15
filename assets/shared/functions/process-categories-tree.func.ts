import { CategoryDto } from "~/assets/shared/dto/category.dto";
import { CategoryDepthModel, ProcessCategoriesResModel } from "~/assets/shared/models/category.model";

export function processCategoriesTreeFunc(apiTree: CategoryDto): ProcessCategoriesResModel {
  const res: ProcessCategoriesResModel = {
    maxDepth: 0,
  }
  const processRes = processCategoryNode(apiTree, 0, res);
  res.tree = processRes;
  return res;
}

function processCategoryNode(treeNode: CategoryDepthModel, depth: number, res: ProcessCategoriesResModel): CategoryDepthModel {
  treeNode.depth = depth;
  if (depth > res.maxDepth) {
    res.maxDepth = depth;
  }
  if (treeNode.children?.length) {
    treeNode.children.forEach((item: CategoryDepthModel) => processCategoryNode(item, depth + 1, res));
  }
  return treeNode;
}
