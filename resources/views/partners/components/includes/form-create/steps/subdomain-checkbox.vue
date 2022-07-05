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
    import { computed, defineComponent, reactive, toRefs, watch } from "vue"
    import Activity                                               from "@app/modules/activity/activity";


    export default defineComponent({
        name: "subdomain-checkbox",


        props: {
            activity: { type: Activity, required: true },
            selected: { type: Boolean, required: false, default: false },
        },

        emits: [ 'select', 'unselect' ],

        setup(props, { emit }) {
            ////////// init

            const { selected, toggleSelected, setSelected } = (() => {
                const state = reactive({
                    selected: false
                })

                const setSelected = (value: boolean) => {
                    state.selected = value;
                    emit(state.selected ? 'select' : 'unselect', props.activity.id)
                }

                return {
                    ...toRefs(state),
                    toggleSelected: () => setSelected(!state.selected),
                    setSelected
                }
            })()

            const isSelected = computed(() => props.selected === true && selected.value)

            watch(() => props.selected, () => setSelected(props.selected === true), { immediate: true })

            return {
                isSelected,
                toggleSelected
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>
