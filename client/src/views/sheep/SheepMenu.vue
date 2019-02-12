<template>
  <div>
    <NavBar title="Élevage Ovins"></NavBar>
    <main>
     <MainTitle title="Menu Ovins"></MainTitle>

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

// import images
import ovins from '@/assets/ovins.png'
import agneaux from '@/assets/icon.png'
import milk from '@/assets/milk.png'

export default {
  mixins: [checkAuth],
  name: 'SheepMenu',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle,
    SubMenuItem: SubMenuItem
  },
  data () {
    return {
      items: [
        { title: 'Agneaux', route: 'LambsIndex', imgsrc: agneaux },
        { title: 'Brebis', route: 'SheepIndex', imgsrc: ovins },
        { title: 'Production laitière', route: 'MilkIndex', imgsrc: milk }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
