
<template>
  <div>

    <el-popover
      v-model="visible"
      placement="bottom-end"
      width="234"
      trigger="hover"
      popper-class="user-popper"
    >
      <template slot="reference">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
        </div>
      </template>
      <template>
        <div class="user-info">
          <div class="avatar-image">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          </div>
          <div class="user-name">
            <div>管理员</div>
            <div>291699120830912</div>
          </div>
        </div>
        <div class="user-menu">
          <div class="menu-item" @click="toHide">个人中心</div>
          <div class="menu-item" @click="toHide">消息中心</div>
        </div>
        <div class="logout-btn">
          <el-button class="btn" type="danger" size="mini" @click.native="logout">退出登录</el-button>
        </div>
      </template>
    </el-popover>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    async logout() {
      this.visible = false
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toHide() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info{
  text-align: center;
  padding: 10px 0;

  .avatar-image{
    width: 40px;
    height: 40px;
    display: inline-block;

    img{
      width: 100%;
      display: block;
      border-radius: 40px;
    }
  }

  .user-name{
    padding: 5px 0;
    font-size: 14px;
    line-height: 20px;
    color: #828282;
  }
}

.user-menu{
  border-top: 1px solid #F2F2F2;
  padding: 6px 0;

  .menu-item{
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    cursor: pointer;

    &:hover{
      background: #ECF5FF;
    }
  }
}

.logout-btn{
  text-align: center;
  padding: 0 24px;

  .btn{
    width: 100%;
  }
}
</style>
