<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:left
        ><img class="back" src="~assets/img/navbar/back.png" @click="backClick"
      /></template>
      <template v-slot:center><span @click="refresh">商品参数</span></template>
      <template v-slot:right></template>
    </nav-bar>
    <div class="detail">
      <Scroll class="content">
        <swiper>
          <swiper-item v-for="item1 in imgs" :key="item1">
            <div class="imgs">
              <img :src="item1" />
            </div>
          </swiper-item>
        </swiper>
        <div class="title">
          {{ title }}
        </div>
        <div class="priceInfo">
          <span class="price">{{ price }}</span>
          <span class="disprice">{{ price }}</span>
          <span class="discount">优惠价</span>
        </div>
        <div class="seviceInfo">
          <div class="seviceitem">销量 0</div>
          <div class="seviceitem">★ {{ collect }}</div>
          <div class="seviceitem">72小时内发货</div>
        </div>
        <div class="goodsInfo">
          <div v-for="item2 in imgs" :key="item2">
            <img :src="item2" />
          </div>
        </div>
      </Scroll>
    </div>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/narbar/NavBar.vue";
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";
import Scroll from "components/common/scroll/Scroll.vue";
import DetailBottomBar from "views/detail/detailComps/DetailBottomBar.vue";
import { onMounted, ref } from "vue";
export default {
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    Scroll,
    DetailBottomBar,
  },
  data() {
    return {
      id: null,
      type: null,
      title: null,
      price: null,
      collect: null,
      good: "/good",
      jpg: ".jpg",
      back: "<",
      path: "/img/",
      urlnum: "",
      lettergoods: [
        {
          title: "",
          url: "",
          collect: "",
          price: "",
          type: "",
          id: "",
        },
      ],
      imgs: [],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.type = this.$route.params.type;
    this.title = this.$route.params.title;
    this.price = this.$route.params.price;
    this.collect = this.$route.params.collect;
    this.sell = this.$route.params.sell;
  },
  mounted() {
    console.log(this.id);
    console.log(this.type);
    console.log(this.url);
    this.caculate();
  },
  setup() {},
  computed: {
    url1: function () {
      return this.path + this.type + this.good + this.id + "-1" + this.jpg;
    },
    url2: function () {
      return this.path + this.type + this.good + this.id + "-2" + this.jpg;
    },
    url3: function () {
      return this.path + this.type + this.good + this.id + "-3" + this.jpg;
    },
  },
  mounted() {
    this.imgsPush();
  },
  methods: {
    backClick() {
      console.log("返回");
      this.$router.go(-1);
      setTimeout(function () {
        window.location.reload();
      }, 100);
    },
    imgsPush() {
      let list = [this.url1, this.url2, this.url3];
      console.log(list);
      this.imgs = list;
      console.log(this.imgs);
    },
  },
};
</script>
<style scoped>
.nav-bar {
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 12;
}
.detail {
  height: 100vh;
  position: relative;
  z-index: 11;
  background-color: #fff;
}
.content {
  position: absolute;
  background-color: #fff;
  top: 0;
  bottom: 93px;
}
.imgs img {
  width: 100%;
}
.back {
  width: 30px;
  height: 30px;
  padding-top: 7px;
}
.title {
  font-size: 24px;
  padding: 10px 0 10px;
}
.priceInfo {
  width: 100%;
  height: 50px;
  flex-direction: row;
  display: flex;
}
.price {
  color: palevioletred;
  margin: 5px 5px 0;
  font-size: 30px;
}
.disprice {
  color: darkgray;
  text-decoration: darkgray line-through;
  font-size: 20px;
  margin: 15px 5px 0;
}
.discount {
  font-size: 16px;
  background-color: red;
  border-radius: 16px;
  color: white;
  width: 60px;
  height: 25px;
  justify-content: center;
  text-align: center;
  line-height: 25px;
  margin: 10px 5px 0;
}
.seviceInfo {
  width: 100%;
  display: flex;
  flex-direction: row;
  box-shadow: 3px 3px 1px rgb(197, 197, 197, 0.3);
}
.seviceitem {
  flex: 1;
  color: darkgray;
  padding: 10px 0 10px;
  margin-left: 10px;
}
.goodsInfo {
  padding-top: 30px;
}
.goodsInfo img {
  width: 100%;
}
</style>
