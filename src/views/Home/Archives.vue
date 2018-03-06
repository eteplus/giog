<template>
  <div class="view__wrapper">
    <div class="card" v-for="archive in archives">
      <header class="card-header">
        <p class="card-header-title title is-5">
          <span class="tag is-transparent is-medium">#&nbsp;{{archive.date}}</span>
        </p>
      </header>
      <div class="card-content">
        <ul>
          <li v-for="post in archive.posts" :key="post.id">
            <router-link class="title" :to="{ name: 'post', params: { id: post.id }}">{{post.title}}</router-link>
            <span class="tag is-transparent">{{dateFormat(post.createdAt)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateFormat } from '@/utils'

export default {
  name: 'Archives',

  /**
   * set title
   */
  setTitle() {
    return '归档 · { ETE }'
  },

  /**
   * server render
   * fetch data
   */
  asyncData({ store, route }) {
    const { query } = route
    const page = query.page || 1
    const size = query.size || 8
    return store.dispatch('getArchives', { page, size })
  },

  computed: {
    ...mapState(['archives', 'route'])
  },

  methods: {
    pagination() {
      const page = this.route.query.page || 1
      return this.archives[page]
    },
    dateFormat(time) {
      return dateFormat(time)
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
.card {
  margin-top: 1rem;
  border-radius: 0.2rem;
}

.card-header-title {
  padding: 0.5rem;
}

.card-content {
  padding: 1rem;

  & ul {
    list-style-type: circle;
    padding-left: 1rem;
  }

  & .title {
    font-size: .9rem;
    font-weight: 500;

    &:hover {
      font-weight: 600;
    }
  }

  & .tag {
    font-size: .95rem;
    margin-left: .5rem;
  }
}

.icon-date {
  font-size: inherit;
  margin-right: 0.4rem;
}

</style>
