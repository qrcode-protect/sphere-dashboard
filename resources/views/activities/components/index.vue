<template>
    <ssf-container name="activity">

        <page-title title="Domaines d'activités"/>

        <ssf-container v-if="activities" container>

            <ssf-container class="border rounded table-container mx-auto" not-full>

                <!--                <table-activity-header @create-activity="modals.activity.open = true"/>-->

                <table-activity :activities="activities"
                                @create-activity="modals.activity.open = true"
                                @edit-activity="(activity) => onEditActivity(activity)"/>

                <!--                <table class="table table-sm table-striped mb-0 table-activities">

                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom du domaine</th>
                                            <th class="text-center" colspan="2">
                                                <ssf-icon class="cursor-pointer" icon="plus-circle"
                                                          @click="modals.activity.open = true"/>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr v-for="(activity, $idx) in activities">
                                            <td>{{ $idx + 1 }}</td>
                                            <td>{{ activity.label.capitalize() }}</td>
                                            <td class="text-center" colspan="2">
                                                &lt;!&ndash;                                <ssf-icon class="mx-2 cursor-pointer" icon="trash-alt"/>&ndash;&gt;
                                                <ssf-icon class="mx-2 cursor-pointer" icon="pencil" @click="onEditActivity(activity)"/>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>-->

            </ssf-container>

        </ssf-container>

        <modal-activity v-if="modals.activity.open"
                        :activity="modals.activity.props.activity"
                        :modal-name="modals.activity.name"
                        :open="modals.activity.open"
                        @close="onClose"
                        @save="onSave"/>

    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, reactive } from "vue";
    import { useMeta }                                        from "vue-meta";
    import PageTitle                                          from "@/components/commons/partials/page-title.vue";
    import { fetchActivities }                                from "@app/commons/activities";
    import ModalActivity                                      from "@/views/activities/components/modal-activity.vue";
    import Activity                                           from "@app/modules/activity/activity";
    import store                                              from "@app/vue/store";
    import TableActivity
                                                              from "@/views/activities/components/includes/table-activity/table-activity.vue";

    export default defineComponent({
        name: "activity-index",

        components: { TableActivity, ModalActivity, PageTitle },

        setup() {
            ////////// init
            useMeta({ title: "Domaines d'activités", })


            ////////// data
            const modals = reactive({
                activity: {
                    open : false,
                    name : 'modal-activity',
                    props: <{ activity: Activity | null }>{
                        activity: null
                    }
                }
            })


            ////////// computed
            const activities = computed(() => store.getters['activity/activities'])

            onMounted(() => fetch())


            ////////// methods
            const fetch = () => fetchActivities(true)


            return {
                //// data
                modals,

                //// computed
                activities,

                //// methods
                fetch
            }
        },
        methods: {
            onClose() {
                this.modals.activity.open = false
                this.modals.activity.props.activity = null
            },
            onSave() {
                this.onClose()
                this.fetch()
            },
            onEditActivity(activity: Activity) {
                this.modals.activity.props.activity = activity
                this.modals.activity.open = true
            }
        }
    })
</script>

<style lang="scss" scoped>

    .ssf__section--activity {

        .table-container {

            width: 600px;

            .table-activities {
                border-collapse: separate;
                border-spacing: 0;

                tbody tr:last-child {

                    td:first-child {
                        border-bottom-left-radius: var(--border-radius, 50px);
                    }

                    td:last-child {
                        border-bottom-right-radius: var(--border-radius, 50px);
                    }
                }

            }

        }

    }


</style>
