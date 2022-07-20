<template>
  <div class="sexPage">
    <div class="man" @click="clkMan">{{ options[0].man }}</div>
    <div class="women" @click="clkWomen">{{ options[1].women }}</div>
    <div class="cancel" @click="clkExit">{{ options[2].exit }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          man: "男",
          id: 0,
        },
        {
          women: "女",
          id: 1,
        },
        {
          exit: "取消",
        },
      ],
    };
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  methods: {
    clkMan() {
      this.$emit("input", this.options[0].id);
      this.$emit("close");
    },
    clkWomen() {
      this.$emit("input", this.options[1].id);
      this.$emit("close");
    },
    clkExit() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less">
.sexPage {
  height: 100%;
  background-color: #efefef;
  .man,
  .women,
  .cancel {
    height: 100px;
    background-color: #fff;
    width: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
  }
  .women {
    border-top: 1px solid #efefef;
    margin-bottom: 20px;
  }
  .active {
    color: red;
  }
}
</style>