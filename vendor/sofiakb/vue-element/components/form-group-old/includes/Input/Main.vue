<template>
  <!-- TYPE : DEFAULT -->
  <ssf-input-text @input="onInput" ref="inputComponent" v-if="isDefault" @focus="$emit('focus')"
                  @change="$emit('change')"/>

  <!-- TYPE : PASSWORD -->
  <ssf-input-password @input="onInput" ref="inputComponent" v-else-if="type === 'password'" @focus="$emit('focus')"
                      @change="$emit('change')"/>

  <!-- TYPE : NUMBER -->
  <ssf-input-number @input="onInput" ref="inputComponent" v-else-if="type === 'number'" @focus="$emit('focus')"
                    @change="$emit('change')"/>

  <!-- TYPE : CHECKBOX -->
  <ssf-input-checkbox @input="onInput" ref="inputComponent" v-else-if="type === 'checkbox'" @focus="$emit('focus')"
                      @change="$emit('change')"/>

  <!-- TYPE : SWITCH -->
  <ssf-input-checkbox @input="onInput" ref="inputComponent" v-else-if="type === 'switch'" :switcher="true"
                      @focus="$emit('focus')" @change="$emit('change')"/>

  <!-- TYPE : RADIO -->
  <ssf-input-radio @input="onInput" ref="inputComponent" v-else-if="type === 'radio'" @focus="$emit('focus')"
                   @change="$emit('change')"/>

  <!-- TYPE : DATE -->
  <ssf-input-date @input="onInput" ref="inputComponent" v-else-if="type === 'date'" @focus="$emit('focus')"
                  @change="$emit('change')"/>

  <!-- TYPE : TIME -->
  <ssf-input-time @input="onInput" ref="inputComponent" v-else-if="type === 'time'" @focus="$emit('focus')"
                  @change="$emit('change')"/>

  <!-- TYPE : FILE -->
  <ssf-input-file @input="onInput" ref="inputComponent" v-else-if="type === 'file'" :mimes="mimes">
    <slot name="label" slot="label" v-if="hasSlot('label')"/>
    <slot name="file-info" slot="file-info" v-if="hasSlot('file-info')"/>
    <slot name="selector" slot="selector" v-if="hasSlot('selector')"/>
    <slot name="delete-file" slot="delete-file" v-if="hasSlot('delete-file')"/>
  </ssf-input-file>

</template>

<script>
  import SsfInputNumber   from "./Number";
  import SsfInputPassword from "./Password";
  import SsfInputText     from "./Text";

  import SsfInputCheckbox from "./Checkbox";
  import SsfInputRadio    from "./Radio";

  import SsfInputDate from "./Date";
  import SsfInputTime from "./Time";

  import SsfInputFile from "./File";

  export default {
    name      : "SsfInput",
    components: {
      SsfInputText,
      SsfInputNumber,
      SsfInputPassword,

      SsfInputCheckbox,
      SsfInputRadio,

      SsfInputDate,
      SsfInputTime,

      SsfInputFile,
    },

    props: {
      /* COMMONS */
      name      : { type: String | Object, required: true },
      label     : { type: String | Object, required: false },
      value     : { required: false, default: null },
      required  : { type: Boolean, required: false, default: false },
      inputClass: { type: String | Object, required: false, default: '' },

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
      step: { type: Number | String, required: false, default: 1 },
      min : { type: Number | String, required: false, default: null },
      max : { type: Number | String, required: false, default: null },

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
      icon: { type: String | Object, required: false, default: null },
    },

    created() {
      this.run()
    },

    computed: {
      isDefault() {
        let defaults = ['password', 'checkbox', 'switch', 'date', 'time', 'number', 'radio', 'file'];
        return !defaults.includes(this.type)
      },
    },

    watch: {
      icon() {
        this.initIcon()
      },
    },

    data() {
      return {
        options: {
          icon: null
        }
      }
    },

    methods: {
      hasSlot(name = 'default') {
        return !!this.$slots[name] || !!this.$scopedSlots[name];
      },

      initIcon() {
        if (this.icon) {
          this.options.icon = {
            icon  : (typeof this.icon).toLowerCase() === 'string' ? this.icon : this.icon.icon,
            type  : this.icon.type || 'fa',
            size  : this.icon.size || '1x',
            weight: this.icon.weight
          }
        }
      },

      run() {
        this.initIcon()
      },

      onInput(value = null) {
        this.$nextTick(() => {
          this.$emit('input', value === null && this.type !== 'file' ? this.$refs.inputComponent.value : value)
        })
      }
    }
  }
</script>

<style scoped>

</style>
