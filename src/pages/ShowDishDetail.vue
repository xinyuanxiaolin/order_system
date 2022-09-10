<template>
  <!-- 主体 -->
  <div class="container">
    <div style="display: flex">
      <img
        :src="dish.image"
        class="img-thumbnail"
        alt="..."
        style="max-width: 40%"
      />
      <el-descriptions title="菜品详情" direction=" horizontal" :column="1">
        <el-descriptions-item label="菜品名">{{
          dish.name
        }}</el-descriptions-item>
        <el-descriptions-item
          label="描述"
          contentClassName="contentClassName"
          >{{ dish.description }}</el-descriptions-item
        >
        <el-descriptions-item label="价格" contentClassName="contentClassName"
          >{{ dish.price }}￥</el-descriptions-item
        >
        <el-descriptions-item label="数量">
          <el-input-number size="mini" v-model="num" :min="1"></el-input-number
        ></el-descriptions-item>
        
      </el-descriptions>
      
      
    </div>
    <el-button size="small"  style="position:relative;top:-53px;left:256px" @click="addShoppingCart">加入购物车</el-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "SHowDishDetail",
  props: ["dish"],
  data() {
    return {
      num: 1,
    };
  },
  methods:{
    addShoppingCart(){
      // console.log('gfgg') 
      axios.post(`http://localhost:8080/api/cart/save`,{dishId:this.dish.id,num:this.num,userId:localStorage.userId}).then(
        res=>{
          // console.log(res.data)
          if(res.data.code==='200'){
            alert('加入成功')
          }
        },
        err=>{
          console.log(err.message)
        }
      )
    }
  }
};
</script>

<style>
.contentClassName {
  color: red;
}
</style>