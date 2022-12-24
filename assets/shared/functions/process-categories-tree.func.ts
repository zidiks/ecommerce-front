import { CategoryDto } from "~/assets/shared/dto/category.dto";
import { CategoryDepthModel, CategoryPathItem, ProcessCategoriesResModel } from "~/assets/shared/models/category.model";

export function processCategoriesTreeFunc(apiTree: CategoryDto): ProcessCategoriesResModel {
  const res: ProcessCategoriesResModel = {
    maxDepth: 0,
    list: [],
  }
  res.tree = apiTree ? processCategoryNode(apiTree, 0, res, []) : undefined;
  return res;
}

function processCategoryNode(treeNode: CategoryDepthModel, depth: number, res: ProcessCategoriesResModel, path: CategoryPathItem[]): CategoryDepthModel {
  treeNode.depth = depth;
  treeNode.path = depth > 0 ? [...path, { _id: treeNode._id, name: treeNode.name }] : [...path];
  treeNode.allProductTypeIds = [];
  treeNode.allCategoriesIds = [treeNode._id];
  if (treeNode.productTypeId) {
    treeNode.allProductTypeIds.push(treeNode.productTypeId);
  }
  if (depth > res.maxDepth) {
    res.maxDepth = depth;
  }
  if (treeNode.children?.length) {
    treeNode.children.forEach((item: CategoryDepthModel) => {
      processCategoryNode(item, depth + 1, res, treeNode.path || []);
      if (item.allProductTypeIds && treeNode.allProductTypeIds) {
        treeNode.allProductTypeIds = [...new Set([...treeNode.allProductTypeIds, ...item.allProductTypeIds])];
      }
      if (item.allCategoriesIds && treeNode.allCategoriesIds) {
        treeNode.allCategoriesIds = [...new Set([...treeNode.allCategoriesIds, ...item.allCategoriesIds])];
      }
    });
  }
  res.list?.push({
    _id: treeNode._id,
    name: treeNode.name,
    description: treeNode.description,
    productTypeId: treeNode.productTypeId,
    depth: treeNode.depth,
    path: treeNode.path.slice(0, -1),
    allProductTypeIds: treeNode.allProductTypeIds,
    allCategoriesIds: treeNode.allCategoriesIds,
  });
  return treeNode;
}
