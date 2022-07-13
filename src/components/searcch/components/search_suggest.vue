<template>
  <div class="search_suggest">
    <van-cell-group>
      <van-cell
        v-for="(item, index) in Sugestion"
        :key="index"
        icon="search"
        @click="$emit('search', item)"
      >
        <!-- 高亮 -->
        <div slot="title" v-html="heightlight(item)"></div
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  data() {
    return {
      Sugestion: [],
    };
  },
  name: "searchSuggest",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  created() {
    this.loadGetSuggest();
  },

  watch: {
    value: {
      // 防抖函数
      handler: debounce(function (value) {
        this.loadGetSuggest(value);
      }, 200),

      //当1value值发生改变时，就会调用handler函数
      //handler(value) {
      // 事件侦听value值变化调用方法
      //this.loadGetSuggest(value);
      //},
      immediate: true,
      // 该回调将会在侦听开始之后被立即调用
    },
  },
  methods: {
    // 获取联想列表
    async loadGetSuggest() {
      try {
        // console.log(this.value);
        const { data } = await getSuggestion(this.value);
        console.log(data);
        this.Sugestion = data.data.options;
      } catch (error) {
        this.$toast("获取数据失败");
      }
    },

    // 联想字符匹配搜索字符高亮
    heightlight(item) {
      const heightlightStr = `<span class="active">${this.value}</span>`;
      // RegExp为正则表达式构造函数
      // 参数1：匹配模式字符串，它会根据这个字符串创建正则表达式
      // 参数2：匹配模式，要写到字符串中
      const rag = new RegExp(this.value, "gi");
      return item.replace(rag, heightlightStr);
    },
  },
};
</script>

<style lang="less">
.search_suggest {
  .active {
    color: lightblue;
  }
}
</style>