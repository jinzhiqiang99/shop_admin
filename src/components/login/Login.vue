<template>
  <!--
  用户名
  model : 表单数据对象
  rules ：校验规则
  ref： 获取组件
  label-width：标题宽度
        如果给一个具体的值 : 在左边显示具体的宽度
        如果删除 在上面独占一行
  el-form-item 表单元素
      -  label : 标题
      -  prop : 校验、重置用的
 -->
  <el-form
    :model="loginForm"
    :rules="rules"
    ref="loginForm"
    class="demo-ruleForm"
  >
    <el-form-item
      label="用户名"
      prop="username"
    >
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item
      label="密码"
      prop="password"
    >
      <el-input v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success">登录</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
