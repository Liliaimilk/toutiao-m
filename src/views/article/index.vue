<template>
  <div class="article-container markdown-body">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="白驴头条">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articaleDetail.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articaleDetail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articaleDetail.aut_photo"
            @click="
              $router.push({
                name: 'user',
                params: { userId: articaleDetail.aut_id },
              })
            "
          />
          <!-- 28行 跳转至用户界面 -->
          <div slot="title" class="user-name">
            {{ articaleDetail.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articaleDetail.pubdate | relativeTime }}
          </div>

          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->

          <!--  关注或取消用户-->
          <!-- 模板中的$event是事件参数 -->
          <!-- :isFollow="articaleDetail.is_followed" 
            @updateFollow="articaleDetail.is_followed = $event"

            v-model相当于上面两句的简写不过它有两个默认值
            一个是props名value一个是自定义事件名input()
            也可修改默认名
            eg：value="articaleDetail.is_followed"
                @input="articaleDetail.is_followed = $event"

                若要多次使用v-model可使用.sync
          -->
          <followUser
            v-model="articaleDetail.is_followed"
            :isUserID="articaleDetail.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-html="articaleDetail.content"
          ref="content"
        ></div>

        <van-divider>正文结束</van-divider>
        <!--文章评论 -->
        <comment
          :source="articaleDetail.art_id"
          @reply_comment="onReply"
          @update-comment="totalComment = $event.total_count"
        ></comment>

        <!--文章一起加载避免出现获取不到数据的警告 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="show = true"
            >写评论</van-button
          >

          <!-- 评论输入框 -->
          <van-popup v-model="show" position="bottom">
            <comment_post :target="articaleDetail.art_id" />
          </van-popup>

          <!-- 评论数 -->
          <van-icon name="comment-o" :badge="totalComment" color="#777" />
          <!--收藏 -->
          <collect
            v-model="articaleDetail.is_collected"
            :collectID="articaleDetail.art_id"
          ></collect>

          <!-- 点赞 -->
          <goodJob
            v-model="articaleDetail.attitude"
            :gjobId="articaleDetail.art_id"
          ></goodJob>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadDetail()"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!-- 评论回复 -->
      <van-popup v-model="isReply" position="bottom" :style="{ height: '75%' }">
        <comment_reply
          :comment="currentComment"
          v-if="isReply"
          @cancel_reply="isReply = false"
          :replyComment="totalComment"
      /></van-popup>
    </div>
  </div>
</template>
</template>

<script>
import { ImagePreview } from "vant";
import { getArticaleDetail } from "@/api/article";
import followUser from "@/components/followUser";
import collect from "@/components/collect";
import goodJob from "@/components/goodJob";
import comment from "./components/comment.vue";
import comment_post from "./components/comment_post.vue";
import comment_reply from "./components/comment_reply.vue";

export default {
  name: "articleDetail",
  //依赖注册
  // 把值传给所有的后代组件
  // 这里传值不能传this.articaleDetail.art_id会出现undefined
  // 原因或是因为页面元素还未渲染创建成功就进行取值
  provide: function () {
    // console.log(this.articleId, "154");
    return {
      artId: this.articleId,
    };
  },
  components: {
    followUser,
    collect,
    goodJob,
    comment,
    comment_post,
    comment_reply,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      articaleDetail: [],
      loading: false,
      errorStatus: 0,
      isLoading: false,
      totalComment: 0,
      show: false, //弹出框的判断值
      isReply: false, //评论回复弹出
      currentComment: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.previewImage();

    this.loadDetail();
  },
  mounted() {},
  methods: {
    async loadDetail() {
      // 点击重式
      this.loading = true;
      //   获取文章信息
      try {
        const { data } = await getArticaleDetail(this.articleId);
        // console.log(data);
        this.articaleDetail = data.data;
        // dom渲染不能及时所以延迟获取dom
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404;
        }
        this.$toast("获取数据失败");
      }
      this.loading = false;
    },

    // 图片预览
    previewImage() {
      // 添加this.$nextTick会使articleContent未定义
      //   获取dom元素
      const articleContent = this.$refs["content"];
      // console.log(articleContent, "223");
      const imags = articleContent.querySelectorAll("img");
      const images = [];
      imags.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            // 遍历的图片地址数组
            images,
            // 起始位置为0
            startPosition: index,
          });
        };
      });
      //   console.log(images);
    },

    onReply(comment) {
      // console.log(comment, "228");
      this.currentComment = comment;
      this.isReply = true;
    },
  },
};
</script>





<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
