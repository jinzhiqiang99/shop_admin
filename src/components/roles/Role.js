export default {
  data () {
    return {
      rolesData: [
        {
          roleName: '主管',
          roleDesc: '技术负责人'
        }
      ],
      // 是否显示分配角色对话框
      dialogAssignRightsFormVisible: false,
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 点击的当前行的id
      roleId: 0
    }
  },
  created () {
    this.loadRolesData()
    this.loaderRrightsData()
  },
  methods: {
    // 加载角色列表数据
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      // console.log(res)
      this.rolesData = res.data.data
    },
    // 自定义索引
    indexMethod (index) {
      return index
    },
    // 加载权限数据
    async loaderRrightsData () {
      let res = await this.$axios.get('rights/tree')
      // console.log(res)
      this.treeData = res.data.data
    },
    // 显示分配权限对话框
    showAssignRightsDialog (row) {
      // console.log(row)
      this.dialogAssignRightsFormVisible = true
      // 获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })
      // 设置选中状态
      // 显示对话框是异步操作，dom更新是异步的
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
      // 保存当前行的id 用于确定分配权限
      this.roleId = row.id
    },
    // 点击确定 分配权限
    async assignRights () {
      // 获取全选和半选的key(id)
      let key1 = this.$refs.tree.getHalfCheckedKeys()
      let key2 = this.$refs.tree.getCheckedKeys()

      let key = [...key1, ...key2]
      // console.log(this.roleId)
      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: key.join(',')
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        // 关闭对话框
        this.dialogAssignRightsFormVisible = false
        // 提示信息
        this.$message({
          message: '更新数据成功',
          type: 'success',
          duration: 800
        })
        // 更新页面
        this.loadRolesData()
      }
    }
  }
}
