<template>
  <!-- 类别信息表 -->

  <div class="content">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "ShowInfo",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  // 暴露给子路由组件
  provide() {
    return {
      reload: this.reload,
    };
  },
  // 定义了一个路由刷新的方法
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
.content {

  padding: 20px;
  background-color: #fff;
  
}
</style>