<template>
  <div class="app-container">
    <div class="app-search">
      <el-input v-model="search" size="small" placeholder="请输入搜索内容" />
      <el-button type="primary" size="small">搜索</el-button>
    </div>

    <div class="app-operate">
      <el-button icon="el-icon-document-add" plain size="mini">新建</el-button>
      <el-button icon="el-icon-document-add" plain size="mini">删除</el-button>
      <el-button icon="el-icon-document-add" plain size="mini">复制</el-button>
    </div>

    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="60"
        />
        <el-table-column align="center" label="排序" width="80">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.desc }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.create_user }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="是否启用" width="110" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="statusChange($event, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <el-link type="primary" :underline="false">编辑</el-link>
            <el-link type="primary" :underline="false">详情</el-link>
            <el-link type="danger" :underline="false">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      currentPage: 1,

      search: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(res => {
        this.list = res.data.items
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    statusChange(status, val) {
      this.listLoading = true
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange(val) {
      console.log(`选中: ${val}`)
    }
  }
}
</script>
