<template>
    <ssf-pagination :click-handler="onPageClick"
                    :first-button-text="icon('first')"
                    :last-button-text="icon('last')"
                    :margin-pages="Math.min(count, 10)"
                    :next-text="icon('next')"
                    :page-count="count"
                    :prev-text="icon('prev')"
                    active-class="active-page"
                    container-class="filein-pagination pl-0"
                    first-last-button
                    next-class="d-inline-block"
                    next-link-class="filein-pagination-link"
                    page-class="d-inline-block"
                    page-link-class="filein-pagination-link rounded"
                    prev-class="d-inline-block"
                    prev-link-class="filein-pagination-link"/>
</template>

<script>

    import { defineComponent } from "vue";

    export default defineComponent({
        name: "pagination",

        props: {
            count: { type: [ Number, String ] }
        },

        emits: [ 'navigate' ],

        setup(props, { emit }) {

            ////////// methods
            const icon = (button) => `<i class="far fa-chevron-${button === 'first' ? 'double-left' : button === 'prev' ? 'left' : button === 'last' ? 'double-right' : 'right'}"/>`


            ////////// handlers
            const onPageClick = (page) => emit('navigate', page)


            return {
                // methods
                icon,

                // handlers
                onPageClick
            }

        },
    })
</script>

<style lang="scss">

    .filein-pagination {
        .filein-pagination-link {
            height: 35px;
            width: 35px;
            text-decoration: none;
            border-radius: .25rem !important;
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            padding: .5rem !important;

            &:hover, &:focus, &:visited {
                outline: none !important;
            }

            &:hover {
                text-decoration: none;
                background-color: #f2f2f2 !important;
            }
        }

        .active-page .filein-pagination-link {
            background-color: #222;
            color: #fff
        }
    }

</style>
