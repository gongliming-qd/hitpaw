<template>
  <div class="rightUser">
    <el-popover
      placement="bottom"
      width="80"
      popper-class="changeMinWidth"
      trigger="hover"
    >
      <div></div>
      <div class="userIcon" slot="reference">
        <i class="el-icon-user-solid"></i>
        <span class="userName">{{ $store.state.user.userName }}</span>
      </div>
    </el-popover>
    <span class="toLogin" @click="leave" style="marginleft: -80px">退出</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    leave () {
      this.$router.push('/login')
    }
  },
  components: {},
  created () {
    console.log(this.$store.state.user.userName)
  }
}
</script>

<style scoped lang="less">
.rightUser {
  display: flex;
  margin-right: 100px;
  align-items: center;
  .userIcon {
    font-size: 30px;
    color: @specialColor;
    cursor: pointer;
    display: flex;
    align-items: center;
    .userName {
      font-size: 16px;
      color: @specialColor;
    }
  }
  .toLogin {
    color: @specialColor;
    font-size: 16px;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>
