<template>
  <!-- 主体 -->

  <div class="container">
    <img src="@/assets/banner3.jpg" width="100%" height="80" />
    <div class="show-detail">
      <div style="display: flex">
        <img
          :src="dish.image"
          class="img-thumbnail"
          alt="..."
          style="width: 200px; height: 200px"
        />
        <el-descriptions title="菜品详情" direction=" horizontal" :column="1">
          <el-descriptions-item label="菜品名">{{
            dish.name
          }}</el-descriptions-item>
          <el-descriptions-item label="描述">{{
            dish.description
          }}</el-descriptions-item>
          <el-descriptions-item label="价格" contentStyle="color:red"
            >￥{{ dish.price }}</el-descriptions-item
          >
          <el-descriptions-item label="数量">
            <el-input-number
              size="mini"
              v-model="num"
              :min="1"
            ></el-input-number
          ></el-descriptions-item>
        </el-descriptions>
      </div>
      <el-button
        size="small"
        style="position: relative; top: -23px; left: 208px"
        @click="addShoppingCart"
        >加入购物车</el-button
      >
      <img
        :src="dish.image"
        class="img-thumbnail"
        alt="..."
        style="width: 50px; height: 50px; margin-top: 3px; margin-right: 20px"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowDishDetail",
  props: ["dish"],
  data() {
    return {
      num: 1,
      dishs: [],
    };
  },

  methods: {
    addShoppingCart() {
      // console.log('gfgg')
      axios
        .post(`http://localhost:8080/api/cart/save`, {
          dishId: this.dish.id,
          num: this.num,
          userId: localStorage.userId,
        })
        .then(
          (res) => {
            // console.log(res.data)
            if (res.data.code === "200") {
              this.$message("加入成功!");
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: -webkit-repeating-linear-gradient(
    rgba(234, 232, 235, 0.75),
    rgba(224, 231, 234, 0.75)
  );
}

.show-detail {
  width: 80%;
  margin: 30px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 20px;
}

.el-descriptions {
  margin-left: 20px;
}

.img-thumbnail {
  object-fit: cover;
  vertical-align: top;
  width: 100%;
  height: 100%;
}
</style>