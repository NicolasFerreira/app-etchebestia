s<template>
  <router-link v-bind:to="{ name: route }" >
   <div class="sub-menu-item">
     <img class="sub-menu-img" v-bind:src='imgsrc'>
     <h3 class="sub-menu-title"> {{ title }}</h3>
     <div>></div>
   </div>
 </router-link>
</template>

<script>
export default {
  name: 'SubMenuItem',
  props: [
    'imgsrc',
    'title',
    'route'],
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.sub-menu-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  margin: 30px 0;
}
.sub-menu-img {
  width: 30px;
  height: 30px;
}

.sub-menu-title {
  font-size: 1rem;
}

</style>
