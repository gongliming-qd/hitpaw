export default {
  // 1. 设置用户名
  setUserName (state, setUserName) {
    state.user.userName = setUserName
  },
  //   监听menu是否需要变化， 变化的话那就重新渲染菜单
  setChangeMenu (state, menuStatus) {
    state.changeMenu = menuStatus
  }
}
