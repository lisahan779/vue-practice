<template>
<!-- 列表项卡片，带分类 可以滑动 带参数 -->
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{active: active === i}"
      v-for="(category, i) in categories" :key="i"
      @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <!-- 循环有多少标题展示多少屏   @slide-change方法组件的index值给active滑动那一排上面的标题跟着变换-->
    <div class="pt-3">
      <swiper ref="list" :options="{autoHeight: true}"
      @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <!-- 获取循环后的内容展示  -->
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },  //图标
    title: { type: String, required: true },  //标题
    categories: { type: Array, required: true }  //分类的类型
  },
  // 局部高亮
  data(){
    return {
      active: 0
    }
  }
};
</script>

<style>
</style>
