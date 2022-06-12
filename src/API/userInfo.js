import { http } from './http'
export default () => http.get('user/passport/auth/getUserInfo')
