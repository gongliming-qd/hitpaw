<template>
  <div>
    <el-dialog
      :title="'添加'+ title"
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
              >
                <el-option
                  class="w300"
                  v-for="item in ruleForm.keyOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="缩略图："
              prop="preImg"
            >
              <el-upload
                style="display:inline-block"
                :limit="1"
                action=''
                list-type="picture-card"
                :on-remove="removeImg"
                :class="ruleForm.preImg.length===0? '':'none'"
                :http-request="changeImg"
                :file-list="ruleForm.preImg"
              >
                <i
                  v-if="ruleForm.preImg.length==0"
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
            <el-form-item
              label="上传文件："
              prop="preFile"
            >
              <el-upload
                :limit="2"
                action=''
                :on-remove="removeFile"
                :class="ruleForm.preFile.length < 1? '':'none'"
                :http-request="changeFile"
                :file-list="ruleForm.preFile"
              >
                <el-button
                  :disabled="ruleForm.preFile.length >= 1"
                  slot="trigger"
                  size="small"
                  type="primary"
                >上传文件</el-button>

              </el-upload>
            </el-form-item>
            <el-form-item
              label="上传文件："
              prop=""
            >
              <el-upload
                :limit="2"
                action=''
                :on-remove="removeOutsideFile"
                :class="ruleForm.preOutsideFile.length < 1? '':'none'"
                :http-request="changeOutsideFile"
                :file-list="ruleForm.preOutsideFile"
              >
                <el-button
                  :disabled="ruleForm.preOutsideFile.length >= 1"
                  slot="trigger"
                  size="small"
                  type="primary"
                >上传文件</el-button>
              </el-upload>
              <div style="color:#ccc">备注：此字段用于获取上传音频的时长，适用于音频文件</div>
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
            <el-form-item
              label="标签："
              prop=""
              style="width:500px"
            >
              <el-tag
                :key="tag"
                v-for="tag in tag.file"
                closable
                :disable-transitions="false"
                @close="handleTagClose(tag)"
              >
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="tag.inputVisible"
                v-model="tag.inputValue"
                ref="saveTagInput"
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
              >+ New Tag</el-button>
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
import { axiosFormData } from '@/util/common.js'
import { getLanguageKeylist } from '@/api/product.js'

export default {
  data () {
    return {
      uploadApi: '/api/material/uploadfile',
      tableLoading: false,
      ruleForm: {
        t_id: '',
        title: '', // 标题
        key: '',
        keyOptions: [],
        status: 1,
        ImgUrl: '',
        preImg: [],
        FileUrl: '',
        preFile: [],
        FileOutsideUrl: '',
        preOutsideFile: []
      },
      // 标签部分
      tag: {
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
          { required: true, message: '请输入key', trigger: 'blur' }
        ],
        preImg: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ],
        preFile: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible () {
      this.getKeyBySearch()
      console.log(this.appendId)
      // 清空默认数据
      this.ruleForm.title = ''
      this.ruleForm.t_id = this.appendId
      this.ruleForm.status = 1
      this.ruleForm.key = ''
      this.ruleForm.tag = ''
      this.tag.file = []
      this.ruleForm.preImg = []
      this.ruleForm.ImgUrl = ''
      this.ruleForm.preFile = []
      this.ruleForm.FileUrl = ''
      this.ruleForm.FileOutsideUrl = ''
      this.ruleForm.preOutsideFile = []
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String
    },
    appendId: {
      type: Number
    }
  },
  methods: {

    // 缩略图预览去除
    removeImg (file, fileList) {
      this.ruleForm.preImg = fileList
    },
    // 缩略图预览选择图片
    changeImg (file) {
      // 获取临时本地url
      this.ruleForm.ImgUrl = window.URL.createObjectURL(file.file)
      // 预览列表重新搞,包括存储文件file
      let obj = { name: 'img', url: this.ruleForm.ImgUrl, fileUrl: file.file }
      this.ruleForm.preImg = []
      this.ruleForm.preImg.push(obj)
    },
    // 文件
    removeFile (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.ruleForm.preFile = fileList
    },
    // 文件
    changeFile (file) {
      console.log(file.file)
      this.ruleForm.FileUrl = window.URL.createObjectURL(file.file)
      let obj = { name: file.file.name, url: this.ruleForm.FileUrl, fileUrl: file.file }
      console.log(obj)
      this.ruleForm.preFile = [...[obj]]
      console.log(this.ruleForm.preFile)
    },
    // 附加文件
    removeOutsideFile (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.ruleForm.preOutsideFile = fileList
    },
    // 附加文件
    changeOutsideFile (file) {
      console.log(file.file)
      this.ruleForm.FileOutsideUrl = window.URL.createObjectURL(file.file)
      let obj = { name: file.file.name, url: this.ruleForm.FileOutsideUrl, fileUrl: file.file }
      console.log(obj)
      this.ruleForm.preOutsideFile = [...[obj]]
      console.log(this.ruleForm.preOutsideFile)
    },
    // 标签部分
    // 1. 删除标签
    handleTagClose (tag) {
      this.tag.file.splice(this.tag.file.indexOf(tag), 1)
    },
    // 2. 显示输入框
    showInput () {
      this.tag.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 3. 新增tag
    handleInputConfirm () {
      let inputValue = this.tag.inputValue
      if (inputValue) {
        this.tag.file.push(inputValue)
      }
      this.tag.inputVisible = false
      this.tag.inputValue = ''
    },
    // 关闭
    handleClose () {
      this.$emit('update:visible', false)
      this.$refs.ruleForm.resetFields();
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
      let fd = new FormData()
      fd.append('t_id', this.ruleForm.t_id)
      fd.append('title', this.ruleForm.title)
      fd.append('key', this.ruleForm.key)
      fd.append('status', this.ruleForm.status)
      fd.append('tag', this.tag.file.join(','))
      fd.append('files[]', this.ruleForm.preImg[0].fileUrl)
      this.ruleForm.preFile.forEach(ele => {
        fd.append('files[]', ele.fileUrl)
      })
      this.ruleForm.preOutsideFile.forEach(ele => {
        fd.append('files[]', ele.fileUrl)
      })

      this.tableLoading = true
      let res = await axiosFormData({
        url: this.uploadApi,
        data: fd
      })
      this.tableLoading = false
      if (res.data.msg === 'OK' && res.data.code === 200) {
        this.$message.success('上传成功！')
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
      this.ruleForm.keyOptions = Array.from(new Set(results.data.data))
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
