<template>
  <div>
    <!-- 添加商品 -->
    <el-button
      type="success"
      plain
      @click="go2goodsAdd"
    >添加商品</el-button>
    <!-- 数据表格 -->
    <el-table
      :data="goodsTableData"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      > </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
      >
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsTableData: []
    }
  },
  created () {
    this.loaderGoodsData()
  },
  methods: {
    // 获取商品列表
    async loaderGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res)
      this.goodsTableData = res.data.data.goods
    },
    // 跳转到添加商品页
    go2goodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
