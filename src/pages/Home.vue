<template>
  <div>
    <div class="block">
      <el-carousel height="38vw" indicator-position="outside">
        <el-carousel-item v-for="item in image" :key="item.id">
          <img :src="item.src" style="width: 100%; height: auto" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="dish">
      <div class="dish-head">|全部菜品</div>
      <div class="dish-category">
        <span
          id="category"
          v-for="cart in carts"
          :key="cart.id"
          @click="preShowDish(cart.id)"
          >{{ cart.name }}</span
        >
      </div>

      <div class="dish-detail">
        <div class="block" v-for="dish in dishs" :key="dish.id">
          <span class="demonstration">{{ dish.name }}</span>
          <el-image @click="goDishDetail(dish)"
            style="width: 100px; height: 100px; cursor:pointer"
            :src="dish.image"
            fit="cover"
          ></el-image>
        </div>
      </div>
    </div>

    <div class="footer"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeS",

  data() {
    return {
      image: [
        { id: 0, src: require("../assets/星空.png") },
        { id: 1, src: require("../assets/奇蛋物语.jpg") },
        { id: 2, src: require("../assets/miku黑白.png") },
      ],
      // 菜品名
      dishs: [],
      // 菜品类别
      carts: [],
    };
  },

  mounted() {
    axios.get("http://localhost:8080/api/category/").then(
      (res) => {
        // console.log(res.data);
        this.carts = res.data.data;
      },
      (err) => {
        console.log(err.message);
      }
    );

    axios
      .get(
        `http://localhost:8080/api/dish/page/?category_id=1&pageNum=1&pageSize=12`
      )
      .then(
        (res) => {
          // console.log(res.data);
          this.dishs = res.data.data.records;
          // console.log(this.dishs)
        },
        (err) => {
          console.log(err.message);
        }
      );
  },

  methods: {
    preShowDish(id) {
      // alert(id)
      // !!!!!!!!!!接口问题需修改
      axios
        .get(
          `http://localhost:8080/api/dish/page/?category_id=${id}&pageNum=1&pageSize=12`
        )
        .then(
          (res) => {
            // console.log(res.data);
            this.dishs = res.data.data.records;
            // console.log(this.dishs)
          },
          (err) => {
            console.log(err.message);
          }
        );
    },

    goDishDetail(dish){
      // console.log('hhh');
      this.$router.push({
        name:'detail',
        params:{
          dish:dish
        }
      })
    },
  },
};
</script>

<style>
a {
  text-decoration: none !important;
}

.dish-head {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  color: rgb(38, 126, 86);
}

.dish-category {
  display: flex;
  justify-content: center;

  align-items: center;
}
#category {
  display: block;
  text-align: center;
  line-height: 100px;
  height: 100px;
  width: 100px;
  margin: 20px 20px;
  background-color: rgb(38, 126, 86);
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
}
#category:hover {
  color: yellow;
  background-color: rgb(22, 111, 71);
}




.dish-detail {
  display: flex;
  justify-content: center;

  align-items: center;
}

.demonstration {
  font-size: 10px;
}

.footer {
  height: 300px;
}
.block {
  margin-bottom: 10px;
}
</style>