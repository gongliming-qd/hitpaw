<template>
  <div class="breadcrumb">
    <!-- 横线 -->
    <transition name="fade" appear>
      <div class="transPosition" :key="$route.query.componentUrl||1">
       <span class="line"></span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, index) in breadCrumbList"
            :key="index"
          >
            {{item}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    breadCrumbList: {
      type: Array
    }
  }
}
</script>

<style scoped lang="less">
.breadcrumb {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
  color: @color;
  background-color: white;
  margin-bottom: 10px;
  .line {
    width: 3px;
    height: 17px;
    background: @specialColor;
    border-radius: 2px;
    margin-right: 8px;
  }
  .transPosition{
    position: absolute;
    display: flex;
  }
}
</style>
