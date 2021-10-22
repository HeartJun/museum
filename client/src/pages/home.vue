<template>
  <div class="page">
    <mv-full-page
      :isPointer="true"
      pointerPos="right"
      :isV="isV"
      :pages="4"
      :page.sync="currentPage"
      :bgArr="bgArr"
      :isCache="false"
      :transition="{
        duration: '700ms', // 动画时长
        timingFun: 'ease', // 动画速度曲线
        delay: '0s', // 动画延迟
      }"
    >
      <template #page1> 页面1 </template>

      <template #page2>
        <div class="page2">页面2</div>
      </template>

      <template #page3>
        <div class="page3">页面3</div>
      </template>

      <template #page4> 页面4 </template>
    </mv-full-page>
  </div>
</template>

<script>
import { webUrl } from "../../static/js/public.js";
export default {
  data() {
    return {
      items: [],
      isV: true,
      currentPage: 1,
      bgArr: ["#4FD7F9", "orange", "pink", "green"],
    };
  },
  components: {},
  created() {
    this.$axios.post(webUrl + "articleList").then((res) => {
      this.items = res.data.reverse();
    });
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  margin: 0 10px;
  padding: 10px;
}
.aside {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  .card {
    border-top: 1px solid #eee;
    .title {
      padding: 10px;
      font-weight: 600;
      color: #808080;
      margin-bottom: 10px;
    }
    .pic {
      width: 100%;
    }
    .row {
      padding: 0 10px;
      & > p {
        color: #bfbfbf;
      }
      .icons {
        padding: 10px 0;
        .iconfont {
          transition: all 0.3s;
          margin: 5px;
          color: #000;
          font-size: 20px;
          background-color: rgba(200, 200, 200, 0.3);
          padding: 8px;
          border-radius: 50%;
          &:hover {
            color: #fff;
            background-color: rgba(0, 133, 166, 0.8);
            border-radius: 5px;
          }
        }
      }

      & > .link {
        color: #bfbfbf;
        display: inline-block;
        padding: 5px;
        transition: all 0.3s;
        &:hover {
          color: #0085a1;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  //pc
  .main {
    margin: 0 20px;
    padding: 20px;
  }
}
</style>
