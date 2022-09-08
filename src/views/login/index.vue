<template>
  <div class="login-container">
    <van-nav-bar class="nav_head" title="登录"
      ><van-icon slot="left" name="arrow-left" @click="$router.back()"
    /></van-nav-bar>
    <van-form @submit="onSubmit" ref="loginFrom">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="userrules.mobile"
        name="mobile"
        type="number"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        :rules="userrules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms"
            size="small"
            round
            type="default"
            @click="Onsendsms()"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button native-type="submit" class="login-btn" block type="info"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { sendSms } from "@/api/user";
export default {
  data() {
    return {
      time: 5 * 1000,
      isCountDownShow: false,
      user: {
        mobile: "",
        code: "",
      },
      // 表单验证
      userrules: {
        mobile: [
          {
            required: true,
            message: "请填写手机号",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  name: "LoginPage",
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["login/getUserToken"]),
    // 2、当表单提交的时候会自动触发表单验证
    //        如果验证通过，会触发 submit 事件
    //        如果验证失败，不会触发 submit
    async onSubmit() {
      const user = this.user;
      // 登陆提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        // const { data } = await login(user);
        // console.log("成功", data);
        // await this.$refs.loginFrom.validate("mobile");
        await this.$store.dispatch("login/getUserToken", user);
        this.$toast.success("登陆成功");
        // 登录成功后返回登录页面，有缺陷
        this.$router.push("/my");
      } catch (err) {
        console.log(err);
        if (err.response.status === 403) {
          console.log("错误");
          this.$toast.fail("手机号或验证码错误");
        } else {
          console.log("登录失败", err);
          this.$toast.fail("登录错误");
        }
      }
    },
    // 点击发送验证码验证单表单并显示倒计时
    async Onsendsms() {
      // console.log("Onsendsms");
      try {
        await this.$refs.loginFrom.validate("mobile");
        console.log(123);
      } catch (err) {
        return console.log("123", err);
      }
      this.isCountDownShow = true;
      try {
        await sendSms(this.user.mobile);
        // console.log(mobile);
        console.log(sendSms);
      } catch (error) {
        console.log("789", error);
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .login-btn-wrap {
    padding: 51px 31px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
  .send-sms {
    // width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #666666;
    font-size: 22px;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
</style>
