<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
     <MainTitle title="Fiche individuelle brebis"></MainTitle>
     <div class="fiche">

      <router-link v-bind:to="{ name: 'SheepEdit' , params: { id: this.id_sheep } }">
        <img class="icon" src="@/assets/edit.png">
      </router-link>

      <div class="fiche-item">
       <label>Numéro de travail</label>
       <p class="fiche-result">{{ this.id_work }}</p>
     </div>

     <div class="fiche-item">
       <label>Numéro national</label>
       <p class="fiche-result">{{ this.id_national}}</p>
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
       <p class="fiche-date"><span>{{ this.day }}</span><span>{{ this.month }}</span><span>{{ this.year }}</span> </p>
     </div>

     <div class="fiche-item">
       <label>Categorie</label>
       <p class="fiche-result-rounded">{{this.category}}</p>
     </div>

     <div class="fiche-item">
       <label>Commentaires</label>
       <p class="fiche-result">{{ this.comments }}</p>
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
  name: 'SheepShow',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_sheep: '',
      id_work: '',
      id_national: '',
      birth_date: '',
      day: '',
      month: '',
      year: '',
      category: '',
      id_mother: '',
      id_father: '',
      sexe: '',
      comments: '',
      data: []
    }
  },
  mounted () {
    this.getLamb()
  },
  methods: {
    async getLamb () {
      this.check()
      const response = await AnimalService.getAnimal({
        id: this.$route.params.id
      })
      this.data = response.data
      this.id_sheep = response.data._id
      this.id_work = response.data.id_work
      this.id_national = response.data.id_national
      this.birth_date = response.data.birth_date
      this.for_sale = response.data.for_sale
      this.id_mother = response.data.id_mother
      this.id_father = response.data.id_father
      this.sexe = response.data.sexe
      this.category = response.data.category
      this.comments = response.data.comments

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
