<template>
  <div class="search_history">
    <van-cell-group>
      <van-cell title="历史记录">
        <div class="btn" v-if="isShow">
          <!-- 因为props只读不改对普通数据而言，因此只能子向父操作修改父组件 -->
          <span @click="$emit('allDel', [])">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isshow">完成</span>
        </div>
        <van-icon name="delete-o" @click="isshow" v-else />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="delHistory(item, index)"
      >
        <van-icon name="close" v-if="isShow" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  name: "searchHistory",
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },

  methods: {
    isshow() {
      this.isShow = !this.isShow;
    },
    delHistory(item, ind) {
      // 修改状态下的删除
      if (this.isShow === true) {
        this.searchHistory.splice(ind, 1);
        // 非修改状态下的删除
      } else {
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style>
</style>