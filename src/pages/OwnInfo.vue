<template>
  <div id="info">
    <div id="image">
      <el-col :span="12">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar
              :size="60"
              style="border: 1px solid black"
              :fit="cover"
              :src="circleUrl"
              @click="changeAvatar"
            ></el-avatar>
          </div>
        </div>
      </el-col>
    </div>
    <span style="margin-left: 30px; fontsize: 20px">基本信息</span>
    <br /><br />
    <hr />
    <el-form ref="user" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <span>{{ user.username }}</span>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="user.nickname" v-if="option.is_input"></el-input>
        <span v-if="!option.is_input">{{ user.nickname }}</span>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="user.telephone" v-if="option.is_input"></el-input>
        <span v-if="!option.is_input">{{ user.telephone }}</span>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="user.address" v-if="option.is_input"></el-input>
        <span v-if="!option.is_input">{{ user.address }}</span>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.sex" v-if="option.is_input">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
        <span v-if="!option.is_input">{{ user.sex }}</span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="option.is_edit"
          >编辑</el-button
        >
        <el-button @click="save" v-if="!option.is_edit">保存</el-button>
        <el-button @click="cancel" v-if="!option.is_edit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "OwnInfo",
  inject: ["reload"],
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      user: {},
      option: {
        is_input: false,
        is_edit: true,
      },
    };
  },
  methods: {
    // 编辑
    onSubmit() {
      console.log("submit!");
      this.option.is_input = true;
      this.option.is_edit = false;
    },
    // 保存修改信息
    save() {
      axios
        .post("http://localhost:8080/api//user/save", {
          id: this.user.id,
          nickname: this.user.nickname,
          telephone: this.user.telephone,
          address: this.user.address,
          sex: this.user.sex,
        })
        .then(
          (res) => {
            console.log(res);
            if (res.data.code === "200") {
              this.$alert("保存成功!", "消息", {
                confirmButtonText: "确定",
              });

              // 恢复编辑按钮,隐藏保存按钮
              this.option.is_input = !this.option.is_input;
              this.option.is_edit = !this.option.is_edit;

              // 保存昵称
              localStorage.nickname = this.user.nickname;
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
    },

    cancel() {
      this.option.is_input = !this.option.is_input;
      this.option.is_edit = !this.option.is_edit;
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8080/api/user/username/${localStorage.username}`)
      .then(
        (res) => {
          console.log(res.data);
          if (res.data.code === "200") {
            this.user = res.data.data;
            this.circleUrl =
              res.data.data.avatarUrl === null
                ? this.circleUrl
                : res.data.data.avatarUrl;
            localStorage.avatarUrl=this.circleUrl;
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  },
};
</script>


<style >
#info {
  width: 800px;
  height: 600px;
  margin: 30px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#image {
  position: relative;
  margin: 20px;
  height: 80px;
  width: auto;
}
</style>