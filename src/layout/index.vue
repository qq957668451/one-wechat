<template>
  <div class="app-wrapper">
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!-- <navbar /> -->
        <div class="menu-top">
          <div>
            <logo-item class="logo-container" />
          </div>
          <div class="menu-avatar">
            <avatar-item />
          </div>
        </div>
      </div>

      <div style="display:flex">
        <div style='width:250px'>
          <navbar :style="{height: (Number(mainHeight)+54) + 'px',width:'100%'}" />
        </div>
        <div style="width:calc(100vw - 250px)">
          <breadcrumb />
          <app-main />
        </div>
      </div>

      <!-- <div>
        <app-footer />
      </div> -->
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
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  background: #fafafa;
  // display: flex;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}
.menu-top {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  height: 68px;
  overflow: hidden;
  position: relative;
  background: #373f52;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /deep/ .menu-avatar {
    float: right;

    .avatar-wrapper {
      position: relative;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 40px;
      }

      .user-name {
        margin-left: 6px;
      }
    }

    &.is-disabled {
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
