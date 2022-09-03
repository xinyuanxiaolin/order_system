<template>
  <div id='cart'>
    <el-table :data="tableData" border style="width: 100%; margin-bottom:10px;">
      <el-table-column prop="name" label="菜品" width="250"> </el-table-column>
      <el-table-column prop="price" label="单价" width="180"> </el-table-column>
      <el-table-column prop="num" label="数量" width="180"> </el-table-column>
      <el-table-column prop="totalEach" label="小计" width="180"> </el-table-column>

      <el-table-column label="操作">
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

    <div id="submit">
        <span>应付金额:<em>￥20</em></span>
        <br>
        <br>
        <el-button type="primary">提交订单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppoingCart",
  data() {
    return {
      tableData: [
        {
          date: 1,
          name: 2,
          address: 3,
        },
      ],
    };
  },

  methods: {
    deleteRow(index, rows) {
      console.log(index, rows);
    },
  },
};
</script>

<style>
#cart{
    margin: 0 300px 0 200px;
}
#submit{
    float: right;
}
</style>