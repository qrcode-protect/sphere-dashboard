<template>
    <ssf-container name="members">

        <page-title title="Adhérents"/>

        <ssf-container class="member-nav-tabs" not-full>

            <ssf-row class="px-3">

                <ssf-col v-for="tab in tabs"
                         :class="{'border-bottom border-strong border-color-1': tab.tabIndex === currentTab}"
                         class="member-nav-tab-item py-3 cursor-pointer"
                         @click="onTabChange(tab.tabIndex)">

                    <ssf-row>

                        <ssf-col no-padding>

                            <span class="d-inline-block">{{ tab.title }}</span>

                        </ssf-col>

                        <ssf-col no-padding max-width="20">

                            <ssf-shape v-if="tab.count && tab.count > 0"
                                       center
                                       circle
                                       class="small bg-danger text-white d-inline-block"
                                       size="20">
                                {{ tab.count }}
                            </ssf-shape>

                        </ssf-col>

                    </ssf-row>


                </ssf-col>

            </ssf-row>

        </ssf-container>

        <ssf-container fluid>
            <active-members v-if="currentTab === 1"/>
            <inactive-members v-if="currentTab === 2"/>
            <active-premium-members v-if="currentTab === 3"/>
        </ssf-container>

        <router-link :to="{name: 'members.create'}" class="btn-create-member">
            <ssf-shape circle class="bg-color-2 full-flex text-white z-depth-1" size="75">
                <ssf-icon icon="layer-plus" light size="2x"/>
            </ssf-shape>
        </router-link>

    </ssf-container>
</template>

<script>
    import { defineComponent, ref } from "vue";
    import { useMeta }              from "vue-meta";
    import ActiveMembers            from "@/views/members/components/includes/active-members";
    import InactiveMembers          from "@/views/members/components/includes/inactive-members";
    import ActivePremiumMembers     from "@/views/members/components/includes/active-premium-members";
    import PageTitle                from "@/components/commons/partials/page-title";
    import { useFirebaseMember }    from "@app/modules/firebase/member/firebase-member-module";

    export default defineComponent({
        name: "members-index",

        components: { PageTitle, ActivePremiumMembers, InactiveMembers, ActiveMembers },

        setup() {
            ////////// init
            useMeta({ title: 'Adhérents' })


            ////////// data
            const currentTab = ref(1)


            ////////// computed


            ////////// methods
            const onTabChange = (tabItem) => currentTab.value = tabItem


            const { inactiveMembersCount } = useFirebaseMember()

            return {
                //// data
                currentTab,
                tabs: [
                    {
                        title   : "Adhérents actifs",
                        tabIndex: 1,
                        count   : null
                    }, {
                        title   : "En attente de validation",
                        tabIndex: 2,
                        count   : inactiveMembersCount
                    }, {
                        title   : "Premium",
                        tabIndex: 3,
                        count   : null
                    }
                ],

                //// computed

                //// methods
                onTabChange,

            }
        },
    })
</script>

<style lang="scss" scoped>

    .ssf__section--members {

        .member-nav-tabs {
            width: 710px;
            max-width: 100%;
        }

        .btn-create-member {
            position: fixed;
            right: 20px;
            bottom: 20px;
        }

    }

</style>
