<template>
  <div class="row" :class="{'w-100': !notFull}">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "x-row",

    props: {
      notFull: { type: Boolean, required: false, default: false },
    }

  }
</script>

<style scoped>

</style>
