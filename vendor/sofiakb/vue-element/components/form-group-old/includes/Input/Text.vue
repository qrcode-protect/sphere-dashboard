<template>
  <div class="ssf-input-container ssf-form-text">

    <input-label :label="parent.label" :placeholder="placeholder" :icon="icon" @label-click="onLabelClick"
                 key="text-label"/>

    <!-- TYPE : text -->
    <input class="ssf-form-control" :type="parent.type" :id="parent.name" :name="parent.name" :value="parent.value"
           :class="parent.inputClass" :inputmode="parent.type" :required="parent.required" :disabled="parent.disabled"
           :placeholder="placeholder" :autocomplete="autocomplete" @input="onInput()" @change="$emit('change')"
           @focusin="focused = true" @focusout="focused = false" ref="inputComponent" @focus="$emit('focus')">

  </div>
</template>

<script>

  import InputLabel from "./includes/InputLabel";

  export default {
    name: "SsfInputText",

    components: { InputLabel },

    props: {},

    data() {
      return {
        focused: false,
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
      },
    },

    methods: {

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

<style scoped>

</style>
