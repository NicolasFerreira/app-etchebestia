<template>
  <div>
    <NavBar title="Santé"></NavBar>
    <main>
     <MainTitle title="Menu Santé"></MainTitle>
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
  name: 'HealthMenu',
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
