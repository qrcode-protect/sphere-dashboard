<template>
    <ssf-container name="table-activity-header">

        <ssf-row>

            <ssf-col v-for="key in keys"
                     :class="{'cursor-pointer': key.action, 'text-right': key.right}"
                     :size="key.colSize"
                     class="font-weight-bold color-2 py-4"
                     @click="handleAction(key.action)">

                <ssf-icon v-if="key.icon" :icon="key.icon"/>

                <ssf-text>{{ key.title }}</ssf-text>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue"

    interface TableActivityKeys {
        icon?: string,
        title?: string,
        action?: Function,
        right?: boolean,
        colSize: string | number
    }

    export default defineComponent({
        name: "table-activity-header",

        emits: [ 'create-activity' ],

        props: {
            indexCol : { type: [ String, Number ], required: true },
            nameCol  : { type: [ String, Number ], required: true },
            actionCol: { type: [ String, Number ], required: true },
        },

        setup(props, { emit }) {
            const createNewActivity = () => emit('create-activity')
            const handleAction = (callable?: Function) => callable ? callable() : null
            const keys = ref<TableActivityKeys[]>([
                { icon: "hashtag", colSize: props.indexCol },
                { title: "Activité", colSize: props.nameCol },
                { icon: "plus-circle", action: createNewActivity, right: true, colSize: props.actionCol },
            ])

            return {
                keys,
                handleAction
            }
        },

    })
</script>

<style lang="scss" scoped>

</style>
