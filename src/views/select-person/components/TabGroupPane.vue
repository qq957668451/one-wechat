<template>
  <el-tree
    :ref="type"
    v-loading="loading"
    :data="list"
    show-checkbox
    node-key="id"
    class="tab-group-tree"
    :props="defaultProps"
    @check-change="handleGroupCheck"
  />
</template>

<script>
import { getSchoolGroup, getPersonGroup, getPublicGroup } from '@/api/tab-group'

export default {
  props: {
    // tab 当前标签name
    type: {
      type: String,
      default: 'school-group'
    },
    groupChange: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      loading: false,
      treeTimeOut: null
    }
  },
  watch: {
    groupChange() {
      if (this.type === 'person-group') {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 根据不同的标签类型，获取组织机构、群组数据
    async getList() {
      let res = null
      this.loading = true
      if (this.type === 'school-group') {
        res = await getSchoolGroup()
      } else if (this.type === 'person-group') {
        res = await getPersonGroup()
      } else if (this.type === 'public-group') {
        res = await getPublicGroup()
      }
      this.list = res.data.list
      this.loading = false
    },
    // tree 选择变化事件 因为tree组件上下级关联的原因，使用setTimeout防止重复触发多次事件
    handleGroupCheck() {
      clearTimeout(this.treeTimeOut)
      this.treeTimeOut = setTimeout(() => {
        const checkKeys = this.$refs[this.type].getCheckedKeys(true)
        this.$emit('group-check', checkKeys)
      }, 100)
    }
  }
}
</script>

