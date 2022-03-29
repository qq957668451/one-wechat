<template>
  <div class="tab-group">

    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane v-for="item in tabOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <tab-group-pane v-if="activeName==item.key" :type="item.key" :group-change="groupChange" @group-check="handleGroupCheck" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import tabGroupPane from './TabGroupPane'

export default {
  components: { tabGroupPane },
  props: {
    // tab 切换标签
    tabOptions: {
      type: Array,
      default() {
        return []
      }
    },
    groupChange: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeName: 'school-group'
    }
  },
  methods: {
    // tab 标签点击切换事件
    handleClick() {
      this.$emit('active-change', this.activeName)
    },
    // 组织机构、群组 check 选择发生变化事件
    handleGroupCheck(val) {
      this.$emit('group-check', val)
    }
  }
}
</script>
