<template>
  <div class="view__wrapper">
    <div class="post" v-for="(post, index) in pagination()" :key="index">
      <router-link class="post__title"
        :to="{ name: 'post', params: { id: post.id }}"
        :aria-label="post.title">{{post.title}}
      </router-link>
      <div class="post__meta">
        <div class="post__date">
          <i class="el-icon-date"></i> {{dateFormat(post.createdAt)}}
        </div>
        <span class="post__dot"></span>
        <div class="post__tags">
          <!-- <a class="post__tag">#javascript</a> -->
          <template v-for="(tag, idx) in post.tags">
            <router-link class="post__tag"
              :to="{ name: 'tag', params: { tag: tag.name } }">
              #{{tag.name}}
            </router-link>
            <span class="post__dot" v-if="idx !== post.tags.length - 1"></span>
            <!-- <el-button plain round type="info" size="mini">#{{tag.name}}</el-button> -->
          </template>
        </div>
      </div>
      <p class="post__summary">{{post.summary}}
      </p>
      <div class="post__meta post__meta--bottom">
        <!-- <el-button
          class="post__date"
          plain
          round
          type="info"
          size="mini"
          icon="el-icon-date">
          {{dateFormat(post.createdAt)}}
        </el-button> -->
        <el-button plain round type="info" size="mini">阅读全文 »</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  name: 'Posts',

  data() {
    return {
      currentPage: 2
    }
  },

  /**
   * set title
   */
  setTitle() {
    return '首页 · { ETE }'
  },

  /**
   * server render
   * fetch data
   */
  asyncData({ store, route }) {
    return store.dispatch('getPosts', 2)
  },

  computed: {
    ...mapState(['posts', 'route'])
  },

  methods: {
    pagination() {
      const currentPage = this.route.query.page || this.currentPage
      return this.posts.page[currentPage]
    },
    dateFormat(time) {
      return dateFormat(time)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.postcss";

.view__wrapper {
  padding: 40px;
}

.post {
  margin-bottom: 40px;
  padding-bottom: 10px;
  border-bottom: 1px dashed color(var(--textColor) alpha(20%));
}

.post__title {
  color: var(--textColor);
  font-weight: bold;
  font-size: var(--fontSize-medium);
  text-decoration: none;

  &:focus,
  &:hover {
    border-bottom: 1px solid color(var(--textColor) alpha(60%));
  }
}

.post__summary {
  color: color(var(--textColor) alpha(80%));
  font-size: var(--fontSize-small);
  margin-top: 15px;
}

.post__meta {
  margin-top: 5px;
  display: flex;
  align-items: center;
}


.post__meta--bottom {
  margin-top: 15px;
  justify-content: flex-end;
}

.post__dot {
  display: inline-block;
  margin: 0 6px;
  border-radius: 100%;
  width: 4px;
  height: 4px;
  background-color: color(var(--textColor) alpha(60%));
}

.post__tags {
  display: flex;
  align-items: center;
}

.post__tag {
  font-size: var(--fontSize-mini);
  color: color(var(--textColor) alpha(60%));
  text-decoration: none;
  border-bottom: 1px dashed color(var(--textColor) alpha(60%));

  &:focus,
  &:hover {
    font-weight: bold;
    border-bottom: 1px solid color(var(--textColor) alpha(60%));
  }
}

.post__date {
  font-size: var(--fontSize-mini);
  color: color(var(--textColor) alpha(60%));
}

.el-button {
  font-size: var(--fontSize-mini);
  color: color(var(--textColor) alpha(80%));
  border-color: var(--bgColor);
  background-color: var(--bgColor);

  &.is-plain:focus,
  &.is-plain:hover {
    font-weight: bold;
    text-decoration: underline;
    color: color(var(--textColor) alpha(80%));
    border-color: var(--bgColor-active);
    background-color: var(--bgColor-active);
  }
}
</style>
