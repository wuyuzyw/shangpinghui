import { http } from './http'
export default function (id) {
  return http.get('/item/' + id)
}
