<template>
  <div id="order">
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 10px">
      <el-table-column prop="name" label="菜品" width="150"> </el-table-column>
      <el-table-column prop="orderNum" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="price" label="金额" width="100"> </el-table-column>
      <el-table-column prop="address" label="送货地址" width="200">
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="100">
      </el-table-column>
      <el-table-column prop="telephone" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="100"> </el-table-column>

      <el-table-column prop="status" label="状态" width="100"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            删除
          </el-button>
          <el-button
            @click.native.prevent="cancelRow(scope.$index, tableData)"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyOrder",
  data() {
    return {
      tableData: [
        {
          
          name: 1,
          orderNum:2,
          price:3,
          address: 4,
          consignee:5,
          telephone:6,
          time:7,
          status:8

        },
      ],
    };
  },

  methods: {
    deleteRow(index, rows) {
      console.log(index, rows[index]);
    },
    cancelRow(index, rows) {
      console.log(index, rows[index]);
    },
    payRow(index, rows) {
      console.log(index, rows[index]);
    },
  },

  mounted() {
    axios.get(
      `http://localhost:8080/api/orders/page?userId=${localStorage.userId}&pageNum=1&pageSize=100&name=${localStorage.nickname}`
    ).then(
      res=>{
        console.log(res.data)
      },
      err=>{
        console.log(err.message)
      }
    )
  },
};
</script>

<style>
#order {
  margin: 0 100px 0 100px;
}
</style>