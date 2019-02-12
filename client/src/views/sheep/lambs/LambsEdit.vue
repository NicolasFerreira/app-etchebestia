<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
      <MainTitle title="Édition fiche individuelle"></MainTitle>

      <form @submit="updateLamb">
        <div class="form-add">

          <div class="btn-trash" v-on:click.stop.prevent="toggleModal()"><img class="icon-trash" src="@/assets/trash.png"> </div>

          <div class="div-num">
            <label class="label-form" id="id_temp">Numéro Provisoire</label>
            <input type="text" id="id_temp" name="id_temp" v-model="id_temp" maxlength="3" placeholder="000">
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
              <input type="radio" id="vendre" name="for_sale" v-bind:value="true" v-model="for_sale" v-on:change="hideSheepBtn()" />
              <label for="vendre">À vendre</label>

              <input type="radio" id="renouv" name="for_sale" v-bind:value="false" v-model="for_sale" v-on:change="hideSheepBtn()" />
              <label for="renouv">Renouvellement</label>
            </div>
          </div>

        </div>

        <div class="btn-div-bot">
          <input id="btn-1" type="submit" class="btn-submit" name="sauvegarder" value="Sauvegarder">
          <router-link v-bind:to="{ name: 'SheepEdit' , params: { id: this.id_lamb } }">
            <div id="btn-2" class="btn-submit btn-reverse display-none">Passage brebis</div>
          </router-link>
        </div>
      </form>

    </main>

    <div id="modal" class="modal display-none" v-on:click.self="toggleModal()">
      <div class="modal-box">
        <p class="modal-body">Etes vous sûr de vouloir supprimer le {{ id_temp }} ?</p>

        <div class="modal-bottom">
          <div v-on:click.stop.prevent="toggleModal()">Annuler</div>
          <div class="modal-del" v-on:click.stop.prevent="deleteLamb(id_lamb)">Supprimer</div>
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
  name: 'LambsEdit',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_lamb: null,
      id_temp: null,
      sexe: null,
      id_father: null,
      id_mother: null,
      birth_date: null,
      for_sale: null,
      result: null
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
      // console.log(response)
      this.data = response.data
      this.id_lamb = response.data._id
      this.id_temp = response.data.id_temp
      this.birth_date = response.data.birth_date
      this.for_sale = response.data.for_sale
      this.id_mother = response.data.id_mother
      this.id_father = response.data.id_father
      this.sexe = response.data.sexe
      if (this.for_sale === false) {
        this.hideSheepBtn() // check the value for hide or not the SheepBtn
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
    async updateLamb (e) {
      this.check()
      e.preventDefault()
      await AnimalService.updateAnimal({
        id: this.$route.params.id,
        id_temp: this.id_temp,
        sexe: this.sexe,
        id_father: this.id_father,
        id_mother: this.id_mother,
        birth_date: this.birth_date,
        for_sale: this.for_sale,
        type: 'lamb'
      })
      // console.log(response)
      this.$router.push({ name: 'LambsIndex' })
      console.log(
        'Action : Modifcation de l agneau ' + this.id_temp + ' dans la bdd'
      )
    },
    async deleteLamb (id) {
      this.check()
      await AnimalService.deleteAnimal(id)
      this.$router.push({ name: 'LambsIndex' })
      console.log(
        'Action : Suppression de l agneau ' + this.id_temp + ' dans la bdd'
      )
    },
    toggleModal () {
      document.getElementById('modal').classList.toggle('display-none')
    },
    hideSheepBtn () {
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
