<template>
  <div class="profile">
    <!-- 导航 -->
    <van-nav-bar
      title="个人资料"
      right-text="保存"
      class="nav_head"
      left-arrow
      @click-left="$router.back()"
      @click-right="onSave"
    />

    <!-- 个人资料 -->
    <div class="personDetail">
      <van-cell title="头像" is-link>
        <van-image
          slot="default"
          width="30px"
          height="30px"
          round
          fit="cover"
          :src="list.photo"
        />
      </van-cell>
      <!-- 昵称 -->
      <van-cell
        title="昵称"
        :value="list.name"
        is-link
        @click="isName = true"
      />
      <van-popup
        v-model="isName"
        position="bottom"
        :style="{ height: '100%' }"
        v-if="isName"
      >
        <userName @close="isName = false" v-model="list.name" />
      </van-popup>

      <!-- 性别 -->
      <van-cell
        title="性别"
        :value="list.gender == 0 ? '男' : '女'"
        is-link
        @click="isSex = true"
      />
      <van-popup
        v-model="isSex"
        position="bottom"
        style="
           {
            height: autosize;
          }
        "
        v-if="isSex"
      >
        <userSex v-model="list.gender" @close="isSex = false" />
      </van-popup>

      <!-- 生日 -->
      <van-cell
        title="生日"
        :value="list.birthday"
        is-link
        @click="isDate = true"
      />
      <van-popup
        v-model="isDate"
        position="bottom"
        :style="{ height: '40%' }"
        v-if="isDate"
      >
        <userDate v-model="list.birthday" @close="isDate = false" />
      </van-popup>
    </div>
  </div>
  <!-- @click-right="onClickRight" -->
</template>

<script>
import { getSelfMsg, editsUserMsg } from "@/api/user";
import userSex from "./components/userSex.vue";
import userName from "./components/userName.vue";
import userDate from "./components/userDate.vue";
export default {
  name: "PersonMsg",
  data() {
    return {
      list: {},
      isName: false,
      isSex: false,
      isDate: false,
    };
  },
  components: {
    userName,
    userSex,
    userDate,
  },
  created() {
    this.loadSelfMsg();
  },
  methods: {
    // onClose() {
    //   this.isName = false;
    // },
    // 获取个人信息
    async loadSelfMsg() {
      try {
        const { data } = await getSelfMsg();
        console.log(data);
        this.list = data.data;
      } catch (error) {
        this.$toast("获取数据失败");
      }
    },

    //保存和修改个人信息
    async onSave() {
      this.loading = true;
      // console.log(this.list.gender);
      // console.log(this.list.birthday);
      const userMsg = {
        username: this.list.name,
        sexId: this.list.gender,
        birth: this.list.birthday,
      };
      try {
        // console.log(userMsg.username);
        // console.log(userMsg.birth);
        const { data } = await editsUserMsg({
          name: userMsg.username,
          gender: userMsg.sexId,
          birthday: userMsg.birth,
        });
        this.$toast.success("保存成功");
        console.log(data);
        this.loading = false;
      } catch (error) {
        this.$toast("操作失败");
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less">
.profile {
  .van-nav-bar__arrow,
  .van-nav-bar__text {
    color: #fff;
  }
}
</style>