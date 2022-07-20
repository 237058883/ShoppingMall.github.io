<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <template v-slot:item-icon>
          <div>
            <img src="~assets/img/tabbar/首页.png" />
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <img src="~assets/img/tabbar/首页at.png" />
          </div>
        </template>
        <template v-slot:item-text><div>首页</div></template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <div>
            <img src="~assets/img/tabbar/分类.png" />
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <img src="~assets/img/tabbar/分类at.png" />
          </div>
        </template>
        <template v-slot:item-text><div>分类</div></template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template v-slot:item-icon>
          <div>
            <img src="~assets/img/tabbar/购物车.png" />
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <img src="~assets/img/tabbar/购物车at.png" />
          </div>
        </template>
        <template v-slot:item-text><div>购物车</div></template>
      </tab-bar-item>
      <tab-bar-item path="/user">
        <template v-slot:item-icon>
          <div>
            <img src="~assets/img/tabbar/我的.png" />
          </div>
        </template>
        <template v-slot:item-icon-active>
          <div>
            <img src="~assets/img/tabbar/我的at.png" />
          </div>
        </template>
        <template v-slot:item-text><div>我的</div></template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>
<style scoped></style>
