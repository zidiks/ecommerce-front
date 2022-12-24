export const state = () => ({
  products: [],
})

export const getters = {
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
  clearAll(state) {
    state.products = [];
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
