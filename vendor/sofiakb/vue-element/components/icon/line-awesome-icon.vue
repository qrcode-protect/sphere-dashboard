<template>
  <i :class="lineAwesomeClass"></i>
</template>

<script>

  import "./assets/line-awesome/line-awesome.min.css"

  import * as Icons from './utils/icons'

  export default {
    name: "ssf-line-awesome-icon",

    props: {
      /* STRONG */
      regular: { type: Boolean, required: false, default: false },
      solid  : { type: Boolean, required: false, default: false },
      light  : { type: Boolean, required: false, default: false },
      normal : { type: Boolean, required: false, default: true },
      brand  : { type: Boolean, required: false, default: false },

      /* ICON */
      icon    : { type: String, required: true, validator: (value) => Icons.lineAwesome.includes(value) },
      size    : { type: String, required: false, default: '' },
      fw      : { type: Boolean, required: false, default: false },
      animated: { type: Boolean, required: false, default: false },
      rotate  : { type: String, required: false, default: '' },
      pull    : { required: false, default: false }
    },

    computed: {

      lineAwesomeClass() {
        return `${this.strongClass}${this.iconClass}${this.sizeClass}${this.fwClass}${this.rotateClass}${this.animatedClass}${this.pullClass}`.trim()
      },

      strongClass() {
        // if (this.$parent.$props.weight)
        //   this[this.$parent.$props.weight] = true;
        return this.regular
          ? 'lar'
          : this.light
            ? 'lal'
            : this.solid
              ? 'las'
              : this.brand
                ? 'lab'
                : 'la'
      },

      iconClass() {
        return ` la-${this.icon}`
      },

      sizeClass() {
        return this.size ? ' la-' + this.size : ''
      },

      fwClass() {
        return this.fw ? ' la-fw' : ''
      },

      animatedClass() {
        return this.animated ? ' la-spin' : ''
      },

      rotateClass() {
        return ` ${this.rotate}`.trim()
      },

      pullClass() {
        return this.pull ? ` la-pull-${this.pull}` : ''
      }

    },
  }
</script>
