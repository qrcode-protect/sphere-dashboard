<template>

    <ssf-modal v-model="visible"
               :name="modalName"
               attach="#app"
               body-classes="pt-2 border-0"
               classes="modal-container full-flex modal-departments"
               content-class="modal-content z-depth-1 full-flex rounded"
               fit-parent
               header-classes="pt-4 pb-2 d-block border-0"
               @before-close="$emit('close')"
               lock-scroll
               scrollable>

        <template #header>

            <ssf-container>

                <ssf-container class="modal-header-icon full-flex mx-auto border-color-2" not-full>

                    <ssf-title h5>
                        {{ network.name }}
                    </ssf-title>

                </ssf-container>

            </ssf-container>

            <hr class="w-75 mt-4">

        </template>

        <template #body>

            <ul>

                <li v-for="department in network.departments">

                    <ssf-text class="department-code">{{ department.code }}</ssf-text>
                    <ssf-text class="mx-2">-</ssf-text>
                    <ssf-text>{{ department.name }}</ssf-text>

                </li>

            </ul>


        </template>

    </ssf-modal>

</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"
    import Network                         from "@app/modules/_network/network/network";

    export default defineComponent({
        name : "modal-departments",
        props: {
            modalName: { type: String, required: false, default: 'modal-departments' },
            open     : { type: Boolean, required: false, default: false },
            network  : { type: Network, required: true },
        },

        emits: [ 'close' ],

        setup(props, { emit }) {
            ////////// init

            ////////// data
            const visible = ref(false)

            ////////// computed

            ////////// methods


            watch(() => props.open, () => {
                console.log("change", props)
                return visible.value = props.open;
            }, { immediate: true })

            return {
                //// data
                visible

                //// methods
            }
        }

    })
</script>

<style lang="scss">

    .modal-departments {
        .modal-content {
            width: 500px !important;
        }

        .department-code {
            display: inline-block;
            width: 30px;
            text-align: center;
        }
    }

</style>
