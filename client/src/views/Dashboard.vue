<template>
  <div class="dashboard">
    <NavBar title="Menu principal"></NavBar>
    <div class="menu-list">
      <div v-for="card in cards" v-bind:key="card.title">
      <CardMenu :title=card.title :imgsrc=card.imgsrc :route=card.route></CardMenu>
      </div>
    </div>
  </div>
</template>

<script>

import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import CardMenu from '@/components/CardMenu'

// import images
import ovins from '@/assets/ovins.png'
import bovins from '@/assets/bovins.png'
import parcelles from '@/assets/parcelles.png'
import ventes from '@/assets/ventes.png'
import sante from '@/assets/sante.png'
import historique from '@/assets/historique.png'

export default {
  mixins: [checkAuth],
  name: 'Dashboard',
  components: {
    NavBar: NavBar,
    CardMenu: CardMenu
  },
  data () {
    return {
      cards: [
        { title: 'Élevage Ovins', route: 'SheepMenu', imgsrc: ovins },
        { title: 'Élevage Bovins', route: 'CowsMenu', imgsrc: bovins },
        { title: 'Parcelles Agricoles', route: 'AreasMenu', imgsrc: parcelles },
        { title: 'Ventes/Sorties', route: 'SalesMenu', imgsrc: ventes },
        { title: 'Santé', route: 'HealthMenu', imgsrc: sante },
        { title: 'Historique', route: 'HistoryMenu', imgsrc: historique }
      ]
    }
  },
  mounted () {
    this.check()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.menu-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

@media all and (min-width: 800px) {
  .menu-list {
    padding-left: 100px;
    width: 750px;
    margin: auto;
  }
}

</style>
