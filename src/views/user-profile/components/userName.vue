<template>
  <div>
    <van-nav-bar
      left-arrow
      title="昵称"
      class="nav_head"
      @click-left="onExit"
    />
    <van-field
      v-model="message"
      rows="1"
      autosize
      type="textarea"
      maxlength="7"
      show-word-limit
      placeholder="请输入昵称"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: this.value,
    };
  },
  props: {
    value: {
      type: String,
      requiredd: true,
    },
  },
  components: {},
  methods: {
    // 退出传值
    onExit() {
      this.$emit("input", this.message);
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
</style>