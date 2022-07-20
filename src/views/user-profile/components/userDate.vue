<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择出生日期"
      :min-date="minDate"
      :max-date="maxDate"
      swipe-duration="1000"
    >
      <span slot="confirm" @click="onDate">确定</span>
      <span slot="cancel" @click="$emit('close')">取消</span>
    </van-datetime-picker>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2050, 0, 1),
      //   当前输入的时间
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type: [Date, String, Number],
      required: true,
    },
  },
  methods: {
    onDate() {
      // 不转化的话value值会报错，因为两次传回的类型不一致，但以上我用了三种类型验证也无法避免，不知道为
      //   什么不管用
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      this.$emit("input", currentDate);
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>