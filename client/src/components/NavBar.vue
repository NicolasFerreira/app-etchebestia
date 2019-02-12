<template>
  <div>
    <nav class="menu">
      <img class="icon-nav" src="@/assets/icon.png" @click="backToDashboard">
      <h2>{{ title }}</h2>
      <img class="icon-nav" src="@/assets/burger.png" @click="sidebar">
      <div id="sidebar" class="sidebar">
        <p @click.stop="sidebar">X</p>
      </div>
    </nav>

    <nav class="desktop-menu">
      <div class="title-div">
        <img class="icon-nav" src="@/assets/icon_white.png" @click="backToDashboard">
        <h2 @click="backToDashboard">Etchebestia</h2>
      </div>
      <ul class="pages-ul">
        <li v-for="page in pages" v-bind:key="page.title" v-bind:class="[page.activeState === true ? activeClass : '']">
          <router-link v-bind:to="{ name: page.route }">
            <img v-if="page.activeState === true" class="icon-menu" v-bind:src='page.imgsrcActive'>
            <img v-else class="icon-menu" v-bind:src='page.imgsrc'>
            <h4 v-if="page.activeState === true" class="active-h4">{{ page.title }}</h4>
            <h4 v-else>{{ page.title }}</h4>
            <!-- {{ page.activeState }} -->
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// import images
import ovinsGrey from '@/assets/ovins_grey.png'
import bovinsGrey from '@/assets/bovins_grey.png'
import parcellesGrey from '@/assets/parcelles_grey.png'
import ventesGrey from '@/assets/ventes_grey.png'
import santeGrey from '@/assets/sante_grey.png'
import historiqueGrey from '@/assets/historique_grey.png'

import ovinsWhite from '@/assets/ovins_white.png'
import bovinsWhite from '@/assets/bovins_white.png'
import parcellesWhite from '@/assets/parcelles_white.png'
import ventesWhite from '@/assets/ventes_white.png'
import santeWhite from '@/assets/sante_white.png'
import historiqueWhite from '@/assets/historique_white.png'

export default {
  name: 'NavBar',
  props: ['title'],
  data () {
    return {
      pages: [
        {
          title: 'Ovins',
          route: 'SheepMenu',
          imgsrc: ovinsGrey,
          imgsrcActive: ovinsWhite,
          activeState: false,
          path: 'sheep'
        },
        {
          title: 'Bovins',
          route: 'CowsMenu',
          imgsrc: bovinsGrey,
          imgsrcActive: bovinsWhite,
          activeState: false,
          path: 'cows'
        },
        {
          title: 'Parcelles',
          route: 'AreasMenu',
          imgsrc: parcellesGrey,
          imgsrcActive: parcellesWhite,
          activeState: false,
          path: 'areas'
        },
        {
          title: 'Ventes',
          route: 'SalesMenu',
          imgsrc: ventesGrey,
          imgsrcActive: ventesWhite,
          activeState: false,
          path: 'sales'
        },
        {
          title: 'Santé',
          route: 'HealthMenu',
          imgsrc: santeGrey,
          imgsrcActive: santeWhite,
          activeState: false,
          path: 'health'
        },
        {
          title: 'Historique',
          route: 'HistoryMenu',
          imgsrc: historiqueGrey,
          imgsrcActive: historiqueWhite,
          activeState: false,
          path: 'history'
        }
      ],
      active: false,
      activeClass: 'active-li'
    }
  },
  mounted () {
    this.initActivePageState()
  },
  methods: {
    sidebar () {
      document.getElementById('sidebar').classList.toggle('move')
    },
    backToDashboard () {
      this.$router.push({ name: 'Dashboard' })
    },
    activePage (page) {
      // console.log(this.$route.name)
    },
    initActivePageState () {
      // console.log(this.$route.path.split('/', 2)[1])
      var pathPage = this.$route.path.split('/', 2)[1]
      this.pages.forEach(page => {
        if (pathPage === page.path) {
          page.activeState = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.menu {
  height: 60px;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.icon-nav {
  width: 25px;
  height: 25px;
  margin: 0 20px;
  cursor: pointer;
}
h2 {
  font-size: 1.2rem;
}

.sidebar {
  position: absolute;
  width: 100vw;
  background: white;
  height: 100vh;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  top: 0;
  right: -100vw;
  transition: 0.5s;
  z-index: 500;
}

.move {
  transform: translateX(-100vw);
}

.desktop-menu {
  display: none;
}

@media screen and (min-width: 800px) {
  .menu {
    display: none;
  }

  .desktop-menu {
    display: initial;
    position: fixed ;
    left: 0;
    top: 0;
    width: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    height: 100vh;
    background: #3d3d3d;
  }
  main {
    padding-left: 220px;
    padding-right: 50px;
  }

  .title-div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    margin-bottom: 20px;
  }
  .desktop-menu .title-div h2 {
    cursor: pointer;
  }

  .pages-ul {
    padding: 0;
    list-style: none;
    border-top: 1px solid #aaa6a0;
    width: 90%;
    margin: auto;
  }
  .pages-ul li a {
    padding: 25px auto;
    font-weight: bold;
    color: #aaa6a0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .pages-ul a h4 {
    margin: 0;
    font-weight: bold;
    font-size: 1rem;
  }

  .pages-ul li {
    padding: 25px 20px;
    width: 100%;
    margin-top: 5px;
    margin-left:-13px;
  }

  .icon-menu {
    width: 25px;
    margin: 0 10px;
    transition: 0.2s;
  }
  .active-h4 {
    color:white;
    transition:0.2s;
  }
  .active-li {
    background:#2c2c2c;;
    width: 91% !important;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition:0.5s;
  }

  /* .icon-active {
    display: none;
  }

  .desktop-menu li:hover > a h4 {
    color: white;
    transition: 0.2s;
  }
  .desktop-menu li:hover > a .icon-active {
    display: initial;
    transition: 0.3s;
  }
  .desktop-menu li:hover > a .icon-normal {
    display: none;
    transition: 0.3s;
  } */
}
</style>
