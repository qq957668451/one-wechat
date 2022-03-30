<template>
  <div class="master-index">
    <div class="jc-back">
      <div class="first-card">
        <div class="title">
          <img src="@/assets/public_images/cars.png" alt="" />
          <span>电动车</span>
        </div>
        <div class="add-btn">
          <van-icon size="15" name="add-o" />
          <span>电动车备案</span>
        </div>
      </div>
      <div class="first-card second-card">
        <div class="title">
          <img class="second-img" src="@/assets/public_images/certificate.png" alt="" />
          <span>电动车轨迹</span>
        </div>
        <div class="integral">
          <span>存在违纪</span>
          <span>1 &nbsp;条</span>
        </div>
        <div class="integral">
          <span>证件状态</span>
          <span>正常</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { wxinit } from '@/api/user'
export default {
  data() {
    return {}
  },
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style scoped lang="scss">
.master-index {
  .jc-back {
    width: 100%;
    background: linear-gradient(#2a62a4, 90%, #fff);
    height: 300px;
    display: inline-flex;
    justify-content: space-between;
    padding: 15px 10px;
    box-sizing: border-box;
    .first-card {
      width: 175px;
      border: 2px solid #6891ae;
      height: 95px;
      border-radius: 10px;
      padding: 10px 15px;
      color: #fff;
      box-sizing: border-box;
      .title {
        line-height: 15px;
      }
      img {
        width: 25px;
        height: 15px;
        float: left;
      }
      span {
        font-size: 14px;
        font-weight: 600;
        margin-left: 15px;
      }
      .add-btn {
        width: 140px;
        height: 28px;
        border-radius: 50px;
        background: #cee3fe;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
        font-weight: 500;
        margin-top: 15px;
        color: #384c9c;
        span {
          margin-left: 5px;
        }
      }
      .second-img {
        width: 24px;
      }
    }
    .second-card {
      .integral {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 12px;
          font-weight: 400;
          line-height: 15px;
          margin: 0;
        }
      }
    }
  }
}
</style>
