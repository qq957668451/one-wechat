<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    custom-class="select-person-dialog"
    @close="handleDialogHide"
  >

    <div class="select-person">

      <div class="select-person-search">
        <el-input v-model="searchCache" size="small" clearable placeholder="请输入姓名或工号" @keyup.enter.native="handlePersonFilter" />
        <el-button type="primary" @click="handlePersonFilter">搜索</el-button>
      </div>

      <el-row :gutter="10">
        <el-col :span="16">
          <el-row>
            <el-col :span="12">
              <tab-group :tab-options="tabOptions" :group-change="groupChange" @active-change="handleGroupActiveChange" @group-check="handleGroupCheck" />
            </el-col>
            <el-col :span="12">
              <tab-table :tab-options="tabOptions" :group-active="groupActive" :group-check="groupCheck" :person-check="personCheck" :person-empty="personEmpty" :person-change="personChange" :person-search="personSearch" @person-check="handlePersonCheck" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <person-selected :person-check="personCheck" @empty-selected="handlePersonSelectedEmpty" @change-selected="handlePersonSelectedChange" @group-person-change="handleGroupPersonChange" />
        </el-col>
      </el-row>

    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="savePersonSelected">确 定</el-button>
      <el-button @click="handleDialogHide">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import tabGroup from './TabGroup' // 组织机构、个人群组、公共群组
import tabTable from './TabTable' // 待选人员
import PersonSelected from './PersonSelected' // 已选人员
import { savePersonSelected } from '@/api/tab-group'

export default {
  components: {
    tabGroup,
    tabTable,
    PersonSelected
  },
  props: {
    // 弹窗标题
    dialogTitle: {
      type: String,
      default: '添加人员'
    },
    // 弹窗显示
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 群组切换标签
      tabOptions: [
        { label: '组织机构', key: 'school-group' },
        { label: '个人群组', key: 'person-group' },
        { label: '公共群组', key: 'public-group' }
      ],
      groupActive: 'school-group',
      groupCheck: {
        'school-group': [],
        'person-group': [],
        'public-group': []
      },
      groupChange: 0, // 个人群组 或 个人群组人员 发生变化，需重新请求数据
      personCheck: [],
      personEmpty: 0, // 已选人员清空
      personChange: 0, // 已选人员发生变化
      personSearch: {
        'school-group': '',
        'person-group': '',
        'public-group': ''
      },
      searchCache: '',
      dialogVisible: false,
      btnLoading: false
    }
  },
  watch: {
    personCheck(val) {
      this.$emit('person-check', val)
    },
    dialogShow(val) {
      this.dialogVisible = val
    }
  },
  methods: {
    // 获取当前激活的群组标签，从 TabGroup 获取，传递到 TabTable
    handleGroupActiveChange(val) {
      this.groupActive = val
    },
    // 个人群组数据发生变化，需重新请求
    handleGroupPersonChange() {
      this.groupChange++
    },
    // 获取选中的组织机构数据，存储到 groupCheck 对应的键值数组内
    handleGroupCheck(val) {
      this.groupCheck[this.groupActive] = val
    },
    // 已选人员添加 type 属性，标识是从哪个群组添加的
    handlePersonCheck(val) {
      const arr = val.map((v) => {
        v.type = this.groupActive
        return v
      })
      this.personCheck = [...arr]
    },
    // 待选人员 搜索事件
    handlePersonFilter() {
      this.personSearch[this.groupActive] = this.searchCache
    },
    // 已选人员清空事件
    handlePersonSelectedEmpty() {
      this.personCheck = []
      this.personEmpty++
    },
    // 已选人员改变事件
    handlePersonSelectedChange(val) {
      this.personCheck = val
      this.personChange++
    },
    handleDialogHide() {
      this.$emit('dialog-hide', false)
    },
    // 保存已选人员
    async savePersonSelected() {
      const personCheck = this.personCheck.map(v => v.id)
      const params = {
        personCheck: personCheck
      }
      this.btnLoading = true
      await savePersonSelected(params)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.btnLoading = false
      this.$emit('dialog-hide', false)
    }
  }
}
</script>
