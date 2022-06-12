import Vue from 'vue'
import VueRouter from 'vue-router'
import MyHome from '../views/Home'
import SearchSelect from '../views/Search'
import Detail from '@/views/Detail'
import addCartSuccess from '@/views/AddCartSuccess'
import shopCart from '@/views/ShopCart'
import Login from '@/views/Login'
import Register from '@/views/Register'
import store from '@/store/index'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'

Vue.use(VueRouter)
// 重写push和replace方法，使其不会报错。（当编程式导航的路由参数不发生变化，连续点击会报错，但不会影响代码执行）
const locationPush = VueRouter.prototype.push
const locationReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    locationPush.call(this, location, resolve, reject)
  } else {
    locationPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    locationReplace.call(this, location, resolve, reject)
  } else {
    locationReplace.call(this, location, () => {}, () => {})
  }
}
const routes = [
  { path: '/', meta: { title: '尚品汇首页', show: true }, component: MyHome, name: 'home' },
  { path: '/search/:keyword?', component: SearchSelect, meta: { title: '搜索', show: false }, name: 'search' },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: {
      title: '详情',
      show: false
    },
    name: 'detail'
  }, {
    path: '/addcartsuccess',
    name: 'addcart',
    component: addCartSuccess,
    meta: { title: '添加展示', hide: true }
  }, {
    path: '/shopcart',
    component: shopCart,
    meta: { title: '购物车', hide: true },
    name: 'shopcart'
  }, {
    path: '/login',
    component: Login,
    meta: { hide: true, title: '登入' }
  }, {
    path: '/register',
    component: Register,
    meta: {
      hide: true,
      title: '注册'
    }
  }, {
    path: '/trade',
    component: Trade,
    meta: {
      title: '交易',
      hide: true
    }
  }, {
    path: '/pay',
    component: Pay,
    meta: {
      title: '支付',
      hide: true
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }

})
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('user/userInfo')
          next()
        } catch (error) {
          await store.dispatch('user/loginOut')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router
