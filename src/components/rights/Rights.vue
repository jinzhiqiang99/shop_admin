<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表 -->
    <el-table
      :data="rightData"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      >

      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
      >
        <!-- 自定义列可以将数据处理后在赋值 -->
        <template slot-scope="scope">
          <!-- scope.row  拿到一整行的信息 -->
          <span v-if="scope.row.level==0">一级</span>
          <span v-else-if="scope.row.level==2">二级</span>
          <!-- 最后一个不需要等于号后面的 -->
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      rightData: [{
        authName: '商品名称',
        path: 'goods',
        level: '一级'
      }]
    }
  },
  created () {
    this.loaderRightsData()
  },
  methods: {
    // 一进页面发送请求获取所有权限列表
    async loaderRightsData () {
      let res = await this.$axios.get('rights/list')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.rightData = res.data.data
      }
    },
    // 自定义索引
    indexMethod (index) {
      // console.log(index)
      return index
    }
  }
}
</script>
<style>
.el-breadcrumb {
  height: 40px;
  line-height: 40px !important;
  padding-left: 30px;
  background-color: #d4dae0;
}
</style>
