<template>
  <el-container class="home">
    <el-header class="hidden-sm-and-up">
      <el-menu
        menu-trigger="click"
        mode="horizontal"
        text-color="#909399"
        active-text-color="#555555">
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-fa-menu"></i>
          </template>
          <el-menu-item index="0">
            <span slot="title">Home</span>
          </el-menu-item>
          <el-menu-item index="1">
            <span slot="title">Tags</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">Archives</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-fa-github"></i>
        </el-menu-item>
        <el-menu-item class="avatar-wrapper" index="4">
          <div slot="title">
            <span class="avatar avatar--mini" :style="{
            backgroundImage: 'url(' + userInfo.avatar +')'
          }"></span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="250px" class="hidden-xs-only">
        <div class="profile">
          <a class="avatar" :style="{
            backgroundImage: 'url(' + userInfo.avatar +')'
          }"></a>
          <h4 class="username">ETEPLUS</h4>
          <p class="bio">
            Designer and Coder. ^_^
          </p>
        </div>
        <el-menu
          :router="true">
          <el-menu-item index="/">
            <i class="el-icon-fa-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/tags">
            <i class="el-icon-fa-tag"></i>
            <span slot="title">标签</span>
          </el-menu-item>
          <el-menu-item index="/archives">
            <i class="el-icon-fa-archive"></i>
            <span slot="title">归档</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-fa-help-circled"></i>
            <span slot="title">关于</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-fa-github"></i>
            <span slot="title">Github</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-fa-rss"></i>
            <span slot="title">RSS</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  Container,
  Header,
  Main,
  Aside,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'

export default {
  name: 'Home',

  data() {
    return {
      userInfo: {
        avatar: 'http://127.0.0.1:3030/static/img/dog.jpg'
      }
    }
  },

  components: {
    ElContainer: Container,
    ElHeader: Header,
    ElMain: Main,
    ElAside: Aside,
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem
  }
}
</script>

<style lang="postcss">
@import "../../assets/css/variables.postcss";

.home {
  position: relative;
  height: 100%;
  max-width: 960px;
  margin: 0 auto;

  & .el-header {
    z-index: 1;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    & .el-menu {
      border-bottom: 0;
      padding: 0;
    }

    & .el-menu-item.is-active {
      border-bottom: 2px solid transparent !important;
    }

    & .el-submenu {

      & .el-menu-item {
        color: var(--textColor) !important;
        padding: 0 20px;

        &:hover, &:focus {
          color: var(--textColor) !important;
          outline: 0;
          background-color: var(--bgColor);
          cursor: crosshair;
        }
      }

      & .el-submenu__icon-arrow {
        display: none;
      }
    }

    & .el-icon-fa-menu {
      font-size: 21px;
    }
  }

  & .el-aside {
    padding-top: 20px;
    background: #fff;
    transition: all .3s ease;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    & .el-menu {
      background: #fff;
      border-right: none;
    }

    & .el-menu-item {
      color: var(--textColor);
      height: 50px;
      line-height: 50px;
      padding: 0 80px !important;
      transition: all 0.2s ease-in-out;

      &.is-active {
        outline: 0;
        font-weight: bold;
        background-color: var(--bgColor);
      }

      &:hover,
      &:focus {
        outline: 0;
        font-weight: bold;
        background-color: var(--bgColor);
        cursor: crosshair;
      }

      & i {
        color: var(--textColor);
      }

      & span {
        padding-top: 1px;
        display: inline-block;
        height: 100%;
      }
    }
  }

  & .el-menu-item [class^=el-icon-] {
    position: relative;
    margin-right: 6px;
  }

  & .el-main {
    padding: 0 20px;
  }

  & .avatar-wrapper {
    float: right;

    & div {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  & .avatar {
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 90px;
    background-size: cover;
  }

  & .avatar--mini {
    width: 30px;
    height: 30px;
  }

  & .username {
    margin-top: calc(var(--marginSize) * 0.5);
    font-size: var(--fontSize-medium);
    color: var(--textColor);
  }

  & .bio {
    margin-top: calc(var(--marginSize) * 0.5);
    font-size: var(--fontSize-small);
    color: color(var(--textColor) alpha(60%));
  }
}

.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 20px;
}

.view__wrapper {
  min-height: 100%;
  background-color: #fff;
  padding: 20px;
}

@media only screen and (max-width: 768px) {
  .home .el-main {
    padding-top: 20px;
  }
}
</style>

