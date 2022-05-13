<template>
  <!-- CODE HERE -->
  <div :class="`${row ? 'row ' : ''}${col || ''}`">
    <div :class="containerClass">

      <ssf-select @input="onInput" v-if="select" @focus="$emit('focus')" @change="$emit('change')"/>

      <ssf-input :type="type" :label="label" :name="name" :value="value" :required="required" :disabled="disabled"
                 :items="optionItems" :field="optionField" :placeholder="placeholder" :autocomplete="autocomplete"
                 :step="step" :min="min" :max="max" @input="onInput" :inline="inline" ref="input"
                 :input-class="inputClass" :show-error="showError" :icon="icon" @focus="$emit('focus')"
                 @change="$emit('change')"
                 :format="format"
                 v-else>
        <slot name="label" slot="label" v-if="hasSlot('label')"/>
        <slot name="file-info" slot="file-info" v-if="hasSlot('file-info')"/>
        <slot name="selector" slot="selector" v-if="hasSlot('selector')"/>
        <slot name="delete-file" slot="delete-file" v-if="hasSlot('delete-file')"/>
      </ssf-input>

    </div>
  </div>
</template>

<script>

  import momentTimezone from 'moment-timezone'

  import SsfInput  from "./includes/Input/Main";
  import SsfSelect from "./includes/Select";

  // import 'ssf-icon/dist/vue-ssf-icon.css'

  export default {
    name      : "ssf-form-group",
    components: { SsfInput, SsfSelect },
    created() {
      momentTimezone.locale('fr')
    },
    props     : {

      /* CONTAINERS */
      col           : { type: String, required: false },
      row           : { type: Boolean, required: false },
      formGroupClass: { type: String, required: false, default: '' },

      /* COMMONS */
      name      : { type: String | Object, required: true },
      label     : { type: String | Object, required: false },
      value     : { required: false, default: null },
      required  : { type: Boolean, required: false, default: false },
      inputClass: { type: String | Object, required: false, default: '' },

      /* SELECT */
      select      : { type: Boolean, required: false, default: false },
      optionItems : { type: Array | Object, required: false },
      optionField : { type: String, required: false, default: null },
      optionLabel : { type: String, required: false, default: null },
      optionGroup : { type: Boolean, required: false, default: false },
      multiple    : { type: Boolean, required: false, default: false },
      scrollX     : { type: Boolean, required: false, default: false },
      selectHeight: { type: Number | String, required: false, default: 350 },

      /* INPUT */
      type        : { type: String | Object, required: false, default: 'text' },
      disabled    : { type: Boolean, required: false, default: false },
      placeholder : { type: Boolean | String, required: false, default: false },
      autocomplete: { type: Boolean | String, required: false, default: false },

      /* RADIO */
      items : { type: Array, required: false },
      field : { type: String, required: false, default: null },
      inline: { type: Boolean, required: false, default: false },

      /* NUMBER */
      step     : { type: Number | String, required: false, default: 1 },
      min      : { type: Number | String, required: false, default: null },
      max      : { type: Number | String, required: false, default: null },
      inputmode: { type: Boolean | String, required: false, default: false },

      /* DATE */
      format: { type: String, required: false, default: 'DD/MM/YYYY' },

      /* FILE */
      showError: { type: Boolean, required: false, default: true },
      mimes    : {
        type    : String,
        required: false,
        default : 'pdf, csv, text, gif, jpeg, png, icon'
      },

      /* ICONS */
      /*iconType  : { type: String | Object, required: false, default: 'fa' },
      iconSize  : { type: String | Object, required: false, default: '' },
      iconWeight: { type: String | Object, required: false },*/
      icon: { type: String | Object, required: false, default: null },
    },

    data() {
      return {}
    },

    watch: {},

    computed: {
      containerClass() {
        return `${
          (this.type === 'checkbox' ? 'ssf-checkbox-group'
              : this.type === 'switch' ? 'ssf-checkbox-switch'
                : this.type === 'radio' ? 'ssf-radio-group'
                  : 'ssf-form-group'
          )
        } ${this.formGroupClass}`.trim()
      },
    },

    methods: {

      hasSlot(name = 'default') {
        return !!this.$slots[name] || !!this.$scopedSlots[name];
      },

      onInput(value) {
        if (!this.disabled) {
          this.$emit('change')
          this.$emit('input', value)
        }
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="scss">

  $defaultBorder: #ddd;
  $defaultBorderRadius: 4px;

  .ssf-row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
  }

  .ssf-form-group {
    position: relative;
    width: 100%;

    .ssf-form-control {
      font-size: 14px;
      width: 100%;
      padding: 14px 18px;
      background-color: transparent;
      min-height: 45px;
      box-sizing: border-box;
      border: 1px solid $defaultBorder;
      -webkit-border-radius: $defaultBorderRadius;
      -moz-border-radius: $defaultBorderRadius;
      border-radius: $defaultBorderRadius;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;


      &:focus,
      &:focus + .ssf-number-control {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border-color: #225a94;
        outline: 0;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 0 white inset;
        -moz-box-shadow: 0 0 0 0 white inset;
        box-shadow: 0 0 0 0 white inset;
      }

      .is-valid {
        border-color: #6aa280;
      }

      .is-invalid {
        border-color: #d6534c;
      }
    }

    label {
      position: absolute;
      font-size: 13px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: #9e9e9e;
      margin-left: 0;
      transition: all .25s;
      cursor: pointer;
      background: transparent;
    }

    .ssf-form-control:focus + label,
    label.active {
      top: -8px;
      left: inherit;
      right: inherit;
      margin-left: 15px;
      height: 16px;
      font-size: 10px;
      background-color: #fff;
      z-index: 1;
    }

    input.ssf-form-control, select.ssf-form-control {
      -moz-appearance: none !important;
      -webkit-appearance: none !important;
      appearance: none !important;
    }

  }

  .ssf-form-group,
  .ssf-checkbox-group,
  .ssf-checkbox-switch,
  .ssf-radio-group {
    margin-top: 8px;
    margin-bottom: 20px;
  }


</style>
