import {BaseProductProperty} from "~/assets/shared/enums/base-product-property.enum";
import {ComparisonOperator} from "~/assets/shared/enums/mongoose-query.enum";

export const state = () => ({
  products: [],
})

export const getters = {
  // async items(state) {
  //   const itemsIds = Array.from(state.products.keys()).map(item => item.toString());
  //   const itemsData = Array.from(state.products.entries());
  //   const itemsResponse = await this.$api.products.getProducts({
  //     preview: true,
  //     baseProperties: {
  //       [BaseProductProperty.Id]: {
  //         [ComparisonOperator.in]: itemsIds
  //       }
  //     },
  //     pagination: {
  //       page: 1,
  //       limit: itemsIds.length,
  //     }
  //   });
  //   return itemsData.map(([key, value]) => ({
  //     product: itemsResponse.data.find(item => item._id === key),
  //     count: value,
  //   }));
  // },
  getById: (state) => (id) => {
    return state.products.find(product => product.id === id);
  }
}

export const mutations = {
  push(state, id) {
    state.products.push({
      id,
      count: 1,
    });
  },
  increment(state, id) {
    const product = state.products.find(product => product.id === id);
    if (product) {
      product.count++;
    }
  },
  decrement(state, id) {
    const productIndex = state.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      if (state.products[productIndex].count === 1) {
        state.products.splice(productIndex, 1);
      } else {
        state.products[productIndex].count--;
      }
    }
  },
  remove(state, id) {
    const productIndex = state.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      state.products.splice(productIndex, 1);
    }
  }
}

export const actions = {

}
