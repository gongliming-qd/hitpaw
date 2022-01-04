<template>
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
                placeholder="请输入ID / 名称 / 标签"
                v-model="searchForm.condition"
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
            >添加产品</el-button>
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
          prop="id"
          label="ID"
          align="center"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="title"
          label="产品名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="val=>switchChange(scope.row, val)"
              :active-value="1"
              :inactive-value="2"
            > </el-switch>
            <span
              v-if="scope.row.status === 1"
              class="Color-green"
            >启用中</span>
            <span
              v-else
              class="Color-red"
            >已停用</span>
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
              @click="openEditSingle(scope.row)"
            >编辑</el-button>
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
    ></Append-single>

    <!-- 单个修改 -->
    <Edit-single
      :visible.sync="aboutEdit.visible"
      @change="clickSearch"
      :propData="aboutEdit.propData"
    ></Edit-single>
  </div>
</template>

<script>
import { getProductList, addOrUpdateProduct } from '@/api/product.js'
import { objectDeleStringNone } from '@/util/common.js'

import Pagination from '@/components/pagination/index.vue'
import AppendSingle from './children/appendSingle.vue'
import EditSingle from './children/editSingle.vue'
import _ from 'lodash'
export default {
  data () {
    return {
      // 顶部数据
      searchForm: {
        condition: ''
      },
      // table区域
      tableData: [],
      tableLoading: false,

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
      // 修改部分
      aboutEdit: {
        visible: false,
        propData: {}
      }
    }
  },
  methods: {
    // 原始获取数据
    async getData (obj) {
      this.tableLoading = true
      let results = await getProductList({ ...obj })
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
      this.pagination.page = keep ? this.pagination.page : 1
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
    // 上架下架切换
    async switchChange (item, val) {
      console.log(val)
      this.tableLoading = true
      // 修改值
      let data = {
        id: item.id,
        status: item.status
      }
      let results = await addOrUpdateProduct(data)
      console.log(results)
      if (results.data.code === 200 && results.data.msg === 'OK') {
        this.$message.success('操作成功！')
      } else {
        this.$message.error(results.data.data)
      }
      this.tableLoading = false
    },
    // 打开新增
    openAddSingle () {
      this.aboutAppend.visible = true
    },
    // 打开编辑
    openEditSingle (row) {
      this.aboutEdit.visible = true
      this.aboutEdit.propData = row
    }
  },

  created () {
    this.clickSearch()
  },

  components: {
    Pagination, AppendSingle, EditSingle
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
