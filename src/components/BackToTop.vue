<template>
  <a class="back-to-top" :class="{ 'is-showed': showBtn }" @click.prevent="backToTop">
    <i class="iconfont icon-backtotop"></i>
  </a>
</template>

<script>
import throttle from '@/utils/throttle'

export default {
  name: 'back-to-top',
  props: {
    // 距离顶部高度
    height: {
      type: Number,
      default() {
        return 200
      }
    },
    // 滚动时长
    duration: {
      type: Number,
      default() {
        return 2000
      }
    }
  },
  data() {
    return {
      showBtn: false,
      isScrolling: false,
      scrollTop: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.toggleBtn, 300))
  },
  methods: {
    backToTop() {
      if (!this.showBtn || this.isScrolling || this.scrollTop === 0) return
      this.isScrolling = true
      this.handleScroll(window, this.scrollTop, 0, this.duration)
    },
    toggleBtn() {
      const scrollTop = window.pageYOffset ||
        (document.body.scrollTop + document.documentElement.scrollTop)
      this.scrollTop = scrollTop
      this.showBtn = scrollTop >= this.height
    },
    // 滚动处理
    handleScroll(el, from = 0, to, duration = 500) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            return window.setTimeout(callback, 1000 / 60)
          }
        )
      }

      const scroll = (start, end, step) => {
        if (start === end) {
          this.isScrolling = false
          return
        }

        let d = (start + step > end) ? end : start + step
        if (start > end) {
          d = (start - step < end) ? end : start - step
        }

        if (el === window) {
          window.scrollTo(d, d)
        } else {
          el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
      }

      const difference = Math.abs(from - to)
      const step = Math.ceil((difference / duration) * 50)

      scroll(from, to, step)
    }
  }
}
</script>


<style lang="postcss">
.back-to-top {
  width: 3rem;
  height: 3rem;
  z-index: 10;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  cursor: pointer;
  text-align: center;
  background-color: rgba(201, 208, 213, 0.5);
  border-radius: 50%;
  transition: all .3s;
  opacity: 0;

  &.is-showed {
    opacity: 1;
  }

  & .icon-backtotop {
    color: #5d4a4a;
    font-size: 1.6rem;
    margin-top: .7rem;
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
}
</style>

