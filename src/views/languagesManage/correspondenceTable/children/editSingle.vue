<template>
  <div>
    <el-dialog
      title="编辑语言"
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
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="key："
            prop="key"
          >
            <el-input
              class="w300"
              v-model="ruleForm.key"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="中文："
            prop="cn"
          >
            <el-input
              class="w300"
              v-model="ruleForm.cn"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="英文："
            prop="en"
          >
            <el-input
              class="w300"
              v-model="ruleForm.en"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="土耳其："
            prop="tr"
          >
            <el-input
              class="w300"
              v-model="ruleForm.tr"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="德语："
            prop="de"
          >
            <el-input
              class="w300"
              v-model="ruleForm.de"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="西语："
            prop="es"
          >
            <el-input
              class="w300"
              v-model="ruleForm.es"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="俄语："
            prop="ru"
          >
            <el-input
              class="w300"
              v-model="ruleForm.ru"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="法语："
            prop="fr"
          >
            <el-input
              class="w300"
              v-model="ruleForm.fr"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="日语："
            prop="jp"
          >
            <el-input
              class="w300"
              v-model="ruleForm.jp"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="葡萄："
            prop="br"
          >
            <el-input
              class="w300"
              v-model="ruleForm.br"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="阿语："
            prop="ar"
          >
            <el-input
              class="w300"
              v-model="ruleForm.ar"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="繁体中文："
            prop="tw"
          >
            <el-input
              class="w300"
              v-model="ruleForm.tw"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="意语："
            prop="it"
          >
            <el-input
              class="w300"
              v-model="ruleForm.it"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="韩语："
            prop="kr"
          >
            <el-input
              class="w300"
              v-model="ruleForm.kr"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="荷兰语："
            prop="nl"
          >
            <el-input
              class="w300"
              v-model="ruleForm.nl"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="印度："
            prop="in"
          >
            <el-input
              class="w300"
              v-model="ruleForm.in"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="印尼："
            prop="id"
          >
            <el-input
              class="w300"
              v-model="ruleForm.id"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex mt40">
        <el-button
          size="mini"
          @click="handleClose"
          style="marginright: 100px"
        >取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="submit('ruleForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addOrUpdateLanguageList } from '@/api/product.js'

export default {
  data () {
    return {
      ruleForm: {
        id: '',
        key: '',
        cn: '',
        en: '',
        tr: '',
        de: '',
        es: '',
        ru: '',
        fr: '',
        jp: '',
        br: '',
        ar: '',
        tw: '',
        it: '',
        kr: '',
        nl: '',
        in: '',
        l_id: ''
      },
      rules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  watch: {
    visible () {
      // 清空默认数据
      this.ruleForm.id = this.$props.propData.id
      this.ruleForm.key = this.$props.propData.key
      this.ruleForm.cn = this.$props.propData.cn
      this.ruleForm.en = this.$props.propData.en
      this.ruleForm.tr = this.$props.propData.tr
      this.ruleForm.de = this.$props.propData.de
      this.ruleForm.es = this.$props.propData.es
      this.ruleForm.ru = this.$props.propData.ru
      this.ruleForm.fr = this.$props.propData.fr
      this.ruleForm.jp = this.$props.propData.jp
      this.ruleForm.br = this.$props.propData.br
      this.ruleForm.ar = this.$props.propData.ar
      this.ruleForm.tw = this.$props.propData.tw
      this.ruleForm.it = this.$props.propData.it
      this.ruleForm.kr = this.$props.propData.kr
      this.ruleForm.nl = this.$props.propData.nl
      this.ruleForm.in = this.$props.propData.in
      this.ruleForm.l_id = this.$props.propData.l_id
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
    async editProduct () {
      let params = {
        ...this.ruleForm
      }
      console.log(params)

      let results = await addOrUpdateLanguageList(params)
      if (results.data.code === 200 && results.data.msg === 'OK') {
        this.$message.success('操作成功！')
        this.$emit('change', true)
        return true
      }
    },
    // 关闭
    handleClose () {
      this.$emit('update:visible', false)
    },
    // 保存
    submit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editProduct()
          this.$emit('update:visible', false)
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
