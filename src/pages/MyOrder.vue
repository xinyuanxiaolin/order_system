<template>
  <div id="order">
    <el-table
      :data="tableData"
      border
      ref="order"
      style="font-size: 12px; width: 100%; margin-bottom: 10px"
    >
      <el-table-column prop="dishName" label="菜品" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogTable(scope.row.id)"
            >查看菜品
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="no" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="amount" label="金额" width="100">
      </el-table-column>
      <el-table-column prop="address" label="送货地址" width="200">
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="100">
      </el-table-column>
      <el-table-column prop="telephone" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="100">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">待付款</span>
          <span v-if="scope.row.status === 2">已支付</span>
          <span v-if="scope.row.status === 3">已退款</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            取消
          </el-button>

          <el-button
            @click.native.prevent="payRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            付款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 详细订单的菜品信息 -->
    <el-dialog title="商品信息" :visible.sync="dialogTableVisible">
      <el-table :data="goodsList" border stripe>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>

        <el-table-column prop="description" label="商品描述"></el-table-column>
        <el-table-column label="图片"
          ><template slot-scope="scope">
            <el-image
              style=""
              :src="scope.row.image"
              :pre-src-list="[scope.row.image]"
            ></el-image> </template
        ></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 微信支付宝支付 -->
    <!-- <el-dialog title="支付界面" :visible.sync="showPayment">
      <el-tabs v-model="activeName">
        <el-tab-pane label="微信支付" name="first">
          <el-image
            style="width: 100px; height: 100px"
            src=""
            fit="cover"
          ></el-image>
        </el-tab-pane>
        <el-tab-pane label="支付宝支付" name="second">
          <el-image
            style="width: 100px; height: 100px"
            src=""
            fit="cover"
          ></el-image>
        </el-tab-pane>
      </el-tabs>
    </el-dialog> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyOrder",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      // 存订单的菜品列表
      // 存每个订单菜品
      goodsList: [],
      dialogTableVisible: false,
      showPayment: false,
      activeName: "first",
    };
  },

  methods: {
    deleteRow(index, rows) {
      // console.log(index, rows[index].id);
      if (confirm("是否取消订单?")) {
        axios.delete(`http://localhost:8080/api/orders/${rows[index].id}`).then(
          (res) => {
            // console.log(res.data)
            if (res.data.code === "200") {
              alert("取消成功!");
              this.reload();
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
    },

    payRow(index, rows) {
      console.log(index, rows[index]);

      // this.showPayment = true;

      window.open(
        `http://localhost:8080/api/alipay//pay?traceNo=${rows[index].no}&totalAmount=${rows[index].amount}&subject=${localStorage.nickname}`
      );
    },

    // 显示菜品
    dialogTable(id) {
      this.dialogTableVisible = true;
      // console.log(id)
      axios.get(`http://localhost:8080/api/orders/getDishById/${id}`).then(
        (res) => {
          console.log(res.data);
          this.goodsList = res.data.data;
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
  },

  mounted() {
    axios
      .get(
        `http://localhost:8080/api/orders/page?userId=${localStorage.userId}&pageNum=1&pageSize=100&name=${localStorage.nickname}`
      )
      .then(
        (res) => {
          // console.log(res.data);
          if (res.data.code === "200") {
            this.tableData = res.data.data.records;
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
  },
};
</script>

<style>
#order {
  margin: 0 100px 0 100px;
}
</style>