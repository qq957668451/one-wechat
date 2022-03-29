<template>
  <div class="app-wrapper">
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Breadcrumb, AppMain, AppFooter } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import AvatarItem from "./components/Navbar/AvatarItem";
import LogoItem from "./components/Navbar/LogoItem";
export default {
  name: "Layout",
  components: {
    Navbar,
    Breadcrumb,
    AppMain,
    AvatarItem,
    AppFooter,
    LogoItem,
  },
  mixins: [ResizeMixin],
  computed: {
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
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

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
</style>
