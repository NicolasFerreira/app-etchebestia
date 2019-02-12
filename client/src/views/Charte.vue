<template>
  <div class="charte">
    <h2>Police</h2>
    <p class="policy">Avenir, Helvetica, Arial, sans-serif</p>

    <h2>Logo</h2>
    <div class="box-icon-logo">
    <img src="@/assets/icon.png">
    </div>

    <h2>Couleurs</h2>
    <ul class="colors">
      <li>
        <div class="main-color"></div>
        <p class="main-color-text">#2FC86D</p>
      </li>

      <li>
        <div class="third-color"></div>
        <p class="third-color-text">#999999</p>
      </li>

      <li>
        <div class="second-color"></div>
        <p class="second-color-text">#2C3E50</p>
      </li>

      <li>
        <div class="four-color"></div>
        <p class="four-color-text">#3D3D3D</p>
      </li>

       <li>
        <div class="five-color"></div>
        <p class="five-color-text">#2C2C2C</p>
      </li>
    </ul>
  </div>
</template>

<script>
import checkAuth from '@/components/mixins/checkAuth'
import NavBar from '@/components/NavBar'
import MainTitle from '@/components/MainTitle'

export default {
  mixins: [checkAuth],
  name: 'Charte',
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
.charte {
  width: 600px;
  padding: 20px;
}

.charte h2 {
  text-align: left;
}
ul.colors {
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin:0;
}
.colors li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.colors li div{
  width: 70px;
  height: 70px;
  border-radius: 100px;
}

.main-color {
  background: #2FC86D;
}
.main-color-text {
  color: #2FC86D;
  font-weight: bold;
}
.second-color {
  background: #2C3E50;
}
.second-color-text {
  color: #2C3E50;
  font-weight: bold;
}
.third-color {
  background: #999999;
}
.third-color-text {
  color: #999999;
  font-weight: bold;
}
.four-color {
  background: #3d3d3d;
}
.four-color-text {
  color: #3d3d3d;
  font-weight: bold;
}
.five-color {
  background: #2c2c2c;
}
.five-color-text {
  color: #2c2c2c;
  font-weight: bold;
}

.box-icon-logo {
  display: flex;
}
.policy {
  text-align: left;
  font-weight: bold;
}

</style>
