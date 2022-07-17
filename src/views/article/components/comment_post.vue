<template>
  <div class="post">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="declare_btn" @click="onPost" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postComment } from "@/api/comment";
export default {
  data() {
    return {
      message: "",
    };
  },
  props: {
    target: {
      type: [Number, Object, Array],
      required: true,
    },
  },
  // 接收provide
  inject: {
    artId: {
      type: [Number, Object, Array],
      required: null,
    },
  },
  methods: {
    async onPost() {
      // console.log(this.artId, "40");
      try {
        const { data } = await postComment({
          target: this.target.toString(),
          content: this.message,
          art_id: this.artId ? this.artId.toString() : null,
        });
        console.log(data);
        // this.$emit("input", false);
      } catch (error) {
        this.$toast("发送失败");
      }
      this.message = "";
      this.$emit("close");
    },
  },
};
</script>

<style lang=less>
.post {
  display: flex;
  .declare_btn {
    padding: 0;
    width: 140px;
    height: 174px;
  }
}
</style>