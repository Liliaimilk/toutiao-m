<template>
  <div class="search">
    <form action="/" class="search-form">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="gain"
        background="#3296fa"
      />
    </form>
    <!-- 子组件 -->
    <searchResult v-if="isResult" :searchText="value"></searchResult>
    <searchSuggest
      v-else-if="value"
      :value="value"
      @search="onSearch"
    ></searchSuggest>
    <searchHistory
      v-else
      :searchHistory="isSearchHistory"
      @allDel="isSearchHistory = []"
      @search="onSearch"
    ></searchHistory>
  </div>
</template>

<script>
import searchHistory from "./components/search_history.vue";
import searchSuggest from "./components/search_suggest.vue";
import searchResult from "./components/search_result.vue";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "searchIndex",
  data() {
    return {
      value: "",
      isResult: "",
      // 获取本地存储数据
      isSearchHistory: getItem("TOUTIAO_HISTORY") || [],
    };
  },
  // 监听数据变化并存入本地存储
  watch: {
    isSearchHistory(value) {
      setItem("TOUTIAO_HISTORY", value);
    },
  },
  methods: {
    onSearch(val) {
      //   Toast(val);
      this.value = val;
      console.log(val);
      // 去除重复的搜索记录
      const index = this.isSearchHistory.indexOf(val);
      if (index == -1) {
        this.isSearchHistory.unshift(val);
      }
      console.log(val);
      this.isResult = true;
    },
    onCancel() {
      Toast("取消");
    },
    gain() {
      console.log("123");
      this.isResult = false;
    },
  },
  components: {
    searchHistory,
    searchSuggest,
    searchResult,
  },
};
</script>

<style lang='less'>
.search {
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;

    // padding-bottom: 108px;
  }
  .search_history {
    margin-top: 108px;
  }
}
</style>