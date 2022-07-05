<template>
    <ssf-container :class="{'border-top': !isSubActivity}" class="py-3" name="table-activity-row">

        <ssf-row>

            <ssf-col v-if="!isSubActivity" :size="indexCol" class="font-weight-semi-bold color-2">

                {{ itemIndex }}

            </ssf-col>

            <ssf-col :size="nameCol">

                {{ activity.label.capitalize() }}

            </ssf-col>

            <ssf-col :size="actionCol" class="text-right" v-if="!isSubActivity">

                <ssf-icon class="mx-2 cursor-pointer" icon="pencil" @click="editActivity"/>

                <ssf-icon :icon="`chevron-${showSubActivities ? 'up' : 'down'}`" class="mx-2 cursor-pointer"
                          @click="toggleSubActivities"/>

            </ssf-col>

        </ssf-row>

        <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">

            <ssf-row v-if="hasSubActivities && showSubActivities" class="px-3 font-italic">
                <table-activity-row v-for="(subActivity, $idx) in activity.activities"
                                    :action-col="actionCol"
                                    :activity="subActivity"
                                    :index="$idx"
                                    :index-col="indexCol"
                                    :name-col="12"
                                    is-sub-activity/>
            </ssf-row>

        </transition>


    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, ref } from "vue"
    import Activity                           from "@app/modules/activity/activity";

    interface TableActivityKeys {
        icon?: string,
        title?: string,
        action?: Function,
        right?: boolean
    }

    export default defineComponent({

        name: "table-activity-row",

        components: {},

        props: {
            activity     : { type: Activity, required: true },
            index        : { type: Number, required: true },
            indexCol     : { type: [ String, Number ], required: true },
            nameCol      : { type: [ String, Number ], required: true },
            actionCol    : { type: [ String, Number ], required: true },
            isSubActivity: { type: Boolean, required: false, default: false },
        },

        emits: [ 'edit-activity' ],

        setup(props, { emit }) {
            const showSubActivities = ref<boolean>(false)
            const hasSubActivities = computed(() => props.activity && props.activity.activities && props.activity.activities.length)
            const toggleSubActivities = () => showSubActivities.value = !showSubActivities.value

            const itemIndex = computed(() => props.index + 1)

            return {
                showSubActivities,
                toggleSubActivities,
                hasSubActivities,

                itemIndex,
                editActivity: () => emit('edit-activity', props.activity)
            }
        },

    })
</script>

<style lang="scss" scoped>

    .table-activity-row {
        transition: height .5s;
        overflow: hidden;
    }

</style>
