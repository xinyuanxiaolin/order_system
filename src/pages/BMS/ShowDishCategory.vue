<template>
  <div>
    <el-row>
      <el-button round @click="addCategory"><i class="el-icon-plus"></i>新增</el-button>
      <el-input
        v-model="input"
        placeholder="请输入菜品类别"
        id="input"
        v-show="showInput"
        @keyup.enter.native="confirmAdd"
      ></el-input>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border stripe size="small">
      <el-table-column prop="id" label="序号" width="500"> </el-table-column>
      <el-table-column prop="name" label="菜品类别"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="$data.page.pageSize"
      :pager-count="7"
      :total="$data.page.dataTotal"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="curChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowDishCategory",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      page: {
        pageNum: 1,
        pageSize: 8,
        pageTotal: "",
        dataTotal: null,
      },
      input: "",
      showInput: false,
    };
  },

  // 初始化
  // mounted() {
  //   axios
  //     .get(
  //       `http://localhost:8080/api/category/page?pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}`
  //     )
  //     .then(
  //       (res) => {
  //         //   console.log(res);
  //         this.tableData = res.data.data.records;
  //         this.page.pageTotal = res.data.data.pages;
  //         this.page.dataTotal = res.data.data.total;
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // },

  methods: {
    addCategory() {
      this.showInput = !this.showInput;
    },
    confirmAdd() {
      // console.log('hhh')
      axios
        .post("http://localhost:8080/api/category/save", { name: this.input })
        .then(
          (res) => {
            // console.log(res.data);
            if (res.data.code === "200") {
              alert("新增成功");
              this.reload();
            } else if (res.data.code === "600") {
              alert(res.data.msg);
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    deleteRow(index, rows) {
      // console.log(index, rows[index].id);
      if (confirm("确定是否移除?")) {
        axios
          .delete(`http://localhost:8080/api/category/${rows[index].id}`)
          .then(
            (res) => {
              // console.log(res.data);
              if (res.data.code === "200") {
                alert("删除成功!");
                this.reload();
              } else {
                alert("出现未知错误,请重试!");
              }
            },
            (err) => {
              console.log(err);
            }
          );
      }
    },
    prevClick() {
      // console.log('hhh')
      this.page.pageNum--;
    },
    nextClick() {
      // console.log('ddd')
      this.page.pageNum++;
    },
    curChange(value) {
      this.page.pageNum = value;
    },
  },

  // 监听页面数据变化
  watch: {
    page: {
      immediate: true,
      deep: true,
      handler() {
        axios
          .get(
            `http://localhost:8080/api/category/page?pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}`
          )
          .then(
            (res) => {
              //   console.log(res);
              this.tableData = res.data.data.records;
              this.page.pageTotal = res.data.data.pages;
              this.page.dataTotal = res.data.data.total;
            },
            (err) => {
              console.log(err);
            }
          );
      },
    },
  },
};
</script>

<style>
#input {
  position: relative;
  width: 300px;
}
</style>