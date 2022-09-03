<template>
  <div class="content-page">
    <table width="1219" border="1" id="admin" cellpadding="0" cellspacing="0">
      <caption>
        用户信息表
      </caption>
      <tr>
        <button @click="addUsers">新增</button>
        <input
          type="text"
          id="search"
          placeholder="请输入用户名进行搜索"
          v-model="title"
        />
      </tr>
      <tr>
        <th>序号</th>
        <th>用户名</th>
        <th>电话</th>
        <th>昵称</th>
        <th>地址</th>
        <th>性别</th>
        <th>是否为管理员</th>

        <th colspan="1">操作</th>
      </tr>
      <tr v-for="m in info" :key="m.id">
        <td>{{ m.id }}</td>
        <td>{{ m.username }}</td>
        <td>{{ m.telephone }}</td>
        <td>{{ m.nickname }}</td>
        <td>{{ m.address }}</td>
        <td>{{ m.sex }}</td>
        <td>{{ m.admin === 1 ? "是" : "否" }}</td>

        <td>
          <button @click="editS(m)">编辑</button>
          <button @click="deleteUser(m.username)">删除</button>
        </td>
      </tr>
    </table>

    <div class="btn">
      <button @click="prePage">上一页</button>
      <button style="width: 20px; height: 23px">
        {{ pageNum }}
      </button>
      <button @click="nextPage">下一页</button>
    </div>

    <!-- 新增用户弹窗界面 -->
    <div class="addUser" v-show="is_add">
      <button @click="closeAdd" style="float: right">关闭</button>
      <form class="addUserPage">
        <label>用户名:</label>
        <input type="text" v-model="addobj.username" />

        <br />

        <label>&nbsp;&nbsp;&nbsp;电话:</label>
        <input type="text" v-model="addobj.telephone" />

        <br />

        <label>&nbsp;&nbsp;&nbsp;昵称:</label>
        <input type="text" v-model="addobj.nickname" />
        <br />

        <label>&nbsp;&nbsp;&nbsp;地址:</label>
        <input type="text" v-model="addobj.address" />
        <br />

        <label for="sex">&nbsp;&nbsp;&nbsp;性别:</label>
        <select id="sex" v-model="addobj.sex">
          <option>男</option>
          <option>女</option>
        </select>
        <br />
        <label for="admin">管理员:</label>
        <select id="admin" v-model="addobj.admin">
          <option>是</option>
          <option>否</option>
        </select>
        <br />
        <button @click="confirmAdd">确认添加</button>
      </form>
    </div>

    <!-- 编辑用户弹窗界面 -->
    <div class="addUser" v-show="is_change">
      <button @click="closeEdit" style="float: right">关闭</button>
      <form class="addUserPage">
        <label>&nbsp;&nbsp;&nbsp;电话:</label>
        <input type="text" v-model="editobj.telephone" />

        <br />

        <label>&nbsp;&nbsp;&nbsp;昵称:</label>
        <input type="text" v-model="editobj.nickname" />
        <br />

        <label>&nbsp;&nbsp;&nbsp;地址:</label>
        <input type="text" v-model="editobj.address" />
        <br />

        <label for="sex">&nbsp;&nbsp;&nbsp;性别:</label>
        <select id="sex" v-model="editobj.sex">
          <option>男</option>
          <option>女</option>
        </select>
        <br />
        <label for="admin">管理员:</label>
        <select id="admin" v-model="editobj.admin">
          <option>是</option>
          <option>否</option>
        </select>
        <br />
        <button @click="confirmChange">确认修改</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowAdmin",
  inject: ["reload"],
  data() {
    return {
      pageNum: 1, //默认第一页开始
      pageSize: 8, //默认一页六条记录
      pages: "", //页数
      title: "", //搜索框内容
      info: [],
      is_add: false, //点击弹出新增用户页面框
      is_change: false, //点击弹出编辑用户界面
      addobj: {
        username: "",
        telephone: "",
        nickname: "",
        address: "",
        sex: "",
        admin: "",
      },
      // 编辑用户
      editobj: {
        id: "",

        telephone: "",
        nickname: "",
        address: "",
        sex: "",
        admin: "",
      },
    };
  },

  methods: {
    // 打开新增用户界面
    addUsers() {
      this.is_add = true;
    },
    // 关闭新增用户界面
    closeAdd() {
      this.is_add = false;
    },
    // 关闭编辑用户界面
    closeEdit() {
      this.is_change = false;
    },
    // 编辑用户
    editS(m) {
      // console.log(m);
      this.is_change = true;
      this.editobj.id = m.id;

      this.editobj.telephone = m.telephone;
      this.editobj.nickname = m.nickname;
      this.editobj.address = m.address;
      this.editobj.sex = m.sex;

      this.editobj.admin = m.admin === 1 ? "是" : "否";
    },
    // 删除用户
    deleteUser(username) {
      // console.log(username);
      if (confirm("确定删除吗?")) {
        axios
          .get(`http://localhost:8080/api/user/users/${username}`)
          .then((res) => {
            if (res.data.code === "200") {
              alert("删除成功");
              this.reload();
            }
          });
      }
    },
    // 上一页
    prePage() {
      if (this.pageNum > 1) {
        this.pageNum--;
        console.log(this.pageNum);
      }
    },
    // 下一页
    nextPage() {
      if (this.pageNum < this.pages) {
        this.pageNum++;
        console.log(this.pageNum);
      }
    },

    // 确认新增用户
    confirmAdd() {
      axios
        .post("http://localhost:8080/api/user/save", {
          username: this.addobj.username,
          telephone: this.addobj.telephone,
          nickname: this.addobj.nickname,
          address: this.addobj.address,
          sex: this.addobj.sex,
          admin: this.addobj.admin === "是" ? 1 : 0,
        })
        .then((res) => {
          if (res.data.code === "200") {
            alert("添加成功!");
            this.reload();
          } else if (res.data.code === "600") {
            alert(res.data.msg);
          }
        });
    },

    // 确认修改用户
    confirmChange() {
      axios
        .post("http://localhost:8080/api/user/save", {
          id: this.editobj.id,

          telephone: this.editobj.telephone,
          nickname: this.editobj.nickname,
          address: this.editobj.address,
          sex: this.editobj.sex,
          admin: this.editobj.admin === "是" ? 1 : 0,
        })
        .then(
          (res) => {
            if (res.data.code === "200") {
              alert("修改成功!");
              this.reload();
            } else {
              alert(res.data.msg);
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
    },
  },
  watch: {
    pageNum: {
      immediate: true,
      handler() {
        axios
          .get(
            `http://localhost:8080/api/user/page?pageNum=${this.pageNum}&pageSize=${this.pageSize}`
          )
          .then(
            (res) => {
              // console.log(res.data);
              this.info = res.data.data.records; //记录传回来的数组
              this.pages = res.data.data.pages;

              // console.log(this.info);
            },
            (err) => {
              console.log(err.message);
            }
          );
      },
    },
  },
  // 挂载时加载初始数据
  mounted() {
    axios
      .get(
        `http://localhost:8080/api/user/page?pageNum=${this.pageNum}&pageSize=${this.pageSize}`,
      )
      .then(
        (res) => {
          // console.log(res.data);

          this.info = res.data.data.records; //记录传回来的数组
          this.pages = res.data.data.pages;

          // console.log(this.info);
        },
        (err) => {
          console.log(err.message);
        }
      );
  },
};
</script>

<style scoped>
.content-page {
  background-color: rgba(244, 244, 244, 0.5);
  border-radius: 10px;
}
#admin {
  table-layout: fixed;
}

#admin caption {
  background-color: rgb(244, 244, 244);
}

#search {
  border: 2px solid #999;
}

button {
  margin: 5px;
}
.btn button {
  margin-top: 10px;
}

td {
  background-color: rgb(244, 244, 244);
}
caption {
  border-radius: 10px 10px 0px 0px;
}

/* 新增弹窗界面 */
.addUser {
  position: absolute;

  width: 600px;
  height: 400px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  border-radius: 10px;
  background-color: rgb(214, 214, 214);
}

.addUserPage form {
  position: relative;
}
</style>