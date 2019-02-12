<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
      <MainTitle title="Fiche individuelle agneau"></MainTitle>
      <div class="fiche">

        <router-link v-bind:to="{ name: 'LambsEdit' , params: { id: this.id_lamb } }">
          <img class="icon" src="@/assets/edit.png">
        </router-link>

        <div class="fiche-item">
          <label>Numéro provisoire</label>
          <p class="fiche-result">{{ this.id_temp }}</p>
        </div>

        <div class="fiche-item">
          <label>Sexe</label>
          <p v-if="this.sexe" class="fiche-result-rounded">Male</p>
          <p v-else class="fiche-result-rounded">Femelle</p>
        </div>

        <div class="fiche-item">
          <label>Numéro père</label>
          <p v-if="this.id_father === null" class="fiche-result"> ----- </p>
          <p v-else class="fiche-result">{{ this.id_father }}</p>
        </div>

        <div class="fiche-item">
          <label>Numéro mère</label>
          <p class="fiche-result">{{ this.id_mother }}</p>
        </div>

        <div class="fiche-item">
          <label>Date de naissance</label>
          <p class="fiche-date">
            <span>{{ this.day }}</span>
            <span>{{ this.month }}</span>
            <span>{{ this.year }}</span>
          </p>
        </div>

        <div class="fiche-item">
          <label>Statut</label>
          <p v-if="this.for_sale" class="fiche-result-rounded">À vendre</p>
          <p v-else class="fiche-result-rounded">Renouvellement</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'

import AnimalService from '@/services/AnimalService'

export default {
  mixins: [checkAuth],
  name: 'LambsShow',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_lamb: '',
      id_temp: '',
      birth_date: '',
      day: '',
      month: '',
      year: '',
      for_sale: '',
      id_mother: '',
      id_father: '',
      sexe: '',
      data: []
    }
  },
  mounted () {
    this.getLamb()
  },
  methods: {
    async getLamb () {
      const response = await AnimalService.getAnimal({
        id: this.$route.params.id
      })
      this.data = response.data
      this.id_lamb = response.data._id
      this.id_temp = response.data.id_temp
      this.birth_date = response.data.birth_date
      this.for_sale = response.data.for_sale
      this.id_mother = response.data.id_mother
      this.id_father = response.data.id_father
      this.sexe = response.data.sexe

      // Formating the output date
      var date = new Date(this.birth_date)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var dt = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }

      this.day = dt
      this.month = month
      this.year = year
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
