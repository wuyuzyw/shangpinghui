import { http } from './http'
export default function (data) {
  return http.post('/list', data)
}
