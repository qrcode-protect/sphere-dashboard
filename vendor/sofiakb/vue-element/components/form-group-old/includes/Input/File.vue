<template>
  <div class="ssf-input-container ssf-form-file">
    <slot name="label" v-if="hasSlot('label')"/>
    <input-label :label="parent.label" :placeholder="placeholder" :icon="icon" @label-click="onLabelClick"
                 key="file-label" v-else-if="!hasSlot('label')"/>

    <!-- TYPE : FILE -->
    <input class="ssf-form-control" :type="parent.type" :id="parent.name" :name="parent.name"
           :required="parent.required" @input="onInput()" @change="onFileSelected" @focusin="focused = true"
           @focusout="focused = false" ref="inputComponent">


    <div class="ssf-file-selector" @click="onSelectorClick"
         :class="{'ssf-file-custom': hasSlot('selector'), 'ssf-form-control': !hasSlot('selector')}">
      <slot name="file-info" v-if="hasSlot('file-info')"/>
      <div class="file-info" v-else-if="file">
        {{ file.name }}&nbsp;<span class="file-size">({{ humanizeSize(file.size) }})</span>
      </div>
      <slot name="selector" v-if="hasSlot('selector')"/>
      <div class="selector" v-else>
        <span>Choisir un fichier...</span>
      </div>
      <slot name="delete-file" v-if="hasSlot('delete-file')" @click.stop="onInput(true)"/>
      <div class="delete-file" @click.stop="onInput(true)" v-else></div>
    </div>


  </div>
</template>

<script>

  import InputLabel from "./includes/InputLabel";

  let config = {
    mimes: {
      pdf : 'application/pdf',
      csv : 'text/csv',
      text: 'text/plain',
      gif : 'image/gif',
      jpg : 'image/jpeg',
      jpeg: 'image/jpeg',
      png : 'image/png',
      icon: 'image/x-icon'
    }
  };

  export default {
    name: "SsfInputFile",

    components: { InputLabel },

    props: {
      mimes: {
        type    : String,
        required: false,
        default : 'pdf, csv, text, gif, jpeg, png, icon'
      }
    },

    data() {
      return {
        focused: false,
        file   : null,
        options: {
          mimes: null
        }
      }
    },

    created() {
      this.initMimes()
    },

    watch: {
      mimes() {
        this.initMimes()
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

      hasSlots() {
        return this.hasSlot('selector') && this.hasSlot('file-info') && this.hasSlot('delete-file')
      }
    },

    methods: {

      initMimes() {
        let mimes = this.mimes.split(', ');
        this.options.mimes = {};
        mimes.forEach((mime) => this.options.mimes[mime] = config.mimes[mime] || null)
      },

      hasSlot(name = 'default') {
        return !!this.$slots[name] || !!this.$scopedSlots[name];
      },

      checkMimeType(mime) {
        return mime && this.options.mimes
          ? Object.keys(this.options.mimes).find(key => Array.isArray(this.options.mimes[key]) ? this.options.mimes[key].includes(mime) : this.options.mimes[key] === mime)
            ? true
            : this.showError ? this.showErrorMessage('mime') : false
          : false
      },

      checkFile(file) {
        return file === null ? false : this.checkMimeType(file.type)
      },

      humanizeSize(size) {
        if (size / 1000 < 1000)
          return Number((size / 1000).toFixed(1)) + ' Ko';
        if (size / 1000 / 1000 < 1000)
          return Number((size / 1000 / 1000).toFixed(1)) + ' Mo';
        return Number((size / 1000 / 1000 / 1000).toFixed(1)) + ' Go'
      },

      onLabelClick() {
        this.$nextTick(() => {
          this.focused = true;
          this.$refs.inputComponent.focus();
          this.$forceUpdate()
        })
      },

      onSelectorClick() {
        this.$nextTick(() => {
          return this.$refs.inputComponent.click()
        })
      },

      onFileSelected($event) {
        let event = $event || window.event, target = event.target || event.dataTransfer,
          file = target.files[0] || null;
        return this.checkFile(file) ? (this.file = file, this.onInput()) : this.$emit("error")
      },

      onInput(deleteFile = false) {
        if (!!deleteFile) {
          this.file = null
          this.$forceUpdate()
          return this.$emit('input', this.file)
        } else
          return this.$emit('input', this.file ? {
            name     : this.file.name,
            size     : this.file.size,
            humanSize: this.humanizeSize(this.file.size),
            type     : this.file.type,
            data     : this.file
          } : this.file)
      },

    }
  }
</script>

<style lang="scss" scoped>
  .ssf-form-file {
    input[type=file].ssf-form-control {
      display: none;
    }

    .ssf-form-control.ssf-file-selector:not(.ssf-file-custom) {
      position: relative;
      cursor: pointer;

      .file-info {
        .file-size {
          font-size: small;
          font-style: italic;
          color: #dddddd;
        }
      }

      .selector, .delete-file {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        margin-bottom: auto;
      }

      .selector {
        right: 0;
        width: 150px;
        color: #FFFFFF;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background: #0f0f0f;
        font-style: italic;
      }

      .delete-file {
        right: 155px;
        width: 20px;
        height: 20px;

        &:before,
        &:after {
          content: '';
          position: absolute;
          height: 10px;
          width: 2px;
          background: #0f0f0f;
        }

        &:before {
          transform: rotate(45deg);
        }

        &:after {
          transform: rotate(-45deg);
        }

        &:hover {
          &:before, &:after {
            background: #d6534c;
          }
        }

      }
    }

  }
</style>
