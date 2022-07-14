<template>
  <div class="search_result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell :title="obj.title" v-for="obj in list" :key="obj.au_id" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "searchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  created() {},
  methods: {
    // 获取搜索结果
    async onLoad() {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          perPage: this.perPage,
          q: this.searchText,
        });
        console.log(data);
        const { results } = data.data;
        // 一个一个放入，一起放入会产生覆盖
        this.list.push(...results);
        this.loading = false;
        // 当前还有数据就翻页
        // 为空则停止加载
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.$toast("获取失败");
      }
    },
  },
};
</script>

<style>
</style>