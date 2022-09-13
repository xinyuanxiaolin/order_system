<template>
  <div>
    <div id="header">
      <div id="logo" @click="goToHome">
        <img
          src="@/assets/logo.png"
          style="max-width: 66%; margin-left: 20px"
        />
      </div>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        text-color="rgb(77,77,77)"
      >
        <el-menu-item index="" @click="goToOwn">
          <el-avatar :size="40" fit="cover" :src="circleUrl"></el-avatar>
        </el-menu-item>
        <el-menu-item index="1" @click="home"> 首页 </el-menu-item>
        <el-menu-item index="2"> 公告 </el-menu-item>
        <el-menu-item index="3"> 在线交流 </el-menu-item>
        <el-menu-item index="4" @click="cart"> 购物车 </el-menu-item>
        <el-menu-item index="5" @click="order"> 我的订单 </el-menu-item>

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

    <router-view v-if="isRouterAlive" style="margin-top: 100px"></router-view>
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
#header {
  height: 80px;
  position: fixed !important;
  background-color: rgb(255, 255, 255);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
#logo {
  cursor: pointer;
  float: left;
  height: 80px;
  width: 300px;
}
.el-menu-demo {
  float: right;
}

#out {
  color: skyblue;
  padding-top: 16px;
}
#out:hover {
  color: blue;
  cursor: pointer;
}
</style>