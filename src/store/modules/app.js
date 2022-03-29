function getFooterHeight() {
  return document.getElementById('footerHeight').value
}

const state = {
  footerInit: false,
  footerHeight: getFooterHeight()
}

const mutations = {
  FOOTER_INIT: (state, footerInit) => {
    state.footerInit = footerInit
  },
  FOOTER_HEIGHT: (state, footerHeight) => {
    state.footerHeight = footerHeight
  }
}

const actions = {
  footerInit({ commit }, footerInit) {
    commit('FOOTER_INIT', footerInit)
  },
  footerHeight({ commit }, footerHeight) {
    commit('FOOTER_HEIGHT', footerHeight)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
