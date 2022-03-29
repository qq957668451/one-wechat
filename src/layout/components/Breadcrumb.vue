<template>
  <div>

    <div class="breadcrumb">
      <breadcrumb class="breadcrumb-container" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters(["avatar"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  width: 100%;
  position: relative;
  display: inline-block;
  // min-width: 1152px;
  // max-width: 1584px;
  text-align: left;
  min-height: 20px;

  .breadcrumb-container {
    float: left;
  }
}
</style>
