<template>
    <ssf-container center class="box-item" name="quote-file-item" not-full :class="{'bg-color-1-lighten text-white': selectedQuote && quote && selectedQuote.id === quote.id}">

        <ssf-row class="pt-2 pr-2">

            <ssf-col size="6">
                <ssf-shape v-if="memberLastname" center class="bg-color-1-lighten rounded-light" size="30">
                    <ssf-text class="font-weight-bold color-1">{{ memberLastname[0] }}</ssf-text>
                </ssf-shape>
            </ssf-col>

            <ssf-col class="text-right" size="6">


                <ssf-shape class="cursor-pointer ml-auto text-right" size="20" @click="selectQuote">
                    <ssf-icon icon="ellipsis-h"/>
                </ssf-shape>

                <!--                <vue-popper :interactive="false" arrow zIndex="1050">
                                    <template #content>
                                        <ul class="pl-0 mb-0 text-left">


                                            <li>Ajouter des actions</li>
                                            &lt;!&ndash;                            <li v-for="(action, $idx) in actions"
                                                                            class="action-item p-2 cursor-pointer rounded"
                                                                            @click.prevent="action.method">
                                                                            <ssf-icon :icon="action.icon" fw light/>

                                                                            <span class="ml-2">{{ action.label }}</span>
                                                                        </li>&ndash;&gt;

                                        </ul>
                                    </template>

                                </vue-popper>-->

            </ssf-col>

        </ssf-row>


        <ssf-row class="py-2 py-md-3">

            <ssf-col class="text-center" size="12">

                <ssf-icon v-if="filename" :icon="fileIcon" class="color-1" duotone size="3x"/>

            </ssf-col>

        </ssf-row>

        <ssf-container class="small pb-2">

            <ssf-row class="py-3">

                <ssf-col class="text-center" size="12">

                    <ssf-text class="mb-0" style="overflow: hidden; text-overflow: ellipsis" tag="p">{{
                            filename
                        }}
                    </ssf-text>

                </ssf-col>

            </ssf-row>

            <quote-file-line/>

            <ssf-row>

                <!--                <ssf-col size="6">

                                    <ssf-container>
                                        <ssf-text>Taille</ssf-text>
                                    </ssf-container>

                                    <ssf-container class="secondary-item-small font-weight-bold">
                                        <ssf-text>{{ filesize }}</ssf-text>
                                    </ssf-container>

                                </ssf-col>-->

                <ssf-col class="text-left" size="6">

                    <ssf-container>
                        <ssf-text>Fournisseur</ssf-text>
                    </ssf-container>

                    <ssf-container class="secondary-item-small font-weight-bold">
                        {{ partnerLastname }}
                    </ssf-container>
                </ssf-col>

                <ssf-col class="text-right" size="6">

                    <ssf-container>
                        <ssf-text>Adhérent</ssf-text>
                    </ssf-container>

                    <ssf-container class="secondary-item-small font-weight-bold">
                        {{ memberLastname }}
                    </ssf-container>
                </ssf-col>

            </ssf-row>

        </ssf-container>

    </ssf-container>
</template>

<script lang="ts">
    import { computed, defineComponent, onMounted, reactive, ref } from "vue"
    // @ts-ignore
    import VuePopper                                               from "vue3-popper";

    import Quote from "@app/modules/quote/quote";
    import { extension, fileIcon as xFileIcon, firebaseFile, humanizeSize } from "@app/commons/file";
    import { FullMetadata } from "firebase/storage";
    import QuoteFileLine
        from "@/views/quote/components/includes/quote-file-line.vue";
    import { Nullable } from "../../../../../types/nullable";
    import { useQuote } from "@app/modules/quote/utils";


    export default defineComponent({
        name: "quote-file-item",

        props: {
            quote: { type: Quote, required: true }
        },

        components: { QuoteFileLine, VuePopper },

        emits: [ 'select-quote' ],

        setup(props, { emit }) {
            ////////// init

            ////////// data
            const fileInfo = reactive({
                metadata: ref<Nullable<FullMetadata>>(null),
                mimeType: ref<Nullable<string>>(null),
                filename: ref<Nullable<string>>(null),
                filesize: ref<Nullable<number>>(null),
            })

            ////////// computed
            const mimeType = computed((): Nullable<string> => fileInfo.mimeType)
            const filename = computed((): string => `DEVIS_${props.quote.member?.companyName?.toUpperCase() ?? ''}_#${props.quote.created.format('DDMMYYHHmmss').toUpperCase()}${extension(fileInfo.filename, true)}`)
            const filesize = computed((): number | string => humanizeSize(fileInfo.filesize))
            const fileIcon = computed((): string => xFileIcon(fileInfo.filename))
            const memberLastname = computed((): string => props.quote.member?.companyName?.toUpperCase() ?? '')
            const partnerLastname = computed((): string => props.quote.partner?.companyName?.toUpperCase() ?? '')

            ////////// methods

            onMounted(async () => {
                fileInfo.metadata = await firebaseFile.metadata(props.quote.file)
                fileInfo.mimeType = await firebaseFile.mimeType(props.quote.file, fileInfo.metadata)
                fileInfo.filename = await firebaseFile.filename(props.quote.file, fileInfo.metadata)
                fileInfo.filesize = await firebaseFile.filesize(props.quote.file, fileInfo.metadata)
            })

            const {quote: selectedQuote} = useQuote()

            return {
                selectQuote: () => emit('select-quote', props.quote),
                selectedQuote,

                //// computed
                filename,
                fileIcon,
                filesize,
                memberLastname,
                partnerLastname,
            }
        },

    })
</script>

<style lang="scss" scoped>

    .ssf__section--quote-file-item {
        width: 275px;
        max-width: 100%;
        transition: background-color .3s, color .3s;

        .hr-plus {
            top: 1px !important
        }

        :deep(.popper) {
            background: #ffffff;
            padding: 20px;
            border-radius: var(--border-radius-light);
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
    }

</style>
