<template>
  <el-container>
    <!-- 头部 -->
    <el-header>Header
      <h1>这是home里面的h1</h1>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>
<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background: #b3c1cd;
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
