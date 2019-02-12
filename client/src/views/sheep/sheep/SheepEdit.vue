<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
     <MainTitle title="Édition fiche individuelle"></MainTitle>

     <form @submit="updateSheep">
      <div class="form-add">

       <div class="btn-trash" v-on:click.stop.prevent="toggleModal()"><img class="icon-trash" src="@/assets/trash.png"> </div>

       <div class="div-num">
         <label class="label-form" id="id_work">Numéro de travail</label>
         <input type="text" id="id_work" name="id_work" v-model="id_work" maxlength="5" placeholder="00000">
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
      <input type="date" id="birth_date" name="birth_date" v-model="birth_date" >
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
     <input type="text" id="comments" name="comments" v-model="comments" >
   </div>

 </div>

 <input type="submit" class="btn-submit" name="sauvegarder" value="Sauvegarder">
</form>

</main>

<div id="modal" class="modal display-none" v-on:click.self="toggleModal()">
  <div class="modal-box">
    <p class="modal-body">Etes vous sûr de vouloir supprimer le {{ id_work }} ?</p>

    <div class="modal-bottom">
      <div v-on:click.stop.prevent="toggleModal()">Annuler</div>
      <div class="modal-del" v-on:click.stop.prevent="deleteSheep(id_sheep)">Supprimer</div>
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
  name: 'SheepEdit',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      id_work: null,
      id_national: null,
      sexe: null,
      id_father: null,
      id_mother: null,
      birth_date: null,
      category: null,
      comments: null,
      result: null
    }
  },
  mounted () {
    this.getSheep()
  },
  methods: {
    async getSheep () {
      this.check()
      const response = await AnimalService.getAnimal({
        id: this.$route.params.id
      })
      // console.log(response)
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

      this.birth_date = year + '-' + month + '-' + dt
    },
    async updateSheep (e) {
      this.check()
      e.preventDefault()
      await AnimalService.updateAnimal({
        id: this.$route.params.id,
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
      // console.log(response)
      this.$router.push({ name: 'SheepIndex' })
      console.log('Action : Modifcation brebis ' + this.id_work + ' dans la bdd')
    },
    async deleteSheep (id) {
      this.check()
      await AnimalService.deleteAnimal(id)
      this.$router.push({ name: 'SheepIndex' })
      console.log('Action : Suppression brebis ' + this.id_work + ' dans la bdd')
    },
    toggleModal () {
      document.getElementById('modal').classList.toggle('display-none')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
