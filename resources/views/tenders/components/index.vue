<template>
    <ssf-container name="tenders">

        <page-title title="Bourse aux affaires"/>

        <list-tenders v-if="hasTenders" :tenders="tenders"/>

        <ssf-container v-else>

            <ssf-text class="secondary-item">
                Aucun appel d'offre
            </ssf-text>

        </ssf-container>

<!--        <router-link :to="{name: 'partners.create'}" class="btn-create-tender">
            <ssf-shape size="75"  circle class="bg-color-2 full-flex text-white z-depth-1">
                <ssf-icon icon="layer-plus" size="2x" light/>
            </ssf-shape>
        </router-link>-->

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import { useMeta }    from "vue-meta";
    import { useTenders } from "@app/modules/tender/tender-module";
    import ListTenders    from "@/views/tenders/components/includes/list-tenders/list-tenders.vue";
    import PageTitle                      from "@/components/commons/partials/page-title.vue";

    export default defineComponent({
        name: "tenders-index",

        components: { PageTitle, ListTenders },

        setup() {
            ////////// init
            useMeta({ title: 'Bourse aux affaires', })


            const { hasTenders, tenders, fetchAllTenders } = useTenders()


            onMounted(() => fetchAllTenders())

            return {
                //// tender module
                tenders,
                hasTenders
            }
        },
    })
</script>

<style lang="scss" scoped>

    .ssf__section--tenders {

        .btn-create-tender {
            position: fixed;
            right: 20px;
            bottom: 20px;
        }

    }

</style>
