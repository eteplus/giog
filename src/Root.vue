<template>
  <div id="giog" role="main">
    <router-view></router-view>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'

export default {
  name: 'Giog',

  components: {
    BackToTop: () => import('@/components/BackToTop'),
  }
}
</script>

<style lang="postcss">
@import "./assets/css/minireset.css";

@import "./assets/css/fontello.css";

@import "./assets/css/variables.postcss";


html, body {
  -webkit-tap-highlight-color: transparent;
  color: var(--textColor);
  background-color: var(--bgColor);
  font-family: "Roboto Slab", "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei";
}

body {
  position: relative;
  height: 100vh;
}

#giog {
  height: 100%;
}

/* 滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(144, 146, 152, 0.1);
}

::-webkit-scrollbar-track {
  border-radius: 0;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(144, 146, 152, 0.3);
}

a:hover {
  cursor: crosshair;
}

</style>
