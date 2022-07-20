<script lang="ts">
    import { defineComponent, h } from "vue"

    export default defineComponent({
        name: "ssf-text",

        props: {
            tag    : { type: String, required: false, default: 'span' },
            'class': { type: String, required: false },
            style  : { type: [ String, Object ], required: false },
        },

        // @ts-ignore
        setup(props, { slots }) {
            return () => [
                // @ts-ignore
                h(props.tag ?? 'span', { 'class': props['class'], style: props.style }, slots.default() ?? ''),
            ]
        },
    })
</script>

<style lang="scss" scoped>

</style>
