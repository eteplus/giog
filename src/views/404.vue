<template>
  <div class="container">
    <div class="content">
      <div class="text-404">404</div>
      <p class="">This is not the web page you are looking for.</p>
      <el-button plain round icon="el-icon-arrow-left" @click="$router.replace('/')">Back Home</el-button>
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

<style lang="postcss" scoped>
@import "../assets/css/variables.postcss";

.container {
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
    padding: 0 1rem;
    transform: translateY(-50%);
  }

  & .text-404 {
    margin: 0 auto;
    text-align: center;
    letter-spacing: 2px;
    font-size: 10rem;
    line-height: 1;
    font-weight: 100;
    color: #555;
  }

  & p {
    margin-top: 1rem;
    font-size: 1.2rem;
    line-height: 1.5;
    margin: 0;
    color: rgba(85, 85, 85, 0.8);
  }

  & .el-button {
    margin-top: 1rem;
    font-size: var(--fontSize);
    color: color(var(--textColor) alpha(80%));
    border-color: var(--bgColor);
    background-color: var(--bgColor);

    &.is-plain:focus,
    &.is-plain:hover {
      text-decoration: underline;
      color: color(var(--textColor) alpha(80%));
      border-color: var(--bgColor-active);
      background-color: var(--bgColor-active);
    }
  }
}

</style>
