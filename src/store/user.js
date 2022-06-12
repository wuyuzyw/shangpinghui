import userCode from '@/API/userCode'
import registerUser from '@/API/registerUser'
import login from '@/API/login'
import userInfo from '@/API/userInfo'
import { setToken, getToken, removeToken } from '@/Utils/token'
import loginOut from '@/API/loginOut'
export default {
  namespaced: true,
  state: {
    code: '',
    userInfo: {},
    token: getToken()
  },
  mutations: {
    GETCODE (state, code) {
      state.code = code
    },
    LOGIN (state, token) {
      state.token = token
    },
    USERINFO (state, data) {
      state.userInfo = data
    },
    CLEARUSERINFO (state) {
      state.userInfo = {}
      state.token = null
    }
  },
  actions: {
    async getCode ({ commit }, phone) {
      const { data: res } = await userCode(phone)
      if (res.code === 200) {
        commit('GETCODE', res.data)
      }
    },
    async registerUser ({ commit }, { phone, password, code }) {
      const { data: res } = await registerUser(phone, password, code)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async login ({ commit }, { phone, password }) {
      const { data: res } = await login(phone, password)
      if (res.code === 200) {
        setToken(res.data.token)
        commit('LOGIN', res.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userInfo ({ commit }) {
      const { data: res } = await userInfo()
      if (res.code === 200) {
        commit('USERINFO', res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async loginOut ({ commit }) {
      await loginOut()
      removeToken()
      commit('CLEARUSERINFO')
    }
  }
}
