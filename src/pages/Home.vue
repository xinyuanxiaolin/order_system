<template>
  <div id="home">
    <div class="block">
      <el-carousel height="47vw">
        <el-carousel-item v-for="item in image" :key="item.id" >
          <!-- <img :src="item.src" style="width: 100%; height: auto" /> -->
          <div id="des">{{ item.descrition }}</div>
          <a href="#dish" id="toDish">开启你的点餐之旅</a>
          <el-image
            :src="item.src"
            style="width: 100%; height: 100%; z-index: 1"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="dish" id="dish">
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
        <div class="dish-body" v-for="dish in dishs" :key="dish.id">
          <span class="demonstration">{{ dish.name }}</span>
          <br />
          <el-image
            @click="goDishDetail(dish)"
            style="width: 100px; height: 100px; cursor: pointer"
            :src="dish.image"
            fit="cover"
          ></el-image>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="container">
        <div class="footer-text">
          <h1>About</h1>
          <br />
          <p>
            Morbi pretium gravida justo nec ultrices. Ut et facilisis justo.
            Fusce ac turpis eros, vel molestie lectus.feugiat velit velit non
            turpis
          </p>
        </div>
        <div class="footer-text">
          <h1>Specials</h1>
          <br />
          <p>这是一次点餐系统的尝试</p>
        </div>
        <div class="footer-text">
          <h1>Recipes</h1>
          <br />
          <p>这是一次点餐系统的尝试</p>
        </div>
        <div class="footer-text">
          <h1>Social</h1>
          <br />
          <p>这是一次点餐系统的尝试</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeS",

  data() {
    return {
      image: [
        {
          id: 0,
          src: require("../assets/banner1.jpg"),
          descrition: "点餐登陆系统正式上线!",
        },
        {
          id: 1,
          src: require("../assets/banner2.jpg"),
          descrition: "Enjoy youself!",
        },
        // { id: 2, src: require("../assets/miku黑白.png") },
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

    goDishDetail(dish) {
      // console.log('hhh');
      this.$router.push({
        name: "detail",
        params: {
          dish: dish,
        },
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}

.dish {
  margin-top: 20px;
}
.dish-head {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 5px;

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
  height: 300px;

  /* align-items: center; */
}

.dish-detail .el-image {
  width: 200px !important;
  height: 200px !important;
}

.dish-body {
  margin: 10px;
}

.demonstration {
  display: flex;
  justify-content: center;
  align-items: center;

  



 
}



.block {
  position: relative;

  left: 0;
  right: 0;
  margin: auto;
  max-width: 100%;
}

#des {
  font-size: 50px;
  position: absolute;
  top: 300px;
  margin-left: 432px;
  margin-right: auto;

  color: rgb(255, 255, 255);
  font-weight: 500;
  letter-spacing: 14px;
  text-transform: uppercase;

  z-index: 99;
}

#toDish {
  font-size: 20px;
  color: rgb(251, 250, 250);
  font-weight: 800;
  letter-spacing: 5px;
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: absolute;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.27);
  top: 400px;
  margin-left: 606px;

  z-index: 99;
}

.footer {
  margin: 30px 0 30px 0;
  background-color: rgb(238, 238, 238);
  height: 300px;
}

.footer-text {
  float: left;
  height: 200px;
  margin: 0 30px;
}

.container {
  width: 1170px;
  height: 200px;
  margin: auto;
  padding: 0 15px 0 15px;
}

.footer-text h1 {
  font-size: 3em;
  text-transform: capitalize;
  font-family: "OleoScript-Bold";
  color: #08538c;
  margin-bottom: 0.3em;
  font-family: "Courier New", Courier, monospace;
}

.footer-text p {
  font-size: 1em;
  line-height: 1.8em;
  color: #999;

  width: 200px;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>