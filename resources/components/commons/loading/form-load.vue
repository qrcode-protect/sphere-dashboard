<template>
  <div v-if="load" id="formLoad" class="section--form-loader full-flex">
    <triple-spinner :thickness="2" :size="100" color1="#212121" color2="#FC741C" color3="#FFFFFF"/>
  </div>
</template>

<script>

  import TripleSpinner from '../loader/triple-spinner'

	import { defineComponent } from "vue";

	export default defineComponent({
    name: "form-load",

    components: { TripleSpinner },

    computed: {
      load() {
        return this.$store.getters.loading
      }
    },
  })
</script>

<style scoped>

  #formLoad {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 2050;
  }

</style>
