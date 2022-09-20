<template>
  <div id="home">
    <div class="pre-home">
      <el-carousel height="47vw" >
        <el-carousel-item
          v-for="item in image"
          :key="item.id"
          style="font-size: 50px"
        >
          <!-- <img :src="item.src" style="width: 100%; height: auto" /> -->
          <div id="des">{{ item.descrition }}</div>
          <a id="toDish" @click="goDish" style="cursor: pointer"
            >开启你的点餐之旅</a
          >
          <el-image
            :src="item.src"
            style="width: 100%; height: 100%; z-index: 1;filter:brightness(0.8);"
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
        <div
          class="dish-body"
          v-for="dish in dishs"
          :key="dish.id"
          @click="goDishDetail(dish)"
        >
          <span class="demonstration" ref="demo">{{ dish.name }}</span>
          <div class="mask"></div>
          <el-image
            style="cursor: pointer"
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
          {
          id: 2,
          src: require("../assets/banner4.jpg"),
          descrition: "干净! 卫生! 菜品新鲜!",
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
      console.log(dish);
      this.$router.push({
        name: "detail",
        params: {
          dish: dish,
        },
      });
    },

    // 实现平滑跳转
    goDish() {
      this.$el.querySelector("#dish").scrollIntoView({
        behavior: "smooth", // 平滑过渡
        block: "start", // 上边框与视窗顶部平齐
      });
    },

    // 实现鼠标移动到图片上出现字体
    // mouseEnter(index) {
    //   // console.log(this.$refs);
    //   // console.log(index);
    //   this.$refs.demo[index].style.display = "block";

    //   setTimeout(() => {
    //     this.$refs.demo[index].style.transform = "translateY(110px)";
    //   }, 10);
    // },
    // mouseOut(index) {
    //   this.$refs.demo[index].style.transform = "translateY(0)";

    //   setTimeout(() => {
    //     this.$refs.demo[index].style.display = "none";
    //   }, 400);
    // },
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}

.dish {
  position: relative;
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
  font-size: 20px;
  flex-wrap: wrap;
  min-height: 300px;
  justify-content: center;

  /* align-items: center; */
}

.dish-detail .el-image {
  transition: all 0.5s;

  width: 400px !important;
  height: 300px !important;
}

.dish-body {
  margin: 10px;
  cursor: pointer;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.mask {
  position: absolute;
  width: 400px;
  height: 300px;
  opacity: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
  transition: all 0.5s;
  z-index: 1;
}

.demonstration {
  position: absolute;
  display: block;
  width: 200px;
  height: 20px;
  font-size: 30px;
  font-weight: 800;
  color: rgb(255, 255, 255);
  letter-spacing: 10px;
  top: -30px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: 0 auto;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 10;
}

.dish-body:hover .demonstration {
  transform: translateY(130px);
  opacity: 1;
}
.dish-body:hover .mask {
  opacity: 1;
}

.dish-body:hover .el-image {
  transform: scale(1.2);
}
/* .demonstration:hover {
  top: 80px;
} */

.pre-home {
  position: relative;
}

#des {
  font-size: 1em;
  position: absolute;
  width: 100%;
  text-align: center;
  top: 6em;

  color: rgb(255, 255, 255);
  font-weight: 500;
  letter-spacing: 0.875rem;
  text-transform: uppercase;

  z-index: 99;
}

#toDish {
  position: absolute;
  font-size: 20px;
  color: rgb(251, 250, 250);
  font-weight: 800;
  letter-spacing: 5px;
  width: 18em;
  height: 2.5em;
  line-height: 2.5em;
  text-align: center;

  display: block;
  border-radius: 0.5em;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.27);
  top: 20em;
  left: 0;
  right: 0;
  margin: auto;

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
  width: 25%;
}

.container {
  height: 300px;
  margin: auto;
  /* position: relative; */
  display: flex;
  justify-content: space-around;
  flex-shrink: 0;

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
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}


</style>