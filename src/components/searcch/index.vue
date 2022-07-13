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
    <searchHistory v-else></searchHistory>
  </div>
</template>

<script>
import searchHistory from "./components/search_history.vue";
import searchSuggest from "./components/search_suggest.vue";
import searchResult from "./components/search_result.vue";

export default {
  data() {
    return {
      value: "",
      isResult: "",
    };
  },
  methods: {
    onSearch(val) {
      //   Toast(val);
      this.value = val;
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