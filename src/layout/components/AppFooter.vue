<template>
  <div>
    <div v-html="info" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      info: ''
    }
  },
  created() {
    this.getFooterInfo()
  },
  methods: {
    getFooterInfo() {
      const baseUrl = process.env.VUE_APP_COMMON_STATIC
      axios.get(baseUrl + '/footer.html').then((res) => {
        this.info = res.data
        this.$nextTick(() => {
          this.$store.dispatch('app/footerInit', true)
        })
      })
    }
  }
}
</script>
