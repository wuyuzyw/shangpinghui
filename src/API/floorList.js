import { mock } from './http'
export default function () {
  return mock.get('/floor')
}
