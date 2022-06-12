import cartList from '@/API/cartList'
import addToCart from '@/API/addToCart'
import uuId from '@/Utils/uuId'
export default {
  namespaced: true,
  state: {
    detailList: {},
    uuId: uuId()
  },
  getters: {
    categoryView (state) {
      return state.detailList.categoryView || {}
    },
    price (state) {
      return state.detailList.price
    },
    skuInfo (state) {
      return state.detailList.skuInfo || {}
    },
    spuSaleAttrList (state) {
      return state.detailList.spuSaleAttrList
    }
  },
  mutations: {
    GETCARTLIST (state, data) {
      state.detailList = data
    }
  },
  actions: {
    async getCartList (context, id) {
      const { data: res } = await cartList(id)
      if (res.code === 200) {
        context.commit('GETCARTLIST', res.data)
      }
    },
    async addToCart (context, data) {
      const { data: res } = await addToCart(data.skuId, data.skuNum)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('failed'))
      }
    }
  }
}
