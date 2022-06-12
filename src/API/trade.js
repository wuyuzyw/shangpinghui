import { http } from './http'
export const tradeList = () => http.get('/order/auth/trade')
export const userAddress = () => http.get('/user/userAddress/auth/findUserAddressList')
export const orders = (tradeNo, data) => http.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
export const Order = (orderId) => http.get(`/payment/weixin/createNative/${orderId}`)
