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
            >添加分类</el-button>
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
          prop="m_id"
          label="分类ID"
          align="center"
          width="100"
        > </el-table-column>
        <el-table-column
          prop="title"
          label="分类名（内部）"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="key"
          label="分类名称key"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="素材管理"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openPaletteDetail(scope.row)"
            >素材</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="m_count"
          label="包含素材数"
          align="center"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="rank"
          label="序号"
          align="center"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="country"
          label="生效国家"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.country">
              <el-tag
                v-for="item in scope.row.country.split(',')"
                :key="item"
                class="mr10 mb5"
              >{{item}}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="上架"
          align="center"
          width="180"
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
              class="mr20"
            >编辑</el-button>
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
      :appendId="searchForm"
    ></Append-single>

    <!-- 单个修改 -->
    <Edit-single
      :visible.sync="aboutEdit.visible"
      @change="clickSearch"
      :propData="aboutEdit.propData"
    ></Edit-single>

    <!-- 素材管理 -->
    <Palette-type-manage
    :visible.sync="aboutTypeManage.visible"
      @change="clickSearch"
      :propData="aboutTypeManage.propData"
    >
    </Palette-type-manage>

  </div>
</template>

<script>
import { getProductPaletteList, updateProductPaletteList, deleProductPaletteList } from '@/api/product.js'
import { objectDeleStringNone } from '@/util/common.js'

import Pagination from '@/components/pagination/index.vue'
import AppendSingle from './children/appendSingle.vue'
import EditSingle from './children/editSingle.vue'
import PaletteTypeManage from './children/paletteTypeManage.vue'
import _ from 'lodash'
export default {
  data () {
    return {
      // 顶部数据
      searchForm: {
        condition: '',
        m_id: 1,
        pro_id: 1
      },
      // table区域
      tableData: [{}],
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
      },
      // 修改状态url
      uploadApi: '/api/material/editpalette',
      // 素材管理部分
      aboutTypeManage: {
        visible: false,
        propData: {}
      },
    }
  },
  methods: {
    // 原始获取数据
    async getData (obj) {
      this.tableLoading = true
      let results = await getProductPaletteList({ ...obj })
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
      this.searchForm.m_id = parseInt(this.$route.query.Palette)
      this.searchForm.pro_id = parseInt(this.$route.query.Product)
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
      let results = await updateProductPaletteList({
        id: item.id,
        status: item.status
      })
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
      let res = await deleProductPaletteList({
        id: row.id,
        pro_id: row.pro_id
      })
      if (res.data.msg === 'OK' && res.data.code === 200) {
        this.$message.success('删除成功！')
      } else {
        this.$message.error(res.data.msg)
      }
    },
    // 打开素材详情modal
    openPaletteDetail (row) {
        this.aboutTypeManage.visible = true
      this.aboutTypeManage.propData = row
    }
  },

  created () {
    this.clickSearch()
  },
  watch: {
    $route () {
      this.searchForm.condition = ''
      this.clickSearch()
    }
  },
  components: {
    Pagination, AppendSingle, EditSingle, PaletteTypeManage
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
