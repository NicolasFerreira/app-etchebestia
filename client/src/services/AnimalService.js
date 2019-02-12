import Api from '@/services/Api'

export default {
  fetchLambs () {
    return Api().get('animals/lambs')
    // return Api('GET', 'animals/lambs')
  },
  fetchSheep () {
    return Api().get('animals/sheep')
  },
  fetchCalves () {
    return Api().get('animals/calves')
  },
  fetchCows () {
    return Api().get('animals/cows')
  },

  addAnimal (params) {
    return Api().post('animals', params)
    // return Api('POST', 'animals', params)
  },

  updateAnimal (params) {
    return Api().put('animals/' + params.id, params)
  },

  getAnimal (params) {
    return Api().get('animals/' + params.id)
  },

  deleteAnimal (id) {
    return Api().delete('animals/' + id)
  }
}
