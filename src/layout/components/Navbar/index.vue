<template>
  <div class="navbar">
    <div class="navbar-main">
      <div class="menu-container">
        <el-menu :default-active="activeMenu" background-color="#f4f4f4" text-color="#424244" active-text-color="#39afe6"
          action-background-color="#ebeef5">
          <menu-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" :inline="true" />
        </el-menu>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoItem from './LogoItem'
import MenuItem from './MenuItem'
import AvatarItem from './AvatarItem'

export default {
  components: {
    LogoItem,
    MenuItem,
    AvatarItem
  },
  computed: {
    ...mapGetters(['permission_routes']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>
