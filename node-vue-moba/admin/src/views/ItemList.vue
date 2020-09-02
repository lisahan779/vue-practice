<template>
  <div class="box">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <!-- 显示图标 -->
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3rem;" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagenation"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="pageSizes"
      layout="prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      pageSizes: 10, //每页展示数据
      totalCount: 30, //总数
      currentPage3: 1, //默认显示第几页
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items", {
        params: { page: this.currentPage3, row: this.pageSizes },
      });
      this.items = res.data.all;
      this.totalCount = res.data.count;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/items/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
    handleCurrentChange(val) {
      this.currentPage3 = val;
      this.fetch();
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
.box {
  position: relative;
}
.pagenation {
  position: absolute;
  bottom: 1 0;
  right: 0;
}
</style>