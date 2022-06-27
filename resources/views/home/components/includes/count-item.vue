<template>
    <ssf-container class="bg-white p-3 rounded z-depth-1 mt-3 mx-auto" name="count-item" not-full>

        <ssf-container class="text-center">
            <ssf-title v-if="countValue" class="font-weight-light text-uppercase" h2>
                <ssf-text>{{ countValue }}</ssf-text>
            </ssf-title>
            <ssf-loader v-else class="mx-auto count-item-loader" double size="38px" stroke="1px"/>
        </ssf-container>

        <hr/>

        <ssf-container class="text-center">
            <ssf-text class="font-weight-light text-uppercase h4-responsive">{{ label }}</ssf-text>
        </ssf-container>

    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, PropType } from "vue"
    import { number }                              from "@app/vue/utils/helpers";
    import { Nullable }                            from "../../../../../types/nullable";

    export default defineComponent({
        name: "count-item",

        props: {
            count: { type: [ String, Number, null ] as PropType<Nullable<string | number>>, required: true },
            label: { type: String, required: true },
        },

        setup(props) {
            ////////// init

            const countValue = computed(() => props.count !== null ? number.pretty(props.count) : null)

            return {
                countValue
            }
        }
    })
</script>

<style lang="scss" scoped>

    .ssf__section--count-item {

        width: 230px;
        max-width: 100%;

        .count-item-loader {
            &:before,
            &:after {
                border-bottom-color: var(--color-2);
            }
        }
    }

</style>
