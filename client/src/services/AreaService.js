import Api from '@/services/Api'

export default {
  fetchArea () {
    return Api().get('areas/')
  },

  addArea (params) {
    return Api().post('areas', params)
  },

  updateArea (params) {
    return Api().put('areas/' + params.id, params)
  },

  getArea (params) {
    return Api().get('areas/' + params.id)
  },

  deleteArea (id) {
    return Api().delete('areas/' + id)
  },

  addProd (id, params) {
    return Api().put('areas/prod/push/' + id, params)
  },

  deleteProd (id, params) {
    return Api().put('areas/prod/pull/' + id, params)
  }
}
