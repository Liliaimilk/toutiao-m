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
      @reply="$emit('reply_comment', $event)"
      @input="item.is_liking = $event"
      :comment="item"
    ></commentItem>
  </van-list>
</template>
// :total_reply="total_reply"
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
      total_reply: 0,
    };
  },
  name: "comment",
  props: {
    // artId: {
    //   type: [Number, String, Object],
    //   required: true,
    // },
    type: {
      type: String,
      // 验证
      validator(value) {
        return ["a", "c"].includes(value);
      },
      // 不传值默认为a
      default: "a",
    },
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  components: {
    commentItem,
  },
  created() {
    this.loading = true;
    this.onLoad();
  },
  methods: {
    // 获取评论列表
    async onLoad() {
      this.loading = true;
      try {
        const { data } = await commentList({
          type: this.type,
          // toString()的使用： 因为在接口把数据给后端接口之前，因为有的id数据大于js上限，所以JSONBig会把
          // 超过上限的数据变为一个数组存放两段
          // 然后axios发起请求时会把数据拼接如key=value?key=value类似的格式
          // 而此时大整数格式的数据拼接完后会带上引号，请求报错为"xxx is not valid interage"
          // 所以在axios请求之前，自行转成字符串格式，就能避免此类问题
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit,
        });
        // console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;

        if (results.length) {
          console.log(results.length);
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
        // 在点开评论回复时将对象里的total_count传给reply
        this.$emit("total_reply", data.data.total_count);

        //
        this.$emit("update-comment", data.data);
      } catch (error) {
        console.log(error);
        this.$toast("获取失败");
        // this.finished = true;
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