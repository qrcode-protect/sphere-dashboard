<template>

    <ssf-card :body-class="`card-${dataType}-item-body card-company-item-body`"
              :class="`position-relative card-${dataType}-item rounded mx-3 z-depth-1 card-company-item`"
              :footer-class="`${footerClass} rounded`"
              :header-class="`card-${dataType}-item-header card-company-item-header position-absolute rounded border-0 p-0 z-depth-1 text-white`">

        <template #header>


            <ssf-container class="full-flex h-100">

                <ssf-icon :icon="icon" light/>

            </ssf-container>

        </template>

        <template #body>

            <ssf-container class="position-relative">
                <h3 class="h3-responsive mb-1">
                    {{ item.companyName.capitalize() }}
                </h3>
                <h4 class="h4-responsive mb-3">
                    {{ item.lastname.capitalize() }}
                    {{ item.firstname.capitalize() }}
                </h4>

                <ssf-container v-if="withAction"
                               class="full-absolute full-flex cursor-pointer card-company-actions"
                               not-full
                               style="left: inherit !important; width: 20px">

                    <vue-popper :interactive="false" arrow zIndex="1050">

                        <ssf-container class="text-center mx-auto" not-full style="height: 20px; width: 20px">
                            <ssf-icon icon="ellipsis-vertical"/>
                        </ssf-container>

                        <template #content>
                            <slot name="action-content"/>
                        </template>

                    </vue-popper>
                </ssf-container>

            </ssf-container>

            <ul class="fa-ul">
                <li v-for="itemKey in itemKeys">

							<span class="fa-li">
								<ssf-icon :icon="itemKey.icon" class="color-2" regular/>
							</span>


                    <vue-popper arrow class="h-100 border-bottom-0 mb-0" hover placement="top">
                        <ssf-container>

                            <span v-if="itemKey.title && !itemKey.titleOnly">{{ itemKey.title }} : </span>

                            <span>{{ itemKey.titleOnly ? itemKey.title : item[itemKey.key] }}</span>

                            <span v-if="itemKey.copyable || itemKey.isLink">
                                <ssf-icon class="ml-1" icon="info-circle" light size="sm"/>
                            </span>

                        </ssf-container>

                        <template v-if="itemKey.copyable || itemKey.isLink" #content>

                            <ssf-row>

                                <ssf-col v-if="itemKey.copyable"
                                         class="item-link-action mx-auto"
                                         size="6"
                                         @click.prevent="onClickCopy(item, itemKey)">
                                    <ssf-text>Copier</ssf-text>
                                </ssf-col>

                                <ssf-col v-if="itemKey.isLink"
                                         class="item-link-action mx-auto"
                                         size="6"
                                         @click.prevent="onUrlClick(item, itemKey)">
                                    <ssf-text>
                                        Ouvrir
                                        <ssf-icon icon="link" light size="xs"/>
                                    </ssf-text>
                                </ssf-col>

                            </ssf-row>

                        </template>

                    </vue-popper>

                    <!--                    <span v-else @click.prevent="onClickCopy(item[itemKey.key])">
                                                        <span v-if="itemKey.title">{{ itemKey.title }} : </span>
                                                        {{ item[itemKey.key] }}</span>-->

                </li>
            </ul>

            <modal-show-image-info v-if="modals.showImageInfo.open"
                                   :modal-name="modals.showImageInfo.name"
                                   :open="modals.showImageInfo.open"
                                   :src="item.certificate"
                                   alt="KBIS"
                                   @close="modals.showImageInfo.open = false"/>

        </template>

        <template v-if="hasSlot('footer')" #footer>
            <slot name="footer"/>
        </template>

    </ssf-card>

</template>

<script lang="ts">
    import { defineComponent, PropType, reactive } from "vue"
    import swal                                    from "sweetalert2";

    // @ts-ignore
    import VuePopper          from "vue3-popper";
    // @ts-ignore
    import copy               from "text-copy"
    import CompanyInfo        from "@app/commons/company-info";
    import { hasSlot }        from "@app/vue/utils";
    import ModalShowImageInfo from "./modal-show-image-info.vue";
    import { UrlType }        from "@app/commons";


    export default defineComponent({
        name: "card-company-info",

        props: {
            item       : { type: Object as PropType<any>, required: true },
            itemKeys   : { type: Array, required: true },
            dataType   : { type: String, required: true },
            icon       : { type: String, required: false, default: 'building' },
            footerClass: { type: String, required: false },
            withAction : { type: Boolean, required: false, default: false },
        },

        components: {
            ModalShowImageInfo,
            VuePopper
        },

        setup(props) {
            ////////// init

            ////////// data
            const modals = reactive({
                showImageInfo: {
                    open: false,
                    name: 'modal-show-image-info'
                }
            })

            ////////// computed

            ////////// methods
            const onUrlClick = (data: any, item: CompanyInfo) => {
                if (item.urlType === UrlType.image && !(data[item.key]).indexOf('.pdf')) {
                    modals.showImageInfo.open = true
                }
                else window?.open(`${item.urlPrefix}${data[item.key]}`, '_blank')?.focus();
            }
            const onClickCopy = (data: any, item: CompanyInfo) => {
                if (item.copyable && copy(data[item.key]))
                    onCopy()
            }
            const onCopy = () => {
                swal.fire({
                    icon             : "success",
                    text             : "Copié dans le presse-papier!",
                    toast            : true,
                    position         : 'bottom-end',
                    timer            : 5000,
                    timerProgressBar : true,
                    showConfirmButton: false,
                    customClass      : {
                        icon: 'ssf-toast-icon-small'
                    }
                })
            }

            return {
                modals,

                //// methods
                onUrlClick,
                onClickCopy,

                hasSlot
            }
        }

    })
</script>

<style lang="scss" scoped>

    .card-company-item {
        margin-top: 40px;
        min-width: 270px;
        max-width: 450px;

        :deep(.card-company-item-header) {
            background-color: var(--color-1);
            width: 50px !important;
            height: 50px !important;
            top: -25px;
            left: 18px;
        }

        :deep(.card-company-item-body) {
            padding-top: 35px !important;
        }

        a.item-link {
            color: var(--color-1) !important;
        }

        :deep(.popper) {
            min-width: 200px !important;
        }

        .item-link-action {
            cursor: pointer;
            transition: background-color .5s;
            border-radius: var(--border-radius);

            &:hover {
                background-color: var(--color-2);
            }
        }

        .card-company-actions {
            :deep(.popper) {
                background: #ffffff;
                padding: 20px;
                border-radius: var(--border-radius);
                color: var(--color-1);
                min-width: 300px !important;
            }

            :deep(.popper #arrow::before) {
                background: #ffffff;
            }

            :deep(.popper:hover),
            :deep(.popper:hover > #arrow::before) {
                background: #ffffff;
            }
        }

    }

</style>
