<template>
  <div class="ssf-input-container ssf-form-password">

    <input-label :label="parent.label" :placeholder="placeholder" :icon="icon" @label-click="onLabelClick"
                 key="password-label"/>

    <!-- TYPE : password -->
    <input class="ssf-form-control" :type="inputType" :id="parent.name" :name="parent.name" :value="parent.value"
           :class="parent.inputClass" :required="parent.required" :disabled="parent.disabled" :placeholder="placeholder"
           :autocomplete="autocomplete" @input="onInput()" @change="$emit('change')" @focusin="focused = true"
           @focusout="focused = false" ref="inputComponent" @focus="$emit('focus')">

    <span class="ssf-password-toggle" @click="toggleShow">
      <ssf-icon icon="eye" solid v-if="!show"/>
      <ssf-icon icon="eye-slash" solid v-if="show"/>
    </span>

  </div>
</template>

<script>

  import InputLabel from "./includes/InputLabel";
  import SsfIcon  from '../../../icon'

  export default {
    name: "SsfInputPassword",

    components: { InputLabel, SsfIcon },

    props: {},

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
        let placeholder = this.parent.placeholder, label = this.parent.label;
        return (placeholder === true) ? label : (typeof placeholder).toLowerCase() === 'string' ? placeholder : ''
      },

      autocomplete() {
        let autocomplete = this.parent.autocomplete;
        return `${autocomplete ? autocomplete === true ? this.parent.name : autocomplete : ''}`
      }
    },

    methods: {

      toggleShow() {
        this.show = !this.show
        this.inputType = this.show ? 'text' : 'password'
        this.$refs.inputComponent.focus()
      },

      onLabelClick() {
        this.$nextTick(() => {
          this.focused = true
          this.$refs.inputComponent.focus()
          this.$forceUpdate()
        })
      },

      onInput() {
        this.$nextTick(() => {
          this.$emit('input', this.$refs.inputComponent.value)
        })
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
