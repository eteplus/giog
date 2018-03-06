<template>
  <div class="container-404">
    <div class="content">
      <div class="text-404">404</div>
      <p class="">This is not the web page you are looking for.</p>
      <router-link class="button is-outlined is-info" :to="{ path: '/' }" replace>Back Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',

  setTitle() {
    return 'Not-Found'
  }
}
</script>

<style lang="postcss">
.container-404 {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #fff;
  background-size: auto 100%;

  & .content {
    position: absolute;
    top: 50%;
    text-align: center;
    width: 100%;
    margin-top: -160px;
  }

  & .text-404 {
    margin: 0 auto;
    text-align: center;
    letter-spacing: 2px;
    font-size: 10rem;
    line-height: 1;
    font-weight: 100;
    color: #3273dc;
    /* background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 60s infinite linear; */
  }

  & p {
    font-size: 1.2rem;
    line-height: 1.5;
    margin: 0;
    color: #7b8993;
  }

  & .button {
    border-width: 2px;
    border-radius: 2.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

</style>
