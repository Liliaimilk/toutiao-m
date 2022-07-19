<template>
  <div>
    <!-- 用户信息 -->
    <van-cell title="单元格" size="large" label="2016-1-1">
      <div slot="icon">
        <van-image
          fit="cover"
          height="37.5px"
          width="37.5px"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        >
        </van-image>
      </div>
    </van-cell>

    <!-- 文章列表 -->
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
  name: "UserList",
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
  methods: {
    isType(type) {
      if (type >= 1 && type < 3) {
        return true;
      } else if (type === 0) {
        return false;
      } else {
        this.isshow = true;
      }
    },
  },
};
</script>

<style lang="less">
.userArt {
  .van-cell__title {
    padding-left: 16px;
  }
  .van-image {
    margin-top: 5px;
  }

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
}
</style>