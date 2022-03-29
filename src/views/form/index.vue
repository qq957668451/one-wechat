<template>
  <div class="app-container">
    <el-form ref="form" class="app-form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="发布人">
        <el-input v-model="form.name" clearable size="small" placeholder="请输入发布人姓名" disabled />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" clearable size="small" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.order" clearable size="small" placeholder="请输入正整数" @input="form.order = form.order.replace(/[^\d]/g,'')" />
      </el-form-item>
      <el-form-item label="公告类别">
        <el-select v-model="form.cate" clearable size="small" placeholder="请选择公告类型">
          <el-option
            v-for="(item,i) in cateList"
            :key="i"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="栏目名称">
        <el-select v-model="form.type" clearable size="small" placeholder="请选择栏目">
          <el-option
            v-for="(item,i) in typeList"
            :key="i"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布日期">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="请选择发布日期"
          size="small"
        />
      </el-form-item>
      <el-form-item label="截止时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            size="small"
            placeholder="请选择截止日期"
          />
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.endTime"
            size="small"
            placeholder="请选择截止时间"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-radio-group v-model="form.top">
          <el-radio label="是" value="0" />
          <el-radio label="否" value="1" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="消息提醒">
        <el-checkbox-group v-model="form.msg">
          <el-checkbox
            v-for="(item,i) in msgList"
            :key="i"
            :label="item.label"
            :value="item.value"
            name="msg"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [{
        label: '类别一',
        value: '1'
      }, {
        label: '类别二',
        value: '2'
      }, {
        label: '类别三',
        value: '3'
      }],
      typeList: [{
        label: '栏目一',
        value: '1'
      }, {
        label: '栏目二',
        value: '2'
      }, {
        label: '栏目三',
        value: '3'
      }],
      msgList: [{
        label: '微信',
        value: '1'
      }, {
        label: '短信',
        value: '2'
      }, {
        label: '邮件',
        value: '3'
      }, {
        label: 'APP',
        value: '4'
      }],
      form: {
        name: '',
        order: '',
        title: '',
        cate: '',
        type: '',
        date: '',
        endDate: '',
        endTime: '',
        top: '',
        msg: []
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

