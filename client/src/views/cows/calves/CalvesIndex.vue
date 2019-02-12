<template>
  <div>
    <NavBar title="Élevage Bovins"></NavBar>
    <nav class="nav-filter">
      <li id="li-all" @click="fitlerMenu('tous','li-all')" class="li-item li-active">Tous</li>
      <li id="li-forSale" @click="fitlerMenu('à vendre','li-forSale')" class="li-item">A vendre</li>
      <li id="li-renouv" @click="fitlerMenu('renouvellement','li-renouv')" class="li-item">Renouvellement</li>
    </nav>
    <main>
     <div class="top-lamb-search">
        <MainTitle title="Liste des veaux"></MainTitle>

        <div class="filter-desktop">
          <label>Filtre :</label>
          <select v-model="tri" @click="filterFunction(tri)">
            <option value="tous">Tous</option>
            <option value="à vendre">À vendre</option>
            <option value="renouvellement">Renouvellement</option>
          </select>
        </div>

        <input class="search" type="text" v-model="search" name="searchCalve" placeholder="Recherche N°">
      </div>

     <table id="areaPDF">
        <tr class="table-head">
          <th valign="middle" @click="sort('id_work')">Numéro<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('sexe')">Sexe<img class="table-head-icon" v-bind:src='filtreImg'></th>
           <th valign="middle" @click="sort('id_father')" class="desktop-item">N° Père<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('id_mother')" class="desktop-item">N° Mère<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('birth_date')" class="desktop-item">Naissance<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('for_sale')">Statut<img class="table-head-icon" v-bind:src='filtreImg'></th>
        </tr>
        <tr v-for="calve in sortedCalves" class="table-item" v-bind:key="calve._id">

          <td class="table-item-numero">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">{{ calve.id_work }}</router-link>
          </td>

          <td v-if="calve.sexe">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">M</router-link>
          </td>
          <td v-else>
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">F</router-link>
          </td>

          <td v-if="calve.id_father" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">{{ calve.id_father }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }"> --- </router-link>
          </td>

          <td v-if="calve.id_mother" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">{{ calve.id_mother }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }"> --- </router-link>
          </td>

          <td v-if="calve.birth_date" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">{{ formatDate(calve.birth_date) }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }"> --- </router-link>
          </td>

          <td v-if="calve.for_sale">
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">À vendre</router-link>
          </td>
          <td v-else>
            <router-link v-bind:to="{ name: routeShow , params: { id: calve._id } }">Renouv.</router-link>
          </td>
        </tr>
      </table>
    <button class="btn-submit btn-dl" v-on:click.stop.prevent="print()">Imprimer</button>
    </main>
    <BtnAdd route="CalvesCreate"></BtnAdd>

    <h3 class="print-title">Liste veaux</h3>
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
  name: 'CalvesIndex',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle,
    BtnAdd: BtnAdd
  },
  data () {
    return {
      calves: [],
      calvesAll: [],
      search: '',
      currentSort: 'id_work',
      currentSortDir: 'asc',
      routeShow: 'CalvesShow',
      filtreImg: filtreImg,
      tri: 'tous'
    }
  },
  mounted () {
    this.getCalves()
  },
  methods: {
    async getCalves () {
      this.check()
      const response = await AnimalService.fetchCalves()
      console.log(response)
      this.calves = response.data.animals
      this.calvesAll = response.data.animals
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
      var self = this
      // fitlers gestion
      var calvesForSaleTrue = []
      var calvesForSaleFalse = []
      this.calves = this.calvesAll

      this.calves.forEach(function (calve) {
        if (calve.for_sale === true) {
          // console.log(JSON.parse(JSON.stringify(calve)));
          calvesForSaleTrue.push(calve)
        } else {
          calvesForSaleFalse.push(calve)
        }
      })

      if (option === 'tous') {
        self.calves = self.calvesAll
      } else if (option === 'à vendre') {
        self.calves = calvesForSaleTrue
      } else {
        self.calves = calvesForSaleFalse
      }
    },
    filteredCalves: function () {
      return this.calves.filter(calve => {
        return calve.id_work.match(this.search)
      })
    },
    // DATE FORMAT
    formatDate: function (date) {
      var result = moment(date).format('DD/MM/YYYY')
      return result
    }
  },
  computed: {
    sortedCalves: function () {
      return this.filteredCalves().sort((a, b) => {
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
<style>
.nav-filter {
  background: white;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.23);
  display: flex;
  justify-content: space-around;
  list-style: none;
  font-weight: bold;
  font-size: 0.8rem;
}

.li-active {
  border-bottom: 2px solid #2fc86d;
}

.nav-filter li {
  padding: 5px 20px;
}

@media screen and (min-width: 800px) {
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
