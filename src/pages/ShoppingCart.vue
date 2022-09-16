<template>
  <div id="pre-cart">
    
    <div id="cart">
      <el-table
        :data="addedGoods"
        ref="multipleTable"
        border
        @select="handleSum"
        @select-all="handleSum"
        style="width: 100%; margin-bottom: 10px"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="dishName"
          label="菜品"
          width="250"
        ></el-table-column>
        <el-table-column prop="price" label="单价" width="180">
          <template slot-scope="scope">
            <span>￥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalEach" label="小计" width="180">
          <template slot-scope="scope">
            {{ (scope.row.totalEach = scope.row.price * scope.row.num) }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, addedGoods)"
              size="mini"
              type="danger"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div id="submit">
        <span
          >应付金额:<span style="color: red">￥{{ sum }}</span>
        </span>
        <br />
        <br />
        <el-button type="primary" @click="submitOrder">提交订单</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShoppoingCart",
  inject: ["reload"],
  data() {
    return {
      sum: 0,
      addedGoods: [],
    };
  },

  methods: {
    deleteRow(index, rows) {
      console.log(index, rows[index]);
      if (confirm("是否删除")) {
        axios.delete(`http://localhost:8080/api/cart/${rows[index].id}`).then(
          (res) => {
            // console.log(res.data);
            if (res.data.code === "200") alert("删除成功!");
            this.reload();
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
    },

    // 计算总额
    handleSum() {
      this.sum = 0;
      this.$nextTick(() => {
        console.log(this.$refs.multipleTable.selection);
        this.$refs.multipleTable.selection.forEach((item) => {
          this.sum += item.price * item.num;
        });
      });
    },

    submitOrder() {
      axios
        .post("http://localhost:8080/api/orders/save", {
          userId: localStorage.userId,
          amount: this.sum,
          carts: this.$refs.multipleTable.selection,
        })
        .then(
          (res) => {
            console.log(res.data);
            if (res.data.code === "200") {
              this.$router.push("/index/order");
            } else if (res.data.code === "400") {
              alert(res.data.msg);
            }
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
        `http://localhost:8080/api/cart/page?userId=${localStorage.userId}&pageNum=1&pageSize=100`
      )
      .then(
        (res) => {
          console.log(res.data);
          this.addedGoods = res.data.data.records;
        },
        (err) => {
          console.log(err.message);
        }
      );
  },
};
</script>

<style scoped>


#pre-cart{
  position:absolute;
   height: 750px;
  
}
#cart {
  margin: 80px 300px 0 200px;
  height: 400px;
  background-color: #fff;
 
}
#submit {
  float: right;
}
</style>