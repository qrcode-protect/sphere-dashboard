<template>
    <ssf-container name="form-tender-address">

        <ssf-row>

            <ssf-col xs="12">

                <ssf-container class="ssf-form-group qrcp-form-group  has-slot">

                    <ssf-container class="ssf-input-container ssf-form-text">

                        <label :class="{active: addressLabelActive}" class="label-required ssf__input-label"
                               @click="addressLabelActive = true">

                            <i class="fal fa-road fa-1x" style="margin-right: 5px"></i>

                            <span>Adresse</span>

                        </label>

                        <GMapAutocomplete
                            :options="{            countries: ['fr']       }"
                            autofocus
                            class="ssf-form-control qrcp-form-control qrcp-form-control"
                            inputmode="text"
                            name="address"
                            placeholder=""
                            @focusin="addressLabelActive = true"
                            @place_changed="onSetPlace"/>

                    </ssf-container>

                </ssf-container>

            </ssf-col>

            <!--            <qrcp-input :errors="errors"
                                    :value="tender.address.address"
                                    col="col-12 col-md-9"
                                    icon="road"
                                    label="Rue"
                                    name="address"
                                    required
                                    @update:value="event => tender.address.address = event"/>-->

            <qrcp-input :errors="errors"
                        :value="tender.address.address2"
                        col="col-12 col-md-12"
                        icon="street-view"
                        label="Complément d'adresse"
                        name="address2"
                        @update:value="event => tender.address.address2 = event"/>

        </ssf-row>

        <ssf-row>

            <qrcp-input :errors="errors"
                        :value="tender.address.zipcode"
                        col="col-12 col-md-6"
                        icon="mailbox"
                        label="Code postal"
                        name="zipcode"
                        required
                        @update:value="event => tender.address.zipcode = event"/>

            <qrcp-input :errors="errors"
                        :value="tender.address.city"
                        col="col-12 col-md-6"
                        icon="city"
                        label="Ville"
                        name="city"
                        required
                        @update:value="event => tender.address.city = event"/>

        </ssf-row>

        <ssf-row>

            <ssf-col no-padding size="6">

                <form-prev-button @prev="$emit('prev')"/>

            </ssf-col>

            <ssf-col no-padding size="6">

                <form-next-button @next="onNext"/>

            </ssf-col>

        </ssf-row>

    </ssf-container>
</template>

<script lang="ts">
    import { defineComponent, ref, watch } from "vue"
    import { useTenderForm }               from "@app/modules/tender/tender-module";
    import QrcpInput                       from "@/components/commons/qrcp-input.vue";
    import { useForm }                     from "@app/commons/form";
    import FormNextButton                  from "@/views/tenders/components/includes/form-tender/form-next-button.vue";
    import FormPrevButton                  from "@/views/tenders/components/includes/form-tender/form-prev-button.vue";
    import Tender                          from "@app/modules/tender/tender";


    const useGoogleMapPlace = () => {
        const setPlace = (place: any) => {

            const address = {
                street_number: null,
                address      : null,
                postcode     : null,
                city         : null,
                country      : null,
                lat          : place.geometry.location.lat(),
                lng          : place.geometry.location.lng()
            }

            for (const component of place.address_components) {
                // @ts-ignore remove once typings fixed
                const componentType = component.types[0];

                switch (componentType) {
                    case "street_number": {
                        address.street_number = component.long_name;
                        break;
                    }
                    case "route": {
                        address.address = component.short_name;
                        break;
                    }

                    case "postal_code": {
                        address.postcode = component.long_name;
                        break;
                    }
                    case "locality":
                        address.city = component.long_name
                        break;
                    case "country":
                        address.country = component.long_name
                        break;
                }
            }

            return address
        }

        return {
            setPlace
        }
    }

    export default defineComponent({
        name: "form-tender-address",

        components: { FormPrevButton, FormNextButton, QrcpInput },

        emits: [ 'prev', 'next' ],

        props: {
            tender: { type: Tender, required: true },
            isEdition: { type: Boolean, required: false, default: false },
        },

        setup(props, { emit }) {
            ////////// init

            const { errors, validator } = useForm()

            // watch(() => props.tender.address, () => props.tender.address = props.tender.address ?? {}, { immediate: true })

            const { setPlace } = useGoogleMapPlace()

            const onNext = () => {
                const tenderValue = props.tender.address
                return props.isEdition || validator({
                    street_number: tenderValue.street_number,
                    address      : tenderValue.address,
                    city         : tenderValue.city,
                    zipcode      : tenderValue.zipcode
                }) ? emit('next') : null
            }

            return {
                //// form module
                errors,

                addressLabelActive: ref<boolean>(false),

                onNext,

                onSetPlace: (event: any) => {
                    const address = setPlace(event);
                    props.tender.address.street_number = address.street_number
                    props.tender.address.city = address.city
                    props.tender.address.zipcode = address.postcode
                    props.tender.address.address = address.address
                    props.tender.address.lat = address.lat
                    props.tender.address.lng = address.lng

                },
            }
        }
    })
</script>

<style lang="scss" scoped>

    .form-tender-address {

        :deep(.members-search) {
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        :deep(.members-select) {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

    }

</style>
