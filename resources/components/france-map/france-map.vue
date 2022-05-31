<template>

    <ssf-container name="france-map">

        <france-svg @selected="event => $emit('selected', event)"/>

    </ssf-container>

</template>

<script>
    import { defineComponent, reactive, ref } from "vue"
    import FranceSvg                          from "@/components/france-map/france-svg";

    export default defineComponent({
        name      : "france-map",
        components: { FranceSvg },

        emits: [ 'selected' ],

        setup() {
            ////////// init

            ////////// data
            const areasItems = reactive([])
            const canvasItem = ref()

            ////////// computed

            ////////// methods

            // onMounted(async () => {
            //     await nextTick()
            //
            //     $(function() {
            //         const map = $('#map');
            //         const paths = map.find('path');
            //
            //         console.log(paths)
            //
            //         paths.each(path => {
            //             $(document).on('click', $(path).attr('data-num'), function (e) {
            //                 console.log($(e.target).attr('data-num'));
            //             })
            //         })
            //
            //         /*for (var i = 0; i < paths.length; i++) {
            //             $(document).on('click', paths[i].attr('data-num'), function (e) {
            //                 console.log("Dpt: " + this.attr('data-num'));
            //             })
            //             /!*paths[i].addEventListener("click", function (e) {
            //              console.log("Dpt: " + e.attr('data-num'));
            //              })*!/
            //         }*/
            //     })
            // })


            return {
                areas: areasItems,
                canvasItem
            }
        },


        methods: {}
    })
</script>

<style lang="scss">

    .france-map {

        #map {
            max-width: 100%;
            max-height: 100%;
        }

        #map path {
            fill: var(--color-1);
            stroke: #FFFFFF;
            stroke-width: 0.6;
            transition: fill 0.2s, stroke 0.3s;
            transform: scale(5);
        }

        #map path:hover {
            fill: var(--color-2);
            stroke: var(--color-2);
        }

        #map .separator {
            stroke: #ccc;
            fill: none;
            stroke-width: 1.5;
        }

        #map .separator:hover {
            stroke: #ccc;
            fill: none;
        }
    }

</style>
