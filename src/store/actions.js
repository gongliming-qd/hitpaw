export default {
  setUserName ({
    commit
  }, userName) {
    commit('setUserName', userName)
  },
  //   监听menu是否需要变化， 变化的话那就重新渲染菜单
  setChangeMenu ({
    commit
  }, menuStatus) {
    commit('setChangeMenu', menuStatus)
  }
}
