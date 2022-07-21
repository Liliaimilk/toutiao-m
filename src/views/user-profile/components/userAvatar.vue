<template>
  <div class="update-img">
    <img :src="img" alt="" class="imgStyle" ref="img" />
    <div class="tobar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">确定</div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  data() {
    return {
      img: this.value,
      cropper: {},
    };
  },
  props: {
    value: {
      type: [String, Object],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.img;
    const cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
    this.cropper = cropper;
    // console.log(cropper);
  },
  methods: {
    onConfirm() {
      // 在服务端裁剪时用
      //getData 方法，该方法得到裁切的区域参数
      // 在客户端时用此函数
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.loadAvatar(blob);
      });
    },
    async loadAvatar(blob) {
      try {
        this.loading = true;
        //当接口content-type为from-data/multipart时，应用formdata对象
        const formData = new FormData();
        formData.append("photo", blob /*, 'example.png' */);
        // 传送图片
        const { data } = await updateUserPhoto(formData);
        console.log(data);
        this.$toast.success("选取成功");
        this.$emit("close");
        // 同步单元格小头像
        this.$emit("updatePhoto", data.data.photo);
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$toast("操作失败");
      }
    },
  },
};
</script>

<style lang="less">
.update-img {
  height: 100%;
  background-color: #333;
  .imgStyle {
    max-width: 100%;
    display: block;
  }
  .tobar {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cancel,
    .confirm {
      width: 100px;
      height: 75px;
      font-size: 32px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>