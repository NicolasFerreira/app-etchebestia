<template>
  <div>
    <NavBar title=""></NavBar>
    <main>
      <MainTitle title="Météo"></MainTitle>

      <div class="weather">
        <div class="currentWeather">
          <h3>Suhescun</h3>
          <div v-if="this.currentWeather[0]">
            <!-- <img v-bind:src="'https://developer.accuweather.com/sites/default/files/' + this.formattedNumber(this.currentWeather[0].WeatherIcon) + '-s.png'"> -->
          <p class="currentTemp">{{ Math.round(this.currentWeather[0].Temperature.Metric.Value) }}<span>°</span></p>
          <p class="currentText">{{ this.currentWeather[0].WeatherText }}</p>
          </div>

          <ul class="weather-12hours">
            <li v-for="hour in this.forecasts12hours" v-bind:key="hour.EpochDateTime">
              <p class="date-time">{{ formatHour(hour.DateTime) }}</p>
              <img class="weather-icons" v-bind:src="'https://developer.accuweather.com/sites/default/files/' + formattedNumber(hour.WeatherIcon) + '-s.png'">
              <p class="temperature">{{ Math.round(hour.Temperature.Value) }}°</p>
            </li>
          </ul>

          <ul class="weather-5Days">
            <li v-for="day in this.forecasts5Days.DailyForecasts" v-bind:key="day.DateTime">
              <p class="date-time">{{ formatDate(day.Date) }}</p>
              <img class="weather-icons" v-bind:src="'https://developer.accuweather.com/sites/default/files/' + formattedNumber(day.Day.Icon) + '-s.png'">
              <p class="temperature"><span>{{ Math.round(day.Temperature.Maximum.Value) }}°</span> / {{Math.round(day.Temperature.Minimum.Value) }}°</p>
            </li>
          </ul>

        </div>

      </div>

        <h3>Carte Radar des pluies : </h3>
      <div id="weathermap">
        <div id="map" class="map">
        </div>
      </div>

      <div>
        <button class="btn-submit btn-weather" @click="satelliteMode()">Carte Satellite</button>
        <button class="btn-submit btn-weather" @click="normalMapMode()">Carte Plan</button>
      </div>

      <button class="btn-submit btn-weather" id="plus" @click="plus()">LECTURE</button>
      <button id="stop" @click="stop()" class="btn-submit btn-weather display-none">STOP</button>
      <p>{{ this.hour }}</p>
    </main>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'
import axios from 'axios'

import moment from 'moment-timezone'

import 'leaflet'
const L = window.L

export default {
  mixins: [checkAuth],
  name: 'Map',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {
      // weather datas
      apikey: 'vf4NCrCESrTYXuZAAlRML1OUusxwUeGD',
      currentWeather: [],
      forecasts12hours: [],
      forecasts5Days: [],
      // map rain datas
      timestamp: '',
      timestampTab: [],
      numberTimestamp: 12,
      hour: '',
      myVar: '',
      mymap: null,
      test: null,
      backgroundMap: null
    }
  },
  mounted () {
    this.initWeather()
    this.initTimeTab()
  },
  created () {
    let ckeditor1 = document.createElement('link')
    ckeditor1.setAttribute('rel', 'stylesheet')
    ckeditor1.setAttribute(
      'href',
      'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css'
    )
    document.head.appendChild(ckeditor1)
  },
  methods: {
    // Weather PART
    async initWeather () {
      var self = this
      var actualTime = Math.round((new Date().getTime()) / 1000)

      // verify if datas are in localstorage and if the timestamp is recent or not
      if (localStorage.getItem('currentWeather') !== null) {
        self.currentWeather = JSON.parse(localStorage.getItem('currentWeather'))
        self.forecasts12hours = JSON.parse(localStorage.getItem('forecasts12hours'))
        self.forecasts5Days = JSON.parse(localStorage.getItem('forecasts5Days'))

        var responseTime = self.currentWeather[0].EpochTime
        // console.log(actualTime - responseTime)
        if (actualTime - responseTime > 3600) {
          localStorage.removeItem('currentWeather')
          localStorage.removeItem('forecasts12hours')
          localStorage.removeItem('forecasts5Days')
          self.initWeather()
        }

      // if no datas in localstorage => request API
      } else {
        const currentWeather = await axios.get(
          'http://dataservice.accuweather.com/currentconditions/v1/162090?apikey=' +
          self.apikey +
          ' &language=fr-fr&metric=true'
        )
        // console.log('request current weather')
        localStorage.setItem('currentWeather', JSON.stringify(currentWeather.data))
        self.currentWeather = JSON.parse(localStorage.getItem('currentWeather'))

        const forecasts12hours = await axios.get(
          'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/162090?apikey=' +
          self.apikey +
          ' &language=fr-fr&metric=true'
        )
        // console.log('request forecats12hours')
        localStorage.setItem('forecasts12hours', JSON.stringify(forecasts12hours.data))
        self.forecasts12hours = JSON.parse(localStorage.getItem('forecasts12hours'))

        const forecasts5Days = await axios.get(
          'http://dataservice.accuweather.com/forecasts/v1/daily/5day/162090?apikey=' +
          self.apikey +
          ' &language=fr-fr&metric=true'
        )
        // console.log('request forecasts5Days')
        localStorage.setItem('forecasts5Days', JSON.stringify(forecasts5Days.data))
        self.forecasts5Days = JSON.parse(localStorage.getItem('forecasts5Days'))
      }

      console.log(JSON.parse(JSON.stringify(self.currentWeather)))
      console.log(JSON.parse(JSON.stringify(self.forecasts12hours)))
      console.log(JSON.parse(JSON.stringify(self.forecasts5Days)))
    },
    formattedNumber: function (number) {
      var result = ('0' + number).slice(-2)
      return result
    },
    formatHour: function (date) {
      var result = moment(date).format('HH:mm')
      return result
    },
    formatDate: function (date) {
      var result = moment(date).lang('fr').format('ddd DD MMM')
      return result
    },

    /// ////////////////////// PART MAP RAIN , SECOND PART /////////////////////////////
    async initTimeTab () {
      const response = await axios.get(
        'https://tilecache.rainviewer.com/api/maps.json'
      )
      this.timestampTab = response.data
      this.initMap()
    },
    async initMap () {
      var self = this
      document.getElementById('weathermap').innerHTML =
        "<div id='map' class='map'></div>"
      console.log('map init')
      console.log(self.timestampTab)
      self.timestamp = self.timestampTab[self.numberTimestamp]
      var date = new Date(self.timestamp * 1000)
      self.hour = 'Temps : ' + date.getHours() + ' h ' + date.getMinutes()

      this.mymap = L.map('map').setView([43.236193, -1.18609], 9)
      // var mymap = L.map('map').setView([44.447014, 1.434092], 9)
      L.marker([43.236193, -1.18609]).addTo(this.mymap)

      this.backgroundMap = L.tileLayer(
        'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        {
          // attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
          bounds: [[-75, -180], [81, 180]],
          apikey: 'choisirgeoportail',
          format: 'image/jpeg',
          style: 'normal'
        }
      ).addTo(this.mymap)

      this.test = L.tileLayer(
        'https://tilecache.rainviewer.com/v2/{type}/{timestamp}/{size}/{z}/{x}/{y}.png?color={numColor}',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          type: 'radar',
          timestamp: self.timestamp.toString(),
          size: '512',
          numColor: '1',
          opacity: '0.7'
        }
      ).addTo(this.mymap)
    },
    plus: function () {
      this.toggleBtn()

      var self = this
      this.myVar = setInterval(function () {
        if (self.numberTimestamp <= 11) {
          self.numberTimestamp++
        } else {
          self.numberTimestamp = 0
        }

        console.log(self.numberTimestamp)
        self.timestampTileGenerate()

        // document.getElementById('map').innerHTML = ''
        // document.getElementById('weathermap').innerHTML =
        //   "<div id='map' class='map'></div>"
        // self.initMap()
      }, 1000)
    },
    timestampTileGenerate: function () {
      var self = this
      self.timestamp = self.timestampTab[self.numberTimestamp]
      var date = new Date(self.timestamp * 1000)
      self.hour = 'Time : ' + date.getHours() + ' h ' + date.getMinutes()

      self.mymap.removeLayer(self.test)

      self.test = L.tileLayer(
        'https://tilecache.rainviewer.com/v2/{type}/{timestamp}/{size}/{z}/{x}/{y}.png?color={numColor}',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          type: 'radar',
          timestamp: self.timestampTab[self.numberTimestamp].toString(),
          size: '512',
          numColor: '1',
          opacity: '0.7'
        }
      ).addTo(self.mymap)
    },
    stop: function () {
      this.toggleBtn()
      clearInterval(this.myVar)
    },
    toggleBtn: function () {
      document.getElementById('plus').classList.toggle('display-none')
      document.getElementById('stop').classList.toggle('display-none')
    },
    satelliteMode: function () {
      this.backgroundMap = L.tileLayer(
        'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        {
          // attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
          bounds: [[-75, -180], [81, 180]],
          apikey: 'choisirgeoportail',
          format: 'image/jpeg',
          style: 'normal'
        }
      ).addTo(this.mymap)

      this.timestampTileGenerate()
    },
    normalMapMode: function () {
      this.backgroundMap = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      ).addTo(this.mymap)

      this.timestampTileGenerate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.weather {
  margin-bottom: 100px;
}
.currentTemp {
  font-size: 5rem;
  font-weight: bold;
  margin: 10px;
  color: #2fc86d;
}
.currentTemp span {
  position: absolute;
  font-size: 1.8rem;
}
.currentText {
  font-weight: bold;
  color: #2fc86d;
  margin-top: 0;
}
.weather-12hours {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-top: 50px;
  margin-bottom: 10px;
}
.weather-12hours li {
  border-right: 1px solid #ccc;
}
.weather-12hours .date-time {
  font-size:0.8rem;
  font-weight: bold;
}
.weather-12hours .temperature {
  font-size:1rem;
  font-weight: bold;
}

.weather-5Days {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.weather-5Days li {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin:5px 0;
  padding: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.weather-5Days .date-time,.weather-5Days .temperature span {
  font-weight: bold;
}

.weather-5Days .weather-icons {
  height: 30px;
}

/* MAP RAIN */
.map {
  width: 100vw;
  height: 50vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: auto;
}

.btn-weather{
  font-size:0.8rem;
  padding:10px;
  margin: 5px;
  border-radius: 5px;
}

@media all and (min-width: 800px) {
  .map {
    width: 700px;
    height: 450px;
  }
  .weather-12hours {
    margin:30px auto;
    width: -moz-fit-content;
    width: fit-content;
    overflow-x: hidden;
  }
  .weather-5Days {
    flex-direction: row;
    justify-content: center;
  }
  .weather-5Days li {
    flex-direction: column;
    padding: 20px 40px;
    margin:10px;
  }
}
</style>
