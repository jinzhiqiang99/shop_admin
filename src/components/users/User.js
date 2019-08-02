// import axios from 'axios'
export default {
  data () {
    return {
      usersData: [
        {
          // username: '王小虎',
          // email: 'xiaohu@163.com',
          // mobile: 123456,
          // mobile: 111
        }
      ],
      // 定义总页数
      total: 0,
      // 当前页
      pagenum: 1,
      // 检索框的内容
      input3: '',
      // 添加用户对话框的显示与隐藏
      addUserdDialogVisible: false,
      // 对话框表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        // 用户名
        username: [
          // 必填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 格式
          { min: 3, max: 5, message: '长度应该在3-5之间', trigger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度应该在5-10之间', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          // 判断格式
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        // 手机
        mobile: [
          // 判断格式
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 用户状态
      value1: true,
      // 显示编辑用户
      dialogEditUserFormVisible: false,
      // 编辑用户表单
      EditUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      }
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // 发送请求获取用户列表
    // pagenum = 1  es6 语法给个默认值1
    async getUsersData (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get('users', config)
      // console.log(res)
      this.usersData = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
      //   .then(res => {
      //     console.log(res)
      //     this.usersData = res.data.data.users
      //     this.total = res.data.data.total
      //     this.pagenum = res.data.data.pagenum
      //   })
    },
    // 点击分页
    currentPageChange (curPage) {
      // console.log(curPage)
      this.getUsersData(curPage, this.input3)
    },
    // 点击检索按钮，检索用户
    searchUsers () {
      // 由于input3 和input框已经使用v-model进行了双向数据绑定，所以可以直接获取input框的值
      // console.log(this.input3)
      // 调用getUsersData进行检索
      this.getUsersData(1, this.input3)
    },
    // 点击添加用户，显示添加用户对话框
    showAddUserDialog () {
      this.addUserdDialogVisible = true
    },
    // 点击取消按钮，隐藏添加用户对话框
    hideAddUserDialog () {
      this.addUserdDialogVisible = false
    },
    // 点击确定按钮，发送请求，添加数据
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      console.log(res)
      if (res.data.meta.status === 201) {
        // 关闭对话框
        this.addUserdDialogVisible = false
        // 清空数据
        this.$refs.addUserRef.resetFields()
        // 刷新页面
        this.getUsersData(1)
      }
    },
    // 删除用户
    async deleteUser (id) {
      // console.log(id)
      let res = await this.$axios.delete('users/' + id)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 800
        })
      }
      this.getUsersData()
    },
    // 修改用户状态
    async stateChange (id, mgstate) {
      // 传过来的是个对象，使用es6的解构语法
      // eslint配置有问题，不能使用下划线
      // const { id, mg_state }=res
      // console.log(id, mgState)
      let res = await this.$axios.put('users/' + id + '/state/' + mgstate)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '设置状态成功',
          type: 'success',
          duration: 800
        })
      }
    },
    // 显示编辑用户对话框
    showEditUserDialog (row) {
      // 点击显示编辑用户对话框时使用 slot-scope="scope" 将行对象传过来
      // console.log(row)
      this.dialogEditUserFormVisible = true
      // console.log(this.EditUserForm)
      this.EditUserForm.username = row.username
      this.EditUserForm.email = row.email
      this.EditUserForm.mobile = row.mobile
      this.EditUserForm.id = row.id
    },
    // 点击确定提交编辑用户信息
    async editUser () {
      console.log(this.EditUserForm.id)
      let res = await this.$axios.put('users/' + this.EditUserForm.id, {
        // 把编辑框中的值传给后台
        email: this.EditUserForm.email,
        mobile: this.EditUserForm.mobile
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 提示修改成功
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 800
        })
        // 关闭对话框
        this.dialogEditUserFormVisible = false
        // 刷新页面
        this.getUsersData()
      }
    }
  }
}
