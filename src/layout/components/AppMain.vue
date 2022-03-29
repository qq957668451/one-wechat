<template>
  <section class="app-main" :style="{height: mainHeight + 'px'}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
    bodyHeight() {
      const rect = document.body.getBoundingClientRect();
      return rect.height;
    },
    footerHeight() {
      // return this.$store.state.app.footerHeight;
      return 0;
    },
    mainHeight() {
      return this.bodyHeight - this.footerHeight - 68 - 50 - 24;
    },
  },
};
</script>

<style scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  display: inline-block;
  background: #fff;
  border: 0px solid #e0e0e0;
  padding: 10px;
  box-align: border-box;
  text-align: left;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
