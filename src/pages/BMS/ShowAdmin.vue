<template>
  <div>
    <el-row style="margin-bottom:10px">
      <el-button round @click="addUser"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <div style="float: right">
        <el-input
          placeholder="请输入用户名进行搜索"
          prefix-icon="el-icon-search"
          v-model="page.input"
        >
        </el-input>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border stripe size="small">
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="200">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        width="200"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="200">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="200">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100"> </el-table-column>
      <el-table-column label="是否为管理员">
        <template slot-scope="scope">
          <span>{{ scope.row.admin === 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
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

    <!-- 编辑的方框 -->
    <el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
      <el-form :model="editTable">
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editTable.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="editTable.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="editTable.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="editTable.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="管理员" :label-width="formLabelWidth">
          <el-select v-model="editTable.admin"  placeholder="请选择">
            <el-option label="是" value=1></el-option>
            <el-option label="否" value=0></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="comfirmChange"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 增加的方框 -->
    <el-dialog title="用户编辑" :visible.sync="dialogAddFormVisible"> 
   
   
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
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="formLabelAlign.telephone"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formLabelAlign.address"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formLabelAlign.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员">
          <el-select v-model="formLabelAlign.admin">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像:">
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
    </el-dialog>
   
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ShowAdmin",
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
        username: "",
        password: "",
        telephone: "",
        address: "",
        sex: "",
        admin: null,
      },
      // 图片文件
      fileList: [],
     

      // 图片的地址
      url: "",
      // 新增方框的显示
      dialogAddFormVisible:false,
      // 编辑方框显示
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editTable: {
        id:null,
        telephone: "",
        nickname: "",
        address: "",
        sex: "",
        admin: null,
      },
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
            `http://localhost:8080/api/user/page?pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}&username=${this.page.input}`
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

    // 编辑
    editRow(index, rows) {
      // console.log(index, rows);
      this.dialogFormVisible = true;
      const user = rows[index];
      this.editTable.nickname = user.nickname;
      this.editTable.address = user.address;
      this.editTable.telephone = user.telephone;
      this.editTable.sex = user.sex;
      // this.editTable.admin = user.admin;
      this.editTable.id=user.id;
    },
    // 在编辑的时候确认修改
    comfirmChange(){
      axios
        .post(`http://localhost:8080/api/user/save  `, {
          id:this.editTable.id,     
          address: this.editTable.address,
          telephone: this.editTable.telephone,
          sex: this.editTable.sex,
          admin: this.editTable.admin,
          // avatar_url: this.url,
        })
        .then(
          (res) => {
            console.log(res.data);
            if (res.data.code === "200") {
              alert("修改成功!");
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

    deleteRow(index, rows) {
      //   console.log(index, rows[index].id);
      if (confirm("确定是否移除?")) {
        axios.delete(`http://localhost:8080/api/user/${rows[index].id}`).then(
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
      // console.log(this.url);
     

      axios
        .post(`http://localhost:8080/api/user/save  `, {
          username: this.formLabelAlign.username,
          password: this.formLabelAlign.password,
          address: this.formLabelAlign.address,
          telephone: this.formLabelAlign.telephone,
          sex: this.formLabelAlign.sex,
          admin: this.formLabelAlign.admin,
          avatar_url: this.url,
        })
        .then(
          (res) => {
            // console.log(res.data);
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
    addUser() {
       this.dialogAddFormVisible=true;
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
