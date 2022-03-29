<template>
  <div class="tab-table">

    <keep-alive v-for="item in tabOptions" :key="item.key">
      <tab-table-pane v-if="groupActive==item.key" :type="item.key" :active-change="activeChange" :group-check="groupCheck[groupActive]" :person-check="personCheck" :person-empty="personEmpty" :person-change="personChange" :person-search-group="groupCheck['school-group']" :person-search="personSearch[groupActive]" @person-check="handelPersonCheck" />
    </keep-alive>

  </div>
</template>

<script>
import tabTablePane from './TabTablePane'

export default {
  components: { tabTablePane },
  props: {
    // 组织机构、群组标签，不同标签对应不同的待选人员
    tabOptions: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前激活的群组标签，对应显示激活的待选人员
    groupActive: {
      type: String,
      default: ''
    },
    // 组织机构、群组，选中的数据的结果集
    // groupCheck 类型 Object 每个群组选中结果集对应一个键值 使用 groupCheck[groupActive] 获取当前激活的群组
    groupCheck: {
      type: Object,
      default() {
        return {}
      }
    },
    // 已选人员数据
    personCheck: {
      type: Array,
      default() {
        return []
      }
    },
    // 已选人员清空事件，用于触发watch，改变待选人员选中状态
    personEmpty: {
      type: Number,
      default: 0
    },
    // 已选人员改变事件，用于触发watch，改变待选人员选中状态
    personChange: {
      type: Number,
      default: 0
    },
    // 待选人员搜索条件，同时用户触发watch
    personSearch: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeChange: 0
    }
  },
  watch: {
    // tab 组织机构、群组切换事件，用户切换各个群组间重复的待选人员的选中状态
    groupActive() {
      this.activeChange++
    }
  },
  methods: {
    // 待选人员选中状态切换事件
    handelPersonCheck(val) {
      this.$emit('person-check', val)
    }
  }
}
</script>
