<template>
  <div class="wrapper" ref="wrapper" id="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import ObserveDom from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
import ObserveImage from "@better-scroll/observe-image";
import { ref, defineExpose, onMounted } from "vue";
BScroll.use(ObserveImage);
BScroll.use(ObserveDom);
BScroll.use(Pullup);

export default {
  name: "Scroll",
  expose: ["list"],
  setup() {},
  data() {
    return {
      scroll: null,
      beforePullDown: true,
      isPullingDown: false,
      saveY: 0,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: 3,
      observeDOM: true,
      pullUpLoad: true,
      observeImage: true,
    });
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      refresh();
    });
    const refresh = this.debounce(this.scroll.finishPullUp, 1000);
  },
  methods: {
    debounce(func, delay) {
      let timer = null;
      return function (args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
  },
};
</script>

<style scoped></style>
