<template>
  <router-link class="btn-add" v-bind:to="{ name: route }">+</router-link>
</template>

<script>
export default {
  name: 'BtnAdd',
  props: ['route'],
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.btn-add {
  width: 40px;
  height: 40px;
  background: #2FC86D;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 6px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
