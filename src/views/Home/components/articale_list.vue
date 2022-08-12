<template>
  <div class="articale_scroll">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(list, index) in list"
          :key="index"
          :title="list.title"
        /> -->
        <ArticaleItem
          v-for="(article, index) in list"
          :key="index"
          :articales="article"
        ></ArticaleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticaleItem from "@/components/articale";

import { getArticaleList } from "@/api/article";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, //加载错误的值
      refreshing: false,
      successText: "刷新成功",
    };
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "articale",
  props: {
    channelList: {
      //   type: Array,
      //接收类型为数组也能把，每一个值传过来
      type: Object,
      required: true,
    },
  },
  components: {
    ArticaleItem,
  },
  methods: {
    // 当滑到底部时触发onload
    /*onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束后loading会自动变为true，会停止加载
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          // 数据全部加载完成后finished为true停止触底时调用onload方法
          this.finished = true;
        }
      }, 1000);
    },
  },*/

    //   触底加载
    async onLoad() {
      try {
        // let params = { timestamp, channel_id, with_top: 1 };
        console.log(Date.now());
        const { data } = await getArticaleList({
          channel_id: this.channelList.id,
          //   请求第一页的数据为当前事件戳
          // 请求之后的的数据的时间戳会在当前请求结果中返回给你
          //   1556789000001在本接口中为最新时间戳
          timestamp: this.timestamp || 1556789000001,
          with_top: 1,
        });
        const { results } = data.data;
        // 用...符将数组展开依次放入
        this.list.push(...results);
        console.log(data);
        // 加载一页结束后loading变为false，停止加载
        this.loading = false;
        // 判断数据是否加载完成
        if (results.length) {
          // 更新获取下一页的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        // this.$toast("获取列表失败");
        this.error = true;
        this.loading = false;
      }
    },

    // 下拉刷新
    async onRefresh() {
      try {
        const { data } = await getArticaleList({
          // 在哪个频道就把当前的频道id传过去，然接口发回当前频道的数据
          channel_id: this.channelList.id,
          //   请求第一页的数据为当前事件戳
          // 获取当前时间戳
          timestamp: Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        // 用...符将数组展开依次放入，把最新数据放入最前面
        this.list.unshift(...results);
        this.refreshing = false;
        console.log(results);
        this.successText = `刷新成功，共更新了${results.length}条数据`;
        // results = [];
      } catch (error) {
        // 刷新失败提示
        this.refreshing = false;
        this.successText = "刷新失败,请重试";
      }
    },
  },
};
</script>

<style>
.articale_scroll {
  /* 解决不同列表之间滚动同步
    原因：滚动的为同一body
    解决：给列表加上高,各自形成自己的容器 */
  height: 79vh;
  overflow-y: auto;
}
</style>