<template>
  <div>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="comment.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ comment.aut_name }}</div>
        <!-- 点赞 -->
        <van-button
          class="like-btn"
          :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
          :class="{ like_style: comment.is_liking }"
          @click="onGoodJob"
          >{{ comment.like_count || "赞" }}
        </van-button>
      </div>

      <div slot="label">
        <p class="comment-content">{{ comment.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{
            comment.pubdate | relativeTime
          }}</span>
          <van-button class="reply-btn" round @click="$emit('reply', comment)"
            >回复 {{ comment.reply_count }}</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { commentGoodJob, cancelCommentgjob } from "@/api/comment";
export default {
  data() {
    return {
      isloading: false,
    };
  },
  name: "commentItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    // 评论的回复数
    // total_reply: {
    //   type: Number,
    //   required: true,
    // },
    // artId:{
    //   type:[Number,Object,Array],
    //   required:true
    // }
  },
  methods: {
    async onGoodJob() {
      // this.isloading = true;
      try {
        if (this.comment.is_liking) {
          await cancelCommentgjob(this.comment.com_id);
          this.comment.like_count--;
        } else {
          await commentGoodJob(this.comment.com_id);
          this.comment.like_count++;
        }
        // 将判断值传入父组件修改
        this.$emit("input", !this.comment.is_liking);
      } catch (error) {
        this.$toast.fail("操作失败");
      }
      // this.isloading = false;
    },
  },
};
</script>

<style lang=less>
.like_style {
  color: yellowgreen;
}
</style>