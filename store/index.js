export const state = () => ({
  auth: {
    user: false,
  },
  route: {
    forbidden: false,
  },
})

export const mutations = {
  SET_AUTH_USER(state, isAuthorized) {
    state.auth.user = isAuthorized
  },

  SET_FORBIDDEN_ROUTE(state, isForbidden) {
    state.route.forbidden = isForbidden
  },
}

export const actions = {
  authorizedUser({ commit }, isAuthorized) {
    commit('SET_AUTH_USER', isAuthorized)
  },

  setForbiddenRoute({ commit }, isForbidden) {
    commit('SET_FORBIDDEN_ROUTE', isForbidden)
  },
}
