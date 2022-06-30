<template>
    <ssf-container name="table-activity">

        <table-activity-header :action-col="actionCol" :index-col="indexCol" :name-col="nameCol"
                               @create-activity="$emit('create-activity')"/>

        <table-activity-body :action-col="actionCol" :activities="activities" :index-col="indexCol" :name-col="nameCol"
                             @edit-activity="(activity) => $emit('edit-activity', activity)"/>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, PropType } from "vue"
    import TableActivityHeader
                                         from "@/views/activities/components/includes/table-activity/table-activity-header.vue";
    import TableActivityBody
                                         from "@/views/activities/components/includes/table-activity/table-activity-body.vue";
    import Activity                      from "@app/modules/activity/activity";

    export default defineComponent({
        name: "table-activity",

        components: { TableActivityBody, TableActivityHeader },

        props: {
            activities: { type: Array as PropType<Activity[]>, required: true },
            indexCol  : { type: [ String, Number ], required: false, default: 2 },
            nameCol   : { type: [ String, Number ], required: false, default: 6 },
            actionCol : { type: [ String, Number ], required: false, default: 4 },
        },

        emits: [ 'create-activity', 'edit-activity' ],

        setup() {
            ////////// init

            return {}
        }
    })
</script>

<style lang="scss" scoped>

</style>
