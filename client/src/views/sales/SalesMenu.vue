<template>
  <div>
    <NavBar title="Ventes / Sorties"></NavBar>
    <main>
     <MainTitle title="Menu des ventes / sorties"></MainTitle>
      <p>Prochainement</p>
    </main>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'

export default {
  mixins: [checkAuth],
  name: 'TemplatePage',
  components: {
    NavBar: NavBar,
    MainTitle: MainTitle
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
