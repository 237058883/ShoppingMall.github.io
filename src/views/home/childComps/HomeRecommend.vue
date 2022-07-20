<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {},
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 16px;
  padding: 20px 0px 30px;
  border-bottom: 5px solid rgb(197, 197, 197, 0.3);
}
.recommend-item {
  flex: 1;
}
img {
  height: 80px;
  margin-bottom: 10px;
}
</style>
