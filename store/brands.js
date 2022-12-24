export const state = () => ({
  brands: [],
})

export const actions = {
  async fetchCategories({state}) {
    const brandsData = await this.$api.brands.getBrands();
    state.brands = brandsData || [];
    return brandsData;
  }
}
