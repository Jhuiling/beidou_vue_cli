<template>
  <div class="guide">
    <image  :src="imgpath[index]"></image>
    <button class="next_btns" @tap="next(index)"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      imgpath: [
        "../../static/image/guide1.png",
        "../../static/image/guide2.png",
        "../../static/image/guide3.png",
      ],
    };
  },
  methods: {
    next() {
      this.index += 1;
      if (this.index > 2) {
        uni.navigateTo({
          url: "/pages/index/index",
        });
      }
    },
  },
};
</script>

<style>
@import "./css/index.css";
.guide {
  position: fixed;
  width: 100%;
  height: 100%;
}
.guide image{
    width: 100%;
    height: 100%;
}
.next_btns {
  width: 100px;
  height: 50px;
  background: transparent;
  opacity: 0;
  position: absolute;
  left: 50%;
  margin-left: -50px;
  bottom: 80px;
}
</style>