<template>
  <div>
    <van-cell class="ArticleItem">
      <!-- :to="{
        name: 'article',
        //传递动态路由参数
        params: {
          articleId: articales.art_id,
        },
      }" -->
      <div class="title van-multi-ellipsis--l2" slot="title">标题</div>
      <div v-if="isshow" class="image_wrap" slot="label">
        <div
          class="labelImg"
          v-for="(img, index) in articales.cover.images"
          :key="index"
        >
          <van-image class="img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="default" slot="default" v-if="isType(articales.cover.type)">
        <van-image class="img" fit="cover" :src="articales.cover.images[0]" />
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: false,
    };
  },
  props: {
    articales: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less">
//   list
.van-cell__value {
  flex: unset;
  width: 232px;
  height: 145px;
  padding-left: 25px;
}
.title {
  font-size: 32px;
  color: #616161;
}
.default {
  .img {
    width: 232px;
    height: 145px;
  }
}
.image_wrap {
  display: flex;
  .labelImg {
    flex: 1;
    margin-top: 28px;
    &:not(:last-child) {
      padding-right: 4px;
    }
    // width: 220px;
    // height: 163px;
    .img {
      width: 100%;
      height: 163px;
    }
  }
}
</style>