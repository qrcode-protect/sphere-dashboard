<template>
    <tr class="user-item-row">

        <td>
            <ssf-container
                class="cell-item full-flex font-weight-bold"
                not-full>
                <ssf-initial v-if="editMode === false"
                             :content="initials"
                             class="user-initials rounded-circle full-flex"
                             not-full/>

                <ssf-icon v-else icon="save" light size="1x5" @click="save"/>
            </ssf-container>
        </td>

        <td>

            <ssf-container :class="{'edit-mode': editMode}" class="align-flex cell-item">

                <span v-if="editMode === false">{{ roleLabel(user.roleType).capitalize() }}</span>

                <ssf-form-group v-else
                                :name="`user-role-${user.id}`"
                                :option-items="roles"
                                :value="updatable.roleType"
                                option-field="value"
                                option-label="label"
                                row
                                select
                                @update:value="event => updatable.roleType = event"/>
            </ssf-container>
        </td>

        <td>

            <ssf-container :class="{'edit-mode': editMode}" class="align-flex cell-item">

                <span v-if="editMode === false">{{ user.lastname?.capitalize() }}</span>

                <ssf-form-group v-else
                                :name="`user-lastname-${user.id}`"
                                :value="updatable.lastname"
                                row
                                @update:value="event => updatable.lastname = event"/>
            </ssf-container>

        </td>

        <td>

            <ssf-container :class="{'edit-mode': editMode}" class="align-flex cell-item">

                <span v-if="editMode === false">{{ user.firstname?.capitalize() }}</span>

                <ssf-form-group v-else
                                :name="`user-firstname-${user.id}`"
                                :value="updatable.firstname"
                                @update:value="event => updatable.firstname = event"/>
            </ssf-container>

        </td>

        <td>
            <ssf-container class="align-flex cell-item">{{ user.username }}</ssf-container>
        </td>

        <td>
            <ssf-container class="align-flex cell-item">
                <span v-if="editMode === false"><a :href="`mailto:${user.email}`">{{
                        user.email?.toLowerCase()
                    }}</a></span>
                <ssf-form-group v-else
                                :name="`user-email-${user.id}`"
                                :value="updatable.email"
                                @update:value="event => updatable.email = event"/>
            </ssf-container>

        </td>

        <td>


            <ssf-container class="full-flex cell-item">


                <ssf-dropdown :allow-click-outside="false"
                              :show-content="showDropdownContent"
                              body-class="text-center cursor-pointer">

                    <template #dropdown-button>
                        <ssf-icon icon="gear" thin/>
                    </template>

                    <template #dropdown-content>
                        <ul class="pl-0 mb-0">

                            <li v-for="(action, $idx) in actions" class="ssf-dropdown-item px-2 cursor-pointer"
                                @click.prevent="action.method">
                                <ssf-icon :icon="action.icon" fw light/>

                                <ssf-dropdown v-if="action.children"

                                              class="d-inline-block">

                                    <template #dropdown-button>
                                        <span class="text-center ml-2">
                                            {{ action.label }}
                                        </span>
                                    </template>

                                    <template #dropdown-content>

                                        <ssf-form-group :name="`user-role-${user.id}`"
                                                        :option-items="roles"
                                                        option-field="value"
                                                        option-label="label" select/>

                                    </template>

                                </ssf-dropdown>

                                <span v-else class="ml-2">{{ action.label }}</span>
                            </li>

                        </ul>
                    </template>

                </ssf-dropdown>
            </ssf-container>

        </td>

    </tr>
</template>

<script lang="ts">

    import { computed, defineComponent, reactive, ref } from "vue";
    import User                                         from "@app/modules/user/user";
    import { roleLabel }                                from "@app/modules/role/role-type";
    import SsfDropdown                                  from "@/components/commons/ssf-dropdown.vue";
    // @ts-ignore
    import MainError                                    from "@app/vue/utils/swal/errors/main-error.js";

    const genRanHex = (size: number = 6) => [ ...Array(size) ].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


    export default defineComponent({
        name      : "table-user-row",
        components: { SsfDropdown },
        props     : {
            user : { type: User, required: true },
            roles: { type: Array, required: true },
        },

        emits: [ 'destroyed' ],

        setup(props, { emit }) {
            ////////// computed
            const initials = computed((): string => (props.user.lastname && props.user.firstname ? `${props.user.lastname![0]}${props.user.firstname![0]}` : 'nd').toUpperCase())


            ////////// methods
            const closeDropdownContent = async () => {
                showDropdownContent.value = true
                await setTimeout(() => showDropdownContent.value = false, 100)
                updateActions()
            }
            const toggleActive = () => (props.user.active ? props.user.disable() : props.user.enable()).then(() => {
                closeDropdownContent()
                return props.user.active = !props.user.active;
            })
            const forgotPassword = () => (props.user.forgotPassword(props.user.email)).then(() => closeDropdownContent())
            const destroy = () => props.user.destroy().then(() => {
                closeDropdownContent()
                return emit('destroyed', props.user.id);
            })
            const toggleEditMode = (show: boolean = true) => {
                closeDropdownContent()
                return editMode.value = !editMode.value;
            }
            const save = () => (props.user.update(props.user.id, updatable)).then(() => {
                props.user.roleType = updatable.roleType
                props.user.firstname = updatable.firstname
                props.user.lastname = updatable.lastname
                props.user.email = updatable.email
                editMode.value = false
                updateActions()
            })
                .catch((e) => {
                    return MainError.fire({ text: e?.message ?? e?.error ?? e.response?.message ?? 'Merci de réessayer plus tard' });
                })
            const updateActions = () => actions.value = actionsList()
            const actionsList = () => [
                {
                    method: toggleActive,
                    label : props.user.active ? 'Désactiver' : 'Activer',
                    icon  : props.user.active ? 'toggle-on' : 'toggle-off',
                },
                {
                    method: destroy,
                    label : 'Supprimer',
                    icon  : 'trash-can-list'
                },
                {
                    method: toggleEditMode,
                    label : editMode.value ? 'Annuler les modifications' : 'Modifier',
                    icon  : 'user-pen',
                },
                {
                    method: forgotPassword,
                    label : 'Réinitialiser le mot de passe',
                    icon  : 'lock-keyhole',
                },
            ]

            ////////// data
            const showDropdownContent = ref<boolean>(false)
            const editMode = ref<boolean>(false)
            const updatable = reactive({
                roleType     : props.user.roleType,
                firstname: props.user.firstname,
                lastname : props.user.lastname,
                email    : props.user.email,

            })

            const actions = ref(actionsList())

            return {
                //// data
                actions,
                showDropdownContent,
                editMode,
                updatable,

                //// computed
                initials,

                //// methods
                genRanHex,
                toggleActive,
                roleLabel,
                save
            }
        },

    })
</script>

<style lang="scss">

    .user-item-row {


        .cell-item {
            min-height: 35px;

            &.edit-mode {
                min-width: 200px;
            }
        }

        .user-initials {
            width: 40px;
            height: 40px;
            //background-color: #0b51c5;
        }

        .action-toggle {
            &:after {
                content: none !important;
            }
        }


        [data-initial='A'] {
            background-color: rgba(255, 253, 0, .3);
            color: orange;
        }

        .own-dropdown-content {
            right: 0 !important;
            left: inherit !important;
        }

    }

</style>
