<template>
  <div class="ssf-input-container ssf-form-radio">

    <input-label :label="parent.label" :icon="icon" key="radio-label"/>

    <!-- TYPE : RADIO -->
    <label class="ssf-radio-button" v-for="item in parent.items" :class="{'ssf-radio-inline': parent.inline}">
      <input class="ssf-form-control" type="radio" :id="parent.name" :name="parent.name" :value="value(item)"
             :class="{checked: isChecked(item, parent.value)}" :required="parent.required" :disabled="parent.disabled"
             :checked="isChecked(item, parent.value)" @change="$emit('change')" @input="onInput(item)"
             ref="inputComponent" @focus="$emit('focus')">&nbsp;<span>{{ item[parent.field] || item }}</span>
    </label>
  </div>
</template>

<script>

  import InputLabel from "./includes/InputLabel";

  export default {
    name: "SsfInputRadio",

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
    },

    methods: {

      value(item) {
        return item[this.parent.field] || item
      },

      isChecked(item, value) {
        return this.field ? item[this.field] === value : item === value
      },

      onInput(item) {
        this.$emit('input', this.parent.field ? item[this.parent.field] : item)
      }
    }
  }
</script>

<style lang="scss" scoped>

  $defaultBorder: #ddd;
  $defaultBorderRadius: 4px;

  .ssf-radio-group {

    input[type=radio] {

      position: absolute;
      -webkit-appearance: none;
      -moz-appearance: none;
      border: 1px solid $defaultBorder;
      height: 16px;
      width: 16px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      cursor: pointer;
      margin-left: -22px;
      margin-top: 0;
      box-sizing: border-box;

      &:focus, &:active, &:hover {
        outline: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }

      &:checked, .checked {
        border-color: #0f0f0f;
        /*border-width: 2px;*/
      }

      &:checked:before,
      .checked:before {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        height: 8px;
        width: 8px;
        border-radius: 50%;
        background-color: #0f0f0f;
      }
    }

    label:not(.ssf-radio-button) {
      font-size: 13px;
      /*display: flex;*/
      /*align-items: center;*/
      padding: 0 10px 10px;
      color: #9e9e9e;
      display: block;
    }

    label.ssf-radio-button {
      height: 20px;
    }

    label.ssf-radio-button {
      display: flex;
      align-items: center;
      padding-left: 35px;


      &:not(.ssf-radio-inline) {
        margin-bottom: 5px;
      }

      &.ssf-radio-inline {
        display: inline-block;
        vertical-align: middle;
        min-height: 20px;
      }
    }
  }

</style>
