<template>

    <ssf-container name="member-create">

        <ssf-row class="pt-5">

            <ssf-col size="12" class="text-center">

                <h3>Ajouter un nouvel adhérent</h3>

            </ssf-col>

        </ssf-row>

        <form-create-member/>

    </ssf-container>

</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import FormCreateMember    from "@/views/members/components/includes/form-create/form-create-member.vue";
    import { useMeta }         from "vue-meta";

    export default defineComponent({
        name      : "create",
        components: { FormCreateMember },
        setup() {
            ////////// init
            useMeta({ title: 'Partenaires - Ajouter', })

            ////////// data

            ////////// computed

            ////////// methods
        }

    })
</script>

<style lang="scss" scoped>

</style>
