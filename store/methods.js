export const state = () => ({
  deliveryMethods: [],
  paymentMethods: [],
})
export const getters = {
  getPaymentsByIds: (state) => (ids) => {
    return state.paymentMethods.filter(payment => ids.includes(payment._id));
  }
}


export const actions = {
  async fetchDeliveryMethods({state}) {
    const deliveryMethodsData = await this.$api.methods.getDeliveryMethods();
    state.deliveryMethods = deliveryMethodsData || [];
    return deliveryMethodsData;
  },
  async fetchPaymentMethods({state}) {
    const paymentMethodsData = await this.$api.methods.getPaymentMethods();
    state.paymentMethods = paymentMethodsData || [];
    return paymentMethodsData;
  }
}
