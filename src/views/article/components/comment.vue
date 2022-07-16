<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- 评论列表 -->
    <commentItem
      v-for="(item, index) in list"
      :key="index"
      @input="item.is_liking = $event"
      :comment="item"
    ></commentItem>
  </van-list>
</template>

<script>
import { commentList } from "@/api/comment";
import commentItem from "./commentItem.vue";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  name: "comment",
  props: {
    artId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  components: {
    commentItem,
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      this.loading = true;
      try {
        const { data } = await commentList({
          type: "a",
          source: this.artId,
          offset: this.offset,
          limit: this.limit,
        });
        console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;

        if (results.length) {
          console.log(results.length);
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
        this.$emit("update-comment", data.data);
      } catch (error) {
        console.log(error);
        this.$toast("获取失败");
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>