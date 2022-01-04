<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="page_sizeRange"
      :page-size="page_size"
      layout="total, prev, pager, next,sizes "
      :total="total"
      v-loading="loading"

    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 100
    },
    page_sizeRange: {
      type: Array,
      default: () => {
        return [5, 10, 20, 25]
      }
    },
    page_size: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSizeChange (now) {
      this.$emit('update:page_size', now)
      this.$emit('update:page', 1)
      this.$emit('paginationChange', 1, now)
    },
    handleCurrentChange (now) {
      this.$emit('update:page', now)
      this.$emit('paginationChange', now, this.$props.page_size)
    }
  }
}
</script>

<style scoped lang="less">
.pagination{
      margin-top: 100px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
</style>
