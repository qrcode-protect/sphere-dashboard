<template>
    <ssf-container name="table" class="ssf__table" :class="{'ssf__table-border': !noBorder}" not-full>
        <slot/>

        <!--        <vue-custom-scrollbar-->
        <!--            style="width: 500px"-->
        <!--            :settings="{wheelPropagation: false, suppressScrollY: true}">-->

        <ssf-container name="header-container" ref="headerContainer" not-full>
            <ssf-container v-if="headers"
                           not-full
                           class="ssf__table-nowrap">
                <table-column :data="header.label"
                              v-for="(header, $idx) in headers"
                              :key="`${header}-${$idx}`"
                              @click.native="sort(header)"
                              :sortable="isSortable(header.prop)"
                              :sorted-reverse="sortedBy === header.prop && sortedReverse"
                              :data-header="dataHeader($idx)"
                              header/>
            </ssf-container>
        </ssf-container>

        <ssf-container name="rows-container" ref="rowsContainer" not-full>
            <ssf-container v-if="rows"
                           v-for="(row, rowIndex) in rows"
                           not-full
                           class="ssf__table-nowrap ssf__table-row"
                           :class="{selectable}"
                           :key="`${row}-${rowIndex}`"
                           @dblclick.native="onDblClick(row)">
                <table-column v-if="col"
                              :item="col.item"
                              :prop="col.prop"
                              v-for="(col, $idx) in row"
                              :key="`${col}-${$idx}`"
                              :class="{'no-border': rowIndex >= rows.length - 1}"
                              @mounted="onMountedColumn"
                              :data-header="dataHeader($idx)"/>
            </ssf-container>
        </ssf-container>

        <!--        </vue-custom-scrollbar>-->
    </ssf-container>
</template>

<script>
    import TableColumn                from './includes/column'
    import { each, map, max, sortBy } from 'lodash'

    export default {
        name      : "ssf-table",
        components: { TableColumn },

        props: {
            tableData : { type: Array | Object, required: true },
            noBorder  : { type: Boolean | String, required: false, default: false },
            sortable  : { type: Array, required: false, default: [] },
            selectable: { type: Boolean, required: false, default: false },
        },

        data() {
            return {
                data: [],

                rows   : [],
                headers: [],
                mounted: 1,

                sortedReverse: true,
                sortedBy     : null,
            }
        },

        created() {
            this.$nextTick(() => {
                this.render()
            })
        },

        watch: {
            tableData: {
                immediate: true,
                handler(val) {
                    this.render()
                }
            }
        },

        // computed: {
        //   tabl
        // },

        methods: {

            render(loadData = true) {
                if (loadData)
                    this.data = this.tableData

                const $slots = this.$slots.default

                if ($slots) {
                    this.headers = _.map({ ...$slots }, item => item.tag ? {
                        label: item.componentOptions.propsData.label,
                        prop : item.componentOptions.propsData.prop
                    } : null).filter(item => item)

                    const rows = []
                    _.forEach(this.data, row => {
                        const dataRow = _.map({ ...$slots }, item => item.tag ? {
                            prop: item.componentOptions.propsData.prop,
                            item: row
                        } : null)
                        rows.push(dataRow.filter(item => item))
                    })
                    this.rows = rows
                    this.$forceUpdate()
                }
            },

            addHeader(label) {
                this.headers.push(label)
            },

            dataHeader(index) {
                return 'header-' + ((this.headers[index] || '').prop || '').split(' ').join('')
            },

            adjustSizes() {
                const headers = this.headers


                // console

                each(headers, (header, index) => {
                    const key = this.dataHeader(index), columns = $(`[data-header=${key}]`),
                        maxSize = max(map(columns, column => $(column).outerWidth())),
                        maxHeight = max(map(columns, column => $(column).outerHeight()))
                    columns.css('width', `${maxSize}px`).css('height', `${maxHeight}px`)
                })
            },

            sort(header) {
                if (this.isSortable(header.prop)) {
                    this.sortedReverse = !this.sortedReverse
                    this.sortedBy = header.prop

                    let data = sortBy(this.tableData, this.sortedBy)
                    if (this.sortedReverse)
                        this.data = data.reverse()
                    else this.data = data

                    this.render(false)
                }
            },

            isSortable(prop) {
                return Array.isArray(this.sortable) && this.sortable.includes(prop)
            },

            onMountedColumn() {
                if (this.mounted++ === this.rows.length)
                    this.adjustSizes()
            },

            onDblClick(row) {
                if (this.selectable)
                    this.$emit('selected', map(row, col => col.item)[0] || null)
            }
        }

    }
</script>

<style scoped>
    .ssf__table-nowrap {
        white-space: nowrap;
    }

    .ssf__table {
        overflow-x: auto;
    }

    .ssf__table.ssf__table-border .ssf__table--column {
        border-bottom: 1px solid #f2f2f2;
    }

    .ssf__table--column.no-border {
        border-bottom: none !important;
    }

    .ssf__table .ssf__table-row.selectable {
        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>
