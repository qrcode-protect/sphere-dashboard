<template>
  <div class="ssf__table-row-container">
<!--    <div class="ssf__table&#45;&#45;row" v-for="item in items">-->
<!--      <button @click="test">test</button>-->
<!--      <table-column :prop="prop" :item="item"/>-->
<!--    </div>-->
  </div>
</template>

<script>
  import TableColumn from "./column";

  export default {
    name      : "table-row",
    components: { TableColumn },
    props     : {
      prop : { type: String },
      label: { type: String },
    },

    computed: {
      items() {
        return this.parent.tableData
      },

      parent() {
        return this.$parent
      }
    },

    watch: {
      label() {
        return this.initLabel()
      }
    },

    created() {
      return this.initLabel()
    },

    methods: {
      test() {
      },

      initLabel() {
        this.parent.addHeader(this.label)
      }
    }

  }
</script>

<style scoped>

</style>
