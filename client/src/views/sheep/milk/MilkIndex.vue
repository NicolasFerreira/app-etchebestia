<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
      <MainTitle title="Production laitière"></MainTitle>

      <div class="top-milk-card">
        <router-link v-bind:to="{ name: 'MilkStats' }">
          <img class="icon" src="@/assets/stats.png">
        </router-link>

        <div class="div-num div-stats">
          <label class="label-form" for="totalCampaign">Campagne en cours : </label>
          <p id="totalCampaign">{{ this.totalCampaign }} L</p>
        </div>
        <div class="div-num div-stats">
          <label class="label-form" for="totalMonth">Mois en cours : </label>
          <p id="totalMonth">{{ this.totalMonth }} L</p>
        </div>

      </div>

      <div class="calendar-box">

        <v-calendar :attributes='attributes' @dayclick='dayClicked'>
        </v-calendar>

        <div v-if='selectedDay' class='selected-day'>
          <h4>{{ selectedDay.date.toLocaleDateString('fr-FR',{ year: 'numeric', month: 'long', day: 'numeric' }) }}</h4>
          <div id="newMilk" v-if="panel">
            <div class="create-milk" @click='createMilk()'>
              +
            </div>
            <div class="div-num div-milk" id="newDivMilk">
              <label class="label-form" for="quantity01">Quantité</label>
              <p id="quantity01">0 L</p>
            </div>

            <form @submit="storeMilk" class="display-none" id="storeMilk">
              <div class="div-num div-milk">
                <label class="label-form" for="quantity">Quantité</label>
                <input type="text" id="quantity" name="quantity" v-model="quantity" maxlength="3">L
              </div>
              <input type="submit" class="btn-submit" name="ajouter" value="Ajouter">
            </form>
          </div>
          <div v-for='milk in prodTotalMilk' :key='milk.key' v-if=' formatDate(milk.date) ===  formatDate(selectedDay.date)'>
            {{ checkMilk() }}
            <div class="edit-milk" @click='editMilk(milk)'>
              <img class="icon" src="@/assets/edit.png">
            </div>
            <div id="divMilk" class="div-milk">
              <label class="label-form" for="showMilk">Quantité</label>
              <p v-if="milk.quantity" id="showMilk">{{ milk.quantity }} L</p>
              <p v-else id="showMilk">0 L</p>
            </div>

            <form @submit="updateMilk" class="display-none" id="updateMilk">
              <div class="div-num div-milk">
                <label class="label-form" for="quantity">Quantité</label>
                <input type="text" id="quantity" name="quantity" v-model="quantity" maxlength="3">L
              </div>
              <div class="button-bottom">
                <div class="btn-submit btn-milk btn-del" v-on:click.stop.prevent="toggleModal()">Supprimer</div>
                <input type="submit" class="btn-submit btn-milk" name="sauvegarder" value="Sauvegarder">
              </div>

            </form>

            <div id="modal" class="modal display-none" v-on:click.self="toggleModal()">
              <div class="modal-box">
                <p class="modal-body">Etes vous sûr de vouloir supprimer le relevé du {{ formatDate(milk.date) }} ?</p>

                <div class="modal-bottom">
                  <div v-on:click.stop.prevent="toggleModal()">Annuler</div>
                  <div class="modal-del" v-on:click.stop.prevent="deleteMilk(milk._id)">Supprimer</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </main>

  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'

import MilkService from '@/services/MilkService'
import CampaignService from '@/services/CampaignService'

export default {
  mixins: [checkAuth],
  name: 'MilkIndex',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      selectedDay: null, // Add state to store selected day
      selectedCampaign: null,
      actualCampaign: null,
      selectedMonth: null,
      prodTotalMilk: [],
      quantity: null,
      campaign: null,
      totalMonth: null,
      totalCampaign: null,
      panel: false,
      campaigns: [],
      attributes: [
        {
          key: 'milkAll',
          highlight: {
            backgroundColor: '#fff',
            borderColor: '#2FC86D',
            borderWidth: '2px',
            borderStyle: 'solid'
          },
          contentStyle: {},
          dates: []
        },
        {
          key: 'milkDaySelected',
          highlight: {
            backgroundColor: '#2FC86D',
            borderColor: '#2FC86D',
            borderWidth: '2px',
            borderStyle: 'solid'
          },
          contentStyle: {
            color: 'white'
          },
          dates: []
        }
      ]
    }
  },
  mounted () {
    this.dateToday() // init selectedMonth and year for display totalsMilk && recup all campaigns
    this.getMilk()
  },
  methods: {
    async dateToday () {
      this.check()
      // fetch all campaigns and state this.capaigns
      const response = await CampaignService.fetchAll()
      this.campaigns = response.data.campaigns

      // today date for check stat with actual campaign
      let today = new Date()

      for (let i = 0; i < this.campaigns.length; i++) {
        if (
          this.formatDate(this.campaigns[i].date_start) <
            this.formatDate(today) &&
          this.formatDate(this.campaigns[i].date_end) > this.formatDate(today)
        ) {
          console.log('campagne actuelle : ' + this.campaigns[i].name)
          this.actualCampaign = this.campaigns[i].name
        }
      }

      // change states of selectedCampaign and selectedMonth for stats
      this.selectedMonth = JSON.stringify(today).substr(6, 2) // example : 08
      this.selectedCampaign = JSON.stringify(today).substr(1, 4) // example 2018

      /* console.log(this.selectedMonth)
        console.log(this.selectedCampaign) */
    },
    async getMilk () {
      this.check()
      const response = await MilkService.fetchMilk()
      this.prodTotalMilk = response.data.milkTotal

      // put all dates inside an array for attributes of v-calendar and display highlights
      var temp = []
      this.prodTotalMilk.forEach(function (prod) {
        temp.push(prod.date)
      })
      this.attributes[0].dates = temp

      // total milk for the selected Year and month
      var totalCampaign = 0
      var totalMonth = 0
      for (var i = this.prodTotalMilk.length - 1; i >= 0; i--) {
        /* console.log(JSON.parse(JSON.stringify(this.formatDate(this.prodTotalMilk[i].date).substr(0, 4)))) */
        if (this.prodTotalMilk[i].campaign === this.actualCampaign) {
          totalCampaign += this.prodTotalMilk[i].quantity
        }
        if (
          this.formatDate(this.prodTotalMilk[i].date).substr(5, 2) ===
            this.selectedMonth &&
          this.formatDate(this.prodTotalMilk[i].date).substr(0, 4) ===
            this.selectedCampaign
        ) {
          totalMonth += this.prodTotalMilk[i].quantity
        }
        /* console.log(this.formatDate(this.prodTotalMilk[i].date).substr(5, 2)) */
      }

      this.totalCampaign = totalCampaign
      this.totalMonth = totalMonth
      /* console.log('totalCampaign = '+totalCampaign)
        console.log('totalMonth = '+totalMonth) */
    },
    createMilk () {
      this.check()
      this.dateMilk = this.formatDate(this.selectedDay.date)
      this.quantity = null
      document.getElementById('newDivMilk').classList.toggle('display-none')
      document.getElementById('storeMilk').classList.toggle('display-none')
    },
    async storeMilk (e) {
      this.check()
      e.preventDefault()
      await MilkService.addMilk({
        date: this.dateMilk,
        quantity: this.quantity,
        campaign: this.campaign
      })
      this.getMilk()
      console.log(
        'Action : Ajout de la prod du ' +
          this.formatDate(this.dateMilk) +
          ' dans la bdd'
      )
    },
    editMilk (milk) {
      this.check()
      this.idMilk = milk._id
      this.dateMilk = milk.date
      this.quantity = milk.quantity
      document.getElementById('divMilk').classList.toggle('display-none')
      document.getElementById('updateMilk').classList.toggle('display-none')
    },
    async updateMilk (e) {
      this.check()
      e.preventDefault()
      await MilkService.updateMilk({
        id: this.idMilk,
        date: this.dateMilk,
        quantity: this.quantity,
        campaign: this.campaign
      })
      // console.log(response)
      this.getMilk()
      document.getElementById('divMilk').classList.toggle('display-none')
      document.getElementById('updateMilk').classList.toggle('display-none')

      console.log(
        'Action : Modifcation de la prod du ' +
          this.formatDate(this.dateMilk) +
          ' dans la bdd'
      )
    },
    async deleteMilk (id) {
      this.check()
      await MilkService.deleteMilk(id)
      this.getMilk()

      // reset value selected
      this.attributes[1].dates = []
      this.selectedDay = null

      console.log('Action : Suppression de la prod ' + id + ' dans la bdd')
    },
    dayClicked (day) {
      this.selectedDay = day
      // add selected date to attributes for design the selected day
      this.attributes[1].dates = this.selectedDay.date
      /* console.log(JSON.parse(JSON.stringify(this.selectedDay))) */

      // change states of selectedCampaign and selectedMonth fot stats
      // this.selectedMonth = JSON.stringify(day.date).substr(6, 2) // example : 08
      // this.selectedCampaign = JSON.stringify(day.date).substr(1, 4)   // example 2018

      // pass the value on true for display the edit panel and hide the add panel
      this.panel = true

      // recup campaign name for the selected day
      for (let i = 0; i < this.campaigns.length; i++) {
        if (
          this.formatDate(this.campaigns[i].date_start) <=
            this.formatDate(this.selectedDay.date) &&
          this.formatDate(this.campaigns[i].date_end) >=
            this.formatDate(this.selectedDay.date)
        ) {
          console.log(this.campaigns[i].name)
          this.campaign = this.campaigns[i].name
        }
      }
    },
    checkMilk () {
      // pass the value on true for hide the edit panel and display the add panel
      this.panel = false
    },
    formatDate (dateToFormate) {
      // Formating the output date
      var date = new Date(dateToFormate)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var dt = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }

      dateToFormate = year + '-' + month + '-' + dt

      return dateToFormate
    },
    toggleModal () {
      document.getElementById('modal').classList.toggle('display-none')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.top-milk-card {
  background: white;
  border: none;
  padding: 20px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
  width: 85vw;
  margin: 20px auto;
}

.top-milk-card img {
  width: 25px;
  position: absolute;
  right: 10vw;
  cursor: pointer;
}

.div-stats {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 15px auto;
}

.div-stats label {
  width: 50%;
  padding-left: 10px;
  font-size: 0.8em;
}

.div-stats p {
  margin: 0;
}

/* calendar style */

.c-pane-container {
  background: white;
  border: none;
  padding: 20px 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
  width: 90vw;
  margin: auto;
}

.selected-day {
  width: 90vw;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 20px auto;
  border-radius: 15px;
  padding: 10px 0;
  padding-bottom: 30px;
}

.selected-day h4 {
  text-align: left;
  padding: 0 20px;
  font-size: 0.8rem;
  color: #2fc86d;
}

.edit-milk .icon {
  width: 25px;
  position: absolute;
  right: 10vw;
  margin-top: -45px;
  cursor: pointer;
}

.div-milk {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
}

.div-milk p {
  padding: 0;
  margin: 0;
  width: 50vw;
  text-align: center;
  font-weight: bolder;

  font-size: 1.2rem;
}

.div-milk input {
  width: 50px;
}

.div-num.div-milk label {
  width: 40%;
}

#newMilk .div-num.div-milk {
  margin: 0;
}

#newMilk p {
  text-align: left;
}

.create-milk {
  color: #2fc86d;
  position: absolute;
  right: 10vw;
  font-size: 2.5rem;
  margin-top: -50px;
  cursor: pointer;
}

.btn-milk {
  width: 40%;
  font-size: 0.8rem;
  padding: 10px 20px;
  margin: 0;
}

.btn-del {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  background: white;
  color: #2fc86d;
  border: 2px solid #2fc86d;
}

#updateMilk .button-bottom {
  display: flex;
  justify-content: space-around;
}

@media all and (min-width: 800px) {
  .top-milk-card {
    width: 330px;
    margin: 10px 30px;
    border-radius: 5px;
  }
  .c-pane-container {
    width: 450px;
    margin: 30px;
    display: flex !important;
    border-radius: 5px;
  }
  .calendar-box {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .selected-day {
    width: 300px;
    border-radius: 5px;

  }
  .edit-milk .icon{
    position: initial;
    margin-left: 230px;
    margin-bottom: 30px;
  }
  .create-milk {
    position: initial;
    margin-left: 230px;
  }
  #newMilk p {
    text-align: center;
  }
}
</style>
