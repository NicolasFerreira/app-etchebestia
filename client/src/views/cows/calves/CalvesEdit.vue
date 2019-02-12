<template>
  <div>
    <NavBar title="Élevage Bovins"></NavBar>
    <main>
      <MainTitle title="Édition fiche individuelle"></MainTitle>

      <form @submit="updateCalve">
        <div class="form-add">

          <div class="btn-trash" v-on:click.stop.prevent="toggleModal()"><img class="icon-trash" src="@/assets/trash.png"> </div>

          <div class="div-num">
            <label class="label-form" id="id_work">Numéro de travail</label>
            <input type="text" id="id_work" name="id_work" v-model="id_work" maxlength="3" placeholder="000">
          </div>

          <div class="radio">
            <p class="label-form">Sexe</p>
            <div>
              <input type="radio" id="male" name="sexe" v-bind:value="true" v-model="sexe" />
              <label for="male">Male</label>

              <input type="radio" id="female" name="sexe" v-bind:value="false" v-model="sexe" />
              <label for="female">Femelle</label>
            </div>

          </div>

          <div class="parent">
            <div class="div-num">
              <label class="label-form" for="id_father">Numéro Père</label>
              <input type="text" id="id_father" name="id_father" v-model="id_father" maxlength="5" placeholder="00000">
            </div>

            <div class="div-num">
              <label class="label-form" for="id_mother">Numéro Mère</label>
              <input type="text" id="id_mother" name="id_mother" v-model="id_mother" maxlength="5" placeholder="00000">
            </div>
          </div>

          <div class="date">
            <label class="label-form" for="birth_date">Date de naissance</label>
            <input type="date" id="birth_date" name="birth_date" v-model="birth_date">
          </div>

          <div class="radio">
            <p class="label-form">Statut</p>
            <div>
              <input type="radio" id="vendre" name="for_sale" v-bind:value="true" v-model="for_sale" v-on:change="hideCowsBtn()" />
              <label for="vendre">À vendre</label>

              <input type="radio" id="renouv" name="for_sale" v-bind:value="false" v-model="for_sale" v-on:change="hideCowsBtn()" />
              <label for="renouv">Renouvellement</label>
            </div>
          </div>

        </div>

        <div class="btn-div-bot">
          <input id="btn-1" type="submit" class="btn-submit" name="sauvegarder" value="Sauvegarder">
          <router-link v-bind:to="{ name: 'CowsEdit' , params: { id: this.id_calve } }">
            <div id="btn-2" class="btn-submit btn-reverse display-none">Passage vache</div>
          </router-link>
        </div>
      </form>

    </main>

    <div id="modal" class="modal display-none" v-on:click.self="toggleModal()">
      <div class="modal-box">
        <p class="modal-body">Etes vous sûr de vouloir supprimer le {{ id_work }} ?</p>

        <div class="modal-bottom">
          <div v-on:click.stop.prevent="toggleModal()">Annuler</div>
          <div class="modal-del" v-on:click.stop.prevent="deleteCalve(id_calve)">Supprimer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'

import AnimalService from '@/services/AnimalService'

export default {
  mixins: [checkAuth],
  name: 'CalvesEdit',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_calve: null,
      id_work: null,
      sexe: null,
      id_father: null,
      id_mother: null,
      birth_date: null,
      for_sale: null,
      result: null
    }
  },
  mounted () {
    this.getCalve()
  },
  methods: {
    async getCalve () {
      this.check()
      const response = await AnimalService.getAnimal({
        id: this.$route.params.id
      })
      // console.log(response)
      this.data = response.data
      this.id_calve = response.data._id
      this.id_work = response.data.id_work
      this.birth_date = response.data.birth_date
      this.for_sale = response.data.for_sale
      this.id_mother = response.data.id_mother
      this.id_father = response.data.id_father
      this.sexe = response.data.sexe
      if (this.for_sale === false) {
        this.hideCowsBtn() // check the value for hide or not the CowsBtn
      }

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

      this.birth_date = year + '-' + month + '-' + dt
    },
    async updateCalve (e) {
      this.check()
      e.preventDefault()
      await AnimalService.updateAnimal({
        id: this.$route.params.id,
        id_work: this.id_work,
        sexe: this.sexe,
        id_father: this.id_father,
        id_mother: this.id_mother,
        birth_date: this.birth_date,
        for_sale: this.for_sale,
        type: 'calve'
      })
      // console.log(response)
      this.$router.push({ name: 'CalvesIndex' })
      console.log(
        'Action : Modifcation du veau ' + this.id_work + ' dans la bdd'
      )
    },
    async deleteCalve (id) {
      this.check()
      await AnimalService.deleteAnimal(id)
      this.$router.push({ name: 'CalvesIndex' })
      console.log(
        'Action : Suppression du veau ' + this.id_work + ' dans la bdd'
      )
    },
    toggleModal () {
      document.getElementById('modal').classList.toggle('display-none')
    },
    hideCowsBtn () {
      document.getElementById('btn-2').classList.toggle('display-none')
      document.getElementById('btn-1').classList.toggle('btn-toggle')
      document.getElementById('btn-2').classList.toggle('btn-toggle')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
