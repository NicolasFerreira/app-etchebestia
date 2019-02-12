<template>
  <div>
    <header>
    <NavBar title="Élevage Ovins"></NavBar>
    <nav class="nav-filter">
      <li id="li-all" @click="fitlerMenu('tous','li-all')" class="li-item li-active">Tous</li>
      <li id="li-agnelles" @click="fitlerMenu('agnelles','li-agnelles')" class="li-item">Agnelles</li>
      <li id="li-traite" @click="fitlerMenu('à la traite','li-traite')" class="li-item">À la traite</li>
      <li id="li-bildostun" @click="fitlerMenu('bildostun','li-bildostun')" class="li-item">Bildostun</li>
      <li id="li-pleines" @click="fitlerMenu('pleines/nulles','li-pleines')" class="li-item">Pleines/Nulles</li>
      <li id="li-uhartia" @click="fitlerMenu('uhartia','li-uhartia')" class="li-item">Uhartia</li>
    </nav>
    </header>
    <main>
      <div class="top-lamb-search">
        <MainTitle title="Liste des brebis"></MainTitle>

        <div class="filter-desktop">
          <label>Filtre :</label>
          <select v-model="tri" @click="filterFunction(tri)">
            <option value="tous">Tous</option>
            <option value="agnelles">Agnelles</option>
            <option value="à la traite">À la traite</option>
            <option value="bildostun">Bildostun</option>
            <option value="pleines/nulles">Pleines / Nulles</option>
            <option value="uhartia">Uhartia</option>
          </select>
        </div>

        <input class="search" type="text" v-model="search" name="searchSheep" placeholder="Recherche N°">
      </div>

      <div class="totalNumber">
        Total: {{ this.totalNumber }}
      </div>

      <table id="areaPDF">
        <tr class="table-head">
          <th valign="middle" @click="sort('id_work')">Numéro<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <!-- <th valign="middle" @click="sort('id_national')" class="desktop-item">N° National<img class="table-head-icon" v-bind:src='filtreImg'></th> -->
          <th valign="middle" @click="sort('sexe')">Sexe<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('id_father')" class="desktop-item">N° Père<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('id_mother')" class="desktop-item">N° Mère<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('birth_date')" class="desktop-item">Naissance<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('category')">Catégorie<img class="table-head-icon" v-bind:src='filtreImg'></th>
        </tr>
        <tr v-for="sheep in sortedSheep" class="table-item" v-bind:key="sheep._id">

          <td class="table-item-numero">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">{{ sheep.id_work }}</router-link>
          </td>

          <!-- <td class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">{{ sheep.id_national }}</router-link>
          </td> -->

          <td v-if="sheep.sexe">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">M</router-link>
          </td>
          <td v-else>
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">F</router-link>
          </td>

           <td v-if="sheep.id_father" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">{{ sheep.id_father }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }"> --- </router-link>
          </td>

          <td v-if="sheep.id_mother" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">{{ sheep.id_mother }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }"> --- </router-link>
          </td>

          <td v-if="sheep.birth_date" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">{{ formatDate(sheep.birth_date) }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }"> --- </router-link>
          </td>

          <td>
            <router-link v-bind:to="{ name: routeShow , params: { id: sheep._id } }">{{ sheep.category }}</router-link>
          </td>

        </tr>
      </table>
      <!-- <button class="btn-submit btn-dl" v-on:click.stop.prevent="dlPDF('brebis')">Télécharger</button> -->
      <button class="btn-submit btn-dl" v-on:click.stop.prevent="print()">Imprimer</button>
    </main>
    <BtnAdd route="SheepCreate"></BtnAdd>

    <h3 class="print-title">Liste brebis</h3>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import print from '@/components/mixins/print'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'
import BtnAdd from '@/components/BtnAdd'

import AnimalService from '@/services/AnimalService'

import filtreImg from '@/assets/filtre.png'

import moment from 'moment-timezone'

export default {
  mixins: [checkAuth, print],
  name: 'SheepIndex',
  loadjspdf: true,
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle,
    BtnAdd: BtnAdd
  },
  data () {
    return {
      sheep: [],
      sheepAll: [],
      search: '',
      currentSort: 'id_work',
      currentSortDir: 'asc',
      routeShow: 'SheepShow',
      filtreImg: filtreImg,
      tri: 'tous',
      totalNumber: 0
    }
  },
  mounted () {
    this.getSheep()
  },
  methods: {
    async getSheep () {
      this.check()
      const response = await AnimalService.fetchSheep()
      this.sheep = response.data.animals
      this.sheepAll = response.data.animals
      this.totalNumber = this.sheep.length
    },
    sort: function (s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    // Function filter : Menu => tous / a vendre / renouvellement
    fitlerMenu: function (option, id) {
      // css for class li-active (border bottom green)
      var filters = document.getElementsByClassName('li-active')
      filters[0].classList.remove('li-active')

      document.getElementById(id).classList.add('li-active')

      this.filterFunction(option)
    },
    filterFunction: function (option) {
      // fitlers gestion
      var sheepTemp = []
      this.sheep = this.sheepAll
      if (option !== 'tous') {
        this.sheep.forEach(function (shep) {
          if (shep.category === option) {
            // console.log(JSON.parse(JSON.stringify(shep)));
            sheepTemp.push(shep)
          }
        })
        this.sheep = sheepTemp
        this.totalNumber = sheepTemp.length
      } else {
        this.totalNumber = this.sheepAll.length
      }
    },
    filteredSheep: function () {
      return this.sheep.filter(lamb => {
        return lamb.id_work.match(this.search)
      })
    },
    // DATE FORMAT
    formatDate: function (date) {
      var result = moment(date).format('DD/MM/YYYY')
      return result
    }
  },
  computed: {
    sortedSheep: function () {
      return this.filteredSheep().sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="css">
.nav-filter {
  background: white;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: space-around;
  list-style: none;
  font-weight: bold;
  font-size: 0.7rem;
  overflow-x: scroll;
  padding-left: 46px;
}

.li-active {
  border-bottom: 2px solid #2fc86d;
}

.nav-filter li {
  padding: 5px 10px;
}

.btn-dl {
  font-size: 0.7rem;
  width: 100px;
  padding: 10px;
}

.filter-desktop {
  display: none;
}

.totalNumber {
  text-align: left;
  padding-left: 20px;
  padding-bottom: 5px;
  font-size: 0.7rem;
  font-weight: bold;
  margin-top: -15px;
}
@media all and (min-width: 800px) {
  .totalNumber {
    padding-left: 60px;
    font-size: 0.8rem;
  }
  .nav-filter {
    display: none;
  }
  .filter-desktop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .filter-desktop label {
    margin: 10px;
    font-weight: bold;
  }
  .filter-desktop select {
    -moz-appearance: button;
    appareance: button;
    background: white;
    border: 1px solid #ccc;
    padding: 5px 10px;
  }
  .top-lamb-search {
    justify-content: space-between;
  }
  .entete {
    width: 300px !important;
  }
  .btn-dl {
  border-radius: 5px;
  }
}
</style>
