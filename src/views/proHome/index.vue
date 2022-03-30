<template>
  <div>
    <div @click="pathTo('/master/index')">jc端</div>
    <div @click="pathTo('/user/index')">user端</div>
    <div @click="pathTo('/renbao/index')">Rb端</div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { initWxJsSdk } from '@/api/common'
export default {
  name: 'pedigree',
  components: {},
  data() {
    return {}
  },
  mounted() {
    initWxJsSdk('', () => {
      wx.getNetworkType({
        success: function (res) {
          console.log('res', res)
          // var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
        }
      })
    })

  },
  methods: {
    pathTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
