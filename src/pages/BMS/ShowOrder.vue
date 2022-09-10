<template>
  <div>
    <el-row>
      <el-button round @click="addOrder"
        ><i class="el-icon-plus"></i> 新增</el-button
      >
      <div style="float: right">
        <el-input
          placeholder="请输入菜品名"
          prefix-icon="el-icon-search"
          v-model="input"
          @keyup.enter.native="confirmSearch"
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
        <el-form-item label="描述">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formLabelAlign.price"></el-input>
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
export default {
  name: "ShowOrder",
  inject: ["reload"],

  methods: {
   addOrder(){

    }
  },
};
</script>

<style>
</style>