<template>
  <div
    class="box"
    v-loading="tableLoading"
  >
    <!-- 顶部数据 -->
    <div class="topSearch flexBetween">
      <el-button
        size="small"
        type="primary"
        @click="openAddSingle"
      >添加</el-button>
      <el-upload
        :limit="1"
        action=''
        class="upload-demo"
        :http-request="changeFile"
        :show-file-list="false"
        ref="upload"
      >
        <el-button
          size="small"
          icon="el-icon-upload"
          type="primary"
        >表格导入</el-button>
      </el-upload>

    </div>

    <!-- 内容区域 -->
    <div class="contend">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%"
        height="700"
      >
        <el-table-column
          prop="key"
          label="key"
          align="center"
          fixed="left"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="cn"
          label="中文"
          align="center"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="en"
          label="英文"
          align="center"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="tr"
          label="土耳其"
          align="center"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="de"
          label="德语"
          align="center"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="es"
          label="西语"
          align="center"
          width="150"
        > </el-table-column>
        <el-table-column
          prop="ru"
          label="俄语"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          width="150"
          prop="fr"
          label="法语"
          align="center"
        > </el-table-column>
        <el-table-column
          width="150"
          prop="jp"
          label="日语"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="br"
          label="葡萄"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="ar"
          label="阿语"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="tw"
          label="繁体中文"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="it"
          label="意语"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="kr"
          label="韩语"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="nl"
          label="荷兰语"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="in"
          label="印度"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          prop="id"
          label="印尼"
          width="150"
          align="center"
        > </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
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

import { getLanguageList } from '@/api/product.js'
import { axiosFormData } from '@/util/common.js'

import AppendSingle from './children/appendSingle.vue'
import EditSingle from './children/editSingle.vue'

import _ from 'lodash'
export default {
  data () {
    return {
      // 顶部数据
      uploadApi: '/api/material/translate/excelimport',
      // table区域
      tableData: [],
      tableLoading: false,

      // 分页器
      pagination: {
        total: 300,
        page: 1,
        page_size: 100000000
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
      let results = await getLanguageList({ ...obj })
      console.log(results)
      if (results.data.code === 200 && results.data.msg === 'OK') {
        this.tableData = _.cloneDeep(results.data.data)
      } else {
        this.$message.warning(results.data.msg)
      }
      this.tableLoading = false
    },
    // 点击搜索获取数据
    clickSearch () {
      this.getData({
        page: this.pagination.page,
        page_size: this.pagination.page_size
      })
    },
    // 分页获取数据
    paginationChange (page, pageSize) {
      this.getData({
        page,
        page_size: pageSize
      })
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
    // 上传excel
    async changeFile (file) {
      console.log('file', file)
      let fd = new FormData()
      fd.append('files[]', file.file)
      this.tableLoading = true
      let res = await axiosFormData({
        url: this.uploadApi,
        data: fd
      })
      this.tableLoading = false
      if (res.data.msg === 'OK' && res.data.code === 200) {
        this.$message.success('上传成功！')
        this.$refs.upload.clearFiles()
        this.clickSearch()
      } else {
        this.$message.error(res.data.msg)
      }
    }
  },

  created () {
    this.clickSearch()
  },

  components: {
    AppendSingle, EditSingle
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
  margin-bottom: 22px;
}
</style>
