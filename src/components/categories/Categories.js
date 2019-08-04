export default {
  /* eslint-disable */
  // 商品分类表格数据
  data() {
    return {
      catTableData: [
        {
          cat_name: '电视',
          cat_deleted: '是',
          cat_level: '一级'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      // 是否显示添加分类对话框
      dialogAddCatFormVisible: false,
      // 添加分类表单
      addCatForm: {
        cat_name: '', // 分类名称
        cat_pid_arr: [] // 父级名称数组
      },
      // 级联选择器的数据
      options: [],
      defaultProps2: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created() {
    this.loaderCategories()
    this.loaderCategories2()
  },
  methods: {
    // 获取商品数据
    async loaderCategories() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      // console.log(res)
      this.catTableData = res.data.data
    },
    // 显示添加分类对话框
    showAddCatDialog() {
      this.dialogAddCatFormVisible = true
    },
    // 获取两级商品数据
    async loaderCategories2() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.options = res.data.data
    },
    // 点击确定 发送请求
    async addCat() {
      let { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1], // 父 id 指的是数组的最后一个元素
        cat_name,
        cat_level: 2
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        // 关闭对话框
        this.dialogAddCatFormVisible = false
        // 提示信息
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 800
        })
        // 刷新页面
        this.loaderCategories()
      }
    }
  }
}
