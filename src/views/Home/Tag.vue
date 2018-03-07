<template>
  <div class="view__wrapper">
    <div class="posts">
      <h2 class="post__tag">#{{route.params.tag}}</h2>
      <ul>
        <li v-for="(post, index) in pagination()" :key="index">
          <span class="post__date">{{dateFormat(post.createdAt)}}</span>
          <router-link
            :to="{ name: 'post', params: { id: post.id }}">
            {{post.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  name: 'Tag',

  setTitle() {
    return `标签 "${this.route.params.tag}" · ${this.siteInfo.name}`
  },

  asyncData({ store, route }) {
    const { params, query } = route
    const { tag } = params
    return store.dispatch('getPostsByTag', {
      tag,
      page: query.page || 1,
      pageSize: query.pageSize || 8
    })
  },

  computed: mapState(['tag', 'route', 'siteInfo']),

  methods: {
    pagination() {
      const page = this.route.query.page || 1
      const tag = this.route.params.tag
      return this.tag.posts[tag].page[page]
    },
    dateFormat(time) {
      return dateFormat(time)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.postcss";

.post__tag {
  color: var(--textColor);
  position: relative;
  font-size: var(--fontSize-medium);
  font-weight: bold;
  padding-bottom: 15px;
  border-bottom: 1px solid color(var(--textColor) alpha(20%));

  & i {
    margin-right: 5px;
  }
}

.posts {
  position: relative;

  & ul {
    padding-top: 10px;
    padding-left: 20px;
  }

  & li {
    font-size: var(--fontSize-small);
    margin-top: 20px;
    list-style-type: circle;
  }

  & a {
    color: var(--textColor);
    display: inline-block;
    position: relative;
    line-height: 2;
    text-decoration: none;
    border-bottom: 1px dashed color(var(--textColor) alpha(50%));

    &:hover,
    &:focus {
      border-bottom: 1px solid var(--textColor);
    }
  }
}

.post__date {
  font-size: var(--fontSize-mini);
  color: color(var(--textColor) alpha(60%));
  margin-right: 5px;
  min-width: 65px;
  display: inline-block;
}
</style>



