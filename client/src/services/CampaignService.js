import Api from '@/services/Api'

export default {
  fetchAll () {
    return Api().get('campaigns/')
  }
}
