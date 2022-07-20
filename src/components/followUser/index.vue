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
  name: "follow",
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
  watch: {
    isFollow(e, n) {
      console.log(this.isFollow, 3);
    },
  },
  created() {
    // console.log(this.isFollow);
    // console.log(this.isUserID);
    // console.log("----------");
    // console.log(2);
  },
  mounted() {
    // console.log(this.isFollow);
    // console.log(this.isUserID);
  },
  methods: {
    //关注用户
    async onFollow() {
      // 禁止连续点击，节流
      // console.log(this.isFollow, "58");
      this.isLoading = true;
      try {
        if (this.isFollow) {
          await cancelFollowUser(this.isUserID);
        } else {
          await followUser(this.isUserID);
        }
        this.$emit("updateFollow", !this.isFollow);
      } catch (error) {
        console.log(error);
        // 禁止关注自己
        if (error.response.status === 410) {
          this.$toast("不能关注自己哦！");
        } else {
          this.$toast("操作失败");
        }
      }

      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>