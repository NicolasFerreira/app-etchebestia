<template>
  <div class="entete">
    <router-link  v-if="$routerHistory.hasPrevious()" :to="{ path: $routerHistory.previous().path }" class="back-link">&lt; Retour</router-link>
    <h2 class="entete-title">{{ title }} :</h2>
  </div>
</template>

<script>
export default {
  name: 'MainTitle',
  props: ['title'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="css">
.entete {
  display: flex;
  flex-direction: column;
  width: 60vw;
  padding-left: 30px;
  padding-top: 20px;
  margin-bottom: 30px;
}
.back-link {
  font-size: 0.7rem;
  text-align: left;
}
.entete-title {
  font-size: 1rem;
  margin: 2px 0;
  text-align: left;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
