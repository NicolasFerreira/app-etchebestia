import Api from '@/services/Api'

export default {
  auth (datas) {
    return Api().post('/users/authenticate', datas)
  },
  check (datas) {
    return Api().post('/check', datas)
  },
  init () {
    return Api().post('/users/register')
  }
}
