<template>
  <div class="login">
    <div class="card icon-login"><img src="@/assets/icon.png"></div>
    <form class="card" @submit.prevent="login">
      <h1>Etchebestia</h1>
      <input v-model="name" name="name" type="text" class="input" placeholder="name">
      <input v-model="password" name="password" type="password" class="input" placeholder="password">
      <p class="message-error">{{ message }}</p>
      <button type="submit" class="btn" @click="login">Connexion</button>
    </form>
  </div>
</template>

<script>
import LoginService from '@/services/LoginService'
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await LoginService.auth({'name': this.name, 'password': this.password})
        console.log(response)
        this.message = response.data.message
        if (response.data.status === 'success') {
          this.$router.push({ name: 'Dashboard' })
          localStorage.setItem('token', response.data.data.token)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
.login {
  padding: 10vh 0;
  background-image: url(../assets/bg-login.jpg);
  background-size: cover;
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
h1 {
  font-size: 1.5rem;
}
.card {
  /*border:1px solid black;*/
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  padding: 0 5%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  width: 65%;
  min-height: 80vh;
  background: white;
}
.icon-login {
  width: 50px;
  height: 50px;
  min-height: 50px;
  padding: 0;
  margin: auto;
  margin-bottom: -20px;
  z-index: 100;
  position: relative;
}
.icon-login img {
  width: 35px;
  height: 35px;
}
.input {
  color: #BDBDBD;
  border:none;
  border-bottom: 1px solid #BDBDBD;
  padding-left:30px;
  padding-bottom: 10px;
  width: 70%;
}
.message-error{
  color:red;
  font-size: 0.7rem;
}
.btn {
  border:none;
  margin:30px auto;
  background: #2FC86D;
  width: 80%;
  border-radius: 10px;
  padding:10px;
  color:white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  transition: 0.5s;
  text-decoration: none;
  font-size:1rem;
  /*font-family: Roboto Condensed;*/
  /*font-weight: bold;*/
}
.btn:hover {
  transition: 0.5s;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

@media all and (min-width: 800px) {
  .card {
    width: 350px;
  }
  .icon-login {
    width: 50px;
  }
}
</style>
