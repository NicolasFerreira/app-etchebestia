import Api from '@/services/Api'

export default {
  fetchMilk () {
    return Api().get('milk/')
  },

  addMilk (params) {
    return Api().post('milk', params)
  },

  updateMilk (params) {
    return Api().put('milk/' + params.id, params)
  },

  getMilk (params) {
    return Api().get('milk/' + params.id)
  },

  deleteMilk (id) {
    return Api().delete('milk/' + id)
  }
}
