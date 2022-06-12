import { http } from './http.js'
export default (phone, password, code) => http.post('/user/passport/register', { phone, password, code })
