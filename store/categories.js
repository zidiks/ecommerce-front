import {processCategoriesTreeFunc} from "~/assets/shared/functions/process-categories-tree.func";

export const state = () => ({
  categoriesTree: undefined,
  categoriesList: [],
  maxDepth: 0,
})

export const getters = {
  getById: (state) => (id) => {
    return state.categoriesList.find(category => category._id === id);
  }
}

export const actions = {
  async fetchCategories({state}) {
    const categoriesTreeData = await this.$api.categories.getCategoriesTree();
    const res = processCategoriesTreeFunc(categoriesTreeData);
    state.categoriesList = res.list || [];
    state.categoriesTree = res.tree;
    state.maxDepth = res.maxDepth > 3 ? res.maxDepth : 3;
    return res;
  }
}
