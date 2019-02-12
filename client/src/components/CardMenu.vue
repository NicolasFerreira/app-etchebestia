<template>
  <div class="card-menu">
    <router-link v-bind:to="{ name: route }">
      <img class="icon-card-menu" v-bind:src='imgsrc' >
      <h3 class="title-card-menu"> {{ title }}</h3>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CardMenu',
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
.card-menu {
  width: 90px;
  height: 90px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 15px;
  padding: 20px;
  margin:15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transition: 0.5s;
}
.card-menu:hover {
  transition: 0.5s;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.icon-card-menu {
  width: 50px;
  height: 50px;
}
.title-card-menu {
  font-size: 0.8rem;
  width: 130px;
  margin-top:20px;
  margin-bottom: 0;
}
a {
  text-decoration: none;
  color: #2c3e50;
}

@media all and (min-width: 800px) {
  .card-menu {
    width: 300px;
    border-radius:4px;
    height: 110px;
  }
}

</style>
