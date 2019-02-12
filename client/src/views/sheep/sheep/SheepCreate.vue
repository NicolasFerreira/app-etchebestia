<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
      <MainTitle title="Ajouter une brebis"></MainTitle>
      <form @submit="storeSheep">
        <div class="form-add">
          <div class="div-num">
            <label class="label-form" id="id_work">Numéro de travail</label>
            <input type="text" id="id_work" name="id_work" v-model="id_work" maxlength="5" placeholder="00000">
          </div>

          <!-- <div class="div-num">
         <label class="label-form" id="id_national">Numéro National</label>
         <input type="text" id="id_national" name="id_national" v-model="id_national" placeholder="FR---">
       </div> -->

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
            <p class="label-form">Categorie</p>
            <div class="cat-flex">
              <input type="radio" id="agnelles" name="category" v-bind:value="'agnelles'" v-model="category" />
              <label for="agnelles">Agnelles</label>

              <input type="radio" id="alatraite" name="category" v-bind:value="'à la traite'" v-model="category" />
              <label for="alatraite">À la traite</label>

              <input type="radio" id="bildostun" name="category" v-bind:value="'bildostun'" v-model="category" />
              <label for="bildostun">Bildostun</label>

              <input type="radio" id="pleinesNulles" name="category" v-bind:value="'pleines/nulles'" v-model="category" />
              <label for="pleinesNulles">Pleines / Nulles</label>

              <input type="radio" id="uhartia" name="category" v-bind:value="'uhartia'" v-model="category" />
              <label for="uhartia">Uhartia</label>
            </div>
          </div>

          <div class="div-num">
            <label class="label-form" id="comments">Commentaires</label>
            <input type="text" id="comments" name="comments" v-model="comments">
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
  name: 'SheepCreate',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_work: null,
      id_national: null,
      sexe: false,
      id_father: null,
      id_mother: null,
      birth_date: null,
      category: 'agnelles',
      comments: null,
      result: null
    }
  },
  methods: {
    async storeSheep (e) {
      e.preventDefault()
      this.check()
      await AnimalService.addAnimal({
        id_work: this.id_work,
        id_national: 'FR453738' + this.id_work,
        type: 'sheep',
        sexe: this.sexe,
        id_father: this.id_father,
        id_mother: this.id_mother,
        birth_date: this.birth_date,
        category: this.category,
        comments: this.comments
      })
      this.$router.push({ name: 'SheepIndex' })
      console.log('Action : Ajout brebis ' + this.id_work + ' dans la bdd')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
