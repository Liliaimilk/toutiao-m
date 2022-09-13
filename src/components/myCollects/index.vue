<template>
  <div class="collect">
    <!-- 导航栏 -->
    <van-nav-bar
      ><van-icon name="arrow-left" slot="left" @click="$router.back()" />
      <span slot="title" style="color: #fff">我的收藏</span>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "myCollects",
};
</script>

<style>
</style>