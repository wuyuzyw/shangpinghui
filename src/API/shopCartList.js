import { http } from './http'
export default function () {
  return http.get('/cart/cartList')
}
