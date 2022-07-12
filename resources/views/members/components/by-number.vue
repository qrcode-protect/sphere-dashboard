<template>
    <ssf-container name="members">

        <ssf-container fluid>

            <page-title :title="pageTitle"/>


            <active-members by-number/>
        </ssf-container>

    </ssf-container>
</template>

<script>
    import { computed, defineComponent } from "vue";
    import { useMeta }                   from "vue-meta";
    import ActiveMembers                 from "@/views/members/components/includes/active-members";
    import InactiveMembers               from "@/views/members/components/includes/inactive-members";
    import ActivePremiumMembers          from "@/views/members/components/includes/active-premium-members";
    import PageTitle                     from "@/components/commons/partials/page-title";
    import { useRoute }                  from "vue-router";

    export default defineComponent({
        name: "members-index",

        components: { PageTitle, ActivePremiumMembers, InactiveMembers, ActiveMembers },

        setup() {
            ////////// init
            useMeta({ title: 'Adhérents' })


            const memberNumber = computed(() => (useRoute()).params.memberNumber)

            return {
                pageTitle: computed(() => `Adhérent : n°${memberNumber.value}`),
            }
        },


    })
</script>

<style lang="scss" scoped>

    .ssf__section--members {

    }

</style>
