<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
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
      pageSizes: 3, //每页展示数据
      totalCount: 30, //总数
      currentPage3: 1, //默认显示第几页
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage3 = val;
        this.fetch()
    },
    async fetch() {
      const res = await this.$http.get("rest/ads",{
        params: { page: this.currentPage3, row: this.pageSizes },
      });
      this.items = res.data.all;
      this.totalCount=res.data.count
      console.log(this.totalCount)
    },
    remove(row) {
      this.$confirm(`是否确定要删除 "${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

