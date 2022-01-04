<template>
  <div>
    <el-dialog
      title="添加素材类型"
      :visible.sync="visible"
      width="40%"
      center
      :before-close="handleClose"
    >
      <div class="box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="105px"
          class="demo-ruleForm"
          label-position="left"
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
            <el-input
              class="w300"
              v-model="ruleForm.key"
            ></el-input>
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
        >添 加</el-button>
        <el-button
          size="mini"
          @click="handleClose"
        >取 消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addPaletteList } from '@/api/product.js'
import { objectDeleStringNone, setChangeMenu } from '@/util/common.js'

export default {
  data () {
    return {
      ruleForm: {
        title: '', // 标题
        key: '', // 备注
        status: '' // 状态
      },
      rules: {
        title: [{ required: true, message: '请输入名称(内部)', trigger: 'blur' }],
        key: [{ required: true, message: '请输入名称key', trigger: 'blur' }],
        status: [{ required: true, message: '请选择上架类型', trigger: 'blur' }]
      }
    }
  },
  watch: {
    visible () {
      // 清空默认数据
      this.ruleForm.title = ''
      this.ruleForm.key = ''
      this.ruleForm.status = ''
    }
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  methods: {
    async addProduct () {
      let params = {
        ...objectDeleStringNone(this.ruleForm)
      }
      console.log(params)

      let results = await addPaletteList(params)
      if (results.data.code === 200 && results.data.msg === 'OK') {
        this.$message.success('操作成功！')
        // 菜单重新加载
        setChangeMenu()
        this.$emit('change')
        return true
      }
    },
    // 关闭
    handleClose () {
      this.$emit('update:visible', false)
      this.$refs.ruleForm.resetFields();
    },
    // 保存
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认添加【素材名称】吗？添加后不可删除', {
            confirmButtonText: '保存',
            cancelButtonText: '取消'
          })
            .then( async (res) => {
              if (res === 'confirm') {
                await this.addProduct()
                this.handleClose()
              }
            })
            .catch(() => { })
        } else {
          return false
        }
      })
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
</style>
