<template>
  <div>
    <el-dialog
      title="添加分类"
      :visible.sync="visible"
      width="40%"
      center
      append-to-body

      :before-close="handleClose"
    >
      <div v-loading="tableLoading">
        <div class="box">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="105px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="名称："
              prop="m_id"
            >
              <el-select
                v-model="ruleForm.m_id"
                filterable
                clearable
                class="w300"
                placeholder=""
              >
                <el-option
                  class="w300"
                  v-for="item in keyOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="序号："
              prop="rank"
            >
              <el-input
                class="w300"
                v-model="ruleForm.rank"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="flex mt40">
          <el-button
            size="mini"
            type="primary"
            style="marginRight: 100px"
            @click="submit('ruleForm')"
          >添 加</el-button>
          <el-button
            size="mini"
            @click="handleClose"
          >取 消</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { searchProductChildpalettelist, updateProductChildPaletteDetail } from '@/api/product.js'

export default {
  data () {
    return {
      tableLoading: false,
      ruleForm: {
        m_id: '',  // 名称
        rank: '', // 排序
        pro_id: parseInt(this.$route.query.Product), // 产品id
        l_id: parseInt(this.$route.query.Palette), // 类型id
        t_id : '',  // 产品素材分类id
        status:1,
      },
      keyOptions: [],
     
      // 表单鉴权
      rules: {
        m_id: [
          { required: true, message: '请选择名称', trigger: 'blur' }
        ],
        rank: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible () {
      if(this.visible){
        this.ruleForm.t_id =  this.$props.propData.id
        this.ruleForm.m_id = ''
        this.ruleForm.rank = ''
        this.getKeyBySearch()
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

    // 关闭
    handleClose () {
      this.$emit('update:visible', false)
    },
    // 保存
    submit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.addProduct()
          this.handleClose()
        } else {
          return false
        }
      })
    },
    // 保存
    async addProduct () {
      this.tableLoading = true
      let res = await updateProductChildPaletteDetail({ ...this.ruleForm})
      this.tableLoading = false
      console.log(res)
      if (res.data.msg === 'OK' && res.data.code === 200) {
        this.$message.success('操作成功！')
        this.$emit('change')
      } else {
        this.$message.error(res.data.msg)
      }
    },
    // key 下拉选取
    async getKeyBySearch () {
      let params = {
        t_id : this.$props.propData.m_id   // 素材类型id
      }
      let results = await searchProductChildpalettelist(params)
      this.keyOptions = Array.from(new Set(results.data.data))
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.none /deep/ .el-upload--picture-card {
  display: none;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
