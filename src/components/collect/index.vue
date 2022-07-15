<template>
  <div>
    <van-icon
      color="#777"
      :name="value ? 'star' : 'star-o'"
      :loading="isloading"
      @click="onCollect"
      :class="{ collected: value }"
    />
  </div>
</template>

<script>
import { cancelCollect, collectArt } from "@/api/user";
export default {
  name: "Collects",
  data() {
    return {
      isloading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    collectID: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.isloading = true;
      try {
        if (this.value) {
          await cancelCollect(this.collectID);
          //  返回值为空
          //   console.log(data);
        } else {
          await collectArt(this.collectID);
          //   console.log(data);
        }
        this.$emit("input", !this.value);
        // 因为this.value是在传递之前的值，所以这里用非
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
        this.isloading = false;
      } catch (error) {
        // console.log(error); 6
        this.$toast("操作失败");
      }
    },
  },
};
</script>

<style lang="less">
.collected {
  color: yellowgreen !important;
}
</style>