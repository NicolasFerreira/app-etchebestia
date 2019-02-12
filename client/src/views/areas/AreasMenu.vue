<template>
  <div>
    <NavBar title="Gestion des parcelles"></NavBar>
    <main>
      <MainTitle title="Menu des parcelles"></MainTitle>

      <div class="sub-menu">
        <div v-for="item in items" v-bind:key="item.title">
          <SubMenuItem :title=item.title :imgsrc=item.imgsrc :route=item.route></SubMenuItem>
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
  name: 'AreasMenu',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle,
    SubMenuItem: SubMenuItem
  },
  data () {
    return {
      items: [
        { title: 'Parcelles', route: 'Map' },
        { title: 'Météo', route: 'Weather' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sub-menu {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 15px;
  width: 80vw;
  margin:auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
</style>
