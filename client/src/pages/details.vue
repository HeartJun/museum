<template>
  <div class="page">
    <list-header @onSearch="onSearch"></list-header>
    <div class="main-info">
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <img width="100%" :src="info.image" alt="" />
        </el-col>
        <el-col :span="1">
        </el-col>
        <el-col :span="12">
          <div class="aside">
            <p class="title">{{ info.title }}</p>
          </div>
          <div class="aside">
            <p class="info">{{ info.explain }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ListHeader from "../components/listHeader";
import List_article from "../components/list_article";
import List_content from "../components/list_content";
import { webUrl } from "../../static/js/public.js";

export default {
  data() {
    return {
      info: {},
    };
  },
  components: {
    ListHeader,
    List_article,
    List_content,
  },
  created() {
    const info = this.$route.params.info;
    console.log("info:", info);
    if (!info) return this.$router.push("/");
    this.info = info;
    // const museumId = this.$route.params.id;
    // if (!museumId) return this.$router.push("/");
    // this.museumId = museumId;
    // this.$axios
    //   .get(webUrl + "exhibit/listByClient", { params: { museumId } })
    //   .then((res) => {
    //     this.items = res.data.data.items;
    //   });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.main {
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  margin: 0 10px;
  padding: 10px;
  > .title {
    font-size: 18px;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
}
.aside {
  cursor: pointer;
  background: #f8f8fd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;
  > .title {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    padding: 10px 15px;
    text-align: center;
  }
  > .info {
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    padding: 10px 15px;
    text-align: left;
  }
}
.main-info {
  padding: 0 45px;
}

@media (min-width: 768px) {
  //pc
  .main {
    margin: 0 20px;
    padding: 20px;
    > .title {
      font-size: 30px;
    }
  }
}
</style>
