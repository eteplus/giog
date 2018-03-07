<template>
  <div class="view__wrapper">
    <div class="post">
      <h1 class="post__title">{{post.title || ''}}</h1>
      <div class="post__meta">
        <div class="post__date"><i class="el-icon-date"></i> {{dateFormat(post.createdAt)}}</div>
        <!-- <a class="tag is-light" :href="post.url">{{post.comments.totalCount > 0 ? post.comments.totalCount : ''}} comments</a> -->
        <span class="post__dot"></span>
        <div class="post__tags">
          <template v-for="(tag, idx) in post.tags">
            <router-link class="post__tag"
              :to="{ name: 'tag', params: { tag: tag.name } }">
              #{{tag.name}}
            </router-link>
            <span class="post__dot" v-if="idx !== post.tags.length - 1"></span>
          </template>
        </div>
      </div>
      <div class="post__content" v-html="post.content">
      </div>
      <div class="post__footer">
        <div class="post__footer-item">
          <span>Author</span>
          <a :href="post.author">eteplus</a>
        </div>
        <div class="post__footer-item">
          <span>Link</span>
          <p>{{postUrl}}</p>
        </div>
        <div class="post__footer-item">
          <span>License</span>
          <a href="https://creativecommons.org/licenses/by/4.0/deed.en" target="_blank">
            Attribution 4.0 International (CC BY 4.0)
          </a>
        </div>
      </div>
      <div class="post__comments">
        <div class="post__comments-title">
          <span>全部评论 ( {{post.commentCount}} )</span>
          <el-button plain round size="small" @click="comment(post.url)">评论 »</el-button>
        </div>
        <p class="post__comments-empty" v-if="post.commentCount === 0">暂无评论...</p>
        <div class="comment" v-for="comment in [...comments.list]" v-else>
          <a class="comment__avatar"><img :src="comment.avatar" alt=""></a>
          <div class="comment__wrapper">
            <div class="comment__header">
              <a class="comment__author">{{comment.author}}</a>
              &nbsp;commented on&nbsp;
              <span>{{dateFormat(comment.createdAt, true)}}</span>
              <span class="comment__author-label" v-if="comment.association === 'OWNER'">AUTHOR</span>
            </div>
            <div class="comment__content" v-html="comment.content">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { zeroFill } from '@/utils'

export default {
  name: 'Post',

  /**
   * set title
   */
  setTitle() {
    return this.post.title + ' · ' + this.siteName
  },

  /**
   * server render
   * fetch data
   */
  asyncData({ store, route }) {
    const { params } = route
    return store.dispatch('getPost', params.id)
  },

  data() {
    return {
      postUrl: '',
      isLoading: false,
      currentPage: 1,
      pageSize: 10
    }
  },

  computed: mapState({
    id: state => state.route.params.id,
    post: state => state.post[state.route.params.id],
    comments: state => state.comments[state.route.params.id],
    siteName: state => state.siteInfo.name
  }),

  mounted() {
    this.postUrl = window.location.href
  },

  methods: {
    dateFormat(time, showTime = false) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = zeroFill(date.getMonth() + 1)
      const day = zeroFill(date.getDate())
      const hour = zeroFill(date.getHours())
      const minute = zeroFill(date.getMinutes())
      const second = zeroFill(date.getSeconds())
      let str = `${year}-${month}-${day}`
      return str + (showTime ? ` ${hour}:${minute}:${second}` : '')
    },
    async getComments() {
      this.isLoading = true
      try {
        await this.$store.dispatch('getComments', {
          id: this.id,
          page: this.currentPage,
          pageSize: this.pageSize
        })
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    comment(url) {
      window.open(url)
    }
  }

}
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.postcss";

.post {
  padding-bottom: 20px;
}

.post__title {
  font-size: var(--fontSize-x-large);
  text-align: center;
  word-break: break-word;
  font-weight: bold;
}

.post__meta {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  padding-bottom: 10px;

  & div + div {
    margin-left: 6px;
  }
}

.post__date {
  font-size: var(--fontSize-small);
  color: color(var(--textColor) alpha(60%));
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
  justify-content: center;
  /* margin-top: 10px; */
}

.post__tag {
  font-size: var(--fontSize-small);
  color: color(var(--textColor) alpha(60%));
  text-decoration: none;
  border-bottom: 1px dashed color(var(--textColor) alpha(60%));

  &:focus,
  &:hover {
    font-weight: bold;
    border-bottom: 1px solid color(var(--textColor) alpha(60%));
  }
}

.post__footer {
  padding: 20px 5px;
  border-top: 1px solid color(var(--textColor) alpha(20%));
  border-bottom: 1px solid color(var(--textColor) alpha(20%));
  word-break: break-all;
}

.post__footer-item {
  font-size: var(--fontSize-small);
  margin: 5px 0;

  & span {
    display: inline-block;
    min-width: 5em;
    text-align: right;
    margin-right: 10px;

    &::after {
      content: " :";
    }
  }

  & p {
    display: inline-block;
  }

  & a {
    color: var(--textColor);
    word-wrap: break-word;
    text-decoration: none;
    border-bottom: 1px dashed color(var(--textColor) alpha(60%));

    &:focus,
    &:hover {
      font-weight: bold;
      border-bottom: 1px solid color(var(--textColor) alpha(60%));
    }
  }
}

.el-button {
  font-size: var(--fontSize-small);
  color: color(var(--textColor) alpha(80%));
  border-color: var(--bgColor);
  background-color: var(--bgColor);

  &.is-plain:focus,
  &.is-plain:hover {
    font-weight: bold;
    color: color(var(--textColor) alpha(80%));
    border-color: var(--bgColor-active);
    background-color: var(--bgColor-active);
  }

  &.is-plain:hover {
    text-decoration: underline;
  }
}
</style>

<style lang="postcss">
@import "../../assets/css/variables.postcss";

.post__comments-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fontSize-small);
  padding: 20px 0;
  font-weight: bold;
  border-bottom: 1px solid rgba(85, 85, 85, 0.2);
}

.post__comments-empty {
  padding: 20px 0;
  text-align: center;
  font-size: var(--fontSize-small);
}

.comment {
  position: relative;
  padding-left: 60px;
  margin-top: 20px;
}

.comment__avatar {
  position: relative;
  float: left;
  margin-left: -60px;
  border-radius: 3px;

  & img {
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: middle;
    border-radius: 3px;
    width: 44px;
    height: 44px;
  }
}

.comment__wrapper {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(85, 85, 85, 0.2);
  border-radius: 3px;

  &::before, &::after {
    position: absolute;
    top: 11px;
    right: 100%;
    left: -16px;
    display: block;
    width: 0;
    height: 0;
    pointer-events: none;
    content: " ";
    border-color: transparent;
    border-style: solid solid outset;
  }

  &::before {
    border-width: 8px;
    border-right-color: rgba(85, 85, 85, 0.2);
  }

  &::after {
    margin-top: 1px;
    margin-left: 2px;
    border-width: 7px;
    border-right-color: #F7F7F7;
  }
}

.comment__header {
  padding: 10px 15px;
  color: color(var(--textColor) alpha(60%));
  font-size: var(--fontSize-small);
  background-color: #F7F7F7;
  border-bottom: 1px solid rgba(85, 85, 85, 0.2);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.comment__author {
  font-weight: bold;
}

.comment__author-label {
  color: #555;
  float: right;
  padding: 2px 5px;
  font-size: 12px;
  cursor: default;
  border: 1px solid rgba(85, 85, 85, 0.2);
  border-radius: 3px;
  font-weight: bold;
}

.comment__content {
  width: 100%;
  padding: 15px;
  overflow: visible;
  font-size: 14px;
}
</style>

<style lang="postcss" src="../../assets/css/post.postcss">
</style>

