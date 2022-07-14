<template>
  <div>
    <van-cell
      class="ArticleItem"
      :to="{
        name: 'article',
        //传递动态路由参数
        params: {
          articleId: articales.art_id,
        },
      }"
    >
      <div class="title van-multi-ellipsis--l2" slot="title">
        {{ articales.title }}
      </div>
      <div v-if="isshow" class="image_wrap" slot="label">
        <div
          class="labelImg"
          v-for="(img, index) in articales.cover.images"
          :key="index"
        >
          <van-image class="img" fit="cover" :src="img" />
        </div>
      </div>

      <div class="label" slot="label">
        <span>{{ articales.aut_name }}</span>
        <span class="mid">{{ articales.comm_count }}评论</span>
        <span>{{ articales.pubdate | relativeTime }}</span>
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
  name: "ArticleItem",
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
.ArticleItem {
  border-bottom: 1px solid #edeff3;
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
  .label {
    margin: 28px 0 30px 0;
    span {
      font-size: 23px;
      color: #b4b4b4;
    }
    .mid {
      padding: 0 20px 0;
    }
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