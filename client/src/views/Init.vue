<template>
  <div></div>
</template>

<script>
import LoginService from '@/services/LoginService'

export default {
  name: 'InitPage',
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await LoginService.init()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
