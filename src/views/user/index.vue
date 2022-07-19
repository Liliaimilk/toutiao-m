<template>
  <div class="msg">
    <!-- 导航栏 -->
    <van-nav-bar left-arrow class="Nav_bar">
      <span slot="title">{{ userMessage.name }}</span>
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
      <van-icon slot="right" name="ellipsis"></van-icon>
    </van-nav-bar>
    <!-- 用户信息 -->
    <div class="showMsg">
      <van-image fit="cover" round :src="userMessage.photo"></van-image>
      <div class="userDetail">
        <div class="top">
          <div class="data_item">
            <span class="data_num"> {{ userMessage.art_count }}</span>
            <span class="data_cont"> 发布 </span>
          </div>
          <div class="data_item">
            <span class="data_num">{{ userMessage.follow_count }}</span>
            <span class="data_cont"> 关注 </span>
          </div>
          <div class="data_item">
            <span class="data_num"> {{ userMessage.fans_count }} </span>
            <span class="data_cont"> 粉丝 </span>
          </div>
          <div class="data_item">
            <span class="data_num">{{ userMessage.like_count }}</span>
            <span class="data_cont"> 获赞 </span>
          </div>
        </div>

        <!-- 关注 -->
        <div class="follow" v-if="flag">
          <followUser
            :isFollow="userMessage.is_following"
            :isUserID="userMessage.id"
          />
        </div>
      </div>
    </div>
    <!-- 用户说明 -->
    <div class="intro">
      <div class="certi">
        认证:<span>&nbsp;{{ userMessage.certi }}</span>
      </div>
      <div class="introSim">
        简介:<span>&nbsp;{{ userMessage.intro }}</span>
      </div>
    </div>

    <!-- 用户文章列表 -->
    <div class="userArt">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 组件 -->
        <userArticle
          :articales="list"
          v-for="(obj, index) in list"
          :key="index"
        />
      </van-list>
    </div>
  </div>
  <!-- @click-left="onClickLeft"
      @click-right="onClickRight" -->
</template>

<script>
import userArticle from "./component/userArticle.vue";
import { userMsg } from "@/api/user";
import followUser from "@/components/followUser";
import { getOrderUserArt } from "@/api/article";
export default {
  name: "UserMsg",
  data() {
    return {
      userMessage: {
        is_following: true,
        id: 0,
      },
      list: [],
      loading: false,
      finished: false,
      page: 1,
      flag: false,
    };
  },
  components: {
    followUser,
    userArticle,
  },
  created() {
    console.log(1);
    this.loadUserMsg();
  },
  mounted() {},
  methods: {
    // 获取作者信息
    async loadUserMsg() {
      // try {
      // 接收作者id
      // console.log(this.$route.params.userId);
      const { data } = await userMsg(this.$route.params.userId);
      // console.log(data);
      this.userMessage = data.data;
      this.flag = true;
      // this.userMessage = {
      //   is_following: false,
      //   id: 3,
      // };
      console.log(this.userMessage);
      // } catch (error) {
      //   this.$toast("获取失败");
      // }
    },

    // 加载文章列表
    async onLoad() {
      this.loading = true;
      // 异步更新数据
      try {
        const { data } = await getOrderUserArt(this.$route.params.userId, {
          page: this.page,
          per_page: 10,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
        // console.log(data, "114");
      } catch (error) {
        this.$toast("获取失败");
      }
    },
  },
};
</script>

<style lang="less">
.msg {
  .Nav_bar {
    height: 96px;
    background-color: #3194ff;
    .van-nav-bar__content {
      .van-icon,
      span {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .showMsg {
    height: 182px;
    background-color: #fff;

    padding: 22px 35px 58px 28px;
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    .van-image {
      height: 160px;
      width: 160px;
    }
    .userDetail {
      display: flex;
      flex-direction: column;
      //   justify-content: center;
      height: 150px;
      justify-content: space-between;
      align-items: center;
      .top {
        display: flex;
        justify-content: space-between;
        width: 473px;
        .data_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          .data_num {
            font-size: 26px;
            color: #0d0a10;
            font-weight: 600;
          }
          .data_cont {
            font-size: 22px;
            color: #9c9b9d;
            margin-top: 8px;
          }
        }
      }
      .follow {
        .follow-btn {
          width: 288px;
          height: 55px;
          border: none;
        }
        .van-button--round {
          border-radius: 10px;
        }
      }
    }
  }
  .intro {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 13px;
    height: 150px;
    padding: 27px 28px 42px;
    .introSim {
      margin-top: 30px;
    }
    div {
      width: 100%;
      font-size: 24px;
      color: #646263;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #212121;
      }
    }
  }
  .userArt {
    background-color: #fff;
    margin-top: 13px;
  }
}
</style>