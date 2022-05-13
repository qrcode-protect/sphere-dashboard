<template>

    <div class="ssf__table--column"
         :class="{'ssf__table--column-header': header}"
         v-if="prop && item">
        <!--         @dblclick="onDblClick"-->
        {{ item[prop] }}
    </div>

    <div class="ssf__table--column"
         :class="{'ssf__table--column-header': header, 'ssf__table--column-sortable': sortable && header}"
         v-else-if="data">
        <!--         @dblclick="onDblClick"-->
        {{ data }}
        <span v-if="sortable && header">
            <ssf-icon icon="angle-up" la v-if="sortedReverse"/>
            <ssf-icon icon="angle-down" la v-else/>
        </span>
    </div>


</template>

<script>

    import SsfIcon from '../../icon'

    export default {
        name: "table-column",

        props: {
            item    : { required: false },
            prop    : { required: false },
            data    : { type: String, required: false },
            header  : { type: Boolean, required: false, default: false },
            sortable: { type: Boolean, required: false, default: false },
            // selectable: { type: Boolean, required: false, default: false },

            sortedReverse: { type: Boolean, required: false, default: false },
        },

        components: { SsfIcon },

        mounted() {
            this.$emit('mounted')
        },

        data() {
            return {
                // item: null,
                // prop: null
                // prop: null
            }
        },

        methods: {
            /*setItem(item) {
              this.item = item
            },

            setProp(prop) {
              this.prop = prop
            }*/
        }

    }
</script>

<style scoped>

    .ssf__table--column {
        display: inline-block;
        padding: 15px 10px;
    }

    .ssf__table--column-header {
        font-weight: bold;
    }

    .ssf__table--column-sortable {
        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>
