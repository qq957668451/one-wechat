<template>
  <div>

    <div class="tab-table-title">
      <span>待选人员</span>
      <span>{{ personCount }}人</span>
    </div>

    <el-table :ref="type" class="tab-table-pane" :height="425" size="mini" :data="list" @select="handlePersonCheck" @select-all="handlePersonCheckAll">
      <el-table-column
        type="selection"
        width="36"
      />

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
    </el-table>
  </div>
</template>

<script>
import { getSchoolGroupUser, getPersonGroupUser, getPublicGroupUser, getSearchGroupUser } from '@/api/tab-table'

export default {
  props: {
    // 当前待选人员表格 type，对应组织机构、个人群组、公共群组
    type: {
      type: String,
      default: 'school-group'
    },
    // 组织机构、群组，选中的数据的结果集
    groupCheck: {
      type: Array,
      default() {
        return []
      }
    },
    // 已选人员数据
    personCheck: {
      type: Array,
      default() {
        return []
      }
    },
    // 已选人员 清空操作 触发watch
    personEmpty: {
      type: Number,
      default: 0
    },
    // 已选人员 改变 触发watch
    personChange: {
      type: Number,
      default: 0
    },
    // 待选人员搜索，筛选的组织机构和群组
    personSearchGroup: {
      type: Array,
      default() {
        return []
      }
    },
    // 待选人员搜索，搜索条件
    personSearch: {
      type: String,
      default: ''
    },
    // tab 组织机构、群组切换事件，触发watch，用户切换各个群组间重复的待选人员的选中状态
    activeChange: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      groupList: [], // 组织机构、群组 筛选结果列表
      searchList: [], // 搜索结果列表
      list: [],
      loading: false
    }
  },
  computed: {
    personCount() {
      return this.list.length
    }
  },
  watch: {
    // 组织机构、群组 选中项变化 重新请求数据 groupList
    groupCheck(val) {
      this.getList()
    },
    // 搜索待选人员列表 searchList
    personSearch(val) {
      this.getSearchList()
    },
    // 已选人员清空，同时清空待选人员选中状态
    personEmpty() {
      this.$refs[this.type].clearSelection()
    },
    // 已选人员发生变化，待选人员选中状态也发生变化
    personChange() {
      this.handlePersonSelected()
    },
    // tab 组织机构、群组切换事件，用户切换各个群组间重复的待选人员的选中状态
    activeChange(val) {
      this.handlePersonSelected()
    }
  },
  methods: {
    // 根据组织机构、群组选中项，获取待选人员数据列表
    async getList() {
      if (this.groupCheck.length > 0) {
        const params = {
          code: this.groupCheck
        }
        let res = null
        this.loading = true
        if (this.type === 'school-group') {
          res = await getSchoolGroupUser(params)
        } else if (this.type === 'person-group') {
          res = await getPersonGroupUser(params)
        } else if (this.type === 'public-group') {
          res = await getPublicGroupUser(params)
        }
        const data = res.data.list
        this.groupList = data
      } else {
        this.groupList = []
      }

      this.list = this.filterSelected(this.personCheck, this.groupList, this.searchList)
      this.handlePersonSelected(true)
      this.loading = false
    },
    // 搜索获取待选人员列表
    async getSearchList() {
      if (this.personSearch !== '') {
        const params = {
          code: this.personSearchGroup,
          search: this.personSearch
        }
        this.loading = true
        const res = await getSearchGroupUser(params)
        const data = res.data.list
        this.searchList = data
      } else {
        this.searchList = []
      }

      this.list = this.filterSelected(this.personCheck, this.searchList, this.groupList)
      this.handlePersonSelected(true)
      this.loading = false
    },
    // 筛选过滤掉 已选人员、群组人员、搜索人员之间重复的用户数据
    filterSelected(checkArr = [], newArr = [], oldArr = []) {
      checkArr = [...checkArr].filter(v => v.cate !== 'history' && v.type === this.type)
      oldArr = [...oldArr].filter(x => [...newArr].every(y => y.id !== x.id) && [...checkArr].every(y => y.id !== x.id))
      newArr = [...newArr].filter(x => [...checkArr].every(y => y.id !== x.id))
      return [...checkArr, ...newArr, ...oldArr]
    },
    // 单选 待选人员 选择状态变化 更新已选人员列表
    handlePersonCheck(val, row) {
      let list = []
      const index = val.findIndex(v => v.id === row.id)
      if (index === -1) {
        list = [...this.personCheck].filter(v => v.id !== row.id)
      } else {
        list = [row, ...this.personCheck]
      }
      this.$emit('person-check', list)
    },
    // 全选 待选人员 选择状态变化 更新已选人员列表
    handlePersonCheckAll(val) {
      let list = []
      if (val.length === 0) {
        const arr = [...this.personCheck].filter(x => [...this.list].every(y => y.id !== x.id))
        list = [...arr]
      } else {
        const arr = [...val].filter(x => [...this.personCheck].every(y => y.id !== x.id))
        list = [...arr, ...this.personCheck]
      }
      this.$emit('person-check', list)
    },
    // 根据已选人员变化 切换待选人员的选中装填
    handlePersonSelected(sort = false) {
      this.$refs[this.type].clearSelection()
      const checkArr = [...this.list].filter(x => [...this.personCheck].some(y => y.id === x.id))
      if (sort) {
        const listArr = [...this.list].filter(x => [...checkArr].every(y => y.id !== x.id))
        this.list = [...checkArr, ...listArr]
      }
      this.$nextTick(() => {
        checkArr.forEach(v => this.$refs[this.type].toggleRowSelection(v, true))
      })
    }
  }
}
</script>

