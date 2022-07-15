<template>
  <div>
    <van-button
      class="follow-btn"
      type="badge"
      color="#ccc"
      round
      size="small"
      icon="success"
      v-if="isFollow"
      @click="onFollow"
      :loading="isLoading"
      >已关注</van-button
    >
    <van-button
      class="follow-btn"
      type="badge"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-else
      :loading="isLoading"
      @click="onFollow"
      >关注</van-button
    >
  </div>
</template>

<script>
import { followUser, cancelFollowUser } from "@/api/user";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  //  修改默认的model值
  model: {
    prop: "isFollow",
    event: "updateFollow",
  },
  props: {
    isFollow: {
      type: Boolean,
      required: true,
    },
    isUserID: {
      type: Number,
      required: true,
    },
  },
  methods: {
    //关注用户
    async onFollow() {
      // 禁止连续点击，节流
      this.isLoading = true;
      try {
        if (this.isFollow) {
          await cancelFollowUser(this.isUserID);
          //   console.log(data, "58");
        } else {
          // console.log(this.articaleDetail.aut_id);
          await followUser(this.isUserID);
          //   console.log(data, "63");
        }
        // this.isFollow = !this.isFollow;
      } catch (error) {
        console.log(error);
        this.$toast("操作失败");
      }

      this.isLoading = false;
      this.$emit("updateFollow", !this.isFollow);
    },
  },
};
</script>

<style>
</style>