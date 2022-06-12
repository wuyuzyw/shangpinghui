import { v4 as uuidv4 } from 'uuid'
export default function () {
  let uuId = localStorage.getItem('uuId')
  if (!uuId) {
    uuId = uuidv4()
    localStorage.setItem('uuId', uuId)
  }
  return uuId
}
