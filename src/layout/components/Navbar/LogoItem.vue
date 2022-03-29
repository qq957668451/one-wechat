<template>
  <div>

    <div class="header-top-logo">
      <div><img :src="logoUrl"></div>
      <div style="font-size:20px;color:#f3f3f3;margin-left:20px"></div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavbarLogo',
  data() {
    return {
      title: ''
    }
  },
  computed: {
    logoUrl() {
      return process.env.VUE_APP_COMMON_STATIC + '/logo.png'
    },
    ...mapGetters(['avatar'])
  },
  watch: {
    $route() {
      this.getMenuTitle()
    }
  },
  created() {
    this.getMenuTitle()
  },
  methods: {
    getMenuTitle() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      const first = matched[0]
      this.title = first && first.meta ? first.meta.title : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.header-top-logo {
  display: flex;
  align-items: center;
}

.header-logo {
  height: 28px;
  display: inline-block;
  position: relative;
  top: 9px;

  img {
    height: 100%;
    display: block;
  }
}

.header-title {
  display: inline-block;
  margin-left: 18px;

  span {
    font-size: 16px;
  }
}
</style>
