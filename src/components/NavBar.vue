<template>
  <div class="navbar-container">
    <nav class="navbar is-transparent is-link">
      <div class="navbar-brand">
        <router-link class="navbar-item brand-logo" :to="{ name: 'posts', path: '/' }">
          { ETE }
        </router-link>
        <a class="navbar-item is-hidden-desktop" href="https://github.com/eteplus" aria-label="Github">
          <span class="icon"><i class="iconfont icon-github"></i></span>
        </a>
        <div class="navbar-burger burger" :class="{ 'is-active': isOpened }" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isOpened }">
        <div class="navbar-start">
          <a class="navbar-item" v-for="item in menuItems" :title="item.alias" :key="item.route.name" @click.prevent="routes(item.route)">{{item.name}}</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item" v-show="!isOpened">
            <a class="button is-link is-inverted is-outlined" href="https://github.com/eteplus" target="__blank">
              <span class="icon"><i class="iconfont icon-github"></i></span>
              <span>Github</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      // Menu is opened
      isOpened: false,
    }
  },
  computed: {
    ...mapState(['menuItems'])
  },
  methods: {
    routes(route) {
      if (this.isOpened) {
        this.isOpened = false
      }
      this.$router.push(route)
    },
    toggleMenu() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="postcss">
.navbar-container {
  width: 100%;
  background: #3273dc;
  /* box-shadow: 0 1px 5px rgba(0,0,0,.1); */

  & .navbar {
    margin: 0 auto;
  }
}

@media screen and (min-width: 1024px) {
  .navbar {
    max-width: 960px;
    width: 960px;
  }
}

@media screen and (min-width: 1216px) {
  .navbar {
    max-width: 1152px;
    width: 1152px;
  }
}

@media screen and (min-width: 1408px) {
  .navbar {
    max-width: 1344px;
    width: 1344px;
  }
}
</style>
