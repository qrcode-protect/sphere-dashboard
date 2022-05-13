<template>
  <div class="ssf-input-container ssf-form-checkbox">
    <label>
      <!-- TYPE : CHECKBOX -->
      <input class="ssf-form-control" type="checkbox" :id="parent.name" :name="parent.name" :value="parent.value"
             :class="inputClass" :required="parent.required" :disabled="parent.disabled" :checked="parent.value"
             @input="onInput()" @change="$emit('change')" @focusin="focused = true" @focusout="focused = false"
             ref="inputComponent">

      <input-label :label="parent.label" :icon="icon" key="checkbox-label" @focus="$emit('focus')"/>

      <span class="slider" :class="{'checked': parent.value}" v-if="switcher"></span>
    </label>
  </div>
</template>

<script>

  import InputLabel from "./includes/InputLabel";

  export default {
    name: "SsfInputCheckbox",

    components: { InputLabel },

    props: {
      switcher: { type: Boolean, required: false, default: false }
    },

    data() {
      return {
        focused: false,
      }
    },

    /*watch: {
      parent: {
        handler(val) {
          // this.resetCommentInput();
        },
        deep: true
      }
    },*/

    computed: {

      icon() {
        return this.parent.$data.options.icon
      },

      parent() {
        return this.$parent
      },

      inputClass() {
        return `${this.parent.inputClass} ${this.parent.value ? 'checked' : ''}`.trim()
      }
    },

    methods: {
      onInput() {
        this.$nextTick(() => {
          this.$emit('input', !this.parent.value)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  $defaultBorder: #ddd;
  $defaultBorderRadius: 4px;

  .ssf-checkbox-group {

    input[type=checkbox] {

      position: relative;
      -webkit-appearance: none;
      border: 1px solid $defaultBorder;
      height: 20px;
      width: 20px;
      -webkit-border-radius: $defaultBorderRadius;
      -moz-border-radius: $defaultBorderRadius;
      border-radius: $defaultBorderRadius;
      cursor: pointer;
      margin-right: 10px;

      &:focus, &:active, &:hover {
        outline: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }

      &:checked:before,
      .checked:before {
        content: '';
        top: -6px;
        left: 8px;
        position: absolute;
        height: 18px;
        width: 9px;
        border-bottom: 2px solid #0f0f0f;
        border-right: 2px solid #0f0f0f;
        transform: rotate(45deg);
      }
    }

    label {
      display: flex;
      align-items: center;
    }
  }

  .ssf-checkbox-switch {

    label {
      position: relative;
      display: flex;
      align-items: center;
    }

    input[type=checkbox] {
      height: 15px;
      width: 30px;
      border: 1px solid $defaultBorder;
      background-color: $defaultBorder;
      -webkit-appearance: none;
      -moz-appearance: none;
      border-radius: 90px;

      &:focus, &:active, &:hover {
        outline: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }
    }

    .slider {
      content: "";
      position: absolute;
      height: 13px;
      width: 13px;
      top: 0;
      left: 5px;
      bottom: 0;
      background-color: #fff;
      margin-top: auto;
      margin-bottom: auto;
      border-radius: 50%;
      -webkit-transition: .4s;
      -o-transition: .4s;
      transition: .4s;
    }

    .slider.checked,
    input[type=checkbox]:checked + .slider.checked {
      -webkit-transform: translateX(13px);
      -ms-transform: translateX(13px);
      transform: translateX(13px);
    }

    input[type=checkbox]:checked {
      background-color: #2196F3;
      border-color: #2196F3;
    }

  }

</style>
