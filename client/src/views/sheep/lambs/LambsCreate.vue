<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
      <MainTitle title="Ajouter un Agneau"></MainTitle>
      <form @submit="storeLamb">
        <div class="form-add">
          <div class="div-num">
            <label class="label-form" id="id_temp">Numéro Provisoire</label>
            <input type="number" id="id_temp" name="id_temp" v-model="id_temp" maxlength="3" placeholder="000">
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
  name: 'LambsCreate',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_temp: null,
      sexe: true,
      id_father: null,
      id_mother: null,
      birth_date: null,
      for_sale: true,
      result: null
    }
  },
  methods: {
    async storeLamb (e) {
      e.preventDefault()
      this.check()
      await AnimalService.addAnimal({
        id_temp: this.id_temp,
        type: 'lamb',
        sexe: this.sexe,
        id_father: this.id_father,
        id_mother: this.id_mother,
        birth_date: this.birth_date,
        for_sale: this.for_sale
      })
      this.$router.push({ name: 'LambsIndex' })
      console.log(
        'Action : Ajout de l agneau ' + this.id_temp + ' dans la bdd'
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
