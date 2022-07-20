<template>
  <div class="goodsItem" @click="itemClick">
    <img :src="goodsItem.url" />
    <div class="goodsInfo">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">★ {{ goodsItem.collect }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  components: {},
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      },
    },
  },
  mounted() {},
  methods: {
    itemClick() {
      this.$router.push(
        "/detail/" +
          this.goodsItem.type +
          "/" +
          this.goodsItem.id +
          "/" +
          this.goodsItem.title +
          "/" +
          this.goodsItem.price +
          "/" +
          this.goodsItem.collect
      );
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.goodsItem {
  padding-bottom: 65px;
  position: relative;
  width: 50%;
  justify-content: center;
  text-align: center;
}
.goodsItem img {
  width: 95%;
  border-radius: 5px;
}
.goodsInfo {
  font-size: 14px;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goodsInfo p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 10px 0;
}
.price {
  color: palevioletred;
  padding-right: 10px;
}
.collect {
  color: gray;
}
</style>
