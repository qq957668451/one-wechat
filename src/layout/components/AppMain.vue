<template>
  <section class="app-main">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  },
};
</script>

<style scoped>
/* .app-main {
  width: 100vw;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  display: inline-block;
  background: #fff;
  border: 0px solid #e0e0e0;
  box-align: border-box;
  text-align: left;
} */
</style>
