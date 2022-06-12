import shopCartList from '@/API/shopCartList'
import checkCart from '@/API/checkCart'
import deleteCart from '@/API/deleteCart'
export default {
  namespaced: true,
  state: {
    shopCartList: []
  },
  getters: {
    shopCartList (state) {
      return state.shopCartList[0] || {}
    }
  },
  mutations: {
    SHOPCARTLIST (state, value) {
      state.shopCartList = value
    }
  },
  actions: {
    async shopCartList ({ commit }) {
      const { data: res } = await shopCartList()
      commit('SHOPCARTLIST', res.data)
    },
    async changeCart ({ commit }, { skuId, isChecked }) {
      const {
        data: res
      } = await checkCart(skuId, isChecked)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
    changAll ({ getters, dispatch }, value) {
      const promiseAll = []
      getters.shopCartList.cartInfoList.forEach((item) => {
        const promises = dispatch('changeCart', { skuId: item.skuId, isChecked: value })
        promiseAll.push(promises)
      })
      return Promise.all(promiseAll)
    },
    async deleteCart ({ commit }, skuId) {
      const { data: res } = await deleteCart(skuId)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    },
    deleteAll ({ getters, dispatch }) {
      const promises = []
      getters.shopCartList.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          const promise = dispatch('deleteCart', item.skuId)
          promises.push(promise)
        }
      })
      return Promise.all(promises)
    }
  }
}
