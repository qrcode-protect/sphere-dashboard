<template>
    <ssf-container class="box-item px-3" name="list-tender-item" relative>

        <ssf-container class="py-2" name="list-tender-header">

            <ssf-container class="pr-3" relative>

                <ssf-container class="left-absolute h-100 bg-color-2" not-full style="width: 2px"/>

                <ssf-col size="12">

                    <ssf-title>{{ tender.title }}</ssf-title>

                </ssf-col>

                <ssf-container class="right-absolute full-flex" not-full>

                    <vue-popper :interactive="false" arrow zIndex="1050">

                        <ssf-shape size="25" class="cursor-pointer">
                            <ssf-icon icon="ellipsis-vertical"/>
                        </ssf-shape>

                        <template #content>

                            <ul class="pl-0 mb-0">

                                <li v-for="(action) in actions"
                                    class="action-item p-2 cursor-pointer rounded"
                                    @click.prevent="action.method">
                                    <ssf-icon :icon="action.icon" fw light/>

                                    <span class="ml-2">{{ action.label }}</span>
                                </li>

                            </ul>

                        </template>

                    </vue-popper>

                    <ssf-shape size="25" class="cursor-pointer" @click="toggleFull">

                        <ssf-icon :icon="`angle-${full ? 'up' : 'down'}`"/>

                    </ssf-shape>


                </ssf-container>

            </ssf-container>

        </ssf-container>

        <ssf-container name="list-tender-body">

            <ssf-container class="p-3 border-top">

                <ssf-row>

                    <ssf-col class="justify-flex flex-column" size="6">

                        Montant maximal : {{ amount }}

                    </ssf-col>

                    <ssf-col class="font-italic" size="6">

                        <ssf-container>
                            Date de <span class="font-weight-bold">publication</span> : {{ publishedAt }}
                        </ssf-container>

                        <ssf-container v-if="expiresAt">
                            Date d'<span class="font-weight-bold">expiration</span> : {{ expiresAt }}
                        </ssf-container>

                    </ssf-col>

                </ssf-row>

            </ssf-container>

            <ssf-container v-if="full" class="px-3 py-2 border-top">

                <ssf-row>

                    <ssf-col class="font-italic" size="6">

                        <ssf-container>
                            Date de <span class="font-weight-bold">début</span> : {{ beginAt }}
                        </ssf-container>

                    </ssf-col>

                    <ssf-col class="font-italic ml-auto" size="6">

                        <ssf-container>
                            Date de <span class="font-weight-bold">fin</span> : {{ endAt }}
                        </ssf-container>


                    </ssf-col>

                </ssf-row>

            </ssf-container>

            <ssf-container class="px-3 py-2 border-top">

                <ssf-row>

                    <ssf-col size="12">

                        <ssf-title h6>Description</ssf-title>

                        <ssf-container v-if="full">
                            <p>{{ tender.description }}</p>
                        </ssf-container>

                        <ssf-container v-else>
                            <p>{{ shortDescription }}...</p>
                        </ssf-container>

                    </ssf-col>


                </ssf-row>

            </ssf-container>

        </ssf-container>

        <ssf-container class="border-top" name="list-tender-footer">

            <ssf-container class="px-3 py-2">

                <ssf-col size="12">

                    <ssf-row>

                        <ssf-col max-width="30" no-padding>

                            <ssf-icon icon="location-dot" size="sm" thin/>

                        </ssf-col>

                        <ssf-col no-padding>
                            <span v-if="full">
                                <span>{{ tender.address.street_number }} {{
                                        tender.address.address?.wordCapitalize()
                                    }}</span>
                                <span v-if="tender.address.address2">,<br/>{{
                                        tender.address.address2.wordCapitalize()
                                    }}</span>
                                <span><br/></span>
                                <span>{{ tender.address.zipcode }} {{ tender.address.city?.capitalize() }}</span>
                            </span>

                            <span v-else>{{ tender.address.city?.capitalize() }} ({{ tender.address.zipcode }})</span>
                        </ssf-col>

                    </ssf-row>

                </ssf-col>

            </ssf-container>

        </ssf-container>

        <ssf-container v-if="!(tender.available === true)" class="blocked-banner full-absolute px-3 rounded">
            <ssf-container class="blocked-banner-bg bg-danger rounded"/>
            <ssf-container class="blocked-banner-text full-flex full-absolute">
                <ssf-text class="text-white text-uppercase font-weight-bold">bloquée</ssf-text>
            </ssf-container>
        </ssf-container>

        <ssf-container class="text-right" v-if="!isActive">

            <button
                class="btn text-danger rounded text-white border border-danger inactive-tender-action-button d-inline-block mr-3"
                @click="deny()">
                <ssf-icon icon="ban" size="1x5" thin/>
            </button>

            <button
                class="btn text-success rounded text-white border border-success inactive-tender-action-button d-inline-block ml-2"
                @click="accept()">
                <ssf-icon icon="check" size="1x5" thin/>
            </button>

        </ssf-container>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, toRef } from "vue"
    import Tender                     from "@app/modules/tender/tender";
    import { useTender }       from "@app/modules/tender/tender-module";

    import VuePopper from 'vue3-popper'

    export default defineComponent({
        name: "list-tender-item",

        components: { VuePopper },

        props: {
            tender: { type: Tender, required: true }
        },

        setup(props) {
            ////////// init

            const tender = toRef(props, 'tender')

            const {
                amount,
                beginAt,
                endAt,
                publishedAt,
                expiresAt,
                full,
                shortDescription,
                actions,
                isActive,
                toggleFull,
                accept,
                deny,
            } = useTender(tender.value)

            return {
                //// tender amount
                amount,
                publishedAt,
                expiresAt,
                beginAt,
                endAt,
                shortDescription,
                full,
                actions,
                isActive,
                toggleFull,
                accept,
                deny,
            }
        }
    })
</script>

<style lang="scss" scoped>

    .inactive-tender-action-button {
        height: 50px;
        width: 50px;
        padding: 0 !important;
    }

    ul {
        list-style-type: none !important;

        .action-item {
            &:hover {
                background-color: var(--color-1);
                color: var(--color-2)
            }
        }
    }

    .blocked-banner-text, .blocked-banner-bg, .blocked-banner {
        top: inherit;
        height: 35px;
    }

    .blocked-banner {
        overflow: hidden;
    }

    .blocked-banner-bg {
        opacity: .6;
    }

    :deep(.popper) {
        background: #ffffff;
        padding: 20px;
        border-radius: var(--border-radius);
        color: var(--color-1);
        min-width: 200px !important;
    }

    :deep(.popper #arrow::before) {
        background: #ffffff;
    }

    :deep(.popper:hover),
    :deep(.popper:hover > #arrow::before) {
        background: #ffffff;
    }

    .item-link-action {
        cursor: pointer;
        transition: background-color .5s;
        border-radius: var(--border-radius);

        &:hover {
            background-color: var(--color-2);
        }
    }

</style>
