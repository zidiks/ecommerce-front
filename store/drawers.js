import {BaseProductProperty} from "~/assets/shared/enums/base-product-property.enum";
import {ProductTypePropertyType} from "~/assets/shared/enums/product-property.enum";

export const state = () => ({
  treeNodeStates: {},
  menuState: false,
  searchState: false,
  filterState: false,
  sortState: false,
  priceRanges: {},
})

export const mutations = {
  toggleMenu(state) {
    state.menuState = !state.menuState;
    state.searchState = false;
    state.sortState = false;
    state.filterState = false;
    if (!state.menuState) {
      Object.keys(state.treeNodeStates).forEach(key => {
        state.treeNodeStates[key] = false;
      });
    }
  },

  openFilter(state) {
    state.filterState = true;
  },

  closeFilter(state) {
    state.filterState = false;
  },

  openSort(state) {
    state.sortState = true;
  },

  closeSort(state) {
    state.sortState = false;
  },

  toggleSearch(state) {
    state.searchState = !state.searchState;
    state.menuState = false;
    state.sortState = false;
    state.filterState = false;
  },

  closeSearch(state) {
    state.searchState = false;
  },

  closeMenu(state) {
    state.menuState = false;
    Object.keys(state.treeNodeStates).forEach(key => {
      state.treeNodeStates[key] = false;
    });
  },

  openNode(state, id) {
    if (state.treeNodeStates[id] !== undefined) {
      state.treeNodeStates[id] = true;
    }
  },

  closeNode(state, id) {
    if (state.treeNodeStates[id] !== undefined) {
      state.treeNodeStates[id] = false;
    }
  },

  closeAllNodes(state) {
    Object.keys(state.treeNodeStates).forEach(key => {
      state.treeNodeStates[key] = false;
    });
  },

  generateNodes(state, list) {
    if (list) {
      state.treeNodeStates = Object.fromEntries(list.map(item => [item._id, false]));
    }
  },
}

export const actions = {
  async fetchMinMax({state}) {
    const minPriceProduct = await this.$api.products.getProducts({
      pagination: {
        limit: 1,
        page: 1,
      },
      sort: {
        property: BaseProductProperty.TotalPrice,
        direction: 1,
      }
    });
    const maxPriceProduct = await this.$api.products.getProducts({
      pagination: {
        limit: 1,
        page: 1,
      },
      sort: {
        property: BaseProductProperty.TotalPrice,
        direction: -1,
      }
    });
    state.priceRanges.totalPrice = {};
    state.priceRanges.totalPrice.min = Math.ceil((minPriceProduct?.data[0]?.totalPrice - 10 || 0) / 10)*10;
    state.priceRanges.totalPrice.max = Math.ceil((maxPriceProduct?.data[0]?.totalPrice + 10 || 0) / 10)*10;
  }
}
