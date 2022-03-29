import store from '@/store'

let setTime = null

export default {
  mounted() {
    this.$_resizeHandler()
  },
  methods: {
    // use $_ for mixins properties
    $_footerHeight() {
      const footer = document.getElementsByClassName('remote-footer')
      return footer.length > 0 ? footer[0].clientHeight : 0
    },
    $_resizeHandler() {
      if (!document.hidden) {
        setTime = setInterval(() => {
          if (store.state.app.footerInit) {
            const footerHeight = this.$_footerHeight()
            store.dispatch('app/footerHeight', footerHeight)
            clearInterval(setTime)
          }
        }, 100)
      }
    }
  }
}
