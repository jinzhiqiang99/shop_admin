<template>
  <el-container>
    <!-- 头部 -->
    <el-header>

      <el-row>
        <el-col :span="8">
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          <span>这是一个副标题</span><a
            @click.prevent="loginOut"
            href="#"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <!--
          el-menu：菜单组件
          default-active="2" 默认高亮 值:index
          @open="handleOPen" 处理打开
          @close="handle" 处理关闭
          active-text-color 高亮颜色
          el-menu 子菜单（可以展开）
          el-menu-item 菜单元素（最小单位）

          开启路由：
           1，给wl-menu添加 :router="true" 属性
           2，以index作为path路径进行跳转
         -->
        <el-menu
          :router="true"
          :default-active="handleUrlPath()"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">角色列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出
    async loginOut () {
      // 先打印confirm是不是promise  let res = confirm...
      // 点击取消会报异常
      try {
        await this.$confirm('是否退出？', '提示', {
          confirmButtonText: '确定',
          cancelBUttonText: '取消',
          type: 'warning'

        })
        console.log('点击了确定')
        this.$message({
          type: 'success',
          message: '已退出',
          duration: 800
        })
        // 退出时删除token
        localStorage.removeItem('token')
        // 回到登录页
        this.$router.push('/login')
      } catch (err) {
        console.log('点击了取消')
        this.$message({
          type: 'info',
          message: '已取消',
          duration: 800
        })
      }
    },
    handleUrlPath () {
      return this.$route.path
    }
  }
}

</script>
<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-header {
  background: #b3c1cd;
  /* header中有再带的padding 需要清除 */
  padding: 0;
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
/* 标题居中 */
h2 {
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.col3 {
  line-height: 60px;
  text-align: right;
  padding-right: 30px;
  a {
    color: orange;
  }
}
</style>
