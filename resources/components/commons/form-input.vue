<template>
    <ssf-form-group
        :autocomplete="autocomplete"
        :autosize="autosize"
        :col="col"
        :disabled="disabled"
        :form-group-class="`qrcp-form-group ${formGroupClass}${hasError ? ' has-own-slot' : ''}`"
        :icon="{icon, type: iconType, weight: iconWeight}"
        :input-class="`qrcp-form-control ${inputClass}`"
        :label="label"
        :max-height="maxHeight"
        :min-height="minHeight"
        :multiple="multiple"
        :name="name"
        :optionField="optionField"
        :optionGroup="optionGroup"
        :optionItems="optionItems"
        :optionLabel="optionLabel"
        :placeholder="placeholder"
        :required="required"
        :row="row"
        :scrollX="scrollX"
        :select="select"
        :selectHeight="selectHeight"
        :textarea="textarea"
        :type="type"
        :value="value"
        :date-format="dateFormat"
        :wheel-propagation="wheelPropagation"
        @update:value="onUpdateValue">
        <ssf-container v-if="hasError" class="form-input-error">
            <ssf-col size="12">
                <ssf-container v-html="messages"/>
            </ssf-col>
        </ssf-container>

        <slot v-if="hasSlot('label')" slot="label" name="label"/>
        <slot v-if="hasSlot('file-info')" slot="file-info" name="file-info"/>
        <slot v-if="hasSlot('selector')" slot="selector" name="selector"/>
        <slot v-if="hasSlot('delete-file')" slot="delete-file" name="delete-file"/>
        <slot/>

    </ssf-form-group>
</template>

<script>

    import { computed, defineComponent, getCurrentInstance, toRefs } from "vue";
    import { each, filter }                                          from "lodash";

    export default defineComponent({
        name: "form-input",

        emits: [ 'update:value', 'input' ],

        props: {
            /* CONTAINERS */
            row           : { type: Boolean, required: false, default: false },
            col           : { type: [ Boolean, Number, Object, String ], required: false, default: false },
            formGroupClass: { type: String, required: false, default: '' },
            inputClass    : { type: [ String, Object ], required: false, default: '' },

            /* COMMONS */
            name    : { type: [ String, Object ], required: true },
            label   : { type: [ String ], required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },

            /* INPUT */
            type        : { type: String, required: false, default: 'text' },
            disabled    : { type: Boolean, required: false, default: false },
            placeholder : { type: [ Boolean, String ], required: false, default: false },
            autocomplete: { type: [ Boolean, String ], required: false, default: false },

            /* TEXTAREA */
            textarea : { type: Boolean, required: false, default: false },
            autosize : { type: Boolean, default: true },
            minHeight: { type: [ Number ], 'default': null },
            maxHeight: { type: [ Number ], 'default': null },

            /* SELECT */
            select          : { type: Boolean, required: false, default: false },
            optionItems     : { type: [ Array, Object ], required: false },
            optionField     : { type: String, required: false, default: null },
            optionLabel     : { type: String, required: false, default: 'label' },
            optionGroup     : { type: Boolean, required: false, default: false },
            multiple        : { type: Boolean, required: false, default: false },
            scrollX         : { type: Boolean, required: false, default: false },
            wheelPropagation: { type: Boolean, required: false, default: false },
            selectHeight    : { type: [ Number, String ], required: false, default: 350 },

            icon      : { type: [ String ], required: false },
            iconType  : { type: [ String ], required: false, default: 'fa' },
            iconWeight: { type: [ String ], required: false, default: 'light' },

            /* DATE */
            dateFormat: { type: String, required: false, default: 'DD/MM/YYYY' },

            errors: { type: Array },

            errorMessages: { type: [ Array, Object ], required: true }
        },

        setup(props) {
            ////////// data
            const { errors, name } = toRefs(props)

            const pattern = `(^${name.value}.)|(\\.${name.value}.)`

            ////////// methods
            const keyErrors = () => filter(errors.value, key => key.match(new RegExp(pattern, 'g')) !== null)
            const hasSlot = (name = 'default', component = getCurrentInstance()) => component && !!component.slots[name]

            ////////// computed
            const hasError = computed(() => keyErrors().length > 0)
            const messages = computed(() => {
                const result = []
                each(keyErrors(), key => result.push(props.errorMessages[key] || null))
                return `<ul class="qrcp-errors mt-1">${result.map(item => `<li>${item}</li>`).join('')}</ul>`
            })

            return {
                //// computed
                hasError,
                messages,

                //// methods
                hasSlot
            }
        },

        methods: {
            onUpdateValue(event) {
                this.$emit('update:value', event)
                this.$emit('input', event)
            }
        }

    })
</script>

<style lang="scss">

    .qrcp-form-group {
        &:not(.has-own-slot) {
            margin-top: 8px;
            margin-bottom: 20px;
        }

        .qrcp-form-control:focus:not(.invalid) {
            border-color: var(--color-2) !important;
        }

        &.ssf-checkbox-group label, .ssf-checkbox-switch label {
            margin-bottom: 0 !important;
        }

        .label-required:after {
            content: '*';
            color: var(--color-danger);
        }
    }

    .qrcp-errors {
        padding-left: 0 !important;
        color: var(--color-danger);
        font-size: 80% !important;
    }

    .qrcp-form-group .qrcp-form-control,
    .qrcp-form-group .qrcp-form-control:active,
    .qrcp-form-group .qrcp-form-control:focus,
    .qrcp-form-group .qrcp-form-control:hover {
        &:not([type=checkbox]) {
            //border-top: none !important;
            //border-left: none !important;
            //border-right: none !important;
        }

        border-radius: var(--form-radius, 0) !important;
        //padding-left: 0 !important;
    }

    .form-control.is-valid {
        border-color: var(--color-success);
    }

    .qrcp-form-group .qrcp-form-control.invalid {
        border-color: var(--color-danger) !important;
    }


</style>
