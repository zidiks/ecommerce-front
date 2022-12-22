export const state = () => ({
  treeNodeStates: {},
  drawerState: false,
})

export const mutations = {
  toggleDrawer(state) {
    state.drawerState = !state.drawerState;
    if (!state.drawerState) {
      Object.keys(state.treeNodeStates).forEach(key => {
        state.treeNodeStates[key] = false;
      });
    }
  },

  closeDrawer(state) {
    state.drawerState = false;
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
