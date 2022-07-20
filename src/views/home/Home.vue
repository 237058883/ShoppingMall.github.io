<template>
  <div id="home">
    <Scroll class="content" @pullingUp="loadmore" ref="childDom">
      <nav-bar class="home-nav">
        <template v-slot:left></template>
        <template v-slot:center>购物街</template>
        <template v-slot:right></template>
      </nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-popular></home-popular>
      <tab-control
        class="home-tab-control"
        @tabclick="tabclick"
        :titles="['流行', '新款', '精选']"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>
  </div>
</template>

<script>
import HomeSwiper from "views/home/childComps/HomeSwiper.vue";
import HomeRecommend from "views/home/childComps/HomeRecommend.vue";
import HomePopular from "views/home/childComps/HomePopular.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import NavBar from "components/common/narbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import backTop from "components/content/backTop/backTop.vue";
import { request } from "@/network/request";
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomePopular,
    TabControl,
    GoodsList,
    Scroll,
    backTop,
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      newpage: "",
      currentType: "pop",
      goods: {
        pop: { page: 1, list: [], style: "pop" },
        new: { page: 1, list: [], style: "new" },
        sell: { page: 1, list: [], style: "sell" },
      },
      goodpopItem: [
        {
          title: "优衣库【合作款UNIQLO U】女装 针织中裙 447542 UNIQLO",
          url: require("@/assets/img/good/pop/good1-1.jpg"),
          collect: 44213,
          price: "￥" + 180,
          type: "pop",
          id: "1",
        },
        {
          title: "金丝绒半身裙秋冬长裙2021新款百褶裙气质垂感裙子女大码半裙冬裙",
          url: require("@/assets/img/good/pop/good2-1.jpg"),
          collect: 72213,
          price: "￥" + 200,
          type: "pop",
          id: "2",
        },
        {
          title: "米白色毛呢喇叭裤女2022夏季新款高腰显瘦显高垂感蓝色微喇长裤子",
          url: require("@/assets/img/good/pop/good3-1.jpg"),
          collect: 3544,
          price: "￥" + 50000,
          type: "pop",
          id: "3",
        },
        {
          title: "改良旗袍连衣裙2022新款春夏季女高端品牌洋气质两件套装妈妈时尚",
          url: require("@/assets/img/good/pop/good4-1.jpg"),
          collect: 45357,
          price: "￥" + 220,
          type: "pop",
          id: "4",
        },
        {
          title: "2022春夏新款女时尚干练有型修身西装长裤醋酸面料真丝套装两件套",
          url: require("@/assets/img/good/pop/good5-1.jpg"),
          collect: 12358,
          price: "￥" + 220,
          type: "pop",
          id: "5",
        },
        {
          title: "日本代购SLY大口袋衬衫女宽松大码蝙蝠型显瘦简约开叉中长款上衣",
          url: require("@/assets/img/good/pop/good6-1.jpg"),
          collect: 45343,
          price: "￥" + 440,
          type: "pop",
          id: "6",
        },
        {
          title: "odelia《礼赞》夏季复古婚纱20212年新款新娘主婚纱礼服宫廷拖尾",
          url: require("@/assets/img/good/pop/good10-1.jpg"),
          collect: 95522,
          price: "￥" + 1999,
          type: "pop",
          id: "10",
        },
        {
          title: "APEA2021春夏款美式复古辣妹腰头露腰V领设计开叉加厚内里短裤裙",
          url: require("@/assets/img/good/pop/good8-1.jpg"),
          collect: 55425,
          price: "￥" + 143,
          type: "pop",
          id: "8",
        },
        {
          title: "金丝绒半身裙女2022春秋新款高腰包臀鱼尾裙中长款红色包裙长裙子",
          url: require("@/assets/img/good/pop/good7-1.jpg"),
          collect: 42255,
          price: "￥" + 306,
          type: "pop",
          id: "7",
        },
        {
          title: "高腰毛呢阔腿裤女秋冬2022新款显瘦裙裤羊毛休闲裤宽松韩版九分裤",
          url: require("@/assets/img/good/pop/good9-1.jpg"),
          collect: 49867,
          price: "￥" + 159,
          type: "pop",
          id: "9",
        },
        {
          title: "牛仔衬衫女2022新款设计感小众短款上衣夏季宽松短袖衬衣",
          url: require("@/assets/img/good/pop/good11-1.jpg"),
          collect: 135344,
          price: "￥" + 71,
          type: "pop",
          id: "11",
        },
        {
          title: "新品高腰牛仔短裙女2022春夏新款a字裙显瘦百搭白色包臀半身裙子",
          url: require("@/assets/img/good/pop/good12-1.jpg"),
          collect: 3454345,
          price: "￥" + 74,
          type: "pop",
          id: "12",
        },
        {
          title: "纯白色鳄鱼皮女包奢侈品大牌正品链条包单肩斜挎包女士风琴小方包",
          url: require("@/assets/img/good/pop/good13-1.jpg"),
          collect: 345736,
          price: "￥" + 4480,
          type: "pop",
          id: "13",
        },
        {
          title: "COACH/蔻驰女包奥莱Nolita15香布蕾老花牛仔蓝麻将包手腕包手拿包",
          url: require("@/assets/img/good/pop/good14-1.jpg"),
          collect: 122571,
          price: "￥" + 899,
          id: "14",
        },
        {
          title: "「鱼小瑜」粘纤里的奢品 ba22夏季法式竹叶碎花裹身V领连衣裙YI96",
          url: require("@/assets/img/good/pop/good15-1.jpg"),
          collect: 135575,
          price: "￥" + 388,
          type: "pop",
          id: "15",
        },
        {
          title: "连衣裙法式丝滑奢品温柔雾粉重绉桑蚕丝夏季新款a字裙纯色仙女裙",
          url: require("@/assets/img/good/pop/good16-1.jpg"),
          collect: 173135,
          price: "￥" + 498,
          type: "pop",
          id: "16",
        },
        {
          title: "t恤女真丝2022款气质淑一字领常规宽松大码短袖夏季时尚洋气小衫",
          url: require("@/assets/img/good/pop/good17-1.jpg"),
          collect: 442713,
          price: "￥" + 398,
          type: "pop",
          id: "17",
        },
        {
          title: "「鱼小瑜」JR精致入骨小黑裙 22夏重工蕾丝蝴蝶结冰丝连衣裙MZ137",
          url: require("@/assets/img/good/pop/good18-1.jpg"),
          collect: 34573,
          price: "￥" + 582,
          type: "pop",
          id: "18",
        },
        {
          title: "【七夕礼物】Dior迪奥全新魅惑唇膏 时尚外壳 镜光黑管口红#8#740",
          url: require("@/assets/img/good/pop/good19-1.jpg"),
          collect: 7534431,
          price: "￥" + 520,
          type: "pop",
          id: "19",
        },
        {
          title: "2022新款潮真皮菜篮子包头层牛皮荔枝纹手提水桶包大容量包包女夏",
          url: require("@/assets/img/good/pop/good20-1.jpg"),
          collect: 64542,
          price: "￥" + 278,
          type: "pop",
          id: "20",
        },
        {
          title: "安踏奶盖鞋丨厚底板鞋女鞋2022夏季新款白色休闲增高百搭潮小白鞋",
          url: require("@/assets/img/good/pop/good21-1.jpg"),
          collect: 721823,
          price: "￥" + 259,
          type: "pop",
          id: "21",
        },
        {
          title: "SUQQU记忆粉饼美妆粉底霜提亮遮瑕粉霜30g油皮粉底液持久轻薄底妆",
          url: require("@/assets/img/good/pop/good22-1.jpg"),
          collect: 378973,
          price: "￥" + 669,
          type: "pop",
          id: "22",
        },
        {
          title: "【七夕礼物】CHANEL 香奈儿魅力精萃唇膏 细管缎光滋润口红礼盒",
          url: require("@/assets/img/good/pop/good24-1.jpg"),
          collect: 2373757,
          price: "￥" + 470,
          type: "pop",
          id: "24",
        },
        {
          title: "李宁X迪士尼玩具总动员草莓熊系列休闲鞋女鞋板鞋鞋子低帮运动鞋",
          url: require("@/assets/img/good/pop/good23-1.jpg"),
          collect: 987195,
          price: "￥" + 398,
          type: "pop",
          id: "23",
        },
        {
          title: "达芙妮日系玛丽珍小皮鞋女夏2022年新款白色洛丽塔鞋jk鞋圆头单鞋",
          url: require("@/assets/img/good/new/good1-1.jpg"),
          collect: 154532,
          price: "￥" + 169,
          type: "new",
          id: "1",
        },
        {
          title: "主婚纱2022新款新娘重工气质大拖尾孕妇法式泡泡袖礼服公主高级感",
          url: require("@/assets/img/good/new/good2-1.jpg"),
          collect: 26912,
          price: "￥" + 868,
          type: "new",
          id: "2",
        },
        {
          title: "格子毛呢短裤女冬款外穿2020新款高腰短裙裤韩版A字不规则半身裙",
          url: require("@/assets/img/good/new/good3-1.jpg"),
          collect: 257224,
          price: "￥" + 179,
          type: "new",
          id: "3",
        },
        {
          title: "毛衣女士内搭低领针织打底衫圆领新款洋气秋冬爆款2021春秋季时尚",
          url: require("@/assets/img/good/new/good4-1.jpg"),
          collect: 37931,
          price: "￥" + 155,
          type: "new",
          id: "4",
        },
        {
          title: "2022新款秋冬毛衣女内搭薄款套头短款洋气时尚针织羊毛文艺打底衫",
          url: require("@/assets/img/good/new/good5-1.jpg"),
          collect: 58672,
          price: "￥" + 158,
          type: "new",
          id: "5",
        },
        {
          title: "安之伴【轻柔型】睡衣女春秋季2022年新款纯棉情侣家居服男士夏天",
          url: require("@/assets/img/good/new/good6-1.jpg"),
          collect: 531573,
          price: "￥" + 198,
          type: "new",
          id: "6",
        },
        {
          title: "CHUU棋盘格V领短袖连衣裙女2022年春夏季新款小个子气质a字短裙子",
          url: require("@/assets/img/good/new/good7-1.jpg"),
          collect: 156512,
          price: "￥" + 299,
          type: "new",
          id: "7",
        },
        {
          title: "贝妍睡衣女春秋季新款性感V领女纯色舒适棉家居服时尚豹纹裤套装",
          url: require("@/assets/img/good/new/good8-1.jpg"),
          collect: 27687,
          price: "￥" + 257,
          type: "new",
          id: "8",
        },
        {
          title: "Enjoy it渐变丝袜女薄款防勾丝裤袜INS网红款夏季黑色打底连裤袜",
          url: require("@/assets/img/good/new/good9-1.jpg"),
          collect: 24734,
          price: "￥" + 78,
          type: "new",
          id: "9",
        },
        {
          title: "颜域简约百褶半身裙女夏装2022新款时尚减龄显瘦纯色气质A字裙子",
          url: require("@/assets/img/good/new/good10-1.jpg"),
          collect: 257778,
          price: "￥" + 339,
          type: "new",
          id: "10",
        },
        {
          title: "雪纺连衣裙女夏季新款超长款裙子气质显瘦沙滩波西米亚长裙到脚踝",
          url: require("@/assets/img/good/new/good11-1.jpg"),
          collect: 182578,
          price: "￥" + 338,
          type: "new",
          id: "11",
        },
        {
          title: "2022夏季新款长袖气质雪纺显瘦长款大摆连衣裙脚踝沙滩裙长裙飘逸",
          url: require("@/assets/img/good/new/good12-1.jpg"),
          collect: 396944,
          price: "￥" + 289,
          type: "new",
          id: "12",
        },
      ],
      goodnewItem: [
        {
          title: "达芙妮日系玛丽珍小皮鞋女夏2022年新款白色洛丽塔鞋jk鞋圆头单鞋",
          url: require("@/assets/img/good/new/good1-1.jpg"),
          collect: 154532,
          price: "￥" + 169,
          type: "new",
          id: "1",
        },
        {
          title: "主婚纱2022新款新娘重工气质大拖尾孕妇法式泡泡袖礼服公主高级感",
          url: require("@/assets/img/good/new/good2-1.jpg"),
          collect: 26912,
          price: "￥" + 868,
          type: "new",
          id: "2",
        },
        {
          title: "格子毛呢短裤女冬款外穿2020新款高腰短裙裤韩版A字不规则半身裙",
          url: require("@/assets/img/good/new/good3-1.jpg"),
          collect: 257224,
          price: "￥" + 179,
          type: "new",
          id: "3",
        },
        {
          title: "毛衣女士内搭低领针织打底衫圆领新款洋气秋冬爆款2021春秋季时尚",
          url: require("@/assets/img/good/new/good4-1.jpg"),
          collect: 37931,
          price: "￥" + 155,
          type: "new",
          id: "4",
        },
        {
          title: "2022新款秋冬毛衣女内搭薄款套头短款洋气时尚针织羊毛文艺打底衫",
          url: require("@/assets/img/good/new/good5-1.jpg"),
          collect: 58672,
          price: "￥" + 158,
          type: "new",
          id: "5",
        },
        {
          title: "安之伴【轻柔型】睡衣女春秋季2022年新款纯棉情侣家居服男士夏天",
          url: require("@/assets/img/good/new/good6-1.jpg"),
          collect: 531573,
          price: "￥" + 198,
          type: "new",
          id: "6",
        },
        {
          title: "CHUU棋盘格V领短袖连衣裙女2022年春夏季新款小个子气质a字短裙子",
          url: require("@/assets/img/good/new/good7-1.jpg"),
          collect: 156512,
          price: "￥" + 299,
          type: "new",
          id: "7",
        },
        {
          title: "贝妍睡衣女春秋季新款性感V领女纯色舒适棉家居服时尚豹纹裤套装",
          url: require("@/assets/img/good/new/good8-1.jpg"),
          collect: 27687,
          price: "￥" + 257,
          type: "new",
          id: "8",
        },
        {
          title: "Enjoy it渐变丝袜女薄款防勾丝裤袜INS网红款夏季黑色打底连裤袜",
          url: require("@/assets/img/good/new/good9-1.jpg"),
          collect: 24734,
          price: "￥" + 78,
          type: "new",
          id: "9",
        },
        {
          title: "颜域简约百褶半身裙女夏装2022新款时尚减龄显瘦纯色气质A字裙子",
          url: require("@/assets/img/good/new/good10-1.jpg"),
          collect: 257778,
          price: "￥" + 339,
          type: "new",
          id: "10",
        },
        {
          title: "雪纺连衣裙女夏季新款超长款裙子气质显瘦沙滩波西米亚长裙到脚踝",
          url: require("@/assets/img/good/new/good11-1.jpg"),
          collect: 182578,
          price: "￥" + 338,
          type: "new",
          id: "11",
        },
        {
          title: "2022夏季新款长袖气质雪纺显瘦长款大摆连衣裙脚踝沙滩裙长裙飘逸",
          url: require("@/assets/img/good/new/good12-1.jpg"),
          collect: 396944,
          price: "￥" + 289,
          type: "new",
          id: "12",
        },
        {
          title: "COACH/蔻驰女包奢侈品官网奥莱山茶花Parker女士单肩包斜挎链条包",
          url: require("@/assets/img/good/new/good13-1.jpg"),
          collect: 453422,
          price: "￥" + 1899,
          type: "new",
          id: "13",
        },
        {
          title: "卡梵蒂2022新款鳄鱼皮女包奢侈品大牌锁扣铂金包大容量女士手提包",
          url: require("@/assets/img/good/new/good14-1.jpg"),
          collect: 412613,
          price: "￥" + 2698,
          type: "new",
          id: "14",
        },
        {
          title: "FILA 斐乐猫爪1代女鞋老爹鞋夏季网面轻便运动鞋新款休闲鞋",
          url: require("@/assets/img/good/new/good15-1.jpg"),
          collect: 153711,
          price: "￥" + 709,
          type: "new",
          id: "15",
        },
        {
          title: "【七夕礼物】Hermes爱马仕口红瑰丽唇膏润唇膏礼物官方正品旗舰店",
          url: require("@/assets/img/good/new/good16-1.jpg"),
          collect: 73731,
          price: "￥" + 550,
          type: "new",
          id: "16",
        },
        {
          title: "【高奢旗袍】SongofSong歌中歌夏季2022新品银白色蕾丝刺绣连衣裙",
          url: require("@/assets/img/good/new/good17-1.jpg"),
          collect: 242413,
          price: "￥" + 7125,
          type: "new",
          id: "17",
        },
        {
          title: "保罗女包轻奢品牌真皮妈妈包2022新款简约大气中年女士包包手提包",
          url: require("@/assets/img/good/new/good18-1.jpg"),
          collect: 1535757,
          price: "￥" + 368,
          type: "new",
          id: "18",
        },
        {
          title: "WooHa/吾哈2022夏季新款街头印花小众宽松短袖T恤女粉色体恤上衣",
          url: require("@/assets/img/good/new/good19-1.jpg"),
          collect: 753135,
          price: "￥" + 199,
          type: "new",
          id: "19",
        },
        {
          title: "轻熟风法式连衣裙设计感气质高端衬衫半裙通勤小众夏两件套装裙子",
          url: require("@/assets/img/good/new/good20-1.jpg"),
          collect: 1327891,
          price: "￥" + 348,
          type: "new",
          id: "20",
        },
        {
          title: "高个子包臀裙甜辣套装polo性感紧身连衣裙夏季辣妹裙子女女装短裙",
          url: require("@/assets/img/good/new/good21-1.jpg"),
          collect: 132142,
          price: "￥" + 119,
          type: "new",
          id: "21",
        },
        {
          title: "南极人蝴蝶结丝袜女ins潮性感纯欲花边渔网jk过膝蕾丝长筒袜黑丝",
          url: require("@/assets/img/good/new/good22-1.jpg"),
          collect: 8182571,
          price: "￥" + 89,
          type: "new",
          id: "22",
        },
        {
          title: "厚底运动凉鞋女2022年新款夏季鞋子爆款休闲女士女鞋平底沙滩鞋子",
          url: require("@/assets/img/good/new/good23-1.jpg"),
          collect: 515412,
          price: "￥" + 108,
          type: "new",
          id: "23",
        },
        {
          title: "花西子花浅染化妆刷套装/化妆工具美妆用品全套初学者刷子女套刷",
          url: require("@/assets/img/good/new/good24-1.jpg"),
          collect: 182578,
          price: "￥" + 199,
          type: "new",
          id: "24",
        },

        {
          title: "优衣库【合作款UNIQLO U】女装 针织中裙 447542 UNIQLO",
          url: require("@/assets/img/good/pop/good1-1.jpg"),
          collect: 44213,
          price: "￥" + 180,
          type: "pop",
          id: "1",
        },
        {
          title: "金丝绒半身裙秋冬长裙2021新款百褶裙气质垂感裙子女大码半裙冬裙",
          url: require("@/assets/img/good/pop/good2-1.jpg"),
          collect: 72213,
          price: "￥" + 200,
          type: "pop",
          id: "2",
        },
        {
          title: "米白色毛呢喇叭裤女2022夏季新款高腰显瘦显高垂感蓝色微喇长裤子",
          url: require("@/assets/img/good/pop/good3-1.jpg"),
          collect: 3544,
          price: "￥" + 50000,
          type: "pop",
          id: "3",
        },
        {
          title: "改良旗袍连衣裙2022新款春夏季女高端品牌洋气质两件套装妈妈时尚",
          url: require("@/assets/img/good/pop/good4-1.jpg"),
          collect: 45357,
          price: "￥" + 220,
          type: "pop",
          id: "4",
        },
        {
          title: "2022春夏新款女时尚干练有型修身西装长裤醋酸面料真丝套装两件套",
          url: require("@/assets/img/good/pop/good5-1.jpg"),
          collect: 12358,
          price: "￥" + 220,
          type: "pop",
          id: "5",
        },
        {
          title: "日本代购SLY大口袋衬衫女宽松大码蝙蝠型显瘦简约开叉中长款上衣",
          url: require("@/assets/img/good/pop/good6-1.jpg"),
          collect: 45343,
          price: "￥" + 440,
          type: "pop",
          id: "6",
        },
        {
          title: "odelia《礼赞》夏季复古婚纱20212年新款新娘主婚纱礼服宫廷拖尾",
          url: require("@/assets/img/good/pop/good10-1.jpg"),
          collect: 95522,
          price: "￥" + 1999,
          type: "pop",
          id: "10",
        },
        {
          title: "APEA2021春夏款美式复古辣妹腰头露腰V领设计开叉加厚内里短裤裙",
          url: require("@/assets/img/good/pop/good8-1.jpg"),
          collect: 55425,
          price: "￥" + 143,
          type: "pop",
          id: "8",
        },
        {
          title: "金丝绒半身裙女2022春秋新款高腰包臀鱼尾裙中长款红色包裙长裙子",
          url: require("@/assets/img/good/pop/good7-1.jpg"),
          collect: 42255,
          price: "￥" + 306,
          type: "pop",
          id: "7",
        },
        {
          title: "高腰毛呢阔腿裤女秋冬2022新款显瘦裙裤羊毛休闲裤宽松韩版九分裤",
          url: require("@/assets/img/good/pop/good9-1.jpg"),
          collect: 49867,
          price: "￥" + 159,
          type: "pop",
          id: "9",
        },
        {
          title: "牛仔衬衫女2022新款设计感小众短款上衣夏季宽松短袖衬衣",
          url: require("@/assets/img/good/pop/good11-1.jpg"),
          collect: 135344,
          price: "￥" + 71,
          type: "pop",
          id: "11",
        },
        {
          title: "新品高腰牛仔短裙女2022春夏新款a字裙显瘦百搭白色包臀半身裙子",
          url: require("@/assets/img/good/pop/good12-1.jpg"),
          collect: 3454345,
          price: "￥" + 74,
          type: "pop",
          id: "12",
        },
      ],
      goodsellItem: [
        {
          title: "颜域简约百褶半身裙女夏装2022新款时尚减龄显瘦纯色气质A字裙子",
          url: require("@/assets/img/good/new/good10-1.jpg"),
          collect: 257778,
          price: "￥" + 339,
          type: "new",
          id: "10",
        },
        {
          title: "格子毛呢短裤女冬款外穿2020新款高腰短裙裤韩版A字不规则半身裙",
          url: require("@/assets/img/good/new/good3-1.jpg"),
          collect: 257224,
          price: "￥" + 179,
          type: "new",
          id: "3",
        },
        {
          title: "odelia《礼赞》夏季复古婚纱20212年新款新娘主婚纱礼服宫廷拖尾",
          url: require("@/assets/img/good/pop/good10-1.jpg"),
          collect: 95522,
          price: "￥" + 1999,
          type: "pop",
          id: "10",
        },
        {
          title: "2022夏季新款长袖气质雪纺显瘦长款大摆连衣裙脚踝沙滩裙长裙飘逸",
          url: require("@/assets/img/good/new/good12-1.jpg"),
          collect: 396944,
          price: "￥" + 289,
          type: "new",
          id: "2",
        },
        {
          title: "黑色雪纺网纱衬衫套装女夏季2022新款洋气时尚休闲气质短裤两件套",
          url: require("@/assets/img/good/sell/good5-1.jpg"),
          collect: 132167,
          price: "￥" + 268,
          type: "sell",
          id: "5",
        },
        {
          title: "雪纺连衣裙女夏季2022新款气质洋气V领小个子显高绿色荷叶边裙子",
          url: require("@/assets/img/good/sell/good6-1.jpg"),
          collect: 467712,
          price: "￥" + 268,
          type: "sell",
          id: "6",
        },
        {
          title: "牛仔衬衫女2022新款设计感小众短款上衣夏季宽松短袖衬衣",
          url: require("@/assets/img/good/pop/good11-1.jpg"),
          collect: 135344,
          price: "￥" + 71,
          type: "pop",
          id: "11",
        },
        {
          title: "改良旗袍连衣裙2022新款春夏季女高端品牌洋气质两件套装妈妈时尚",
          url: require("@/assets/img/good/pop/good4-1.jpg"),
          collect: 45357,
          price: "￥" + 220,
          type: "pop",
          id: "4",
        },
        {
          title: "主婚纱2022新款新娘重工气质大拖尾孕妇法式泡泡袖礼服公主高级感",
          url: require("@/assets/img/good/new/good2-1.jpg"),
          collect: 26912,
          price: "￥" + 868,
          type: "new",
          id: "2",
        },
        {
          title: "金丝绒半身裙秋冬长裙2021新款百褶裙气质垂感裙子女大码半裙冬裙",
          url: require("@/assets/img/good/pop/good2-1.jpg"),
          collect: 72213,
          price: "￥" + 200,
          type: "pop",
          id: "2",
        },
        {
          title: "APEA2022夏季复古蛋糕印花圆领设计感小众辣妹修身显高短款T恤女",
          url: require("@/assets/img/good/sell/good11-1.jpg"),
          collect: 313573,
          price: "￥" + 209,
          type: "sell",
          id: "11",
        },

        {
          title: "日本代购SLY大口袋衬衫女宽松大码蝙蝠型显瘦简约开叉中长款上衣",
          url: require("@/assets/img/good/pop/good6-1.jpg"),
          collect: 45343,
          price: "￥" + 440,
          type: "pop",
          id: "6",
        },
        {
          title: "金丝绒半身裙女2022春秋新款高腰包臀鱼尾裙中长款红色包裙长裙子",
          url: require("@/assets/img/good/pop/good7-1.jpg"),
          collect: 42255,
          price: "￥" + 306,
          type: "pop",
          id: "7",
        },
        {
          title: "达芙妮日系玛丽珍小皮鞋女夏2022年新款白色洛丽塔鞋jk鞋圆头单鞋",
          url: require("@/assets/img/good/new/good1-1.jpg"),
          collect: 154532,
          price: "￥" + 169,
          type: "new",
          id: "1",
        },
        {
          title: "保罗女包轻奢品牌真皮妈妈包2022新款简约大气中年女士包包手提包",
          url: require("@/assets/img/good/new/good18-1.jpg"),
          collect: 1535757,
          price: "￥" + 368,
          type: "new",
          id: "18",
        },
        {
          title: "WooHa/吾哈2022夏季新款街头印花小众宽松短袖T恤女粉色体恤上衣",
          url: require("@/assets/img/good/new/good19-1.jpg"),
          collect: 753135,
          price: "￥" + 199,
          type: "new",
          id: "19",
        },
        {
          title: "轻熟风法式连衣裙设计感气质高端衬衫半裙通勤小众夏两件套装裙子",
          url: require("@/assets/img/good/new/good20-1.jpg"),
          collect: 1327891,
          price: "￥" + 348,
          type: "new",
          id: "20",
        },
        {
          title: "【七夕礼物】Dior迪奥全新魅惑唇膏 时尚外壳 镜光黑管口红#8#740",
          url: require("@/assets/img/good/pop/good19-1.jpg"),
          collect: 7534431,
          price: "￥" + 520,
          type: "pop",
          id: "19",
        },
        {
          title: "南极人蝴蝶结丝袜女ins潮性感纯欲花边渔网jk过膝蕾丝长筒袜黑丝",
          url: require("@/assets/img/good/new/good22-1.jpg"),
          collect: 8182571,
          price: "￥" + 89,
          type: "new",
          id: "22",
        },
        {
          title: "高个子包臀裙甜辣套装polo性感紧身连衣裙夏季辣妹裙子女女装短裙",
          url: require("@/assets/img/good/new/good21-1.jpg"),
          collect: 132142,
          price: "￥" + 119,
          type: "new",
          id: "21",
        },
        {
          title: "「鱼小瑜」JR精致入骨小黑裙 22夏重工蕾丝蝴蝶结冰丝连衣裙MZ137",
          url: require("@/assets/img/good/pop/good18-1.jpg"),
          collect: 34573,
          price: "￥" + 582,
          type: "pop",
          id: "18",
        },
        {
          title: "t恤女真丝2022款气质淑一字领常规宽松大码短袖夏季时尚洋气小衫",
          url: require("@/assets/img/good/pop/good17-1.jpg"),
          collect: 442713,
          price: "￥" + 398,
          type: "pop",
          id: "17",
        },
        {
          title: "花西子花浅染化妆刷套装/化妆工具美妆用品全套初学者刷子女套刷",
          url: require("@/assets/img/good/new/good24-1.jpg"),
          collect: 182578,
          price: "￥" + 199,
          type: "new",
          id: "24",
        },
        {
          title: "厚底运动凉鞋女2022年新款夏季鞋子爆款休闲女士女鞋平底沙滩鞋子",
          url: require("@/assets/img/good/new/good23-1.jpg"),
          collect: 515412,
          price: "￥" + 108,
          type: "new",
          id: "23",
        },
        {
          title: "2022新款秋冬毛衣女内搭薄款套头短款洋气时尚针织羊毛文艺打底衫",
          url: require("@/assets/img/good/new/good5-1.jpg"),
          collect: 58672,
          price: "￥" + 158,
          type: "new",
          id: "5",
        },
        {
          title: "安之伴【轻柔型】睡衣女春秋季2022年新款纯棉情侣家居服男士夏天",
          url: require("@/assets/img/good/new/good6-1.jpg"),
          collect: 531573,
          price: "￥" + 198,
          type: "new",
          id: "6",
        },
        {
          title: "CHUU棋盘格V领短袖连衣裙女2022年春夏季新款小个子气质a字短裙子",
          url: require("@/assets/img/good/new/good7-1.jpg"),
          collect: 156512,
          price: "￥" + 299,
          type: "new",
          id: "7",
        },
        {
          title: "贝妍睡衣女春秋季新款性感V领女纯色舒适棉家居服时尚豹纹裤套装",
          url: require("@/assets/img/good/new/good8-1.jpg"),
          collect: 27687,
          price: "￥" + 257,
          type: "new",
          id: "8",
        },
        {
          title: "Enjoy it渐变丝袜女薄款防勾丝裤袜INS网红款夏季黑色打底连裤袜",
          url: require("@/assets/img/good/new/good9-1.jpg"),
          collect: 24734,
          price: "￥" + 78,
          type: "new",
          id: "9",
        },
        {
          title: "颜域简约百褶半身裙女夏装2022新款时尚减龄显瘦纯色气质A字裙子",
          url: require("@/assets/img/good/new/good10-1.jpg"),
          collect: 257778,
          price: "￥" + 339,
          type: "new",
          id: "10",
        },
        {
          title: "纯白色鳄鱼皮女包奢侈品大牌正品链条包单肩斜挎包女士风琴小方包",
          url: require("@/assets/img/good/pop/good13-1.jpg"),
          collect: 345736,
          price: "￥" + 4480,
          type: "pop",
          id: "13",
        },
        {
          title: "COACH/蔻驰女包奥莱Nolita15香布蕾老花牛仔蓝麻将包手腕包手拿包",
          url: require("@/assets/img/good/pop/good14-1.jpg"),
          collect: 122571,
          price: "￥" + 899,
          type: "pop",
          id: "14",
        },
        {
          title: "「鱼小瑜」粘纤里的奢品 ba22夏季法式竹叶碎花裹身V领连衣裙YI96",
          url: require("@/assets/img/good/pop/good15-1.jpg"),
          collect: 135575,
          price: "￥" + 388,
          type: "pop",
          id: "15",
        },
        {
          title: "连衣裙法式丝滑奢品温柔雾粉重绉桑蚕丝夏季新款a字裙纯色仙女裙",
          url: require("@/assets/img/good/pop/good16-1.jpg"),
          collect: 173135,
          price: "￥" + 498,
          type: "pop",
          id: "16",
        },
        {
          title: "t恤女真丝2022款气质淑一字领常规宽松大码短袖夏季时尚洋气小衫",
          url: require("@/assets/img/good/pop/good17-1.jpg"),
          collect: 442713,
          price: "￥" + 398,
          type: "pop",
          id: "17",
        },
        {
          title: "「鱼小瑜」JR精致入骨小黑裙 22夏重工蕾丝蝴蝶结冰丝连衣裙MZ137",
          url: require("@/assets/img/good/pop/good18-1.jpg"),
          collect: 34573,
          price: "￥" + 582,
          type: "pop",
          id: "18",
        },
      ],
    };
  },
  created() {
    request(
      {
        url: "/home/multidata",
      },
      (res) => {
        //console.log(res);
        this.result = res;
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        console.log(result);
      },
      (err) => {
        // console.log(err);
      }
    );
    // this.HomeGoods("pop");
    this.GetGoods("pop");
    this.GetGoods("new");
    this.GetGoods("sell");
  },
  mounted() {},
  setup() {
    onMounted(() => {});
  },
  methods: {
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    loadmore() {
      this.GetGoods(this.currentType);
    },
    GetGoods(type) {
      const page = this.goods[type].page;
      var j = page * 12 - 1;
      var i;
      if (this.goods[type].page == 1) {
        i = 0;
      } else if (this.goods[type].page > 1) {
        i = (page - 1) * 12;
      }
      //console.log("i=" + i);
      //console.log("j=" + j);
      for (j; i <= j; i++) {
        if (this.goods[type].style == "pop") {
          this.goods[type].list.push(this.goodpopItem[i]);
          //console.log(this.goods[type].list);
        } else if (this.goods[type].style == "new") {
          this.goods[type].list.push(this.goodnewItem[i]);
        } else if (this.goods[type].style == "sell") {
          this.goods[type].list.push(this.goodsellItem[i]);
        }
      }
      this.goods[type].page += 1;
      if (this.goods[type].page >= 4) {
        this.goods[type].page = 0;
      }
      //console.log(this.goods[type].page);
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.home-tab-control {
  z-index: 8;
  position: sticky;
  /**position: sticky;**/
  top: 44px;
}
ul {
  padding: 0;
  margin: 0;
}
.content {
  position: absolute;
  top: 0px;
  bottom: 49px;
}
</style>
