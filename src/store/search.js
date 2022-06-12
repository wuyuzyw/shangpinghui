import getList from '@/API/getList'
export default {
  namespaced: true,
  state: {
    list: {}
  },
  getters: {
    goodsList (state) {
      return state.list.goodsList || []
    },
    attrsList (state) {
      return state.list.attrsList || []
    },
    trademarkList (state) {
      return state.list.trademarkList || []
    },
    pageNo (state) {
      return state.list.pageNo
    },
    pageSize (state) {
      return state.list.pageSize
    },
    total (state) {
      return state.list.total
    },
    totalPages (state) {
      return state.list.totalPages
    }
  },
  mutations: {
    GETLIST (state, value) {
      state.list = value
    }
  },
  actions: {
    async getList (contetx, value = {}) {
      const { data: res } = await getList(value)
      if (res.code === 200) {
        contetx.commit('GETLIST', res.data)
      }
    }
  }
}
