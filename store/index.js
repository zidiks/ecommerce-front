export default {
  actions: {
    async nuxtServerInit({ dispatch, $api }) {
      await dispatch('categories/fetchCategories', $api);
      await dispatch('brands/fetchCategories', $api);
    }
  }
}
