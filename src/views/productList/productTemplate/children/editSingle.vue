<template>
  <div>
    <el-dialog
      :title="`编辑 ${propData.title}`"
      :visible.sync="visible"
      width="40%"
      center
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
              label="名称(内部)："
              prop="title"
            >
              <el-input
                class="w300"
                v-model="ruleForm.title"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="名称key："
              prop="key"
            >
              <el-select
                v-model="ruleForm.key"
                filterable
                clearable
                class="w300"
                placeholder=""
              >
                <el-option
                  class="w300"
                  v-for="item in keyOptions"
                  :key="item"
                  :label="item"
                  :value="item"
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
            <el-form-item
              label="生效国家："
              prop=""
              style="width:500px"
            >
              <el-tag
                :key="country"
                v-for="country in country.file"
                closable
                :disable-transitions="false"
                @close="handlecountryClose(country)"
              >
                {{country}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="country.inputVisible"
                v-model="country.inputValue"
                ref="savecountryInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
              >+ New country</el-button>
            </el-form-item>
            <el-form-item
              label="上架："
              prop="status"
            >
              <el-radio-group v-model="ruleForm.status">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="2">下架</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>
        </div>
        <div class="flex mt40">
          <el-button
            size="mini"
            type="primary"
            style="marginRight: 100px"
            @click="submit('ruleForm')"
          >保 存</el-button>
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
import { getLanguageKeylist, updateProductPaletteList } from '@/api/product.js'

export default {
  data () {
    return {
      tableLoading: false,
      ruleForm: {
        title: '', // 标题
        key: '',
        rank: '',
        status: 1,
        id: null
      },
      keyOptions: [],

      // 标签部分
      country: {
        file: [], // 内容
        inputVisible: false, // 输入框是否显示
        inputValue: '' // 输入框绑定的值
      },
      // 表单鉴权
      rules: {
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请选择key', trigger: 'change' }
        ],
        rank: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择上架状态', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible () {
      if (this.$props.visible) {
        this.getKeyBySearch()
        console.log(this.propData)
        // 清空默认数据
        this.ruleForm.title = this.$props.propData.title
        this.ruleForm.status = this.$props.propData.status
        this.ruleForm.rank = this.$props.propData.rank
        this.ruleForm.key = this.$props.propData.key
        this.ruleForm.id = this.$props.propData.id
        this.country.file = this.$props.propData.country ?  this.$props.propData.country.split(',') : []
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

    // 标签部分
    // 1. 删除标签
    handlecountryClose (country) {
      this.country.file.splice(this.country.file.indexOf(country), 1)
    },
    // 2. 显示输入框
    showInput () {
      this.country.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.savecountryInput.$refs.input.focus()
      })
    },
    // 3. 新增country
    handleInputConfirm () {
      let inputValue = this.country.inputValue
      if (inputValue) {
        this.country.file.push(inputValue)
      }
      this.country.inputVisible = false
      this.country.inputValue = ''
    },
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
      let res = await updateProductPaletteList({ ...this.ruleForm, country: this.country.file.join(',') })
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
        key: ''
      }
      let results = await getLanguageKeylist(params)
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
