<template>
    <hr v-if="isHex" :class="hrClass" :style="{'border-color': hexColor, ...hrStyle}"/>
    <hr v-else :class="`${color ? 'border-'+color : ''} ${hrClass}`" :style="hrStyle"/>
</template>

<script lang="ts">
    import { defineComponent } from "vue"

    export default defineComponent({
        name: "ssf-line",

        props: {
            color    : { type: String, required: false, },
            noMargin : { type: Boolean, required: false },
            thickness: { type: [ Number, String ], required: false, default: 1 },
        },

        computed: {
            isHex() {
                return this.color && this.hexColor && /^#([\dA-F]{3}){1,2}$/i.test(this.hexColor)
            },
            hexColor() {
                return this.color ? `#${this.color}`.replace('##', '#') : null
            },
            hrClass() {
                let classes = '';

                if (this.noMargin) {
                    classes = `${classes} m-0`
                }

                return classes.split(' ').filter(item => item.trim() !== '').join(' ')
            },
            hrStyle() {
                return {
                    'border-width': `${this.thickness}px`
                }
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>
