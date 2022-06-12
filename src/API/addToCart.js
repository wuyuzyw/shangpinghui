import { http } from './http'
export default function (skuID, skuNum) {
  return http.post(`/cart/addToCart/${skuID}/${skuNum}`)
}
