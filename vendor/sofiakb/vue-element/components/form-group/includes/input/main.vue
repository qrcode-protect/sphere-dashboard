<template>
  <!-- TYPE : DEFAULT -->
  <ssf-input-text ref="inputComponent"
                  @input="onInput"
                  @focus="$emit('focus')"
                  @change="$emit('change')"
                  v-if="isDefault"/>

  <!-- TYPE : PASSWORD -->
  <ssf-input-password ref="inputComponent"
                      @input="onInput"
                      @focus="$emit('focus')"
                      @change="$emit('change')"
                      v-else-if="type === 'password'"/>

  <!-- TYPE : NUMBER -->
  <ssf-input-number ref="inputComponent"
                    @input="onInput"
                    @focus="$emit('focus')"
                    @change="$emit('change')"
                    v-else-if="type === 'number'"/>

  <!-- TYPE : CHECKBOX -->
  <ssf-input-checkbox ref="inputComponent"
                      @input="onInput"
                      @focus="$emit('focus')"
                      @change="$emit('change')"
                      v-else-if="type === 'checkbox'"/>

  <!-- TYPE : SWITCH -->
  <ssf-input-checkbox ref="inputComponent"
                      switcher
                      @input="onInput"
                      @focus="$emit('focus')"
                      @change="$emit('change')"
                      v-else-if="type === 'switch'"/>

  <!-- TYPE : RADIO -->
  <ssf-input-radio ref="inputComponent"
                   @input="onInput"
                   @focus="$emit('focus')"
                   @change="$emit('change')"
                   v-else-if="type === 'radio'"/>

  <!-- TYPE : DATE -->
  <ssf-input-date ref="inputComponent"
                  @input="onInput"
                  @focus="$emit('focus')"
                  @change="$emit('change')"
                  v-else-if="type === 'date'"/>

  <!-- TYPE : TIME -->
  <ssf-input-time ref="inputComponent"
                  @input="onInput"
                  @focus="$emit('focus')"
                  @change="$emit('change')"
                  v-else-if="type === 'time'"/>

  <!-- TYPE : FILE -->
  <ssf-input-file ref="inputComponent"
                  @input="onInput"
                  @focus="$emit('focus')"
                  @change="$emit('change')"
                  :mimes="$parent.mimes"
                  :file-accepted="$parent.fileAccepted"
                  :preview="$parent.filePreview"
                  :show-error="showError"
                  v-else-if="type === 'file'">
    <slot name="label" slot="label" v-if="hasSlot('label')"/>
    <slot name="file-info" slot="file-info" v-if="hasSlot('file-info')"/>
    <slot name="selector" slot="selector" v-if="hasSlot('selector')"/>
    <slot name="delete-file" slot="delete-file" v-if="hasSlot('delete-file')"/>
  </ssf-input-file>

</template>

<script>


  // import SsfInputFile from "./File";

  import SsfInputText     from "./text";
  import SsfInputPassword from "./password";
  import SsfInputNumber   from "./number";

  import SsfInputCheckbox from "./checkbox";
  import SsfInputRadio    from "./radio";

  import SsfInputDate from "./date";
  import SsfInputTime from "./time";

  import SsfInputFile from "./file";

  import { defineComponent } from "vue";
  import { hasSlot }         from "@sofiakb/vue-element/utils";

  export default defineComponent({
    name      : "ssf-input",
    components: {
      SsfInputText,
      SsfInputPassword,
      SsfInputNumber,
      SsfInputCheckbox,
      SsfInputRadio,
      SsfInputDate,
      SsfInputTime,
      SsfInputFile,
    },

    emits: [ 'focus', 'change', 'input' ],

    props: {
      /* CONTAINERS */
      row           : { type: Boolean, required: false, default: false },
      col           : { type: [ Boolean, Number, Object, String ], required: false, default: false },
      formGroupClass: { type: String, required: false, default: '' },
      inputClass    : { type: [ String, Object ], required: false, default: '' },

      /* COMMONS */
      name    : { type: [ String, Object ], required: true },
      label   : { type: [ String ], required: false },
      value   : { required: false, default: null },
      required: { type: Boolean, required: false, default: false },

      /* INPUT */
      type        : { type: [ String, Object ], required: false, default: 'text' },
      disabled    : { type: Boolean, required: false, default: false },
      placeholder : { type: [ Boolean, String ], required: false, default: false },
      autocomplete: { type: [ Boolean, String ], required: false, default: false },

      /* NUMBER */
      step     : { type: [ Number, String ], required: false, default: 1 },
      min      : { type: [ Number, String ], required: false, default: null },
      max      : { type: [ Number, String ], required: false, default: null },
      inputMode: { type: [ Boolean, String ], required: false, default: false },

      /* RADIO */
      items : { type: Array, required: false },
      field : { type: String, required: false, default: null },
      inline: { type: Boolean, required: false, default: false },

      /* DATE */
      dateFormat: { type: String, required: false, default: 'DD/MM/YYYY' },

      /* TIME */
      timeFormat: { type: String, required: false, default: 'HH:mm:ss' },

      /* FILE */
      showError   : { type: Boolean, required: false, default: true },
      mimes       : { type: String, required: false, default: 'pdf, csv, text, gif, jpeg, png, icon' },
      fileAccepted: { type: String, required: false, default: '*' },
      filePreview : { type: Boolean, required: false, default: false },

      /* ICONS */
      icon: { type: [ String, Object ], required: false, default: null },
    },

    created() {
      this.run()
    },

    computed: {
      isDefault() {
        return ![ 'password', 'checkbox', 'switch', 'date', 'time', 'number', 'radio', 'file' ].includes(this.type)
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
        return hasSlot(this, name)
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
  })
</script>

<style scoped>

</style>
