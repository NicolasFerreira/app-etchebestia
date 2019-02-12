<template>
  <div>
    <NavBar title="Élevage Bovins"></NavBar>
    <main>
     <MainTitle title="Ajouter un veau"></MainTitle>

     <form @submit="storeCalve">
        <div class="form-add">
          <div class="div-num">
            <label class="label-form" id="id_work">Numéro de travail</label>
            <input type="number" id="id_work" name="id_work" v-model="id_work" maxlength="5" placeholder="00000">
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
              <input type="text" id="id_father" name="id_father" v-model="id_father" >
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
              <input type="radio" id="vendre" name="for_sale" v-bind:value="true" v-model="for_sale" />
              <label for="vendre">À vendre</label>

              <input type="radio" id="renouv" name="for_sale" v-bind:value="false" v-model="for_sale" />
              <label for="renouv">Renouvellement</label>
            </div>
          </div>

        </div>

        <input type="submit" class="btn-submit" name="ajouter" value="Ajouter">
      </form>

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
  name: 'CalvesCreate',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_work: null,
      sexe: true,
      id_father: null,
      id_mother: null,
      birth_date: null,
      for_sale: true,
      result: null
    }
  },
  methods: {
    async storeCalve (e) {
      e.preventDefault()
      this.check()
      await AnimalService.addAnimal({
        id_work: this.id_work,
        type: 'calve',
        sexe: this.sexe,
        id_father: this.id_father,
        id_mother: this.id_mother,
        birth_date: this.birth_date,
        for_sale: this.for_sale
      })
      this.$router.push({ name: 'CalvesIndex' })
      console.log(
        'Action : Ajout de l agneau ' + this.id_work + ' dans la bdd'
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
