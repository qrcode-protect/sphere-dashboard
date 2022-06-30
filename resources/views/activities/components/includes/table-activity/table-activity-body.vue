<template>
    <ssf-container name="table-activity-body">

        <table-activity-row v-for="(activity, $idx) in activities"
                            :key="key(activity)"
                            :action-col="actionCol"
                            :activity="activity"
                            :index="$idx"
                            :index-col="indexCol"
                            @edit-activity="(activity) => $emit('edit-activity', activity)"
                            :name-col="nameCol"/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue"
    import Activity                      from "@app/modules/activity/activity";
    import TableActivityRow
                                         from "@/views/activities/components/includes/table-activity/table-activity-row.vue";
    import { key }                       from "@app/vue/utils";

    interface TableActivityKeys {
        icon?: string,
        title?: string,
        action?: Function,
        right?: boolean
    }

    export default defineComponent({
        name      : "table-activity-body",
        components: { TableActivityRow },
        emits     : [ 'edit-activity' ],

        props: {
            activities: { type: Array as PropType<Activity[]>, required: true },
            indexCol  : { type: [ String, Number ], required: true },
            nameCol   : { type: [ String, Number ], required: true },
            actionCol : { type: [ String, Number ], required: true },
        },

        setup(_, { emit }) {

            return {
                key
            }
        },

    })
</script>

<style lang="scss" scoped>

</style>
