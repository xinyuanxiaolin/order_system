<template>
  <div class="notice">
    <div class="img" style="">
      <img src="@/assets/banner3.jpg" width="100%" height="80" />
    </div>
    <div class="bor">
      <div class="text">
         <div style="font-size:30px;font-weight:800;padding:10px;text-align:center;">更新日志</div>
        <el-collapse>
          <el-collapse-item  title="2022.9.17更新" name="1">
            <div>
              增加了订单功能
            </div>
            <div>
              实现了订单的取消和付款
            </div>
          </el-collapse-item>
          <el-collapse-item title="2022.9.18更新" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="2022.9.19更新" name="3">
            <div>修改了整体页面的布局</div>
            <div>
              让整体页面的看起来更整洁
            </div>
            
          </el-collapse-item>
          <el-collapse-item title="2022.9.20更新" name="4">
            <div>
              优化了主页面的菜单分布
            </div>
            <div>
              实现了hover图片是菜品名称自动出现
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeS",
  data() {
    return {};
  },
};
</script>

<style scoped>

.notice {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bor {
  position: absolute;
  padding-top: 10px;
  width: 100%;
  height: 100%;
  background-size: cover;
 background: -webkit-repeating-linear-gradient(rgba(234,232,235,0.75),rgba(224,231,234,0.75));

}
.text {
  position: relative;
  width: 50%;
  height: 80%;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 20px;;
}

</style>