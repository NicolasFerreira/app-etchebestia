import LoginService from '@/services/LoginService'

export default {
  // created () {
  //   this.check()
  // },
  methods: {

    async check () {
      if (localStorage.getItem('token')) {
        try {
          await LoginService.check({'token': localStorage.getItem('token')})
          // console.log(response)
        } catch (e) {
          // console.log(e)
          this.$router.push({ name: 'Login' })
        }
      } else {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
