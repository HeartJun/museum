<template>
  <header>
    <div>
      <el-row>
        <el-col>
          <div class="button-item left-item" @click="toBack">返回</div>
          <div class="button-item left-item" @click="toHome">主页</div>
          <div
            v-if="showSearch"
            class="button-item right-item"
            @click="onSearch"
          >
            搜索
          </div>
          <el-input
            v-if="showSearch"
            class="right-input"
            v-model="title"
            placeholder="名称搜索"
          ></el-input>
        </el-col>
        <el-col :xs="4" :sm="0" :md="0" :lg="0" :xl="0" class="">
          <div class="nav-mob">
            <!-- <div v-if="(isSignIn===1||isSignIn===2)&&navMobile" @click="navToggle" class="avatar"></div> -->
            <img
              v-if="(isSignIn === 1 || isSignIn === 2) && navMobile"
              @click="navToggle"
              class="avatar"
              :src="avatar"
              alt=""
            />
            <i v-else class="el-icon-menu" @click="navToggle"></i>
            <transition name="slide-fade">
              <div v-if="navMobile" class="content">
                <ul @click="slideUp">
                  <li>Home</li>
                  <li>Archives</li>
                </ul>
              </div>
            </transition>
          </div>
        </el-col>
      </el-row>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    showSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // activeIndex: '1',
      navMobile: false,
      title: "",
    };
  },
  methods: {
    handleSelect(key) {
      this.$emit("update:currentPage", Number(key));
    },
    navToggle() {
      this.navMobile = this.navMobile ? false : true;
    },
    slideUp() {
      this.navMobile = this.navMobile ? false : true;
    },
    toBack() {
      this.$router.go(-1);
    },
    toHome() {
      this.$router.push("/");
    },
    onSearch() {
      const params = {
        title: this.title,
      };
      this.$emit("onSearch", params);
    },
  },
  // created(){
  //   console.log(this.$store.state.activeIndex)
  // },
  computed: {
    activeIndex() {
      return this.$store.state.activeIndex;
    },
    isSignIn() {
      return this.$store.state.isSignIn;
    },
    nickName() {
      return localStorage.getItem("nickName");
    },
    avatar() {
      return localStorage.getItem("avatar");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #2d2d2d;
  // opacity: 0.7;
  color: white;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  .logo {
    line-height: 40px;
    font-size: 16px;
    margin-left: 20px;
  }
  .nav-pc {
    border-bottom: none;
    display: flex;
    justify-content: center;
    > li {
      min-width: 200px;
      text-align: center;
      padding: 0;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .nav-mob {
    position: relative;
    z-index: 9999;
    i {
      font-size: 24px;
      position: absolute;
      right: 6px;
      top: 7px;
    }
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid #9d9d9d;
      position: absolute;
      right: 7px;
      top: 7px;
    }
    .content {
      ul {
        position: absolute;
        right: 5px;
        top: 40px;
        background: #2d2d2d;
        color: #9d9d9d;
        border-radius: 0 0 4px 4px;
        box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.5);
        li {
          list-style-type: none;
          padding: 6px 10px;
          text-align: center;
          border-bottom: 1px solid #696464;
        }
      }
    }
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
}
.button-item {
  float: left;
  color: white;
  font-size: 18px;
  font-weight: bold;
  line-height: 60px;
  min-width: 150px;
  text-align: center;
}
.button-item:hover {
  background: black;
  cursor: pointer;
}
.left-item {
  float: left;
}
.right-item {
  float: right;
}
.right-input {
  float: right;
  width: 20%;
  line-height: 60px;
}
@media (min-width: 768px) {
  //pc
  header {
    margin-bottom: 20px;
    .logo {
      line-height: 60px;
      font-size: 18px;
    }
  }
  .meBtnOff {
    transition: all 0.3s;
    background: #3b99fc !important;
    color: #fff !important;
    line-height: 60px;
    vertical-align: top;
  }
  .meBtnOn {
    transition: all 0.3s;
    background: #3b99fc !important;
    color: #fff !important;
    line-height: 58px;
    vertical-align: top;
  }
}
</style>
