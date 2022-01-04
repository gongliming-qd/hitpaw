<template>
  <div>
    <div v-if="row[ prop +'_SetInChange_'] || false">
      <el-input
        v-model="tableInputState"
        clearable
        size="small"
        style="width: 200px"
      ></el-input>
      <el-button
        size="mini"
        class="ml5"
        @click="closeInputChange(prop , row)"
      >取消</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="saveInputChange(prop, row)"
      >保存</el-button>
    </div>
    <div class="flexCenter" v-else>
      <span>{{row[prop]}}</span> 
      <i
        @click="openSingleEdit(prop, row)"
        class="el-icon-edit-outline editIcon"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      row: {},
      tableInputState: ""
    }
  },
  props: {
    rows: {
      type: Object
    },
    tableInEdit: {
      type: Boolean
    },
    prop: {
      type: String
    }
  },
  watch:{
    '$props.rows'(){
      this.row = { ...this.$props.rows }
    }
  },
  created () {
    this.row = { ...this.$props.rows }
  },
  methods: {
    // 打开编辑功能
    openSingleEdit (prop, row) {
      if (this.$props.tableInEdit) {
        this.$message.warning("请先完成当前编辑操作！")
        return
      } else {
        this.tableInputState = row[prop]
        this.$emit('update:tableInEdit', true)
        this.$set(row, `${prop}_SetInChange_`, true)
      }
    },
    // 点击取消
    closeInputChange (prop, row) {
      this.$emit('update:tableInEdit', false)
      this.$set(row, `${prop}_SetInChange_`, false)
    },
    // 点击保存
    saveInputChange (prop, row) {
      this.$emit('update:tableInEdit', false)
      this.$set(row, `${prop}_SetInChange_`, false)
      this.$set(row, prop, this.tableInputState)
      this.tableInputState = ""
      this.$emit('submit', prop, row)
    }
  },
}
</script>

<style scoped lang="less">
.flexCenter{
  display: flex;
  align-items: center;
  justify-content: center;
}
.editIcon {
  cursor: pointer;
  color: skyblue;
  margin-left: 10px;
  font-size: 17px;
}
</style>
