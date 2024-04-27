<template>
  <Tabbar v-if="$route.meta.TabbarShow" />
  <router-view style="padding-bottom: 2.5rem;position: relative;z-index: 2;" />
  <Footer v-if="$route.meta.FooterShow" />
</template>

<script lang="ts">
import Tabbar from './components/Tabbar.vue';
import Footer from './components/Footer.vue';
import { Options, Vue } from 'vue-class-component';
@Options({
  components: {
    Tabbar,
    Footer,
  },
})
export default class HomeView extends Vue {
  public mounted() {
    // 监听页面宽度变化
    window.onresize = () => {
      return (() => {
        this.$store.commit('setWindowWidth', window.innerWidth)
      })()
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body::-webkit-scrollbar {
  display: none
}

#app {
  font-family: 'Dingding JinBuTi', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #bdc2e8;
  background: linear-gradient(#141e30, #243b55);
  min-height: 100vh;
}

/* 主界面页面标题Logo */
h1 {
  font-family: 'DancingScript-Bold';
  font-size: 5rem;
  margin: 2.5rem 0;
  /* 渐变色 */
  background-clip: text;
  color: #0000;
  white-space: nowrap;
  background-image: linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);
  /* 调整字间距 */
  letter-spacing: 0.1em;
}

/* 副界面页面标题Logo */
h2 {
  font-family: 'DancingScript-Bold';
  font-size: 3rem;
  margin: 2.5rem 0;
  /* 渐变色 */
  background-clip: text;
  color: #0000;
  white-space: nowrap;
  background-image: linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);
  /* 调整字间距 */
  letter-spacing: 0.1em;
}

</style>
