<template>
    <ssf-container :class="{'bg-color-2 text-white': isSelected}"
                   class="box-item px-2 cursor-pointer"
                   name="subdomain-checkbox"
                   not-full
                   @click="toggleSelected">
        {{ activity.label }}
    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, reactive, toRefs } from "vue"
    import Activity                                        from "@app/modules/activity/activity";


    export default defineComponent({
        name: "subdomain-checkbox",


        props: {
            activity: { type: Activity, required: true },
            selected: { type: Boolean, required: false, default: false },
        },

        emits: [ 'select', 'unselect' ],

        setup(props, { emit }) {
            ////////// init

            const { selected, toggleSelected } = (() => {
                const state = reactive({
                    selected: false
                })

                return {
                    ...toRefs(state),
                    toggleSelected: () => {
                        state.selected = !state.selected;
                        emit(state.selected ? 'select' : 'unselect', props.activity.id)
                    }
                }
            })()

            const isSelected =  computed(() => props.selected === true && selected.value)

            return {
                isSelected,
                toggleSelected
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>
