<template>
  <div>
    <el-table
      :data="usersData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户状态"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pagenum"
      :page-size="2"
      @current-change="currentPageChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      usersData: [{
        // username: '王小虎',
        // email: 'xiaohu@163.com',
        // mobile: 123456,
        // mobile: 111
      }],
      // 定义总页数
      total: 0,
      // 当前页
      pagenum: 1
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    // pagenum = 1  es6 语法给个默认值1
    getUsersData (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        this.usersData = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      })
    },
    currentPageChange (curPage) {
      console.log(curPage)
      this.getUsersData(curPage)
    }
  }
}
</script>
<style>
</style>
