<template>
  <div class="ssf-input-container ssf-form-password">

    <ssf-input-label
      :label="parent.label"
      :placeholder="placeholder"
      :icon="icon"
      @label-click="onLabelClick"
      :key="`password-label-${parent.label}`"
      v-if="parent.label"/>

    <!-- TYPE : password -->
    <input
      class="ssf-form-control"
      :type="inputType"
      :id="parent.name"
      :name="parent.name"
      :value="parent.value"
      :class="parent.inputClass"
      :required="parent.required"
      :disabled="parent.disabled"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @input="onInput()"
      @change="$emit('change')"
      @focusin="focused = true"
      @focusout="focused = false"
      @focus="$emit('focus')"
      ref="inputComponent"/>

    <span class="ssf-password-toggle" @click="toggleShow">
      <ssf-icon icon="eye" light v-if="!show"/>
      <ssf-icon icon="eye-slash" light v-if="show"/>
    </span>

  </div>
</template>

<script>
  import SsfInputLabel from "../input-label";

  export default {
    name: "ssf-input-password",

    emits: [ 'focus', 'change', 'input' ],

    components: { SsfInputLabel },

    data() {
      return {
        focused  : false,
        show     : false,
        inputType: 'password'
      }
    },

    computed: {
      icon() {
        return this.parent.$data.options.icon
      },

      parent() {
        return this.$parent
      },

      placeholder() {
        const placeholder = this.parent.placeholder, label = this.parent.label;
        return (placeholder === true) ? label : (typeof placeholder).toLowerCase() === 'string' ? placeholder : ''
      },

      autocomplete() {
        const autocomplete = this.parent.autocomplete;
        return `${autocomplete ? autocomplete === true ? this.parent.name : autocomplete : ''}`
      },
    },

    methods: {

      toggleShow() {
        this.show = !this.show
        this.inputType = this.show ? 'text' : 'password'
        this.$refs.inputComponent.focus()
        this.setSelectionRange()
      },

      setSelectionRange() {
        this.$refs.inputComponent.selectionEnd = this.parent.value?.length
        this.$refs.inputComponent.selectionStart = this.parent.value?.length
      },

      onLabelClick() {
        this.$nextTick(() => {
          this.focused = true
          this.$refs.inputComponent.focus()
          this.$forceUpdate()
        })
      },

      onInput() {
        this.$nextTick(() => this.$emit('input', this.$refs.inputComponent.value))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ssf-form-password {
    position: relative;

    .ssf-password-toggle {
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      height: 15px;
      width: 15px;
      margin-top: auto;
      margin-bottom: auto;
      cursor: pointer;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
