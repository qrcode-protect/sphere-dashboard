<template>
    <ssf-container name="users">

        <ssf-container>

            <vue-custom-scrollbar
                :options="{wheelPropagation: true, suppressScrollX: false}"
                style="padding-bottom: 105px">


                <ssf-container name="users-add-button" class="text-right">

                    <button class="btn pr-2" @click="modals.dataInformation.open = true">
                        Ajouter un utilisateur <ssf-icon icon="user-plus" light size="sm"/>
                    </button>

                </ssf-container>


                <ssf-container name="users-table-container">
                    <table class="table">

                        <thead>

                            <tr>

                                <th v-for="column in columnDefs" :class="{'text-center': column.center}">
                                    {{ column.label }}
                                </th>

                            </tr>

                        </thead>

                        <tbody v-if="users">

                            <table-user-row v-for="user in users" :roles="roles" :user="user" @destroyed="onCreated"/>

                        </tbody>

                    </table>
                </ssf-container>

            </vue-custom-scrollbar>

        </ssf-container>

        <modal-create-user v-if="modals.dataInformation.open"
                           :files="modals.dataInformation.props.files"
                           :modal-name="modals.dataInformation.name"
                           :open="modals.dataInformation.open"
                           @close="onDataInformationClose"
                           @created="onCreated"/>

    </ssf-container>
</template>


<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<script lang="ts">
    import { computed, defineComponent, onMounted, reactive } from "vue";
    import { useMeta }                                        from "vue-meta";
    import { useStore }                                       from "vuex";

    import { roles as xRoles } from "@app/commons";

    import User         from "@app/modules/user/user";
    import TableUserRow from "@/views/users/components/table-user-row.vue";

    import { PerfectScrollbar as VueCustomScrollbar } from 'vue3-perfect-scrollbar'
    import { filter }                                 from "lodash";
    import { RoleType }                               from "@app/modules/role/role-type";
    import ModalCreateUser                            from "@/views/users/components/modal-create-user.vue";


    export default defineComponent({
        name: "users-index",

        components: {
            ModalCreateUser,
            TableUserRow,
            VueCustomScrollbar,
        },

        setup() {
            ////////// init
            useMeta({ title: 'Utilisateurs', })
            const store = useStore()


            ////////// data
            const modals = reactive({
                dataInformation: {
                    open : false,
                    name : 'modal-create-user',
                    props: {
                        files: null,
                    }
                }
            })

            onMounted(() => fetchUsers())


            ////////// computed
            const users = computed((): User[] | null => store.getters['user/users'])
            const roles = computed(() => filter(xRoles(), role => [ RoleType.marketing, RoleType.user, RoleType.admin ].includes(role.value)).filter(role => role.label = role.label.capitalize()))

            ////////// methods
            const fetchUsers = () => store.dispatch('user/fetchDashboard')
            const onCreated = () => fetchUsers()
            const onDataInformationClose = () => {
                modals.dataInformation.open = false
            }


            return {
                //// data
                modals,

                //// computed
                users,
                roles,

                //// methods
                onDataInformationClose,
                onCreated,
            }
        },

        data: () => ({
            columnDefs: [
                { label: "#" },
                { label: "Rôle" },
                { label: "Nom" },
                { label: "Prénom" },
                { label: "Nom d'utilisateur" },
                { label: "Adresse e-mail" },
                { label: "Actions", center: true },
            ]

        })
    })
</script>

<style lang="scss" scoped>


    /*.table-test {

        color: orange;

    }

    .table-test {
        background-color: #dddddd;
    }*/

</style>
