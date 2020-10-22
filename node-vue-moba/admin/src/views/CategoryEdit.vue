<template>
  <!-- 新建编辑分类 -->
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <!-- label-width="120px"label在左侧显示 .native.prevent原生表单阻止提交 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 联动 -->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- :label="item.name"显示的数据  :value="item._id"是存的内容， -->
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    //接收传的值
    id: {},
  },
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  methods: {
    // 9 本地访问这个新建分类接口
    async save() {
      if (this.id) {
        // 修改数据
        await this.$http.put("rest/categories/" + this.id, this.model);
      } else {
         await this.$http.post("rest/categories", this.model);
      }

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get("rest/categories/" + this.id);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      // 由于分页接口发送的关与数据的内容是rea.data.all
      this.parents = res.data.all;
    },

    //  ------线上接口方法------
    // 提交数据接口
    // async save(){
    //   let res
    //   if (this.id) {
    //     res = await this.$http.put(`rest/categories/${this.id}`, this.model)
    //   } else {
    //     res = await this.$http.post('rest/categories', this.model)
    //   }
    //   this.$router.push('/categories/list')
    //   this.$message({
    //     type: 'success',
    //     message: '保存成功'
    //   })
    // },

    // async fetch() {
    //   const res = await this.$http.get(`rest/categories/${this.id}`);
    //   this.model = res.data;
    // },
    //   async fetchParents() {
    //     const res = await this.$http.get(`rest/categories`);
    //     this.parents = res.data;
    //   },
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  },
};
</script>
