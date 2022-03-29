<template>
  <div class="person-selected-table">

    <div class="selected-table-title">
      <span>已选人员</span>
      <span>{{ personCount }}人</span>
      <el-button type="text" @click="handlePersonSelectedEmpty">清空</el-button>
    </div>

    <div class="selected-table-search">
      <el-input v-model="searchCache" size="small" clearable placeholder="请输入姓名或工号" @keyup.enter.native="handleListFilter" />
      <el-button type="primary" @click="handleListFilter">搜索</el-button>
    </div>

    <el-table v-loading="loading" :data="filterList" :height="372" size="mini" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseLeaver">
      <el-table-column label="工号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所在单位" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.group }}</span>
        </template>
      </el-table-column>

      <el-table-column width="40px">
        <template slot-scope="scope">
          <span v-if="showRowDel == scope.row.id" @click="handlePersonSelectedRemove(scope.row)">
            <i class="selected-person-del el-icon-error" />
          </span>
        </template>
      </el-table-column>
    </el-table>

    <div class="person-group-add">
      <el-button type="text" @click="dialogShow = true">添加到个人群组</el-button>
    </div>

    <person-group v-if="dialogShow" :dialog-show="dialogShow" :person-check="personCheck" @dialog-hide="handleDialogHide" @group-person-change="handleGroupPersonChange" />
  </div>
</template>

<script>
import personGroup from './PersonGroup' // 已选人员添加到个人群组
import { getSelectedUser } from '@/api/tab-table'

export default {
  components: {
    personGroup
  },
  props: {
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
      search: '',
      searchCache: '',
      showRowDel: '', // 显示已选人员删除图标
      dialogShow: false // 显示添加到个人群组弹窗
    }
  },
  computed: {
    // 搜索，获取筛选结果列表
    filterList() {
      return [...this.list].filter(v => (v.name.toString().indexOf(this.search) > -1 || v.code.toString().indexOf(this.search) > -1))
    },
    // 获取已选人员人数
    personCount() {
      return this.list.length
    }
  },
  watch: {
    personCheck(val) {
      this.list = val
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取历史选中人员列表
    async getList() {
      this.loading = true
      const res = await getSelectedUser()
      this.list = res.data.list
      // 添加属性 cate = 'history' 用于区分已经存在的 和 目前选择的
      this.list.map(v => (v.cate = 'history'))
      this.$emit('change-selected', this.list)
      this.loading = false
    },
    // 搜索筛选已选人员列表
    handleListFilter() {
      this.search = this.searchCache
    },
    // 鼠标移动事件，显示删除图标
    handleMouseEnter(row) {
      this.showRowDel = row.id
    },
    // 鼠标移动事件，隐藏删除图标
    handleMouseLeaver() {
      this.showRowDel = ''
    },
    // 删除已选人员
    handlePersonSelectedRemove(row) {
      this.list = [...this.list].filter(v => v.id !== row.id)
      this.showRowDel = ''
      this.$emit('change-selected', this.list)
    },
    // 清空已选人员
    handlePersonSelectedEmpty() {
      this.$emit('empty-selected')
    },
    // 添加到个人群组 弹窗隐藏
    handleDialogHide(val) {
      this.dialogShow = val
    },
    // 个人群组数据发生变化，需重新请求获取数据
    handleGroupPersonChange() {
      this.$emit('group-person-change')
    }
  }
}
</script>

