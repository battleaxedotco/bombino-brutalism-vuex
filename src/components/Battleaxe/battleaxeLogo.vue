<template>
  <div class="logo-wrapper">  
    <a @click="openURL('https://battleaxe.co')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 106" width="100px" style="width: 100px;">
        <g>
          <circle class="battleaxe-logo-2" cx="7.75" cy="53" r="5" />
          <circle class="battleaxe-logo-2" cx="30.37" cy="30.37" r="5" />
          <circle class="battleaxe-logo-2" cx="53" cy="7.75" r="5" />
          <circle class="battleaxe-logo-2" cx="30.37" cy="75.63" r="5" />
          <circle class="battleaxe-logo-2" cx="53" cy="53" r="5" />
          <circle class="battleaxe-logo-2" cx="75.63" cy="30.37" r="5" />
          <circle class="battleaxe-logo-2" cx="53" cy="98.25" r="5" />
          <circle class="battleaxe-logo-2" cx="75.63" cy="75.63" r="5" />
          <circle class="battleaxe-logo-2" cx="98.25" cy="53" r="5" />
          <polyline
            class="battleaxe-logo-1"
            points="75.63 75.63 7.75 53 75.63 30.37 53 7.75 53 98.25 30.37 75.63 98.25 53 30.37 30.37"
          />
        </g>
      </svg>
    </a>   
  </div>
</template>

<script>
import { openURL } from 'brutalism'
export default {
  methods: {
    openURL(url) {
      openURL(url)
    }
  }
}
</script>

<style>
.battleaxe-logo-1,
.battleaxe-logo-2 {
  fill: none;
}
.battleaxe-logo-1 {
  stroke: var(--color-default);
  stroke-miterlimit: 10;
  stroke-width: 3px;
}
.battleaxe-logo-2 {
  fill: var(--color-default);
}
.logo-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
}
</style>