<template>
  <div :class="['banner-wrapper', title ]" @click="openURL(link)">
    <Wrapper class="center-flex">
      <brutalism-title :title="title.charAt(0).toUpperCase() + title.slice(1)" :subtitle="subtitle" />
    </Wrapper>
    <div class="color-overlay" :style="{ opacity: overlay }"></div>
  </div>
</template>

<script>
import { openURL } from 'brutalism'

export default {
  props: {
    title: {
      type: String,
      default: 'Overlord'
    },
    subtitle: {
      type: String,
      default: 'vector workflow salvation'
    },
    link: {
      type: String,
      default: ''
    },
    overlay: {
      type: Number,
      default: 0.35
    }
  },
  components: {
    "brutalism-title": require('./brutalismTitle.vue').default,
  },
  methods: {
    openURL(link) {
      openURL(link);
    }
  }
}
</script>

<style>
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.banner-wrapper {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.overlord {
  background-image: url('~@/components/Battleaxe/overlord.jpg')
}

.rubberhose {
  background-image: url('~@/components/Battleaxe/rubberhose.gif')
}

.freebies {
  background-image: url('~@/components/Battleaxe/freebies.jpg')
}

.color-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2;
  background-color: #000;
  pointer-events: none;
}
</style>