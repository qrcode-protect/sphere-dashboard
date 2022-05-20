<template>

    <ssf-container class="position-relative" name="own-dropdown" not-full>

        <ssf-container :class="bodyClass" name="own-dropdown-button" not-full @click="toggleVisible">
            <slot name="dropdown-button"/>
        </ssf-container>

        <ssf-container v-if="visible"
                       :class="`${visible ? 'show' : ''} ${contentClass}`"
                       class="position-absolute"
                       name="own-dropdown-content"
                       not-full>
            <slot name="dropdown-content"/>
        </ssf-container>

    </ssf-container>

</template>

<script lang="ts">

    import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";

    export default defineComponent({
        name: "ssf-dropdown",

        props: {
            contentClass     : { type: String, required: false },
            bodyClass        : { type: String, required: false },
            allowClickOutside: { type: Boolean, required: false, default: false },
            showContent      : { type: Boolean, required: false, default: false }
        },

        setup(props) {

            const visible = ref<boolean>(false)
            const toggled = ref<boolean>(false)

            const onClickOutside = (event: any) => {
                if (toggled.value === false) {
                    if (props.allowClickOutside && visible.value === true) {
                        visible.value = false
                    }
                }
            }

            onMounted(() => {
                window.addEventListener('click', onClickOutside);
            })

            onBeforeUnmount(() => {
                window.removeEventListener('click', onClickOutside);
            })

            watch(() => props.showContent, () => visible.value = props.showContent, { immediate: true })

            return {
                visible,
                toggled
            }

        },

        methods: {

            toggleVisible() {
                this.toggled = true
                this.visible = !this.visible
                setTimeout(() => this.toggled = false, 500)
            }

        }
    })
</script>

<style lang="scss">

    .ssf__section--own-dropdown.own-dropdown {

        .ssf__section--own-dropdown-content.own-dropdown-content {
            background-color: #FFFFFF;
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 1000;
            display: none;
            float: left;
            min-width: 10rem;
            padding: 0.5rem 0;
            margin: 0.125rem 0 0;
            font-size: 1rem;
            color: #212529;
            text-align: left;
            list-style: none;
            background-clip: padding-box;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 0.25rem;

            &.show {
                display: block !important;
            }

            .ssf-dropdown-item {
                display: block;
                width: 100%;
                padding: 0.25rem 1.5rem;
                clear: both;
                font-weight: 400;
                color: #212529;
                text-align: inherit;
                white-space: nowrap;
                background-color: transparent;
                border: 0;
            }
        }

    }

</style>
