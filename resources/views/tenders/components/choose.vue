<template>

    <ssf-container name="tender-create-choose" full-flex container>

        <ssf-row>

            <ssf-col v-for="action in actions" max-width="250" center class="mb-2 mb-xl-0">

                <router-link :to="{name: action.route}">

                    <ssf-shape center class="box-item flex-column" size="220">

                        <ssf-container full-flex class="mb-4">

                            <ssf-shape center circle class="border border-color-2 color-2" size="70">

                                <ssf-icon :icon="action.icon" size="2x" duotone/>

                            </ssf-shape>


                        </ssf-container>

                        <ssf-container full-flex class="color-1">

                            <ssf-title class="fa-1x5">{{ action.label }}</ssf-title>

                        </ssf-container>


                    </ssf-shape>


                </router-link>

            </ssf-col>

        </ssf-row>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { useMeta }         from "vue-meta";

    import FormTender from "@/views/tenders/components/includes/form-tender/form-tender.vue";
    import PageTitle         from "@/components/commons/partials/page-title.vue";

    export default defineComponent({
        name      : "tender-create-choose",
        components: { PageTitle, FormTender },
        setup() {
            ////////// init
            useMeta({ title: 'Affaires - Ajouter', })

            ////////// data

            ////////// computed

            ////////// methods
        },

        data: () => ({
            actions: [ {
                label: "Publique",
                route: "tenders.create.public",
                icon : "eye"
            }, {
                label: "Privée",
                route: "tenders.create.private",
                icon : "lock-keyhole"
            } ]
        })

    })
</script>

<style lang="scss" scoped>

    .tender-create-choose {
        min-height: 100vh;
    }

</style>
