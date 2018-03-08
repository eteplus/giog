<template>
  <div class="view__wrapper">
    <div class="posts" v-for="(posts, year) in archives">
      <h2 class="post__year"><i class="el-icon-date"></i>{{year}}</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
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
import { zeroFill } from '@/utils'

export default {
  name: 'Archives',

  /**
   * set title
   */
  setTitle() {
    return '归档 · ' + this.siteInfo.name
  },

  /**
   * server render
   * fetch data
   */
  asyncData({ store, route }) {
    const { query } = route
    const page = query.page || 1
    const pageSize = query.pageSize || 8
    return store.dispatch('getArchives', { page, pageSize })
  },

  computed: {
    ...mapState(['archives', 'route', 'siteInfo'])
  },

  methods: {
    dateFormat(time) {
      const date = new Date(time)
      const month = zeroFill(date.getMonth() + 1)
      const day = zeroFill(date.getDate())
      return `${month}-${day}`
    },
    archiveDate(date) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const [year, month] = date.split('-')
      return `${months[month - 1]} ${year}`
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.postcss";

.post__year {
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
  padding-bottom: 20px;

  & ul {
    padding-top: 10px;
    padding-left: 20px;
  }

  & li {
    font-size: var(--fontSize-small);
    margin-top: 10px;
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
  min-width: 40px;
  display: inline-block;
}

</style>
