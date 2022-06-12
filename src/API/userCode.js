import { http } from './http'
export default (phone) => http.get(`/user/passport/sendCode/${phone}`)
