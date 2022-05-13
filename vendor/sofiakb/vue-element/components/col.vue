<template>
  <div :class="colClass">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "x-col",

    props: {
      size: Number | String,
      xs  : Number | String,
      sm  : Number | String,
      md  : Number | String,
      lg  : Number | String,
      xl  : Number | String,

      noPadding: { type: Boolean, default: false }
    },

    computed: {
      colClass() {
        let classes = '';
        if (this.xs || this.size) classes = classes.trim() + ` col-${this.xs || this.size}`;
        if (this.sm) classes = classes.trim() + ` col-sm-${this.sm}`;
        if (this.md) classes = classes.trim() + ` col-md-${this.md}`;
        if (this.lg) classes = classes.trim() + ` col-lg-${this.lg}`;
        if (this.xl) classes = classes.trim() + ` col-xl-${this.xl}`;

        if (this.noPadding) classes = classes.trim() + ` px-0`;

        return classes && classes.trim() !== '' ? classes : `col`
      }
    }
  }
</script>

<style scoped>

</style>
