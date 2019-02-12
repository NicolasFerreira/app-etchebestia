<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <nav class="nav-filter">
      <li id="li-all" @click="fitlerMenu('tous','li-all')" class="li-item li-active">Tous</li>
      <li id="li-forSale" @click="fitlerMenu('à vendre','li-forSale')" class="li-item">A vendre</li>
      <li id="li-renouv" @click="fitlerMenu('renouvellement','li-renouv')" class="li-item">Renouvellement</li>
    </nav>
    <main>
      <div class="top-lamb-search">
        <MainTitle title="Liste des agneaux"></MainTitle>

        <div class="filter-desktop">
          <label>Filtre :</label>
          <select v-model="tri" @click="filterFunction(tri)">
            <option value="tous">Tous</option>
            <option value="à vendre">À vendre</option>
            <option value="renouvellement">Renouvellement</option>
          </select>
        </div>

        <input class="search" type="text" v-model="search" name="searchLamb" placeholder="Recherche N°">
      </div>

      <div class="totalNumber">
        Total: {{ this.totalNumber }}
      </div>

      <table id="areaPDF">
        <tr class="table-head">
          <th valign="middle" @click="sort('id_temp')">Numéro<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('sexe')">Sexe<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('id_father')" class="desktop-item">N° Père<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('id_mother')" class="desktop-item">N° Mère<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('birth_date')" class="desktop-item">Naissance<img class="table-head-icon" v-bind:src='filtreImg'></th>
          <th valign="middle" @click="sort('for_sale')">Statut<img class="table-head-icon" v-bind:src='filtreImg'></th>
        </tr>
        <tr v-for="lamb in sortedLambs" class="table-item" v-bind:key="lamb._id">

          <td class="table-item-numero">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">{{ lamb.id_temp }}</router-link>
          </td>

          <td v-if="lamb.sexe">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">M</router-link>
          </td>
          <td v-else>
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">F</router-link>
          </td>

          <td v-if="lamb.id_father" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">{{ lamb.id_father }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }"> --- </router-link>
          </td>

          <td v-if="lamb.id_mother" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">{{ lamb.id_mother }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }"> --- </router-link>
          </td>

          <td v-if="lamb.birth_date" class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">{{ formatDate(lamb.birth_date) }}</router-link>
          </td>
          <td v-else class="desktop-item">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }"> --- </router-link>
          </td>

          <td v-if="lamb.for_sale">
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">À vendre</router-link>
          </td>
          <td v-else>
            <router-link v-bind:to="{ name: routeShow , params: { id: lamb._id } }">Renouv.</router-link>
          </td>
        </tr>
      </table>
      <!--   debug: sort={{currentSort}}, dir={{currentSortDir}} -->
      <button class="btn-submit btn-dl" v-on:click.stop.prevent="print()">Imprimer</button>
    </main>
    <BtnAdd route="LambsCreate"></BtnAdd>

    <h3 class="print-title">Liste agneaux</h3>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import print from '@/components/mixins/print'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'
import BtnAdd from '@/components/BtnAdd'

import filtreImg from '@/assets/filtre.png'

import AnimalService from '@/services/AnimalService'

import moment from 'moment-timezone'

export default {
  mixins: [checkAuth, print],
  name: 'LambsIndex',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle,
    BtnAdd: BtnAdd
  },
  data () {
    return {
      lambs: [],
      lambsAll: [],
      search: '',
      currentSort: 'id_temp',
      currentSortDir: 'asc',
      routeShow: 'LambsShow',
      filtreImg: filtreImg,
      tri: 'tous',
      totalNumber: 0
    }
  },
  mounted () {
    this.getLambs()
  },
  methods: {
    async getLambs () {
      this.check()
      const response = await AnimalService.fetchLambs()
      this.lambs = response.data.animals
      this.lambsAll = response.data.animals
      this.totalNumber = this.lambs.length
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
      var lambsForSaleTrue = []
      var lambsForSaleFalse = []
      this.lambs = this.lambsAll

      this.lambs.forEach(function (lamb) {
        if (lamb.for_sale === true) {
          // console.log(JSON.parse(JSON.stringify(lamb)));
          lambsForSaleTrue.push(lamb)
        } else {
          lambsForSaleFalse.push(lamb)
        }
      })

      if (option === 'tous') {
        this.lambs = this.lambsAll
      } else if (option === 'à vendre') {
        this.lambs = lambsForSaleTrue
      } else {
        this.lambs = lambsForSaleFalse
      }
      this.totalNumber = this.lambs.length
    },
    filteredLambs: function () {
      return this.lambs.filter(lamb => {
        return lamb.id_temp.match(this.search)
      })
    },
    // DATE FORMAT
    formatDate: function (date) {
      var result = moment(date).format('DD/MM/YYYY')
      return result
    }
  },
  computed: {
    sortedLambs: function () {
      return this.filteredLambs().sort((a, b) => {
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

.btn-dl {
  font-size: 0.7rem;
  width: 100px;
  padding: 10px;
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
