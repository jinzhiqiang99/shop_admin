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
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span="8">
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
          <el-button
            type="success"
            @click="startLogin"
          >登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// import axios from 'axios'
/* eslint-disable */
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        // 校验用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 校验密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    startLogin () {
      // 再次校验
      // valid  校验通过 true  否则false
      // async 的就近原则
      this.$refs.loginForm.validate(async (valid) => {
        // console.log(valid)
        if (!valid) {
          this.$message({
            message: '校验失败',
            type: 'error',
            duration: 800
          })
          return
        }
        // console.log("校验成功");
        // 发送请求进行校验
        // 格式：axios.psot(url,data,config)
        let res = await this.$axios.post("login", this.loginForm)
        // console.log(res);
        // .then(res => {
        // 返回的数据包含token 用于验证是否登录了
        // 将token存在本地
        // console.log(res);
        if (res.data.meta.status === 200) {
          localStorage.setItem("token", res.data.data.token)
          this.$router.push("/home")
        } else {
          this.$message({
            message: "登录失败",
            type: "error"
          })
        }
        // })
      })
    },
    // 重置  将用户名 密码重置为最初的状态
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}

h1 {
  color: red;
}
</style>
