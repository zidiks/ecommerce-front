export default {
  actions: {
    async nuxtServerInit({ dispatch, $api }) {
      await dispatch('categories/fetchCategories', $api);
      await dispatch('brands/fetchCategories', $api);
      await dispatch('methods/fetchDeliveryMethods', $api);
      await dispatch('methods/fetchPaymentMethods', $api);
    }
  }
}
