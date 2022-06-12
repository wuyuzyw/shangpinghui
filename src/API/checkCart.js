import { http } from './http'
export default function (skuId, isChecked) {
  return http.get(`cart/checkCart/${skuId}/${isChecked}`)
}
