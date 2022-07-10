<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search_btn"
        slot="title"
        type="info"
        size="small"
        icon="search"
        round
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs v-model="active" animated class="nav_tab" swipeable>
      <van-tab
        v-for="channel in channel"
        :key="channel.id"
        :title="channel.name"
      >
        <Articale :channelList="channel"></Articale>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hanbuger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import Articale from "./components/articale_list.vue";
import { getChannelData } from "@/api/user";
export default {
  data() {
    return {
      // value: "",
      active: 0,
      channel: [],
    };
  },
  name: "HomePages",

  created() {
    this.loadChannel();
  },
  components: {
    Articale,
  },
  methods: {
    async loadChannel() {
      try {
        const { data } = await getChannelData();
        this.channel = data.data.channels;
        console.log(this.channel);
      } catch (error) {
        this.$toast("获取数据失败");
      }
    },
  },
};
</script>

<style lang="less">
.home-container {
  padding-top: 182px;
  padding-bottom: 100px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .page-nav-bar {
    background-color: #3296fa;
    .search_btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      .van-icon {
        color: #fff;
      }
    }
  }

  .nav_tab {
    .van-tabs__wrap {
      position: fixed;
      top: 96px;
      left: 0;
      right: 0;
      height: 82px;
      .van-tab {
        min-width: 200px;
        color: #777;
        font-size: 30px;
        border-right: 1px solid #edeff3;
      }
      .placeholder {
        width: 67px;
        height: 82px;
        // 因为兄弟全为flex平份所以加上flex-shrink
        flex-shrink: 0;
      }
      .hanbuger-btn {
        width: 67px;
        height: 82px;
        // top: 13px;
        // transform: translateY(-50%);
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        background-color: #fff;
        opacity: 0.902;
        i.toutiao {
          font-size: 32px;
        }
        &:before {
          content: "";
          position: absolute;
          left: 0;
          width: 1px;
          height: 100%;
          background-image: url("@/assets/素材/gradient-gray-line.png");
          background-size: contain;
        }
      }
      .van-tabs__nav--line {
        padding: 0;
      }
      .van-tabs__line {
        width: 31px;
        bottom: 8px;
        background-color: #3296fa;
      }
      .van-tab--active {
        color: #333;
      }
    }
  }
}
</style>