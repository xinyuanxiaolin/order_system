<template>
  <div class="container" ref="container">
    <link rel="stylesheet" href="" />
    <div class="form-container sign-up-container">
      <!-- 注册 -->
      <form action="#">
        <h1>用户注册</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="iconfont icon-QQ"></i></a>
          <a href="#" class="social"><i class="iconfont icon-weixin"></i></a>
          <a href="#" class="social"
            ><i class="iconfont icon-xinlangweibo"></i
          ></a>
        </div>
        <span>可以选择以上几种方式注册一个账户!</span>
        <input type="text" placeholder="用户名" v-model="sign_up.username" />
        <input
          type="number"
          placeholder="电话号码"
          v-model="sign_up.telephone"
        />
        <input type="password" placeholder="密码" v-model="sign_up.password" />
        <input
          type="password"
          placeholder="确认密码"
          v-model="sign_up.tpassword"
        />
        <!-- <button id="send_code">发送验证码</button>
        <input type="number" placeholder="验证码" /> -->
        <button @click="register">注册</button>
      </form>
    </div>
    <div class="form-container sing-in-container">
      <!-- 登陆 -->

      <form >
        <h1>用户登陆</h1>
        <div class="social-container">
          <a href="#" class="social"><i class="iconfont icon-QQ"></i></a>
          <a href="#" class="social"><i class="iconfont icon-weixin"></i></a>
          <a href="#" class="social"
            ><i class="iconfont icon-xinlangweibo"></i
          ></a>
        </div>
        <span>可以选择以上几种方式登陆您的账户!</span>
        <input type="text" placeholder="用户名" v-model="sign_in.username" />
        <input type="password" placeholder="密码" v-model="sign_in.password" />
        <a href="#">忘记密码?</a>
        <button @click="login">登陆</button>
      </form>
    </div>
    <!-- 侧边栏内容 -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-pannel overlay-left">
          <h1>已有账号?</h1>
          <p>朋友，快来登录。</p>
          <button class="ghost" @click="signIn">登陆</button>
        </div>
        <div class="overlay-pannel overlay-right">
          <h1>没有帐号？</h1>
          <p>快去注册，朋友。</p>
          <button class="ghost" @click="signUp">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginS",
  data() {
    return {
      sign_in: {
        username: "",
        password: "",
      },
      sign_up: {
        username: "",
        telephone: "",
        password: "",
        tpassword: "",
      },
    };
  },
  methods: {
    //   操作DOM
    signIn() {
      //   console.log('hhh')
      this.$refs.container.classList.remove("right-panel-active");
    },
    signUp() {
      //   console.log(this.$refs.container)
      this.$refs.container.classList.add("right-panel-active");
    },

    //登陆获取
    login() {
      // console.log(this.sign_in.password);

      axios
        .post("http://localhost:8080/api/user/login", {
          username: this.sign_in.username,
          password: this.sign_in.password,
        })
        .then(
          (response) => {
            if (response.data.code === "200") {
              console.log("请求成功了", response.data);
              localStorage.token = response.data.data.token;
              localStorage.username = response.data.data.username;
              localStorage.admin = response.data.data.admin;  
              localStorage.userId=response.data.data.id;  
              localStorage.nickname=response.data.data.nickname;
              this.$router.push("/index");
              
            } else if (response.data.code === "600") {
              alert(response.data.msg);
            } else if (response.data.code === "400") {
              alert("用户名或者密码不能为空!");
            }
          },
          (error) => {
            console.log("请求失败了", error.message);
          }
        );
    },
    //   注册获取
    register() {
      //   console.log("hhh")

      axios
        .post("http://localhost:8080/api/user/register", {
          username: this.sign_up.username,
          telephone: this.sign_up.telephone,
          password: this.sign_up.password,
          tpassword: this.sign_up.tpassword,
        })
        .then(
          (response) => {
            console.log("请求成功", response.data);
            if (response.data.code === "400") {
              return alert(response.data.msg);
            }
            // 用户已存在
            else if (response.data.code === "600") {
              return alert(response.data.msg);
            } else if (response.data.code === "200") {
              return alert("注册成功");
            }
          },
          (error) => {
            console.log("请求失败", error.message);
          }
        );
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0.2rem;
  font-size: 1.2rem;
}

p {
  font-size: 1rem;
  line-height: 1.5rem;
  /* 字体变淡 */
  font-weight: 100;
  margin: 1.2rem 0;
  /* 字间距 */
  letter-spacing: 0.1rem;
}

span {
  font-size: 0.8rem;
  margin: 1.2rem 0;
}

a {
  color: #333;
  font-size: 1rem;
  /* 下划线消失 */
  text-decoration: none;
}

.container {
  /* 相对定位 */
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 0.6rem;
  width: 50rem;
  height: 35rem;
  left: 0;
  right: 0;
  top: 50px;

  margin: auto;
  /* 溢出隐藏 */
  overflow: hidden;
  max-width: 100vw;
  min-height: 70vh;
}

.form-container form {
  background: #fff;
  /* 弹性布局 */
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.social-container {
  margin: 0.6rem 0;
}

.social-container a {
  border: 1px solid #eee;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 1.8rem;
  width: 1.8rem;
}

.social-container a:hover {
  opacity: 0.8;
}

.form-container input {
  width: 100%;
  height: 2.2rem;
  text-indent: 1rem;
  border: 1px solid #ccc;
  /* 把input上左右边框取消 */
  border-left: none;
  border-right: none;
  border-top: none;
  /* 点击input边框消失 */
  outline: none;
  margin: 0.6rem 0;
}

/* 被选中时候缩小 */
.form-container button:active {
  transform: scale(0.95, 0.95);
}

.form-container button {
  padding: 0.4rem 1rem;
  background: #417dff;
  color: white;
  border: 1px solid #fff;
  outline: none;
  /* 鼠标放上变小手 */
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  font-size: 0.6rem;
  padding: 0.5rem 0;
}

button#send_code {
  width: 30%;
}

button.ghost {
  background: transparent;
  border-color: #fff;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 800ms ease-in;
  margin: 0.6rem 0;
  padding: 0.5rem 0;
  color: white;
  font-size: 0.6rem;
}

button.ghost:active {
  transform: scale(0.95, 0.95);
}

.form-container {
  /* 绝对定位 */
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in;
}

.sing-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.overlay {
  background-image: linear-gradient(
      rgba(0, 0, 255, 0.5),
      rgba(255, 255, 0, 0.5)
    ),
    url("./img/食界之大.png");
  width: 200%;
  height: 100%;
  position: relative;
  left: -100%;
  transition: all 0.6s ease-in-out;
  color: white;
  background-repeat: no-repeat;
  background-position: center;
}

.overlay-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 99;
}

.overlay-pannel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 2.2rem;
}

.overlay-right {
  right: 0;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sing-in-container {
  transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
  transition: all 0.6s ease-in-out;
}

</style>