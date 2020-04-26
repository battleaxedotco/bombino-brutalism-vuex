<template>
  <div class="title">
    <span class="centered" style="padding: 0px">{{title}}</span>
    <span class="centered anno" style="padding: 0px;">{{subtitle}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'brutalism'
    },
    subtitle: {
      type: String,
      default: 'by battleaxe'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Space+Mono&display=swap');

.title {
  font-family: 'Space Mono', monospace;
  font-size: 48px;
  padding-bottom: 30px;
}

.centered {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
}

.anno {
  font-family: freight-sans-pro, sans-serif;
  font-style: normal;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: .5ch;
  font-size: 12px;
}
</style>