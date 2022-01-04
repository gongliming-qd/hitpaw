<template>
  <div>
    <div class="topBanner">
      <div class="siteName">
        <transition
          name="custom-classes-transition"
          appear
          enter-active-class="animated bounceInRight"
        >
          <div >
            Hitpaw&nbsp;素材管理后台系统
          </div>
        </transition>

      </div>
      <!-- <User-icon></User-icon> -->
    </div>
    <div class="centerBody">
      <div class="menu">
        <el-menu
          :default-active="defaultActive"
          :default-openeds="defaultOpends"
          class="el-menu-vertical-demo"
          background-color="#030b1e"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
        >
          <div
            v-for="item in menuLists"
            :key="item.id"
          >
            <el-menu-item
              v-if="item.id === 'home'"
              index="home"
              @click="routerReplace(item)"
            >
              <i class="el-icon-setting"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu
              :index="item.id"
              v-else
              :popper-append-to-body="false"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.menuFirstName }}</span>
              </template>
              <div v-if="item.showList.length > 0">
                <el-menu-item
                  @click="routerReplace(item2)"
                  :index="item2.id"
                  :key="item2.id"
                  v-for="item2 in item.showList"
                >{{ item2.menuSecondName }}</el-menu-item>
              </div>
              <div v-if="item.children.length > 0">
                <el-submenu
                  :index="item1.id"
                  :key="item1.id"
                  v-for="item1 in item.children"
                >
                  <template slot="title">{{ item1.menuSecondName }}</template>
                  <el-menu-item
                    @click="routerReplace(item2)"
                    :index="item2.id"
                    :key="item2.id"
                    v-for="item2 in item1.children"
                  >{{ item2.menuSecondName }}</el-menu-item>
                </el-submenu>
              </div>

            </el-submenu>
          </div>
        </el-menu>
      </div>
      <div class="content">
        <div class="breadCrumb">
          <BreadCrumb :breadCrumbList="breadCrumbList"></BreadCrumb>
        </div>
        <div class="showContend">
          <router-view></router-view>
        </div>
        <div class="companyInformation">版权所有 ： 软牛科技</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList, getPaletteTypeList } from '@/api/product.js'
import _ from 'lodash'

import UserIcon from './children/userIcon.vue'
import BreadCrumb from './children/breadnav.vue'
export default {
  data () {
    return {
      iconVisible: true,
      breadCrumbList: ['产品列表', '产品管理'],
      // 菜单显示数据
      menuLists: [
        // {
        //   menuFirstName: "首页",
        //   id: "home",
        //   path: "/navSelect/home",
        //   breadCrumb: ["首页"],
        //   showList:[],
        //   children:[]
        // },
        {
          menuFirstName: '产品列表',
          id: '1',
          children: [
            {
              menuSecondName: '产品1',
              id: '1-1',
              children: [
                {
                  menuSecondName: '音乐',
                  id: '1-1-1',
                  path: '/product/music',
                  breadCrumb: ['产品列表', '产品1', '音乐']
                }
              ]
            },
            {
              menuSecondName: '产品2',
              id: '1-2',
              children: [
                {
                  menuSecondName: '音乐',
                  id: '1-2-1',
                  path: '/product/music',
                  breadCrumb: ['产品列表', '产品2', '音乐']
                }
              ]
            }
          ],
          showList: [
            {
              menuSecondName: '产品管理',
              id: '1-0',
              path: '/productManage',
              breadCrumb: ['产品列表', '产品管理']
            }
          ]
        },
        {
          menuFirstName: '素材库',
          id: '2',
          children: [],
          showList: [
            {
              menuSecondName: '音乐',
              id: '2-1',
              path: '/palette/music',
              breadCrumb: ['素材库', '音乐']
            }
          ]
        },
        {
          menuFirstName: '多语言',
          id: '3',
          children: [],
          showList: [
            {
              menuSecondName: '对应表',
              id: '3-2',
              path: '/languagesManage/correspondenceTable',
              breadCrumb: ['多语言', '对应表']
            }
          ]
        }
      ],
      // 菜单显示数据
      handleMenuLists: [],
      defaultActive: '/productManage',
      defaultOpends: ['/productManage']
    }
  },
  methods: {
    // 路由跳转
    routerReplace (obj) {
      console.log(obj)
      // 1. 处理面包屑
      this.breadCrumbList = obj.breadCrumb
      // 2. 路由跳转
      if (obj.path.includes('/paletteTemplate')) {
        this.$router.push(`${obj.path}?&Palette=${obj.params.PaletteId}&componentUrl=${obj.id}`)
      } else if (obj.path.includes('/productTemplate')) {
        this.$router.push(`${obj.path}?Product=${obj.params.ProductId}&Palette=${obj.params.PaletteId}&componentUrl=${obj.id}`)
      } else {
        this.$router.push(`${obj.path}?&componentUrl=${obj.id}`)
      }
    },
    // 初始化菜单
    async initMenuData () {
      this.menuLists = []
      // 1.处理首页
      // let home = { showList: [], children: [], id: 'home', path: '/home' }
      // this.menuLists.push(home)

      // 2. 处理产品页
      let productsLists = {
        menuFirstName: '产品列表',
        id: 'productsLists',
        children: [],
        showList: [
          {
            menuSecondName: '产品管理',
            id: '/productManage',
            path: '/productManage',
            breadCrumb: ['产品列表', '产品管理']
          }
        ]
      }

      // 2.1 处理产品子项
      // 获取素材长度
      let PaletteResults = await getPaletteTypeList({ page: 1, page_size: 1000000 })
      if (PaletteResults.data.code === 200 && PaletteResults.data.msg === 'OK') {
        console.log(PaletteResults)
      } else {
        this.$message.warning(PaletteResults.data.msg)
      }
      // 获取产品长度 处理产品部分
      let ProductResults = await getProductList({ page: 1, page_size: 1000000 })
      if (ProductResults.data.code === 200 && ProductResults.data.msg === 'OK') {
        let ResultsArrs = _.cloneDeep(ProductResults.data.data)
        ResultsArrs.forEach(ele => {
          let pruductObj = {
            menuSecondName: ele.title,
            id: `/productManage/${ele.id}`,
            children: []
          }
          let PaletteArrs = _.cloneDeep(PaletteResults.data.data)
          PaletteArrs.forEach(item => {
            let PaletteObj =
            {
              menuSecondName: item.name,
              id: `/productManage/${ele.id}/${item.id}`,
              path: '/productTemplate',
              params: {
                PaletteId: item.id,
                ProductId: ele.id
              },
              breadCrumb: ['产品列表', ele.title, item.name]
            }

            pruductObj.children.push(PaletteObj)
          })
          productsLists.children.push(pruductObj)
        })
      } else {
        this.$message.warning(ProductResults.data.msg)
      }
      this.menuLists.push(productsLists)
      // 3. 处理 素材部分
      let paletteManage = {
        menuFirstName: '素材库',
        id: 'paletteLists',
        children: [],
        showList: [
          {
            menuSecondName: '素材管理',
            id: '/paletteManage',
            path: '/paletteManage',
            breadCrumb: ['素材库', '素材管理']
          }
        ]
      }
      let PaletteArrs = _.cloneDeep(PaletteResults.data.data)
      PaletteArrs.forEach(item => {
        let PaletteObj = {
          menuSecondName: item.name,
          id: `/paletteManage/${item.id}`,
          path: '/paletteTemplate',
          params: {
            PaletteId: item.id
          },
          breadCrumb: ['素材库', item.name]
        }
        paletteManage.showList.push(PaletteObj)
      })
      this.menuLists.push(paletteManage)

      // 4. 处理多语言
      let languagesManage = {
        menuFirstName: '多语言',
        id: 'languages',
        children: [],
        showList: [
          {
            menuSecondName: '对应表',
            id: '/languagesManageCorrespondenceTable',
            path: '/languagesManageCorrespondenceTable',
            breadCrumb: ['多语言', '对应表']
          }
        ]
      }
      this.menuLists.push(languagesManage)

      // 5. 获取当前清单。
      this.handleBreadAllListByRouter()

      // 6. 处理当前面包屑，与菜单开关
      this.handleNowRouterBread()
    },
    // 处理menuLists,获取handleMenuLists，作用是将用于页面刷新时，定位到当前的菜单与路由
    handleBreadAllListByRouter () {
      this.handleMenuLists = []

      this.handleMenuLists.push({
        defaultActive: 'home',
        defaultOpends: ['home'],
        breadCrumbList: ['首页']
      })
      this.menuLists.forEach((item) => {
        item.children.forEach((item1) => {
          item1.children.forEach((item2) => {
            this.handleMenuLists.push({ ...item2 })
          })
        })
        item.showList.forEach((item1) => {
          this.handleMenuLists.push({ ...item1 })
        })
      })
    },
    // 根据当前路由控制面包屑和菜单栏当前激活状态
    handleNowRouterBread () {
      console.log(this.handleMenuLists)
      if (!this.$route.query.componentUrl) {
        return
      }
      this.handleMenuLists.some((ele) => {
        if (this.$route.query.componentUrl === ele.id) {
          console.log(ele)
          this.breadCrumbList = ele.breadCrumb
          this.defaultActive = ele.id
          this.defaultOpends = [ele.id]
          return true
        }
      })
    }
  },
  components: {
    BreadCrumb,
    UserIcon
  },
  watch: {
    '$store.state.changeMenu': 'initMenuData'
  },
  created () {
    this.initMenuData()
  }
}
</script>

<style scoped lang="less">
.topBanner {
  height: 80px;
  background-color: @commonBGC;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  .siteName {
    margin-left: 20px;
    font-size: 25px;
    padding-left: 5px;
  }
}
.centerBody {
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  .menu {
    height: 100%;
    width: 250px;
    background-color: @commonBGC;
    box-sizing: border-box;
    border-top: 1px solid #0a3c70;
    // 取消默认样式
    /deep/ .el-menu {
      border-right: solid 1px #182033;
    }
    // 控制滚动条
    /deep/ .el-menu.el-menu--inline {
      max-height: 500px;
      overflow-y: auto;
    }
    // 菜单hover背景颜色
    /deep/ .el-submenu__title:hover {
      background-color: black !important;
    }
    /deep/ .el-menu-item:hover {
      background-color: black !important;
    }
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      background-color: #061027;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #061027;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #f5f0f0;
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    padding: 20px 25px 0px;
    box-sizing: border-box;
    position: relative;
    background-color: #f5f5f5;
    .showContend {
      width: 100%;
      min-height: calc(100vh - 200px);
      background-color: white;
    }
    .companyInformation {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: @specialColor;
    }
  }
}
</style>
