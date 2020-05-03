<template>
  <Wrapper class="extra-padding">
    <Row style="font-size: 16px;">
      <span>Changes to this page are persistent. Try modifying the items below, refreshing the page, and watching the state changes in Vue DevTool's Vuex tab.</span>
    </Row>
    <Row style="display: flex; align-items: baseline; position: relative;">
      <Toggle 
        :state="sizeLock" 
        @update="val => sizeLock = val" 
        on-icon="lock" 
        off-icon="lock-open-variant" 
      />
      <Input-Scroll
        :value="size"
        :min="10"
        :max="50"
        label="vuex => state.settings.size"
        :disabled="sizeLock"
        @change="val => size = val"
      />
    </Row>
    <Row>
      <TextArea 
        flat
        label="vuex => state.inputs.inputA" 
        :rows="7" 
        :value="inputA" 
        @update="val => inputA = val"
      />
      <TextArea 
        flat
        label="vuex => state.inputs.inputB" 
        :rows="7" 
        :value="inputB" 
        @update="val => inputB = val"
      />
      <Input
        flat
        label="vuex => state.label" 
        :value="label" 
        @change="val => buttonLabel = val"
        placeholder="This text will appear on the button below:"
      />
    </Row>
    <Button block @click="resetAll">{{label}}</Button>

    <Row padding="10px" class="icon-list">
      <Icon name="bomb" :size="`${size}px`" />
      <Icon name="one-up" :size="`${size}px`" />
      <Icon name="pac-man" :size="`${size}px`" />
      <Icon name="ghost" :size="`${size}px`" />
      <Icon name="space-invaders" :size="`${size}px`" />
      <Icon name="skull" :size="`${size}px`" />
    </Row>
  </Wrapper>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    // mapGetters assigns the second param Array getters as new computed properties.
    // The below results in this.settings, this.inputs, and this.label existing:
    ...mapGetters("example", ["settings", "inputs", "label"]),
    // Using computed getters/setters to both retrieve data and trigger Vuex actions:
    size: {
      // get is called when we use something like `let data = this.size`
      get() {
        return this.settings.size;
      },
      // set is called when we use something like `this.size = data`.
      set(value) {
        // We then pass the incoming assignment value to our Vuex Action, which updates the State:
        this.setSize(value);
      }
    },
    sizeLock: {
      get() {
        return this.settings.sizeLock;
      },
      set(value) {
        this.setSizeLock(value);
      }
    },
    inputA: {
      get() {
        return this.inputs.inputA;
      },
      set(value) {
        this.setInputA(value);
      }
    },
    inputB: {
      get() {
        return this.inputs.inputB;
      },
      set(value) {
        this.setInputB(value);
      }
    },
    buttonLabel: {
      get() {
        return this.label;
      },
      set(value) {
        this.setLabel(value);
      }
    }
  },
  methods: {
    // mapActions assigns Actions from our Vuex store as direct methods of this component.
    // Below results in this.setSize(), this.setLabel(), this.resetAll() and etc. existing:
    ...mapActions("example", [
      "setSize",
      "setSizeLock",
      "setInputA",
      "setInputB",
      "setLabel",
      "deleteAll",
      "resetAll"
    ]),
  }
}
</script>

<style>
.extra-padding {
  padding: 10px 20px;
}

.icon-list {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-around;
}

.isolated-icon {
  position: absolute;
  left: 200px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>