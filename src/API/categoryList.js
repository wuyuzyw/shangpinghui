import { http } from './http'
export default function () {
  return http.get('/product/getBaseCategoryList')
}
