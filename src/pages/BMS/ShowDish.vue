<template>
  <div>
    <el-row>
      <el-button round @click="addDish"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <div style="float: right">
        <el-input
          placeholder="请输入菜品名"
          prefix-icon="el-icon-search"
          v-model="page.input"
        >
        </el-input>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border stripe size="small">
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="菜品名" width="100">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="500"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="image" label="图片" width="100"> </el-table-column>
      <el-table-column prop="price" label="价格" width="200"> </el-table-column>

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

    <!-- 增加的方框 -->
    <div id="addForm" v-show="showDish">
      <i
        class="el-icon-close"
        @click="closeWindow"
        style="float: right; margin-right: 5px; font-size: 20px"
      ></i>
      <br />
      <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px"></div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="菜品名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品类别">
          <el-input v-model="formLabelAlign.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="formLabelAlign.price"></el-input>
        </el-form-item>
        <el-form-item label="图片:">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:8080/api//file/upload"
            :file-list="fileList"
            :on-success="successUpload"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >

            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>

        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >确认添加</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowDish",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      page: {
        pageNum: 1,
        pageSize: 8,
        pageTotal: "",
        dataTotal: null,
        // 搜索框
        input: "",
      },

      labelPosition: "right",
      formLabelAlign: {
        name: "",
        description: "",
        price: null,
        categoryName: "",
      },
      // 图片文件
      fileList: [],
      // 开关窗口
      showDish: false,

      // 图片的地址
      url: "",
    };
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      // 只能实现首页自动搜索功能
      handler() {
        axios
          .get(
            `http://localhost:8080/api/dish/page?pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}&name=${this.page.input}`
          )
          .then(
            (res) => {
              console.log(res.data);
              if (res.data.code === "200") {
                this.tableData = res.data.data.records;
                this.page.pageTotal = res.data.data.pages;
                this.page.dataTotal = res.data.data.total;
                // this.page.pageNum=res.data.data.current;
              }
            },
            (err) => {
              console.log(err);
            }
          );
      },
    },
  },

  methods: {
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

    deleteRow(index, rows) {
      //   console.log(index, rows[index].id);
      if (confirm("确定是否移除?")) {
        axios
          .delete(`http://localhost:8080/api/dish/del/${rows[index].id}`)
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

    // !!!!!!!!!!!!!!!!!!!!!!!
    // 上传图片和新增

    successUpload(res) {
      console.log(res);
      this.url = res;
    },
    submitUpload() {
      // 上传
      // this.$refs.upload.submit();
      console.log(this.url);

      axios
        .post(`http://localhost:8080/api/dish/save`, {
          name: this.formLabelAlign.name,
          categoryName: this.formLabelAlign.categoryName,
          description: this.formLabelAlign.description,
          price: this.formLabelAlign.price,
          image: this.url,
        })
        .then(
          (res) => {
            console.log(res.data);
            if (res.data.code === "200") {
              alert("添加成功!");
              this.reload();
            } else if (res.data.code === "600") {
              alert(res.data.msg);
            } else if (res.data.code === "400") {
              alert(res.data.msg);
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
    },

    // 打开新增窗口
    addDish() {
      this.showDish = true;
    },

    // 关闭新增窗口
    closeWindow() {
      // console.log('hhh')
      this.showDish = false;
    },

    // 执行搜索
    confirmSearch() {},
  },
};
</script>

<style >
.el-tooltip__popper {
  font-size: 14px;
  max-width: 40%;
}

#addForm {
  overflow: auto;

  width: 800px;
  height: 600px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
