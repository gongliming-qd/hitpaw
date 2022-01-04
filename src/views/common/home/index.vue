<template>
  <div>
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
}
</script>

<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}
 .fade-leave-to  {
  opacity: 0;
  transform: translateX(20px);
}
.fade-enter{
  opacity: 0;
  transform: translateX(-20px);
}
</style>
