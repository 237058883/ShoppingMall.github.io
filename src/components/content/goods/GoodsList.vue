<template>
  <div class="goods">
    <goods-list-item
      v-for="item in goods"
      :key="item"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  mounted() {
    this.tre();
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { GoodsListItem },
  data() {
    return {};
  },
  methods: {
    tre() {},
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
.goods {
  display: flex;
  flex-wrap: wrap;
}
</style>
