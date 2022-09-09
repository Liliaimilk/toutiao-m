<template>
  <div class="follow">
    <!-- 导航栏 -->
    <van-nav-bar>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
      <span slot="title" style="color: #fff">关注/粉丝</span>
    </van-nav-bar>
    <!-- tab栏 -->
    <van-tabs v-model="active">
      <!-- FollowDetails 关注 -->
      <van-tab title="关注" color="#3296fa">
        <FollowDetails />
      </van-tab>

      <!-- FansDetails 粉丝-->
      <van-tab title="粉丝">
        <FansDetails />
      </van-tab>
    </van-tabs>
    <!-- 列表 -->
  </div>
</template>

<script>
import FollowDetails from "./components/FollowDetails.vue";
import FansDetails from "./components/FansDetails.vue";
export default {
  name: "FollowList",
  data() {
    return {
      active: 0,
    };
  },
  components: {
    FollowDetails,
    FansDetails,
  },
};
</script>

<style lang="less">
.follow {
  .van-tabs {
    .van-tab--active {
      color: #3296fa !important;
    }
    .van-tabs__line {
      background-color: #3296fa;
      width: 3.06667rem;
    }
    .van-tabs__content {
      .van-list {
        .van-cell {
          background-color: #f5f7f9;
          .van-image {
            border: 1px solid #ccc;
            // line-height: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
          .van-cell__title {
            font-size: 37.5px;
            margin: 20px 0;
            padding: 0 20px;
            .van-cell__label {
              font-size: 32px;
              color: #2c3e50;
            }
          }
          .van-cell__value {
            .van-button {
              display: inline-block;
              position: absolute;
              // padding: 0;
              width: 148px;
              height: 88px;
              top: 50%;
              right: 0;
              line-height: 44px;
              // font-size: 16px;
              border-radius: 2px;
              text-align: center;
              transform: translateY(-50%);
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
            }
          }
        }
      }
    }
  }

  .van-nav-bar {
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__content {
      background-color: #3296fa;
    }
  }
}
</style>