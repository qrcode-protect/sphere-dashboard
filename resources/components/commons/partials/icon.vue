<template>
  <img :src="src" :alt="alt">
</template>

<script>
  export default {
    name: "icon",

    props: {
      icon: {
        type    : String,
        required: true
      }
    },

    computed: {

      src() {
        return require(`@/assets/img/icons/${this.icon}.png`)
      },

      alt() {
        return `Icon ${this.icon}`
      }
    }
  }
</script>
