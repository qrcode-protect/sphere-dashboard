<template>
    <div :class="colClass" :style="colStyle">
        <slot/>
    </div>
</template>

<script>
    import { isNumber } from "lodash";

    export default {
        name: "x-col",

        props: {
            size: { type: [ Number, String ], required: false },
            xs  : { type: [ Number, String ], required: false },
            sm  : { type: [ Number, String ], required: false },
            md  : { type: [ Number, String ], required: false },
            lg  : { type: [ Number, String ], required: false },
            xl  : { type: [ Number, String ], required: false },

            maxWidth: { type: [ Number, String ], required: false },

            noPadding: { type: Boolean, default: false },
            center   : { type: Boolean, default: false }
        },

        computed: {
            colClass() {
                let classes = '';
                if (this.xs || this.size) classes = classes.trim() + ` col-${this.xs || this.size}`;
                if (this.sm) classes = classes.trim() + ` col-sm-${this.sm}`;
                if (this.md) classes = classes.trim() + ` col-md-${this.md}`;
                if (this.lg) classes = classes.trim() + ` col-lg-${this.lg}`;
                if (this.xl) classes = classes.trim() + ` col-xl-${this.xl}`;

                if (this.noPadding) classes = classes.trim() + ` px-0`;

                if (!classes.includes('col')) {
                    classes = `col ${classes}`
                }

                if (this.center) {
                    classes = `${classes} mx-auto`
                }

                return classes.split(' ').filter(item => item.trim() !== '').join(' ')
            },

            colStyle() {
                const maxWidth = this.maxWidth ? (isNumber(parseInt(this.maxWidth)) ? parseInt(this.maxWidth) + 'px' : this.maxWidth) : null
                return maxWidth ? { 'max-width': maxWidth, 'flex': `0 0 ${maxWidth}` } : null
            }
        }
    }
</script>

<style scoped>

</style>
