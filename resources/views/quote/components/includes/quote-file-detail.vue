<template>
    <ssf-container center class="box-item" name="quote-file-detail" not-full>

        <ssf-row class="pt-2 pr-2">

            <ssf-col size="12">

                <ssf-shape center
                           circle
                           class="bg-color-1-lighten color-1 font-weight-bold mx-auto my-2 cursor-pointer"
                           size="20"
                           @click="close">
                    <ssf-icon icon="times" solid/>
                </ssf-shape>

            </ssf-col>

            <ssf-col size="12">

                <ssf-icon class="mr-2" icon="file-lines" light/>

                <ssf-text>Informations</ssf-text>

            </ssf-col>

        </ssf-row>

        <quote-file-line/>

        <ssf-row class="py-2 py-md-3">

            <ssf-col class="text-center" size="12">

                <ssf-icon v-if="filename" :icon="fileIcon" class="color-1" duotone size="6x"/>

            </ssf-col>

        </ssf-row>

        <quote-file-line/>

        <ssf-container class="small pb-2">

            <ssf-row class="pt-3">

                <ssf-col size="12">

                    <ssf-text tag="p" class="mb-0" style="overflow: hidden; text-overflow: ellipsis">{{ filename }}</ssf-text>

                </ssf-col>

                <ssf-col class="font-weight-semi-bold grey-text small" size="12">

                    <ssf-container>
                        <ssf-text>{{ filesize }}</ssf-text>
                    </ssf-container>

                    <ssf-container>
                        <ssf-text>{{ quotationAmount }}€</ssf-text>
                    </ssf-container>

                    <br/>

                    <ssf-container>
                        <ssf-text class="secondary-item-small">Édité le</ssf-text>
                        <br/>
                        <ssf-text>{{ quotationDate }}</ssf-text>
                    </ssf-container>

                    <ssf-container v-if="quote.expiresAt">
                        <ssf-text class="secondary-item-small">Expire le</ssf-text>
                        <br/>
                        <ssf-text>{{ quotationExpiration }}</ssf-text>
                    </ssf-container>

                    <ssf-container v-if="quote.acceptedAt && quote.accepted">
                        <ssf-text class="secondary-item-small">Accepté le</ssf-text>
                        <br/>
                        <ssf-text>{{ quotationAccepted }}</ssf-text>
                    </ssf-container>

                    <ssf-container v-if="quote.declinedAt && quote.declined">
                        <ssf-text class="secondary-item-small">Refusé le</ssf-text>
                        <br/>
                        <ssf-text>{{ quotationDeclined }}</ssf-text>
                    </ssf-container>

                    <ssf-container full-flex>

                        <ssf-shape center
                                   class="bg-color-1-lighten color-1 font-weight-bold mx-auto mt-2 cursor-pointer rounded-light"
                                   size="30">
                            <ssf-icon :icon="quotationStatusIcon" size="2x" solid/>
                        </ssf-shape>
                    </ssf-container>

                </ssf-col>

            </ssf-row>

            <quote-file-line/>

            <ssf-row v-if="quote.partner">

                <ssf-col class="small" size="12">

                    <ssf-container>
                        <ssf-title h6 >
                            <span class="small font-weight-semi-bold">Fournisseur</span>
                        </ssf-title>
                    </ssf-container>

                    <ssf-container class="font-weight-bold">

                        <ssf-container>
                            {{ quote.partner?.companyName.toUpperCase() }}
                        </ssf-container>

                    </ssf-container>

                    <ssf-container>
                        {{ quote.partner.email }}
                    </ssf-container>

                    <ssf-container>
                        {{ quote.partner.phone }}
                    </ssf-container>

                </ssf-col>

            </ssf-row>

            <quote-file-line/>

            <ssf-row v-if="quote.member">

                <ssf-col class="small" size="12">

                    <ssf-container>
                        <ssf-title h6 >
                            <span class="small font-weight-semi-bold">Membre</span>
                        </ssf-title>
                    </ssf-container>

                    <ssf-container class="font-weight-bold">

                        <ssf-container>
                            {{ quote.member?.companyName.toUpperCase() }}
                        </ssf-container>

                        <ssf-container>
                            {{ memberFullName }}
                        </ssf-container>

                    </ssf-container>

                    <ssf-container>
                        {{ quote.member.email }}
                    </ssf-container>

                    <ssf-container>
                        {{ quote.member.phone }}
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

    import Quote                                                            from "@app/modules/quote/quote";
    import { extension, fileIcon as xFileIcon, firebaseFile, humanizeSize } from "@app/commons/file";
    import { FullMetadata }                                                 from "firebase/storage";
    import QuoteFileLine
                                                                            from "@/views/quote/components/includes/quote-file-line.vue";
    import { loading, number }                                              from "@app/vue/utils/helpers";
    import { useRouter }                                                    from "vue-router";
    import { Nullable }                                                     from "../../../../../types/nullable";


    export default defineComponent({
        name: "quote-file-detail",

        props: {
            quote: { type: Quote, required: true }
        },

        components: { QuoteFileLine, VuePopper },

        emits: [ 'close' ],

        setup(props, { emit }) {
            ////////// init
            const router = useRouter()

            ////////// data
            const fileInfo = reactive({
                metadata: ref<Nullable<FullMetadata>>(null),
                mimeType: ref<Nullable<string>>(null),
                filename: ref<Nullable<string>>(null),
                filesize: ref<Nullable<number>>(null),
            })

            ////////// computed
            const mimeType = computed((): Nullable<string> => fileInfo.mimeType)
            const filename = computed((): string => `DEVIS_${props.quote.member?.companyName?.toUpperCase()}_#${props.quote.created?.format('DDMMYYHHmmss').toUpperCase()}${extension(fileInfo.filename, true)}`)
            const filesize = computed((): number | string => humanizeSize(fileInfo.filesize))
            const fileIcon = computed((): string => xFileIcon(fileInfo.filename))
            const memberFullName = computed((): Nullable<string> => props.quote.member ? `${props.quote.member.lastname?.toUpperCase()} ${props.quote.member.firstname?.toUpperCase()}` : null)


            const quotationDate = computed((): string => props.quote.created?.format('DD-MM-YYYY à HH:mm'))
            const quotationExpiration = computed((): Nullable<string> => props.quote.expiration ? props.quote.expiration?.format('DD-MM-YYYY') : null)
            const quotationDeclined = computed((): Nullable<string> => props.quote.declinedAt ? props.quote.declinedAt?.format('DD-MM-YYYY à HH:mm') : null)
            const quotationAccepted = computed((): Nullable<string> => props.quote.acceptedAt ? props.quote.acceptedAt?.format('DD-MM-YYYY à HH:mm') : null)
            const quotationAmount = computed((): string => number.pretty(props.quote.amount))
            const quotationStatusIcon = computed((): string => props.quote.isExpired() ? 'timer' : props.quote.isPending() ? 'hourglass' : props.quote.isDeclined() ? 'ban' : props.quote.isAccepted() ? 'check' : 'exclamation')

            ////////// methods
            const close = () => emit('close')
            const restartChat = () => {
                loading(true)
                close()
                return router.push({ name: 'chat.index', params: { conversationId: props.quote.conversationId } });
            }

            onMounted(async () => {
                fileInfo.metadata = await firebaseFile.metadata(props.quote.file)
                fileInfo.mimeType = await firebaseFile.mimeType(props.quote.file, fileInfo.metadata)
                fileInfo.filename = await firebaseFile.filename(props.quote.file, fileInfo.metadata)
                fileInfo.filesize = await firebaseFile.filesize(props.quote.file, fileInfo.metadata)
            })

            return {
                close,
                restartChat,

                //// computed
                filename,
                fileIcon,
                filesize,
                memberFullName,

                quotationDate,
                quotationExpiration,
                quotationDeclined,
                quotationAccepted,
                quotationAmount,
                quotationStatusIcon
            }
        },

    })
</script>

<style lang="scss" scoped>

    .ssf__section--quote-file-detail {
        width: 275px;
        max-width: 100%;

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
