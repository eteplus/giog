function getTitle(vm) {
  const { setTitle } = vm.$options
  if (setTitle) {
    return typeof setTitle === 'function'
      ? setTitle.call(vm)
      : setTitle
  }
  return false
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
