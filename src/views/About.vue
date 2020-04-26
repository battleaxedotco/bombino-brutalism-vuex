<template>
  <div class="about-container">
    <Previewer title="overlord" subtitle="vector workflow salvation" link="https://www.battleaxe.co/overlord" />
    <Previewer title="rubberhose" subtitle="animation riggging for everyone" link="https://www.battleaxe.co/rubberhose" />
    <Previewer title="freebies" subtitle="Buttcapper, AEUX, Inspector Spacetime, and more" link="https://www.battleaxe.co#freebies" />
  </div>
</template>

<script>
export default {
  components: {
    Previewer: require('../components/Battleaxe/previewer.vue').default
  },
}
</script>

<style>
.about-container {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  min-height: 580px;
  min-width: 300px;
  height: 100%;
  z-index: 0;
}
</style>