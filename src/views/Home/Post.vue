<template>
  <div class="view__wrapper">
    <div class="post">
      <h1 class="post__title">{{post.title || ''}}</h1>
      <div class="post__meta">
        <div class="post__date"><i class="el-icon-date"></i> {{dateFormat(post.createdAt)}}</div>
        <!-- <a class="tag is-light" :href="post.url">{{post.comments.totalCount > 0 ? post.comments.totalCount : ''}} comments</a> -->
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  name: 'Post',

  /**
   * set title
   */
  setTitle() {
    return this.post.title + ' · { ETE }'
  },

  /**
   * server render
   * fetch data
   */
  asyncData({ store, route }) {
    const { params } = route
    const { id } = params
    const { state } = store
    return new Promise((resolve, reject) => {
      store.dispatch('getPost', id).then(() => {
        if (!state.post[id].id) {
          reject({ code: 404 })
        }
        resolve()
      })
    })
  },

  data() {
    return {
      postUrl: ''
    }
  },

  computed: mapState({
    post: state => state.post[state.route.params.id]
  }),

  mounted() {
    this.postUrl = window.location.href
  },

  methods: {
    dateFormat(time) {
      return dateFormat(time)
    }
  }

}
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.postcss";

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
  margin-top: 10px;
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
  padding: 10px 0;
  border-bottom: 1px solid color(var(--textColor) alpha(20%));
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
</style>

<style lang="postcss" src="../../assets/css/post.postcss">
</style>

