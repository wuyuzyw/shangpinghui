import { http } from './http'
export default function (skuId) {
  return http({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}
