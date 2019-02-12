<template>
  <div>
    <NavBar title="Élevage Bovins"></NavBar>
    <main>
      <MainTitle title="Menu Bovins"></MainTitle>

      <div class="sub-menu">
        <div v-for="item in items" v-bind:key="item.title">
          <SubMenuItem :title=item.title :route=item.route></SubMenuItem>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'
import SubMenuItem from '@/components/SubMenuItem'

export default {
  mixins: [checkAuth],
  name: 'CowsMenu',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle,
    SubMenuItem: SubMenuItem
  },
  data () {
    return {
      items: [
        { title: 'Veaux', route: 'CalvesIndex' },
        { title: 'Vaches', route: 'CowsIndex' },
        { title: 'Gestations', route: 'GestationIndex' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
