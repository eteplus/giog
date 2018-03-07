<template>
  <div class="view__wrapper">
    <h1 class="title">所有标签({{tag.list.length}})</h1>
    <el-button
      plain
      round
      type="info"
      size="medium"
      v-for="tag in tag.list"
      :key="tag._id"
      @click="router(tag.name)">
      #{{tag.name}}
    </el-button>
  </div>
</template>

<script>
import { Tag } from 'element-ui'
import { mapState } from 'vuex'

export default {
  name: 'Tags',

  setTitle() {
    return '所有标签 · ' + this.siteInfo.name
  },

  asyncData({ store, route }) {
    return store.dispatch('getTags')
  },

  computed: mapState(['tag', 'siteInfo']),

  methods: {
    router(tagName) {
      this.$router.push({
        name: 'tag',
        params: {
          tag: tagName
        }
      })
    }
  },

  components: {
    ElTag: Tag
  }

}
</script>

<style lang="postcss" scoped>
@import "../../assets/css/variables.postcss";

.title {
  font-size: var(--fontSize-medium);
  color: var(--textColor);
  text-align: center;
  margin-bottom: 20px;
}

.el-button {
  color: var(--textColor);
  margin: 0 10px 10px 0;
  border-color: var(--bgColor);
  background-color: var(--bgColor);

  &.is-plain:focus,
  &.is-plain:hover {
    border-color: var(--bgColor-active);
    color: var(--textColor-active);
    background-color: var(--bgColor-active);
    text-decoration: underline;
  }
}
</style>



