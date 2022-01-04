<template>
  <div>
    <el-dialog
      :title="`素材(${propData.title})`"
      :visible.sync="visible"
      width="60%"
      center
      :before-close="handleClose"
    >
      <div
        class="box"
        v-loading="tableLoading"
      >
        <!-- 顶部数据 -->
        <div class="topSearch">
          <el-form
            class="searchForm"
            label-width="0"
            @submit.native.prevent
          >
            <el-form-item label="">
              <div class="flexBetween">
                <div>
                  <el-input
                    placeholder="请输入名称"
                    v-model="searchForm.title"
                    clearable
                    size="small"
                    style="width: 250px"
                    @change="()=>{clickSearch()}"
                  ></el-input>
                  <el-button
                    size="small"
                    type="primary"
                    @click="()=>{clickSearch()}"
                  >查询</el-button>
                </div>
                <el-button
                  size="small"
                  type="primary"
                  @click="openAddSingle"
                >添加</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <!-- 内容区域 -->
        <div class="contend">
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column
              prop="title"
              label="名称（内部）"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="rank"
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                <TableEditSingle
                  :rows.sync="scope.row"
                  :tableInEdit.sync="tableInEdit"
                  :prop="'rank'"
                  @submit="switchChange"
                ></TableEditSingle>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="200"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="openDele(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <Pagination
          v-if="tableData.length > 0"
          :total.sync="pagination.total"
          :page.sync="pagination.page"
          :page_size.sync="pagination.page_size"
          @paginationChange="paginationChange"
        ></Pagination>
        <!-- 单个新增 -->
        <Append-single
          :visible.sync="aboutAppend.visible"
          @change="clickSearch"
          :propData="propData"
        ></Append-single>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { getProductChildPaletteDetail, updateProductChildPaletteDetail, deleProductChildPaletteDetail } from '@/api/product.js'
import { objectDeleStringNone } from '@/util/common.js'

import Pagination from '@/components/pagination/index.vue'
import TableEditSingle from '@/components/tableEditSingle/index.vue'
import AppendSingle from './typeManageAppend.vue'

export default {
  data () {
    return {
      tableLoading: false,
      searchForm: {
        title: '',
        t_id: ''
      },
      // table区域
      tableInEdit: false,
      tableData:[],
      // 分页器
      pagination: {
        total: 300,
        page: 1,
        page_size: 5
      },
      // 新增部分
      aboutAppend: {
        visible: false
      },
    }
  },
  watch: {
    visible () {
      if (this.$props.visible) {
        this.searchForm.t_id = this.propData.id
        this.tableInEdit = false
        this.clickSearch()
      } else {
      }
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    propData: {
      type: Object
    }
  },
  methods: {
    // 原始获取数据
    async getData (obj) {
      this.tableLoading = true
      let results = await getProductChildPaletteDetail({ ...obj })
      console.log(results)
      if (results.data.code === 200 && results.data.msg === 'OK') {
        this.tableData = _.cloneDeep(results.data.data)
        this.pagination.total = results.data.page.total
      } else {
        this.$message.warning(results.data.msg)
      }
      this.tableLoading = false
    },
    // 点击搜索获取数据
    clickSearch (keep) {
      // keep用于判断是否需要保持当前页查询
      if (keep) {
        // 1. 判断删除的元素是否是当前页唯一一个。是的话需要往上一页走
        if (this.pagination.page > 1 && this.tableData.length === 1) {
          this.pagination.page = this.pagination.page - 1
        }
      } else {
        this.pagination.page = 1
      }
      this.getData({
        page: this.pagination.page,
        page_size: this.pagination.page_size,
        ...objectDeleStringNone(this.searchForm)
      })
    },
    // 分页获取数据
    paginationChange (page, pageSize) {
      this.getData({ page, page_size: pageSize, ...objectDeleStringNone(this.searchForm) })
    },
    // 更新单个
    async switchChange (prop, row) {
      // prop ：字段名字, row: 该行的值
      this.tableLoading = true
      let results = await updateProductChildPaletteDetail({
        id: row.id,
        [prop]: row[prop]
      })
      if (results.data.code === 200 && results.data.msg === 'OK') {
        this.$message.success('操作成功！')
        this.clickSearch(true)
      } else {
        this.$message.error(results.data.data)
      }
      this.tableLoading = false
    },
    // 打开新增
    openAddSingle () {
      this.aboutAppend.visible = true
    },
    // 打开删除
    openDele (row) {
      this.$confirm('确认删除当前分类吗？', {
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(async (res) => {
          if (res === 'confirm') {
            await this.deleApi(row)
            this.clickSearch(true)
          }
        })
    },
    // 删除操作
    async deleApi (row) {
      let res = await deleProductChildPaletteDetail({
        id: row.id,
        pro_id: parseInt(this.$route.query.Product)
      })
      if (res.data.msg === 'OK' && res.data.code === 200) {
        this.$message.success('删除成功！')
      } else {
        this.$message.error(res.data.msg)
      }
    },
    // 关闭
    handleClose () {
      this.$emit('change', true)
      this.$emit('update:visible', false)
    }
  },
  components: {
    Pagination, AppendSingle, TableEditSingle
  }
}
</script>

<style scoped lang="less">
.box {
  padding: 15px 15px;
}
.topSearch {
  background-color: #fff;
  border-radius: 10px;
}
</style>
