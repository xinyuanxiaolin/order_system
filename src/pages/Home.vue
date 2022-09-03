<template>
  <div>
    <div class="block">
    
    <el-carousel height="38vw" indicator-position='outside'>
      <el-carousel-item v-for="item in image" :key="item.id">
        <img :src="item.src"  style="width:100%;height:auto;">
      </el-carousel-item>
    </el-carousel>
  </div>
 
   <div class="dish">
     <div class="dish-head">全部菜品</div>
     
   </div>



   

  

    
  </div>
</template>

<script>
export default {
  name: "HomeS",

  data() {
    return {
     
      image:[
        {id:0,src:require('../assets/logo.png')},
        {id:1,src:require('../assets/logo.png')},
        {id:2,src:require('../assets/miku黑白.png')}


      ]
    };
  },
};
</script>

<style>
.carousel img {
  height: 100% !important;
}
@media (max-width: 992px) {
  .carousel .item {
    height: 400px;
  }
}
@media (max-width: 768px) {
  .carousel .item {
    height: 250px;
  }
}
@media (min-width: 992px) {
  .carousel .item {
    height: 500px;
  }
}

.project {
  padding-top: 30px;
  text-align: center;
}
.project .container div a {
  display: block;
  height: 200px;

  background-color: skyblue;
}

.project .container div {
  padding-bottom: 20px !important;
}

a {
  text-decoration: none !important;
}



</style>