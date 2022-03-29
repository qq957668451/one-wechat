<template>
  <div class="error401-containe">
    <!-- <navbar /> -->

    <div class="error401">
      <div class="pic-401">
        <img class="pic-401__image" src="@/assets/error_images/401.png" alt="401">
      </div>
      <div class="message-401">
        <div class="message-401__label">抱歉，没有访问权限</div>
        <div class="message-401__desc">请联系管理员</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/layout/components/Navbar";

export default {
  name: "Page401",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.error401-containe {
  text-align: center;

  .error401 {
    min-width: 1152px;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

    .pic-401 {
      width: 330px;
      display: inline-block;

      .pic-401__image {
        width: 100%;
      }
    }

    .message-401 {
      display: inline-block;
      line-height: 28px;
      margin-top: 88px;
      vertical-align: top;
      text-align: left;
      margin-left: 180px;

      .message-401__label {
        font-size: 32px;
        color: #333333;
        margin-bottom: 22px;
      }

      .message-401__desc {
        font-size: 20px;
        color: #000000;
        opacity: 0.45;
      }
    }
  }
}
</style>
