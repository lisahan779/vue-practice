<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
<!-- 传值 -->
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>  
        </router-link>
      </template>
    </m-list-card>
    <!-- 封装的卡片携带列表项 -->
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- #items="{category}"与组件的slot进行关联 父组件直接循环slot -->
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu1" title="精彩视频">缓缓</m-card>
    <m-card icon="menu1" title="图文攻略">测测</m-card>
  </div>
</template>

<script>
import dayjs from "dayjs"; // 时间插件

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 2000,
        },
        pagination: {
          el: ".pagination-home",
          clickable: true,
          // type:"bullets",
        },
        autoplayDisableOnInteraction: false, // 必须加否则不轮播
      },
      newsCats: [
        // {
        //   name: "热门",
        //   // newslist:[{
        //   //   categoryName:"公告",
        //   //   title:"6月2日不统计",
        //   //   data:"06/01"
        //   // }]
        //   // 把内容重复5遍fill填充内容为1 ，然后将1替换为下面这个对象数据
        //   newsList: new Array(5).fill({}).map(() => ({
        //     categoryName: "公告",
        //     title: "6月2日不统计",
        //     data: "06/01",
        //   })),
        // },
      ],
      heroCats: [],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables"; //

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
// 小点
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      //设置某一个不加左边框 4的倍数没有
      border-right: none;
    }
  }
}
</style>
