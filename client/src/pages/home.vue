<template>
  <div class="page">
    <common-header :currentPage.sync="currentPage"></common-header>
    <mv-full-page
      :isPointer="true"
      pointerPos="right"
      :isV="isV"
      :pages="bgArr.length"
      :page.sync="currentPage"
      :bgArr="bgArr"
      :isCache="false"
      :transition="{
        duration: '700ms', // 动画时长
        timingFun: 'ease', // 动画速度曲线
        delay: '0s', // 动画延迟
      }"
    >
      <template
        v-slot:[dynamicSlotName+(index+1)]
        v-for="(item, index) in items"
      >
        <div :class="`page${index + 1}`" :key="index">
          <!-- {{ `${item.title}` }} -->
          <div class="footer">
            <div class="div">进入</div>
          </div>
        </div>
      </template>
    </mv-full-page>
  </div>
</template>

<script>
import CommonHeader from "../components/commonHeader";
import { webUrl } from "../../static/js/public.js";
export default {
  data() {
    return {
      items: [],
      dynamicSlotName: "page",
      isV: true,
      currentPage: 1,
      bgArr: [{}],
    };
  },
  components: { CommonHeader },
  created() {
    this.$axios.get(webUrl + "museum/list").then((res) => {
      const items = res.data.data.items;
      let bgArr = [];

      items.forEach((item) => {
        bgArr.push({
          isBg: true,
          src: item.image,
        });
      });

      this.items = items;
      this.bgArr = bgArr;
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
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  cursor:pointer
}
.div {
  position: relative;
  width: 100px;
  height: 173.2px;
  margin: 50px auto;
  background-color: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
  color: white;
  font-size: 50px;
  line-height: 150px;
  font-weight: bold;
}
.div:before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  right: 100px;
  border-width: 86.6px 50px;
  border-style: solid;
  border-color: transparent rgba($color: #000000, $alpha: 0.5) transparent transparent;
}
.div:after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  left: 100px;
  border-width: 86.6px 50px;
  border-style: solid;
  border-color: transparent transparent transparent rgba($color: #000000, $alpha: 0.5);
  top: 0;
}
</style>
