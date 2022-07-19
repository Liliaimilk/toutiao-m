<template>
  <div>
    <van-icon
      color="#777"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :loading="isloading"
      @click="onGoodjob"
      :class="{ collected: value == 1 }"
    />
  </div>
</template>

<script>
import { cancelGood, goodjob } from "@/api/user";

export default {
  name: "gooJob",
  data() {
    return {
      isloading: false,
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    gjobId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onGoodjob() {
      this.isloading = true;
      console.log(this.value);
      try {
        if (this.value == 1) {
          await cancelGood(this.gjobId);
          console.log("39");
        } else {
          const { data } = await goodjob(this.gjobId);
          console.log(data, "42");
        }
        this.$emit("input", -this.value);
      } catch (error) {
        // this.$emit("input", -this.value);
        // this.value = -this.value;
        console.log(error);
        this.$toast("操作失败");
      }
      this.isloading = false;
    },
  },
};
</script>

<style lang="less">
.collected {
  color: yellowgreen !important;
}
</style>