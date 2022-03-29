<template>
  <div class="app-container">

    <el-button type="primary" @click="dialogShow = true">显示添加人员弹窗</el-button>

    <select-person :dialog-show="dialogShow" @dialog-hide="handleDialogHide" @person-check="handlePersonCheck" />

  </div>
</template>

<script>
import selectPerson from './components/index'

export default {
  components: { selectPerson },
  data() {
    return {
      dialogShow: false
    }
  },
  methods: {
    handleDialogHide(val) {
      this.dialogShow = val
    },
    handlePersonCheck(val) {
      console.log(val)
    }
  }
}
</script>
