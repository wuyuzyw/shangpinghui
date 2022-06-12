import { http } from './http'
export default (phone, password) => http.post('/user/passport/login', { phone, password })
