<template>
  <div>
    <el-row>
      <div style="float: right">
        <el-input
          placeholder="请输入订单名称"
          prefix-icon="el-icon-search"
          v-model="page.input"
        >
        </el-input>
      </div>
    </el-row>

    <el-table :data="tableData" style="width: 100%" border stripe size="small">
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="订单名称" width="100">
      </el-table-column>
      <el-table-column prop="no" label="订单编号" width="200">
      </el-table-column>

      <el-table-column
        prop="remark"
        label="备注"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="address" label="送货地址" width="100">
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="100">
      </el-table-column>
      <el-table-column prop="telephone" label="电话" width="150">
      </el-table-column>

      <el-table-column prop="orderTime" label="下单时间" width="150">
      </el-table-column>

      <el-table-column prop="amount" label="总价"> </el-table-column>

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
  name: "ShowOrder",
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
            `http://localhost:8080/api/orders/page?admin=${localStorage.admin}&pageNum=${this.page.pageNum}&pageSize=${this.page.pageSize}&name=${this.page.input}`
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
      this.$confirm("是否移除?", "提示", {
        type: "warning",
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then(() => {
        axios.delete(`http://localhost:8080/api/orders/${rows[index].id}`).then(
          (res) => {
            // console.log(res.data);
            if (res.data.code === "200") {
              this.$message("删除成功!");
              this.reload();
            } else {
              this.$alert("出现未知错误,请重试!");
            }
          },
          (err) => {
            console.log(err);
          }
        );
      });
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
</style>
