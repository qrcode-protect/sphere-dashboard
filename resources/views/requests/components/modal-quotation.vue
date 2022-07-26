<template>
    <ssf-modal v-model="visible"
               :name="modalName"
               attach="#app"
               body-classes="pt-2 border-0"
               classes="modal-container modal-quotation"
               content-class="modal-content z-depth-1 full-flex rounded mx-auto"
               fit-parent
               header-classes="py-2 d-block border-0 position-sticky"
               lock-scroll
               scrollable
               @before-open="onBeforeOpen"
               @before-close="closeModal">

        <template #header>

            <ssf-container class="box-item rounded rounded-strong py-2">


                <ssf-row>

                    <ssf-col class="full-flex px-2" max-width="40%">

                        <ssf-row class="color-3">

                            <ssf-col class="px-2 mx-auto mx-md-0" max-width="46">

                                <ssf-shape v-if="scale > 0"
                                           center
                                           circle
                                           class="cursor-pointer border border-color-3"
                                           size="30"
                                           @click="zoomOutPdf">

                                    <ssf-icon icon="magnifying-glass-minus" regular size="sm"/>

                                </ssf-shape>

                            </ssf-col>

                            <ssf-col class="px-2 mx-auto mx-md-0" max-width="46">

                                <ssf-shape center
                                           circle
                                           class="cursor-pointer border border-color-3"
                                           size="30"
                                           @click="zoomInPdf">

                                    <ssf-icon icon="magnifying-glass-plus" regular size="sm"/>

                                </ssf-shape>

                            </ssf-col>

                            <ssf-col class="px-2 mx-auto" max-width="46">

                                <ssf-shape center
                                           circle
                                           class="cursor-pointer border border-color-3"
                                           size="30">

                                    <a :href="pdfUrl" class="color-3" download target="_blank">

                                        <ssf-icon icon="download" regular size="sm"/>

                                    </a>

                                </ssf-shape>

                            </ssf-col>

                        </ssf-row>

                    </ssf-col>

                    <ssf-col class="px-2 mx-auto full-flex" max-width="40%">

                        <ssf-row v-if="quotation.isPending()" class="d-flex justify-content-end">

                            <!--                            <ssf-col class="px-2" max-width="56">

                                                            <ssf-shape center
                                                                       circle
                                                                       class="bg-success text-white cursor-pointer"
                                                                       size="40"
                                                                       @click="acceptQuotation">

                                                                <ssf-icon icon="check" light size="lg"/>

                                                            </ssf-shape>

                                                        </ssf-col>

                                                        <ssf-col class="px-2" max-width="56">

                                                            <ssf-shape center
                                                                       circle
                                                                       class="bg-danger text-white cursor-pointer"
                                                                       size="40"
                                                                       @click="declineQuotation">

                                                                <ssf-icon icon="ban" light size="lg"/>

                                                            </ssf-shape>

                                                        </ssf-col>-->


                        </ssf-row>

                        <ssf-container v-else
                                       :class="{'bg-success': quotation.accepted, 'bg-danger': quotation.declined}"
                                       class="mx-auto py-1 px-3 rounded mb-2 text-white tex-center h-100 full-flex"
                                       not-full>

                            <span v-if="quotation.accepted">Accepté</span>
                            <span v-else>Refusé</span>

                        </ssf-container>

                    </ssf-col>

                    <ssf-col class="full-flex px-2">

                        <ssf-row class="color-3">

                            <ssf-shape center circle class="ahead bg-black text-white cursor-pointer ml-auto"
                                       size="35"
                                       style="opacity: .6"
                                       title="Fermer"
                                       @click="closeModal">

                                <ssf-icon icon="times" size="1x5" thin/>

                            </ssf-shape>

                        </ssf-row>

                    </ssf-col>

                </ssf-row>

            </ssf-container>

        </template>

        <template #body>

            <ssf-container class="pdf-container mx-auto"
                           not-full
                           relative
                           style="height: 630px; width: 450px; max-height: 100%; max-width: 100%">

                <vue-pdf v-for="page in numOfPages"
                         v-if="pdfUrl"
                         :key="page"
                         :page="page"
                         :scale="scale === 0 ? null : scale"
                         :src="pdfUrl"
                         enable-text-selection/>

            </ssf-container>

        </template>

    </ssf-modal>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"
    import Quotation                       from "@app/modules/quote/quote";
    import { createLoadingTask, VuePdf }   from "vue3-pdfjs";
    import { PDFDocumentProxy }            from "pdfjs-dist";
    import { VuePdfPropsType }             from "vue3-pdfjs/components/vue-pdf/vue-pdf-props";
    import { Nullable }                    from "../../../../types/nullable";

    export default defineComponent({
        name: "modal-quotation",

        props: {
            modalName: { type: String, required: false, default: 'modal-quotation' },
            open     : { type: Boolean, required: false, default: false },
            quotation: { type: Quotation, required: true, },
        },

        components: { VuePdf },

        emits: [ 'close' ],

        setup(props, { emit }) {
            ////////// init

            const visible = ref<boolean>(false)

            watch(() => props.open, () => visible.value = props.open, { immediate: true })

            const pdfUrl = ref<Nullable<VuePdfPropsType['src']>>(null)
            const numOfPages = ref(0)
            const scale = ref(0)


            const onBeforeOpen = async () => {
                const tmp = await fetch(props.quotation.file).then(r => r.blob())
                pdfUrl.value = URL.createObjectURL(new Blob([ tmp ], { type: "application/pdf" }))

                if (pdfUrl.value) {
                    // @ts-ignore
                    const loadingTask = createLoadingTask(pdfUrl.value)
                    loadingTask.promise.then((pdf: PDFDocumentProxy) => {
                        numOfPages.value = pdf.numPages
                    })
                }
            }


            return {
                visible,
                closeModal: () => emit('close'),
                onBeforeOpen,
                pdfUrl,
                numOfPages,
                scale,
                zoomInPdf : () => {
                    const tmp = pdfUrl.value
                    pdfUrl.value = null
                    scale.value = scale.value + 1;
                    setTimeout(() => pdfUrl.value = tmp, 500)
                },
                zoomOutPdf: () => {
                    const tmp = pdfUrl.value
                    pdfUrl.value = null
                    scale.value = scale.value - 1;
                    setTimeout(() => pdfUrl.value = tmp, 500)
                },
            }
        }
    })
</script>

<style lang="scss">

    .modal-quotation {
        z-index: 99999;

        .modal-content {
            width: 600px !important;
            max-width: 100% !important;
            top: 80px;
            right: 0;
            left: 0;

            .modal-header {
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 1;
            }

        }
    }

</style>
