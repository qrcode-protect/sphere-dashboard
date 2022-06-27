<template>
    <div :class="cssClass">
        <slot/>
    </div>
</template>

<script>
    import { defineComponent } from "vue";

    export default defineComponent({
        name: "ssf-container",

        props: {
            fluid    : { type: Boolean, required: false },
            container: { type: Boolean, required: false },
            name     : { type: String, required: false },
            notFull  : { type: Boolean, required: false, default: false },
            noPadding: { type: Boolean, default: false },
            center   : { type: Boolean, default: false },
            relative : { type: Boolean, default: false },
            fullFlex : { type: Boolean, default: false },
            type     : {
                type     : String,
                validator: (value) => [ 'block', 'inline', 'inline-block', 'flex' ].includes(value)
            }
        },

        computed: {
            cssClass() {
                let classes = {
                    'container-fluid'  : this.fluid,
                    container          : this.container,
                    'w-100'            : !this.notFull,
                    'mx-auto'          : this.center,
                    'px-0'             : this.noPadding,
                    'position-relative': this.relative,
                    'full-flex'        : this.fullFlex,
                }

                if (this.name) {
                    classes[`ssf__section--${this.name}`] = true
                    classes[this.name] = true
                }

                /*if (this.notFull === false)
                 classes['w-100'] = true*/

                if (this.type)
                    classes[`d-${this.type}`] = true

                return classes
            }
        }
    })
</script>

<style scoped>

</style>
