import Vue from 'vue'
import Router from 'vue-router'
import { routerHistory, writeHistory } from 'vue-router-back-button'

import Init from '@/views/Init'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'

// Module Ovins
import SheepMenu from '@/views/sheep/SheepMenu'

import SheepIndex from '@/views/sheep/sheep/SheepIndex'
import SheepShow from '@/views/sheep/sheep/SheepShow'
import SheepCreate from '@/views/sheep/sheep/SheepCreate'
import SheepEdit from '@/views/sheep/sheep/SheepEdit'

import LambsIndex from '@/views/sheep/lambs/LambsIndex'
import LambsShow from '@/views/sheep/lambs/LambsShow'
import LambsCreate from '@/views/sheep/lambs/LambsCreate'
import LambsEdit from '@/views/sheep/lambs/LambsEdit'

import MilkIndex from '@/views/sheep/milk/MilkIndex'
import MilkStats from '@/views/sheep/milk/MilkStats'

// Module Bovins
import CowsMenu from '@/views/cows/CowsMenu'

import CalvesIndex from '@/views/cows/calves/CalvesIndex'
import CalvesShow from '@/views/cows/calves/CalvesShow'
import CalvesCreate from '@/views/cows/calves/CalvesCreate'
import CalvesEdit from '@/views/cows/calves/CalvesEdit'

import CowsIndex from '@/views/cows/cows/CowsIndex'
import CowsShow from '@/views/cows/cows/CowsShow'
import CowsCreate from '@/views/cows/cows/CowsCreate'
import CowsEdit from '@/views/cows/cows/CowsEdit'

import GestationIndex from '@/views/cows/gestation/GestationIndex'

// Other modules
import AreasMenu from '@/views/areas/AreasMenu'
import Map from '@/views/areas/Map'
import Weather from '@/views/areas/Weather'

import SalesMenu from '@/views/sales/SalesMenu'
import HealthMenu from '@/views/health/HealthMenu'
import HistoryMenu from '@/views/history/HistoryMenu'
// import Hello from '@/components/Hello'
// import Sheeps from '@/components/Sheeps'
// import NewSheep from '@/components/NewSheep'
// import EditSheep from '@/components/EditSheep'

import Charte from '@/views/Charte'

Vue.use(Router)
Vue.use(routerHistory)

const router = new Router({
  mode: 'history',
  routes: [
    // login routes
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/init', name: 'Init', component: Init },
    { path: '/login', name: 'Login', component: Login },
    { path: '/charte', name: 'Charte', component: Charte },

    // module ovins routes
    { path: '/sheep', name: 'SheepMenu', component: SheepMenu },

    { path: '/sheep/sheep', name: 'SheepIndex', component: SheepIndex },
    { path: '/sheep/sheep/:id', name: 'SheepShow', component: SheepShow },
    { path: '/sheep/sheep/create', name: 'SheepCreate', component: SheepCreate },
    { path: '/sheep/sheep/edit/:id', name: 'SheepEdit', component: SheepEdit },

    { path: '/sheep/lambs', name: 'LambsIndex', component: LambsIndex },
    { path: '/sheep/lambs/:id', name: 'LambsShow', component: LambsShow },
    { path: '/sheep/lambs/create', name: 'LambsCreate', component: LambsCreate },
    { path: '/sheep/lambs/edit/:id', name: 'LambsEdit', component: LambsEdit },

    { path: '/sheep/milk', name: 'MilkIndex', component: MilkIndex },
    { path: '/sheep/milk/stats', name: 'MilkStats', component: MilkStats },

    // modules bovins routes
    { path: '/cows', name: 'CowsMenu', component: CowsMenu },

    { path: '/cows/calves', name: 'CalvesIndex', component: CalvesIndex },
    { path: '/cows/calves/:id', name: 'CalvesShow', component: CalvesShow },
    { path: '/cows/calves/create', name: 'CalvesCreate', component: CalvesCreate },
    { path: '/cows/calves/edit/:id', name: 'CalvesEdit', component: CalvesEdit },

    { path: '/cows/cows', name: 'CowsIndex', component: CowsIndex },
    { path: '/cows/cows/:id', name: 'CowsShow', component: CowsShow },
    { path: '/cows/cows/create', name: 'CowsCreate', component: CowsCreate },
    { path: '/cows/cows/edit/:id', name: 'CowsEdit', component: CowsEdit },

    { path: '/cows/gestation', name: 'GestationIndex', component: GestationIndex },

    //
    { path: '/areas', name: 'AreasMenu', component: AreasMenu },
    { path: '/areas/map', name: 'Map', component: Map },
    { path: '/areas/weather', name: 'Weather', component: Weather },

    { path: '/sales', name: 'SalesMenu', component: SalesMenu },
    { path: '/health', name: 'HealthMenu', component: HealthMenu },
    { path: '/history', name: 'HistoryMenu', component: HistoryMenu }

    // { path: '/hello', name: 'Hello', component: Hello },
    // { path: '/sheeps', name: 'Sheeps', component: Sheeps},
    // {  path: '/sheeps/new', name: 'NewSheep', component: NewSheep },
    // {  path: '/sheeps/:id', name: 'EditSheep', component: EditSheep }
  ]
})

router.afterEach(writeHistory)

export default router
