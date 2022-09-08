<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { followUserList } from "@/api/user";
export default {
  name: "FollowDetails",
  data() {
    return {
      list: [],
      // id: this.userInfo.id,
      loading: false,
      finished: false,
    };
  },
  created() {
    this.onLoad();
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async onLoad() {
      // this.loading = false;
      try {
        const { data } = await followUserList();
        console.log(this.userInfo.id, "34"); //undefined 原因为vuex刷新时数据上一个my页面数据会丢失，
        //在devtool工具中可以明白
        //所以获取不到
        console.log(data); //关注列表
      } catch (error) {
        console.log(error);
      }
      // this.finished = true;
    },
  },
};
</script>

<style>
</style>