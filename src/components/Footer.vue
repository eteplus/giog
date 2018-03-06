<template>
  <footer class="footer is-transparent">
    <div class="container is-widescreen">
      <div class="content has-text-centered">
        <p>
          <router-link :to="{ path: '/' }">{ ETE }</router-link> © 2017 Proudly powered by
          <a href="/">Pixel</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PxFooter'
}
</script>

<style>
.footer p {
  font-size: .9rem;
}
</style>

