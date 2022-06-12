import { tradeList, userAddress, orders, Order } from '@/API/trade'
export default {
  namespaced: true.valueOf,
  state: {
    tradeList: {},
    userAddress: [],
    orderId: ''
  },
  getters: {},
  mutations: {
    GETTRADEINFO (state, data) {
      state.tradeList = data
    },
    GETUSERADDRESS (state, data) {
      state.userAddress = data
    },
    SUBMITORDER (state, data) {
      state.orderId = data
    }
  },
  actions: {
    async getTradeInfo ({ commit }) {
      const { data: res } = await tradeList()
      if (res.code === 200) {
        commit('GETTRADEINFO', res.data)
      }
    },
    async getUserAddress ({ commit }) {
      const { data: res } = await userAddress()
      if (res.code === 200) {
        commit('GETUSERADDRESS', res.data)
      }
    },
    async submitOrder ({ commit }, { tradeNo, data }) {
      const { data: res } = await orders(tradeNo, data)
      if (res.code === 200) {
        commit('SUBMITORDER', res.data)
        console.log(res)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async getPayInfo ({ commit }, orderId) {
      const { data: res } = await Order(orderId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    }
  }
}
