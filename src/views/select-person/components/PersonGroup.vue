<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    custom-class="person-group-dialog"
    :append-to-body="true"
    @close="handleDialogHide(false)"
  >

    <div v-loading="loading" class="person-group">
      <el-radio-group v-model="groupId">
        <el-radio v-for="item in list" :key="item.id" :label="item.id">{{ item.label }}</el-radio>
        <el-radio :label="-1">
          <el-input v-model="groupName" size="small" placeholder="请输入群组名称" @blur="handleInputBlur" />
        </el-radio>
      </el-radio-group>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button :loading="btnLoading" type="primary" @click="handleDialogHide(true)">确 定</el-button>
      <el-button @click="handleDialogHide(false)">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPersonGroup, savePersonGroup, savePersonGroupUser } from '@/api/tab-group'

export default {
  props: {
    // 弹窗标题
    dialogTitle: {
      type: String,
      default: '请选择个人群组'
    },
    // 弹窗显示
    dialogShow: {
      type: Boolean,
      default: false
    },
    // 已选人员
    personCheck: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      btnLoading: false,
      groupId: '',
      groupName: '',
      dialogVisible: false
    }
  },
  watch: {
    dialogShow(val) {
      this.dialogVisible = val
    }
  },
  created() {
    this.dialogVisible = true
    this.getList()
  },
  methods: {
    // 获取个人群组列表
    async getList() {
      this.loading = true
      const res = await getPersonGroup()
      this.list = res.data.list
      this.loading = false
    },
    // 添加个人群组
    async savePersonGroup() {
      let name = this.groupName
      name = name.trim()
      if (name === '') {
        return false
      }
      const params = {
        name: name
      }
      this.loading = true
      const res = await savePersonGroup(params)
      const data = res.data.data
      this.list.push(data)
      this.groupName = ''
      this.$emit('group-person-change')
      this.loading = false
    },
    // 将已选人员添加到个人群组
    async savePersonGroupUser() {
      if (this.groupId === '') {
        this.$message({
          message: '请选择要添加到的个人群组',
          type: 'warning'
        })
        return false
      }
      if (this.groupId === -1) {
        this.$message({
          message: '请选择已存在的个人群组',
          type: 'warning'
        })
        return false
      }
      const personCheck = this.personCheck.map(v => v.id)
      const params = {
        groupId: this.groupId,
        personCheck: personCheck
      }
      this.btnLoading = true
      await savePersonGroupUser(params)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.btnLoading = false
      this.$emit('group-person-change')
      this.$emit('dialog-hide', false)
    },
    handleInputBlur() {
      this.savePersonGroup()
    },
    handleDialogHide(val = false) {
      if (val) {
        this.savePersonGroupUser()
      } else {
        this.$emit('dialog-hide', false)
      }
    }
  }
}
</script>
