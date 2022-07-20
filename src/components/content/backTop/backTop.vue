<template>
  <div class="backtop">
    <img src="~assets/img/backtop/backtop.png" />
  </div>
</template>
<script setup>
import { ref, defineExpose } from "vue";

const demo = ref("测试用例");
const handleVal = () => {
  demo.value = "已改变";
  console.log("nihao");
};
//将需要暴露出去的数据与方法都可以暴露出去
defineExpose({
  demo,
  handleVal,
});
</script>
<style scoped>
.backtop {
  position: fixed;
  right: 6px;
  bottom: 55px;
}
.backtop img {
  width: 36px;
  height: 36px;
}
</style>
