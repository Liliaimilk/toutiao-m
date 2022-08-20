<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header user-msg" v-if="user">
      <div class="user-info">
        <div class="left">
          <van-image round class="avatar" :src="userInfo.photo" />
          <span class="user_name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" round size="mini" to="/profile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-status">
        <div class="data_item">
          <span class="data_num"> {{ userInfo.art_count }}</span>
          <span class="data_cont"> 头条 </span>
        </div>
        <div class="data_item" @click="$router.push('/follow')">
          <span class="data_num">{{ userInfo.like_count }}</span>
          <span class="data_cont"> 关注 </span>
        </div>
        <div class="data_item">
          <span class="data_num"> {{ userInfo.fans_count }} </span>
          <span class="data_cont"> 粉丝 </span>
        </div>
        <div class="data_item">
          <span class="data_num">{{ userInfo.follow_count }} </span>
          <span class="data_cont"> 获赞 </span>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div class="header login-range" v-else>
      <div class="not-login" @click="$router.push('/login')">
        <img src="~@/assets/素材/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <van-grid :column-num="2" class="grid_nav" clickable>
      <van-grid-item class="grid_nav_btn">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid_nav_btn">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <div class="msg_notice">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <van-cell
      title="退出登录"
      class="logoout-cell"
      v-if="user"
      clickable
      @click="onLogin"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getUserInfo } from "@/api/user";
// import router from "@/router";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  name: "MyPage",
  computed: {
    ...mapGetters(["user"]),
    ...mapMutations(["login/setUser", "login/logout"]),
  },
  created() {
    // 确认vuex或本地仓储是否存在token（也就是是否处于登录状态）
    if (this.user) {
      console.log("84");
      this.getInfo();
    }
  },
  methods: {
    onLogin() {
      this.$dialog
        .confirm({
          title: "请确认退出/取消",
        })
        .then(() => {
          // on confirm
          this.$store.commit("login/setUser");
        })
        .catch(() => {
          // on cancel
        });
    },
    // 如果处于登录状态，则异步运行以下,拿到用户数据
    async getInfo() {
      try {
        const { data } = await getUserInfo();
        console.log(data);
        this.userInfo = data.data;
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          // console.log("53");
          this.$store.commit("login/logout");
          this.$router.push("./login");
          return Promise.reject(new Error("登录超时"));
        }
        this.$toast("获取失败~~暂时出了点问题呢");
      }
    },
  },
};
</script>

<style lang='less' scoped>
.my-container {
  .header {
    height: 401px;
    background-color: pink;
    background: url("~@/assets/素材/banner.png") no-repeat;
    background-size: cover;
  }
  .login-range {
    display: flex;
    justify-content: center;
    align-items: center;
    .not-login {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        text-align: center;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .user-msg {
    .user-info {
      height: 270px;
      // background-color: pink;
      padding: 115px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 150px;
          height: 150px;
          border: 3px solid #fff;
        }
        .user_name {
          font-size: 33.38px;
          color: #fff;
          margin-left: 24px;
        }
      }
    }
    .data-status {
      height: 130px;
      // background-color: gray;
      display: flex;
      .data_item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .data_num {
          font-size: 40px;
          color: #fff;
        }
        .data_cont {
          font-size: 25px;
          color: #fff;
        }
      }
    }
  }
  .grid_nav {
    // display: flex;
    .grid_nav_btn {
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      .toutiao {
        color: #ec5e5e;
        font-size: 45px;
      }
      span {
        // margin-top: 15px;
        font-size: 31px;
      }
    }
  }
  .msg_notice {
    margin-top: 10px;
    margin-bottom: 8px;
  }
  .logoout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>