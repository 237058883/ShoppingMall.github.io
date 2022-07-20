<template>
  <div class="bottomBar">
    <div class="bottomBarlist">
      <div class="bottomLeft">
        <div class="bottomLeftItem">
          <img src="~assets/img/detail/service.png" />
          <div>客服</div>
        </div>
        <div class="bottomLeftItem">
          <img src="~assets/img/detail/shop.png" />
          <div>店铺</div>
        </div>
        <div class="bottomLeftItem">
          <img src="~assets/img/detail/collect.png" />
          <div>收藏</div>
        </div>
      </div>
      <div class="bottomRight">
        <div class="cart">加入购物车</div>
        <div class="buy">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
};
</script>

<style scoped>
.bottomBar {
  position: fixed;
  height: 49px;
  background-color: #fff;
  z-index: 13;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.bottomBarlist {
  flex-wrap: wrap;
  display: flex;
}
.bottomLeft {
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  width: 50%;
}
.bottomLeft img {
  width: 20px;
  height: 20px;
}
.bottomRight {
  flex-wrap: wrap;
  display: flex;
  height: 100%;
  width: 50%;
}
.bottomLeftItem {
  text-align: center;
  flex: 1;
  padding-top: 5px;
  border-left: 1px rgba(128, 128, 128, 0.205) solid;
}
.cart {
  background-color: rgb(241, 173, 0);
  color: black;
  height: 49px;
  width: 50%;
  line-height: 49px;
  text-align: center;
}
.buy {
  background-color: palevioletred;
  color: #fff;
  height: 49px;
  width: 50%;
  line-height: 49px;
  text-align: center;
}
</style>
