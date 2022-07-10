<template>
  <div class="layout-container">
    <!-- 一级路由 -->
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home"
        >首页
        <i slot="icon" class="toutiao toutiao-shouye"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/qa"
        >问答
        <i slot="icon" class="toutiao toutiao-wenda"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/video"
        >视频
        <i slot="icon" class="toutiao toutiao-shipin"></i>
      </van-tabbar-item>
      <van-tabbar-item to="/my"
        >{{ $store.state.user ? "我的" : "未登录" }}
        <i slot="icon" class="toutiao toutiao-wode"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style lang=less scoped>
.layout-container {
  .layout-tabbar {
    .toutiao {
      font-size: 40px;
    }
    .van-tabbar-item_text {
      font-size: 20px;
    }
  }
}
</style>