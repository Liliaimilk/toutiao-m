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
  methods: {
    async onPost() {
      try {
        const { data } = await postComment({
          target: this.target,
          content: this.message,
          art_id: null,
        });
        console.log(data);
        // this.$emit("input", false);
      } catch (error) {
        this.$toast("发送失败");
      }
      this.message = "";
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