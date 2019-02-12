<template>
  <div>
    <NavBar title="Gestion des parcelles"></NavBar>
    <main>
      <MainTitle title="Carte des terrains"></MainTitle>
      <div class="map-field">
        <div id="fieldsmap">
          <div id="map" class="map">
          </div>
        </div>

        <div v-if="selectedArea && selectedArea.datas.type === 'Poly'" class="infos-area">
          <div class="infos-area-left">

            <label class="label-infos-area">Nom</label>
            <p v-if="!editModeInfos" class="texte-infos-area">{{ this.selectedArea.datas.name }}</p>
            <input v-else class="input-infos-area" type="text" id="name" name="name" v-model="name">

            <label class="label-infos-area">Surface</label>
            <p class="texte-infos-area">{{ this.selectedArea.datas.surface }} hectares</p>

            <label class="label-infos-area">Culture</label>
            <p v-if="!editModeInfos" class="texte-infos-area">{{ this.selectedArea.datas.culture }}</p>
            <input v-else class="input-infos-area" type="text" id="culture" name="culture" v-model="culture">

            <label class="label-infos-area">Productivité</label>
            <div v-if="editModeInfos" class="div-prod-add">
              <input type="number" id="balls" name="balls" class="input-infos-area" v-model="balls" maxlength="3" placeholder="nb boules">
              <input type="date" id="date" name="date" class="input-infos-area" v-model="date">
              <span v-on:click="createProd()" class="icon-prod">Ajouter</span>
            </div>

            <ul id="prod-list">
              <li v-for="prod in this.selectedArea.datas.productivity" v-bind:key="prod._id">
                <p class="item-prod">- {{ prod.balls }} boules le {{ formatDate(prod.date) }} </p>
                <span v-if="editModeInfos" v-on:click="deleteProd(prod._id)" class="icon-prod"> X </span>
              </li>
            </ul>

          </div>

          <div class="infos-area-right">
            <div class="close-infos-area" v-on:click="resetSelectedArea()">X</div>
            <div v-if="editModeMap">
              <div id="btn-editOff" class="btn-submit btn-map" v-on:click.stop.prevent="editArea(elemToEdit)">Sauvegarder la zone</div>
              <div class="btn-submit btn-map" v-on:click.stop.prevent="toggleModal()">Supprimer</div>
            </div>
            <div v-if="editModeInfos">
              <div id="btn-editOff" class="btn-submit btn-map" v-on:click.stop.prevent="updateInfos()">Sauvegarder les infos</div>
              <div class="btn-submit btn-map" v-on:click.stop.prevent="toggleModal()">Supprimer</div>
            </div>
            <div v-if="!editModeMap && !editModeInfos">
              <div id="btn-editOn" class="btn-submit btn-map" v-on:click.stop.prevent="editArea(elemToEdit)">Éditer carte</div>
              <div id="btn-editOn" class="btn-submit btn-map" v-on:click.stop.prevent="toggleEditInfos()">Éditer informations</div>
            </div>

          </div>

        </div>

        <div v-if="selectedArea && selectedArea.datas.type === 'Marker'" class="infos-area">
          <div class="infos-area-left">
            <label class="label-infos-area">Description</label>
            <p v-if="!editModeInfos">{{ this.selectedArea.datas.description }}</p>
            <input v-else class="input-infos-area" type="text" id="description" name="description" v-model="description">

            <label class="label-infos-area">Date d'ajout</label>
            <p>{{ this.formatDate(this.selectedArea.datas.date) }}</p>
            <!-- <input v-else type="date" id="date" name="date" class="input-infos-area" v-model="date"> -->

          </div>
          <div class="infos-area-right">
            <div class="close-infos-area" v-on:click="resetSelectedArea()">X</div>

            <div v-if="!editModeInfos">
              <div id="btn-editOn" class="btn-submit btn-map" v-on:click.stop.prevent="toggleEditInfos()">Éditer informations</div>
            </div>

            <div v-if="editModeInfos">
              <div id="btn-editOff" class="btn-submit btn-map" v-on:click.stop.prevent="updateInfos()">Sauvegarder les infos</div>
              <div class="btn-submit btn-map" v-on:click.stop.prevent="toggleModal()">Supprimer</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div id="modal" class="modal display-none" v-on:click.self="toggleModal()">
      <div class="modal-box">
        <p class="modal-body">Etes vous sûr de vouloir supprimer cet élément ?</p>

        <div class="modal-bottom">
          <div v-on:click.stop.prevent="toggleModal()">Annuler</div>
          <div v-if="selectedArea !== ''" class="map-modal-del">
            <div v-if="selectedArea.datas.type === 'Poly'" class="modal-del" v-on:click.stop.prevent="deleteArea(selectedArea.datas._id, elemToEdit)">Supprimer</div>
            <div v-if="selectedArea.datas.type === 'Marker'" class="modal-del" v-on:click.stop.prevent="deleteArea(selectedArea.datas._id)">Supprimer</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'

import AreaService from '@/services/AreaService'

import moment from 'moment-timezone'

// import icons
import greenIcon from '@/assets/greenIcon.png'
import markerShadow from '@/assets/marker-shadow.png'

// import leaflet dependencies
import 'leaflet'
import 'leaflet.pm/dist/leaflet.pm.min.js'
import 'leaflet.pm/dist/leaflet.pm.css'
import 'leaflet-measure'
import area from '@turf/area'
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
      mymap: '',
      selectedArea: '',
      elemToEdit: true,
      datas: [],
      elemTab: [],
      // infos to store
      name: null,
      shape: null,
      culture: null,
      surface: null,
      description: null,
      // input productivity
      balls: null,
      date: null,
      dateMarker: null,
      // edit Mode
      editModeMap: false,
      editModeInfos: false
    }
  },
  mounted () {
    this.getDatas()
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
    async fetchDatas () {
      const response = await AreaService.fetchArea()
      this.datas = response.data.areas
    },
    // fetch datas and init the map => draw all areas and markers
    async getDatas () {
      this.check()
      const response = await AreaService.fetchArea()
      this.datas = response.data.areas

      this.initMap()
    },
    initMap: function () {
      document.getElementById('fieldsmap').innerHTML =
        "<div id='map' class='map'></div>"
      var self = this
      var mymap = L.map('map').setView([43.236193, -1.18609], 15)

      this.mymap = mymap
      L.tileLayer(
        'https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
        {
          // attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
          bounds: [[-75, -180], [81, 180]],
          apikey: 'choisirgeoportail',
          format: 'image/jpeg',
          style: 'normal'
        }
      ).addTo(this.mymap)

      this.drawDatas()

      // // define toolbar options
      var options = {
        position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: true, // adds button to draw markers
        drawPolyline: false, // adds button to draw a polyline
        drawRectangle: false, // adds button to draw a rectangle
        drawPolygon: true, // adds button to draw a polygon
        drawCircle: false, // adds button to draw a cricle
        cutPolygon: false, // adds button to cut a hole in a polygon
        editMode: false, // adds button to toggle edit mode for all layers
        removalMode: false, // adds a button to remove layers
        finishOn: 'contextmenu'
      }

      // // add leaflet.pm controls to the map
      this.mymap.pm.addControls(options)

      // listen to when drawing mode gets enabled
      mymap.on('pm:drawstart', function (e) {
        self.selectedArea = ''
        if (self.elemToEdit !== null && e.shape === 'Poly') {
          self.elemToEdit.setStyle({ color: '#2FC86D' })
        }
      })

      // // listen to when a new layer is created
      this.mymap.on('pm:create', function (e) {
        self.storeArea(e)
      })

      // init edit mode all on off
      this.editModeMap = false
      this.editModeInfos = false

      // L.marker([43.236193, -1.18609], {opacity: '0.8'}).addTo(this.mymap) // Etchebestia Farm
    },
    drawDatas: function () {
      var self = this
      this.datas.forEach(data => {
        // Draw area ( polygons )
        if (data.type === 'Poly') {
          L.polygon(data.coords, {
            color: '#2FC86D',
            transition: '0.5s',
            datas: data
          })
            .on('click', function (elem) {
              self.selectedArea = elem.target.options
              self.elemToEdit = elem.sourceTarget
              console.log(elem.target.options)

              // reset edit mode
              self.editModeInfos = false
              self.editModeMap = false

              // preremplissage formulaire
              self.name = self.selectedArea.datas.name
              self.culture = self.selectedArea.datas.culture
              self.productivity = self.selectedArea.datas.productivity

              // function color active area and recolorize the last selectionned
              self.elemTab.push(elem.sourceTarget)
              self.elemTab.forEach(elem => {
                elem.setStyle({ color: '#2FC86D' }) // set the color of the last are selected to green
              })
              if (self.elemTab.length > 1) {
                self.elemTab = [self.elemToEdit]
              }
              self.elemToEdit.setStyle({ color: 'orange' })

              console.log(self.elemTab)
            })
            .addTo(this.mymap)
        }
        if (data.type === 'Marker') {
          var customIcon = new L.Icon({
            iconUrl: greenIcon,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
          // Draw markers

          L.marker([data.coords[0][0], data.coords[1][0]], {
            icon: customIcon,
            datas: data
          })
            .on('click', function (marker) {
              self.selectedArea = marker.target.options
              console.log(self.selectedArea)
              console.log('ceci est un marker')

              self.elemTab.forEach(elem => {
                elem.setStyle({ color: '#2FC86D' }) // set the color of the last are selected to green
              })

              // reset edit mode
              self.editModeInfos = false
              self.editModeMap = false

              // preremplissage formulaire
              self.description = self.selectedArea.datas.description
              self.dateMarker = self.selectedArea.datas.dateMarker

              // self.elemToEdit.setStyle({color: '#2FC86D'})
            })
            .addTo(self.mymap)
          console.log('ça passe')
        }
      })
    },
    async storeArea (e) {
      this.check()
      var coords = []
      var self = this

      if (e.shape === 'Poly') {
        self.shape = 'Poly'
        var temp = e.layer._latlngs[0]
        temp.forEach(element => {
          coords.push([element.lat, element.lng])
        })

        var surface = self.calcSurface(coords)
        self.surface = surface

        await AreaService.addArea({
          name: this.name,
          type: this.shape,
          culture: this.culture,
          surface: this.surface,
          coords: coords,
          productivity: []
        })
      } else {
        self.shape = 'Marker'
        coords = [e.layer._latlng.lat, e.layer._latlng.lng]

        await AreaService.addArea({
          name: this.name,
          type: this.shape,
          description: this.description,
          date: new Date(),
          coords: coords
        })
      }

      // console.log(response)
      this.getDatas()
    },
    async deleteArea (id, elemToDel) {
      this.check()
      await AreaService.deleteArea(id)

      // reinitialisation
      if (this.selectedArea.datas.type === 'Poly') {
        elemToDel.remove()
      }

      this.selectedArea = ''
      console.log('Action : Suppression Area ' + id + ' dans la bdd')
      this.getDatas()
      this.toggleModal()
    },
    editArea: function (polygonLayer) {
      var self = this
      this.toggleEditMap()
      polygonLayer.pm.toggleEdit()
      if (polygonLayer.pm.enabled()) {
        // Nothing here because nothing to do if true edition mode , just wait for save
        // console.log('en edition')
      } else {
        // udpate the new polygon => coordUpdated = tab with new coordinates
        var temp = polygonLayer.pm._markers[0]
        var coordsUpdated = []
        temp.forEach(elem => {
          coordsUpdated.push([elem._latlng.lat, elem._latlng.lng])
        })

        self.updateArea(coordsUpdated)
      }
    },
    async updateArea (coords) {
      this.check()

      var surface = this.calcSurface(coords)

      await AreaService.updateArea({
        id: this.selectedArea.datas._id,
        name: this.selectedArea.datas.name,
        type: this.selectedArea.datas.type,
        culture: this.selectedArea.datas.culture,
        surface: surface,
        coords: coords,
        productivity: this.selectedArea.datas.productivity
      })
      // console.log(response)
      this.selectedArea = ''

      // var surface = this.calcSurface(coords)
      // this.selectedArea = {surface: surface}

      this.getDatas()
    },
    calcSurface: function (latlngs) {
      const path = latlngs.map(latlng => [latlng[0], latlng[1]])
      var polygonArea = L.polygon(path)
      const sqMeters = area(polygonArea.toGeoJSON())
      const sqHectares = Number((sqMeters * 0.0001).toFixed(2))
      return sqHectares
    },
    // CRUD AREA INFOS
    async updateInfos () {
      console.log('Mise a jour opérationelle')

      if (this.selectedArea.datas.type === 'Poly') {
        await AreaService.updateArea({
          id: this.selectedArea.datas._id,
          name: this.name,
          type: this.selectedArea.datas.type,
          culture: this.culture,
          surface: this.selectedArea.datas.surface,
          coords: this.selectedArea.datas.coords,
          productivity: this.selectedArea.datas.productivity
        })
      } else {
        await AreaService.updateArea({
          id: this.selectedArea.datas._id,
          type: this.selectedArea.datas.type,
          description: this.description,
          date: this.selectedArea.datas.date,
          coords: this.selectedArea.datas.coords
        })
      }

      this.editModeInfos = false
      this.description = null

      await this.fetchDatas() // recup datas for update the list of prods

      // rewrite the interface with new datas for AJAX feature
      this.datas.forEach(data => {
        if (data._id === this.selectedArea.datas._id) {
          this.selectedArea.datas = data
        }
      })
    },

    // PRODUCTION PART
    async createProd () {
      await AreaService.addProd(this.selectedArea.datas._id, {
        productivity: {
          balls: this.balls,
          date: this.date
        }
      })
      await this.fetchDatas() // recup datas for update the list of prods

      // rewrite the interface with new datas for AJAX feature
      this.datas.forEach(data => {
        if (data._id === this.selectedArea.datas._id) {
          this.selectedArea.datas = data
        }
      })

      // reset input balls
      this.balls = 0
      this.date = 0
    },
    async deleteProd (id) {
      await AreaService.deleteProd(this.selectedArea.datas._id, { id: id })
      console.log('prod effacée')
      await this.fetchDatas()

      this.datas.forEach(data => {
        if (data._id === this.selectedArea.datas._id) {
          this.selectedArea.datas = data
        }
      })
    },

    // Toggle Edit mode inside informations box
    toggleEditMap: function () {
      this.editModeMap = !this.editModeMap
    },
    toggleEditInfos: function () {
      this.editModeInfos = !this.editModeInfos
    },
    // DATE FORMAT
    formatDate: function (date) {
      var result = moment(date).format('DD MMM YYYY')
      return result
    },
    dateTimezone: function (date) {
      var result = moment(date).format(' HH:mm , MMM DD YYYY')
      return result
    },
    // RESET SELECTED AREA
    resetSelectedArea: function () {
      if (this.selectedArea.datas.type === 'Poly') {
        this.elemToEdit.setStyle({ color: '#2FC86D' })
      }
      this.selectedArea = ''
    },
    // MODAL DELETE TOGGLE
    toggleModal () {
      document.getElementById('modal').classList.toggle('display-none')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.map {
  width: 100vw;
  height: 50vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: auto;
}
.infos-area {
  background: white;
  width: 80vw;
  font-size: 0.8rem;
  margin: 10px auto;
  z-index: 3000;
  padding: 20px;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.infos-area-left {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 200;
}
.btn-map {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  margin: 5px auto;
  font-size: 0.8rem;
  border-radius: 2px;
}
.leaflet-interactive {
  transition: 0.2s;
}
.icon-prod {
  background: #2fc86d;
  color: white;
  font-size: 0.8rem;
  margin: 2px 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  font-weight: bold;
  cursor: pointer;
  /* width: 40px;
  height: 20px; */
  border-radius: 2px;
}
.item-prod {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.label-infos-area {
  color: #2fc86d;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 5px;
}
.input-infos-area {
  width: 80px;
  border: 2px solid #2fc86d;
  padding: 5px;
}
.texte-infos-area {
  margin-top: 10px;
  margin-bottom: 15px;
  font-weight: bold;
  padding-left: 10px;
}
.div-prod-add {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 300px;
}
input#date {
  width: 125px;
}
ul {
  list-style: none;
}
ul#prod-list {
  padding-left: 10px;
}
ul#prod-list li {
  display: flex;
  align-items: center;
  width: 160%;
}
.close-infos-area {
  color: #2fc86d;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: end;
  margin-top: -9px;
  cursor: pointer;
}
.map-modal-del {
  padding: 0 !important;
}
.map-modal-del .modal-del {
  width: 100%;
}

@media all and (min-width: 800px) {
  .map-field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .map {
    width: 700px;
    height: 450px;
  }
  .infos-area {
    width: 300px;
  }

}
</style>
