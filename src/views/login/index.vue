<template>
  <!-- 总体 -->
  <div class="main">
    <div class="loginModal">
      <div class="ModalTitle">用户登录</div>
      <div class="ModalContent">
        <div class="common">
          <span
            class="iconfont icon-iconzh1"
            :class="aboutIcon.userNameIcon == true ? 'select' : ''"
          ></span>
          <el-input
            placeholder="请输入账号"
            v-model="username"
            clearable
          ></el-input>
        </div>
        <div class="common password">
          <span
            class="iconfont"
            :class="
              aboutIcon.PswIcon == true ? 'select icon-mima' : 'icon-mima1'
            "
          ></span>
          <el-input
            placeholder="请输入密码"
            v-model="psw"
            show-password
          ></el-input>
        </div>
        <el-button
          type="primary"
          @click="signIn"
        >登录</el-button>
      </div>
    </div>
    <div class="companyLabel">软牛科技 版权专属</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 1. 登录信息
      username: '',
      psw: '',
      // 2. 控制样式
      aboutIcon: {
        userNameIcon: false,
        PswIcon: false
      }
    }
  },
  created () {
    console.log(this.$store.state.user.userName)
  },
  components: {},
  methods: {
    // 1. 点击登录按钮
    async signIn () {
      // 1.验证格式
      if (this.psw !== '123456') {
        this.$message.warning('密码：123456')
        return
      }
      // 存储在vuex中
      this.$store.dispatch('setUserName', this.username)
      this.$router.push('/navSelect/product1/music')
    }
  },
  watch: {
    // 1. 监听账号
    username () {
      if (this.username.length > 0) {
        this.aboutIcon.userNameIcon = true
      } else {
        this.aboutIcon.userNameIcon = false
      }
    },
    // 2. 监听密码
    psw () {
      if (this.psw.length > 0) {
        this.aboutIcon.PswIcon = true
      } else {
        this.aboutIcon.PswIcon = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// @import url("../../../static/iconfont/iconfont.less");
// .main {
//   position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 0;
//   right: 0;
//   background: url("../../../static/imgs/login/bg1.jpg") center center repeat-x;
//   background-color: black;
//   .loginModal {
//     width: 590px;
//     height: 450px;
//     background: #080808;
//     border-radius: 10px;
//     position: absolute;
//     top: 50%;
//     transform: translateY(-55%);
//     right: 16%;
//     padding: 63px 62px 83px 62px;
//     box-sizing: border-box;
//     .ModalTitle {
//       width: 91px;
//       height: 22px;
//       font-size: 22px;
//       font-weight: bold;
//       color: rgba(255, 255, 255, 1);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       width: 100%;
//     }
//     .ModalContent {
//       padding: 40px;
//       // 控制所有的间隙
//       /deep/ input {
//         text-indent: 2em;
//         height: 50px;
//         border: 0px solid red;
//       }
//       /deep/ button {
//         width: 100%;
//         height: 56px;
//         margin-top: 16px;
//         border-radius: 25px;
//       }
//       .common {
//         position: relative;
//         margin-bottom: 38px;
//         // 字体图标
//         > span {
//           width: 22px;
//           height: 22px;
//           position: absolute;
//           left: 13px;
//           top: 50%;
//           transform: translateY(-50%);
//           font-size: 20px;
//           color: #999999;
//           z-index: 999;
//         }
//         // 变色的颜色
//         .select {
//           color: #4b87ff;
//         }
//       }
//     }
//   }
//   .companyLabel {
//     width: 100%;
//     height: 80px;
//     position: absolute;
//     background-color: black;
//     left: 0;
//     bottom: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 16px;
//     color: white;
//   }
// }
</style>
