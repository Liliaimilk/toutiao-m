<template>
  <div>
    <van-cell class="channel_h">
      <div slot="title" class="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="btn"
        @click="clkClose"
        >{{ istoget ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in channelMy"
        :key="value.id"
        @click="onChannelMy(value, index)"
      >
        <van-icon
          name="clear"
          slot="icon"
          v-show="istoget && !fixChannel.includes(value.id)"
        ></van-icon>
        <!-- 20行注释 固定频道不加clear开关,fixChannel为固定id数组,遍历至相同id时返回1，
        因为非的关系返回0，因此包含id相同的元素不显示icon -->
        <span
          class="text"
          :class="{ isActive: index === active }"
          slot="text"
          >{{ value.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <van-cell class="channel_h">
      <div slot="title" class="title">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in recommendChannel"
        :key="value.id"
        icon="plus"
        :text="value.name"
        @click="onAddChannelmy(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel } from "@/api/channel";
export default {
  data() {
    return {
      allChannel: [],
      istoget: false,
      fixChannel: [0],
    };
  },
  name: "ChannelEdit",
  props: {
    channelMy: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // 推荐频道
    recommendChannel() {
      // 方法一：
      //   const channels = [];
      // //   遍历总频道
      //   this.allChannel.forEach((channel) => {
      //     // 在一层层遍历的同时，找到符合条件的元素并返回
      //     const ret = this.channelMy.find((channelMy) => {
      //         // 条件 我的频道id是否与总频道id相等(相同匹配，不同的进推荐)
      //       return channel.id === channelMy.id;
      //     });
      //     // 判断，若ret为空则说明当前元素不在我的频道内，因此添加进推荐频道
      //     if (!ret) {
      //       channels.push(channel);
      //     }
      //   });
      // //   返回新数组
      //   return channels;

      // 方法二：
      //   数组的filter方法：遍历数组，把符合条件的元素存储到新数组
      return this.allChannel.filter((channel) => {
        // 数组的find方法，遍历数组，把符合条件的第一个元素返回
        // 返回的布尔值，为true则filter方法会把当前遍历的的元素加入新数组
        return !this.channelMy.find((channelMy) => {
          return channel.id === channelMy.id;
        });
      });
    },
  },
  created() {
    this.loadChannel();
  },
  methods: {
    // 获取全部频道
    async loadChannel() {
      try {
        const { data } = await getAllChannel();
        console.log(data);
        this.allChannel = data.data.channels;
      } catch (error) {
        this.$toast("获取失败");
      }
    },
    // 添加推荐频道的数据到我的频道
    // ？但是只点了添加，没写删除，推荐频道里的被点击的频道自己删除了
    // 因为推荐频道的方法写在计算属性中
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化，则计算属性会重新执行(直白的说就是会重新执行方法)
    onAddChannelmy(value) {
      this.channelMy.push(value);
    },

    // 我的频道icon close的显示和关闭
    clkClose() {
      this.istoget = !this.istoget;
    },

    // 删除我的频道
    onChannelMy(value, index) {
      // 编辑状态
      if (this.istoget) {
        // 防止固定值被删
        if (this.fixChannel.includes(value.id)) {
          return;
        }
        // 删除点击值
        this.channelMy.splice(index, 1);
        // 判断 因为删除选中频道前的频道后，选中的active会减小，导致选中样式后移变化，所以需给active减一，保持选
        // 中样式不变
        if (index <= this.active) {
          this.$emit("update", this.active - 1, true);
        }
      }
      //   非编辑状态
      else {
        this.$emit("update", index);
      }
    },
  },
};
</script>

<style lang="less">
.channel_h {
  margin-top: 90px;
  .van-cell_title {
    line-height: unset;
  }
  .title {
    font-size: 32px;
    color: #333;
  }
  .btn {
    width: 104px;
    height: 46px;
  }
}
.van-grid-item {
  width: 160px;
  height: 86px;

  .van-grid-item__content {
    background-color: #f4f5f6;
    flex-direction: row;
    // vertical-align: top;

    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 5px;
      padding-left: 6px;
    }
    .isActive {
      color: lightcoral;
    }
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }
  .van-icon-plus {
    font-size: 28px;
  }
  .van-icon-clear {
    position: absolute;
    color: #cacaca;
    right: -12px;
    top: -13px;
    font-size: 32px;
  }
}
</style>