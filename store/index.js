export default {
  actions: {
    async nuxtServerInit({ dispatch, $api }) {
      await dispatch('categories/fetchCategories', $api);
    }
  }
}
