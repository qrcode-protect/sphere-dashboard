<template>
    <ssf-container v-if="load" id="formLoad" class="section--form-loader full-flex">
        <ssf-loader :color-primary="colors.secondary" class="mx-auto" ripple/>
    </ssf-container>
</template>

<script>


    import { defineComponent, onMounted, reactive } from "vue";

    export default defineComponent({
        name: "form-load",

        components: {},

        setup() {
            const colors = reactive({
                primary  : '#FBAC4C',
                secondary: '#D0427D',
                ternary  : '#7EC5C2',
            })

            onMounted(() => {

                // init colors
                (() => {
                    const root = $(':root')
                    colors.primary = root.css('--color-1')
                    colors.secondary = root.css('--color-2')
                    colors.ternary = root.css('--color-4')
                })()

            })

            return {
                colors
            }

        },

        computed: {
            load() {
                return this.$store.getters.loading
            }
        },
    })
</script>

<style scoped>

    #formLoad {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .3);
        z-index: 2050;
    }

</style>
