<template>
  <div class="error404-containe">
    <!-- <navbar /> -->

    <div class="error404">
      <div class="pic-404">
        <img class="pic-404__image" src="@/assets/error_images/404.png" alt="404">
      </div>
      <div class="message-404">
        <div class="message-404__label">404</div>
        <div class="message-404__desc">抱歉，您访问的页面不存在</div>
        <div>
          <el-button class="back-btn" type="primary">返回首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/layout/components/Navbar";

export default {
  name: "Page404",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.error404-containe {
  text-align: center;

  .error404 {
    min-width: 1152px;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

    .pic-404 {
      width: 338px;
      display: inline-block;

      .pic-404__image {
        width: 100%;
      }
    }

    .message-404 {
      display: inline-block;
      line-height: 28px;
      margin-top: 52px;
      vertical-align: top;
      text-align: left;
      margin-left: 130px;

      .message-404__label {
        font-size: 46px;
        color: #333333;
        margin-bottom: 22px;
      }

      .message-404__desc {
        font-size: 20px;
        color: #000000;
        opacity: 0.45;
        margin-bottom: 22px;
      }

      .back-btn {
        height: 36px;
      }
    }
  }
}
</style>
