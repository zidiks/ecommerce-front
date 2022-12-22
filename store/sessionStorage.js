export const state = () => ({
  searchText: 0
})

export const mutations = {
  setSearchText(state, text) {
    state.searchText = text
  }
}
