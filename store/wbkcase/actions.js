export default {

  async getCC (context) {
    if (context.state.wbkcase === '') {
      this.$router.push('/')
      return
    }
    context.commit('clearCC')
    const payload = {
      name: context.state.wbkcase
    }

    try {
      let response
      if (process.env.NODE_ENV === 'production') {
        response = await this.$axios.post(
          'https://mywabak.com/cc/get',
          payload
        )
      } else {
        response = await this.$axios.post(
          'http://localhost:8080/cc/get',
          payload
        )
      }
      if (response.data.cc.length === 0) {
        return
      }
      const ccArray = []
      for (let i = 0; i < response.data.cc.length; i++) {
        const cc = {
          name: response.data.cc[i].name,
          ident: response.data.cc[i].ident
        }
        ccArray.push(cc)
      }
      context.commit('cc', ccArray)
    } catch (error) {
      if (error.response) {
        alert('Masalah network, sila cuba sebentar lagi')
      } else if (error.request) {
        //
      } else {
        //
      }
    }
  }

}
