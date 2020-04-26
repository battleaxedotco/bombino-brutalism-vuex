<template>
  <Wrapper class="home-wrapper">
    <battleaxe-logo />
    <brutalism-title subtitle="vuex" />
    <Button-Group>
      <Button block goto="https://battleaxe.dev">See the docs</Button>
      <Button block goto="https://github.com/Inventsable/brutalism#-brutalism">See the code</Button>
      <Button block goto="https://github.com/Inventsable/brutalism/issues/new">Report a bug</Button>
    </Button-Group>
  </Wrapper>
</template>

<script>
export default {
  components: {
    "battleaxe-logo": require('../components/Battleaxe/battleaxeLogo.vue').default,
    "brutalism-title": require('../components/Battleaxe/brutalismTitle.vue').default
  },
}
</script>

<style>

.home-wrapper {
  min-height: 580;
  min-width: 300px;
}
</style>