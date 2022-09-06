<template>
  <div class="follow">
    <!-- 导航栏 -->
    <van-nav-bar>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
      <span slot="title" style="color: #fff">关注/粉丝</span>
    </van-nav-bar>
    <!-- tab栏 -->
    <van-tabs>
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
import FansDetails from "./components/FollowDetails.vue";
export default {
  name: "FollowList",
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