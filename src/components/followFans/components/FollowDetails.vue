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

        <!-- <div slot="default" class="followed" > -->
        <!-- <van-button slot="default" v-if="item.mutual_follow" type="warning"
          >关注</van-button
        > -->
        <!-- </div> -->
        <!-- <div slot="default" class="following" v-else>关注</div> -->
        <van-button
          slot="default"
          v-if="!item.mutual_follow"
          @click="isFollow(item.id, item.mutual_follow, index)"
          >已关注</van-button
        >
        <van-button
          slot="default"
          v-else
          type="warning"
          @click="isFollow(item.id, item.mutual_follow, index)"
          >关注</van-button
        >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { followUserList, cancelFollowUser, followUser } from "@/api/user";
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
        const { data } = await followUserList({
          // page: this.page,
          // per_page: 10,
        }); //target可不传
        console.log(this.userInfo.id, "34"); // 第一次获取可以为1，但刷新后为undefined
        //原因为vuex刷新时数据上一个my页面数据会丢失，
        //在devtool工具中可以明白
        //所以获取不到
        console.log(data); //关注列表
        const { results } = data.data;

        // 将数组依次加载放入list数组中
        this.list.push(...results);
        // 继续加载时将loading变为false
        this.loading = false;
        // 分页
        // if (this.list.length) {
        //   this.page += 1;
        // } else {
        //   this.finished = true;
        // }
        this.finished = true;
      } catch (error) {
        console.log(error);
      }
      // this.finished = false;
    },

    // 关注 简写
    async isFollow(id, follow, index) {
      try {
        this.loading = true;
        // 取消关注
        if (!follow) {
          await cancelFollowUser(id);
        } else {
          // 关注
          await followUser(id);
        }
        this.list[index].mutual_follow = !follow;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },

    // 取消关注
    // async isFollow(id, follow, index) {
    //   this.loading = true;
    //   const data = await cancelFollowUser(id);
    //   console.log(follow);
    //   this.list[index].mutual_follow = !follow;
    //   console.log(data, "89");
    //   this.loading = false;
    // },
    // 关注
    // async followings(id, follow, index) {
    //   this.loading = true;
    //   const data = await followUser(id);
    //   this.list[index].mutual_follow = !follow;
    //   console.log(data, "102");
    //   this.loading = false;
    // },
  },
};
</script>

<style lang="less">
</style>