<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/head.png" alt="" style="width:5%;height:auto;margin-left:15px;"/>
        <span>后台管理系统</span>
       
      </div>
       <i class="el-icon-house" style="position:relative;left:375px;cursor:pointer;" @click="goToIndex"></i>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>管理菜单</span>
            </template>
            <!-- 二级菜单 -->

            <el-menu-item index="1-1" @click="showAdmin">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-user"></i>
                <!-- 文本 -->
                <span >用户信息</span>
              </template>
            </el-menu-item>

            <el-menu-item index="1-2" @click="showDishCategory">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-fork-spoon"></i>
                <!-- 文本 -->
                <span >菜品类别</span>
              </template>
            </el-menu-item>

            <el-menu-item index="1-3" @click="showDish">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-dish"></i>
                <!-- 文本 -->
                <span >菜品详情</span>
              </template>
            </el-menu-item>

            <el-menu-item index="1-4"  @click="showOrder">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-shopping-cart-2"></i>
                <!-- 文本 -->
                <span>订单信息</span>
              </template>
            </el-menu-item>
       
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体内容 -->
      <el-main>
        <show-info/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ShowInfo from './ShowInfo.vue'
export default {
  components: { ShowInfo },
  name: "BmsHome",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },

    showAdmin(){
      this.$router.push('/bms/admin')
    },
    showDishCategory(){
      this.$router.push('/bms/category')
    },
    showDish(){
      this.$router.push('/bms/dish')
    },
    showOrder(){
      this.$router.push('/bms/order')
    },
    goToIndex(){
      this.$router.push('/index')
    },

  },
};
</script>

<style  scoped>
.home-container {
  height: 100vh;
}
.el-header {
  
  background-color: rgb(47, 53, 55);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;  
}
.el-header span {
  margin-left: 15px;
  position: relative;
  top:-6px;
}
.el-aside {
  background-color: rgb(49, 55, 67);
  
}
.el-main {
  background-color: rgb(233, 237, 240);
}
</style>