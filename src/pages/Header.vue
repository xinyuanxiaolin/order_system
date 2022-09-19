<template>
  <div>
    <div id="header">
      <div id="logo" @click="goToHome">
        <span id="logo-t">食界之大</span>
      </div>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        text-color="rgba(19, 18, 18 )"
      >
        <el-menu-item index="" @click="goToOwn">
          <el-avatar
            :size="50"
            fit="cover"
            :src="circleUrl"
            style="border: 2px solid rgb(232, 232, 237)"
          ></el-avatar>
        </el-menu-item>
        <el-menu-item index="1" @click="home"> 首页 </el-menu-item>
        <el-menu-item index="2" @click="notice"> 公告 </el-menu-item>

        <el-menu-item index="3" @click="cart"> 购物车 </el-menu-item>
        <el-menu-item index="4" @click="order"> 我的订单 </el-menu-item>

        <el-submenu index="2">
          <template slot="title">{{ username }}</template>
          <el-menu-item index="2-1" @click="enterBms" v-if="admin"
            >进入后台管理系统</el-menu-item
          >
          <el-menu-item index="2-2" @click="ownInfo">个人信息</el-menu-item>
          <el-menu-item index="2-3" @click="tuichu">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "HeaderS",
  data() {
    return {
      username: localStorage.username,
      isRouterAlive: true,
      circleUrl: localStorage.avatarUrl,
    };
  },

  watch: {},
  computed: {
    admin() {
      return localStorage.admin === "1" ? true : false;
    },
  },
  // 暴露给子路由组件
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    home() {
      this.$router.push("/index/home");
    },
    notice() {
      this.$router.push("/index/notice");
    },
    cart() {
      this.$router.push("/index/cart");
    },
    order() {
      this.$router.push("/index/order");
    },
    ownInfo() {
      this.$router.push("/index/info");
    },

    tuichu() {
      localStorage.clear();
      this.$router.push("/login");
    },

    enterBms() {
      this.$router.push("/bms");
    },
    goToOwn() {
      this.$router.push("/index/info");
    },
    goToHome() {
      this.$router.push("/index/home");
    },

    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: fa;
  src: url("@/font/1657153233829877.ttf");
}

#header {
  position: absolute;
  height: 80px;
  background-color: rgba(245, 245, 245, 0.22);
  font-weight: 500;
  letter-spacing: 5px;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
#logo {
  cursor: pointer;
  float: left;
}

#logo-t {
  color: rgba(245, 245, 245, 0.7);
  font-family: fa;

  font-weight: 500;
  font-size: 50px;
  margin-left: 20px;
  line-height: 100px;
}
.el-menu-demo {
  float: right;
}
.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.5) !important;
}

.el-menu {
  background-color: transparent;
  border: none !important;
  height: 80px;
}
.el-menu-item {
  height: 80px !important;
  line-height: 80px !important;
}
</style>