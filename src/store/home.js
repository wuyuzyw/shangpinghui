import getcategoryList from '@/API/categoryList'
import getBanner from '@/API/bannerLiost'
import getFloorList from '@/API/floorList'
export default {
  namespaced: true,
  state: {
    categoryList: [],
    mockBanner: [],
    FloorList: []
  },
  getters: {},
  mutations: {
    CATEGORYLIST (state, value) {
      state.categoryList = value
    },
    GETBANNERlIST (state, value) {
      state.mockBanner = value
    },
    GETFLOORLIST (state, value) {
      state.FloorList = value
    }
  },
  actions: {
    async categoryList (context) {
      const { data: categoryList } = await getcategoryList()
      categoryList.data.pop()
      context.commit('CATEGORYLIST', categoryList.data)
    },
    async mockBanner (context) {
      const { data: res } = await getBanner()
      context.commit('GETBANNERlIST', res.data)
    },
    async floor (context) {
      const { data: res } = await getFloorList()
      context.commit('GETFLOORLIST', res.data)
    }
  }
}
