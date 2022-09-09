<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.name">
        <div slot="icon">
          <van-image
            :src="item.photo"
            width="50px"
            height="50px"
            radius="25px"
            @click="
              $router.push({
                name: 'user',
                params: { userId: item.id },
              })
            "
          ></van-image>
        </div>
        <span slot="label">粉丝数:{{ item.fans_count }}</span>
        <van-button
          slot="default"
          v-if="item.mutual_follow"
          @click="followings(item.id, item.mutual_follow, index)"
          >相互关注</van-button
        >
        <van-button
          slot="default"
          type="warning"
          v-else
          @click="followings(item.id, item.mutual_follow, index)"
          >关注</van-button
        >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fansList, cancelFollowUser, followUser } from "@/api/user";
export default {
  name: "FollowDetails",
  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false,
    };
  },
  // created() {
  //   this.onLoad();
  // },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async onLoad() {
      // this.loading = true;
      try {
        const { data } = await fansList(); //target可不传
        console.log(data, "53"); //粉丝列表
        const { results } = data.data;
        // 将数组依次加载放入list数组中
        this.list.push(...results);
        // 继续加载时将loading变为false
        this.loading = false;
        this.finished = true;
      } catch (error) {
        console.log(error);
      }
      // this.finished = true;
    },
    async followings(id, follow, index) {
      this.loading = true;
      try {
        if (follow) {
          await cancelFollowUser(id);
        } else {
          await followUser(id);
        }
        this.list[index].mutual_follow = !follow;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
</style>