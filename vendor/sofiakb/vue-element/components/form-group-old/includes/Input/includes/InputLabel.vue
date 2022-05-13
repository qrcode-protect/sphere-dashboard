<template>
  <label :class="{active}" v-if="showLabel" @click="$emit('label-click')" class="ssf__input-label">
    <ssf-icon :type="icon.type" :icon="icon.icon" :weight="icon.weight" :size="icon.size" v-if="icon"
              class="space-icon"/>
    <span v-html="label"></span>
  </label>
</template>

<script>
  import SsfIcon from '../../../../icon'

  export default {
    name: "InputLabel",

    components: { SsfIcon },

    props: {
      label      : { type: String | Object, required: true },
      placeholder: { type: String | Boolean },
      icon       : { type: String | Boolean },
    },

    computed: {
      active() {
        if (this.$parent.focused || !!this.placeholder)
          return true;

        if (this.$parent.$parent.select && this.$parent.$parent.multiple)
          return Array.isArray(this.$parent.$parent.value) && this.$parent.$parent.value.length > 0;

        if (this.$parent.$parent.type === 'number')
          return ((this.$parent.$parent.value || this.$parent.$parent.value === 0) && this.$parent.$parent.value.toString().trim() !== '');

        return (this.$parent.$parent.value && ((typeof this.$parent.$parent.value === "string" && this.$parent.$parent.value.trim() !== '') || typeof this.$parent.$parent.value !== "string"))
      },

      showLabel() {
        return this.label && this.placeholder !== true
      }

    }

  }
</script>

<style scoped>
  .space-icon {
    margin-right: 5px;
  }

  label.ssf__input-label {
    margin-bottom: 0 !important;
  }
</style>
