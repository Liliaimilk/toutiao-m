<template>
  <div>
    <van-nav-bar :title="reply_count + '条回复'">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('cancel_reply', false)"
      />
    </van-nav-bar>
    <!-- 评论 -->
    <commentItem :comment="comment" />
    <van-cell title="全部评论"></van-cell>
    <!-- 评论回复 -->
    <!-- 获取评论回复和获取评论列表的接口一致
    两者的差异在于请求参数的不同：评论列表的id为文章id，评论回复的id为评论id -->
    <comment :source="comment.com_id" type="c" @total_reply="onTotal" />

    <!-- 发布评论 -->
    <div class="comment_wrap">
      <van-button class="post_btn" round size="small" @click="isShow = true">
        发布评论
      </van-button>
    </div>
    <van-popup v-model="isShow" position="bottom">
      <comment_post :target="comment.com_id" @close="isShow = false" />
    </van-popup>
  </div>
</template>

<script>
import commentItem from "./commentItem.vue";
import comment from "./comment.vue";
import comment_post from "./comment_post.vue";

export default {
  data() {
    return {
      isShow: false,
      reply_count: 0,
    };
  },

  name: "commentReply",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    replyComment: {
      type: Number,
      required: true,
    },
  },
  create() {
    // this.onTotal();
  },
  components: {
    commentItem,
    comment,
    comment_post,
  },
  methods: {
    onTotal(total) {
      //   console.log("1234456678");
      this.reply_count = total;
    },
  },
};
</script>

<style lang="less">
div {
  .comment_wrap {
    position: fixed;
    height: 88px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-top: 1px solid #ccc;
    .post_btn {
      width: 60%;
    }
  }
}
</style>