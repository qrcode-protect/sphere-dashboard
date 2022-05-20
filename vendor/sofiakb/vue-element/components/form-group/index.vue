<template>
    <div :class="mainClasses" @click="$emit('click', $event)">
        <div :class="containerClass">

            <ssf-select
                v-if="select"
                @change="$emit('change')"
                @focus="$emit('focus')"
                @input="onInput"/>

            <ssf-textarea
                v-else-if="textarea"
                :autosize="autosize"
                :maxHeight="maxHeight"
                :minHeight="minHeight"
                @change="$emit('change')"
                @focus="$emit('focus')"
                @input="onInput"/>

            <ssf-input
                v-else
                ref="input"
                :autocomplete="autocomplete"
                :date-format="dateFormat"
                :disabled="disabled"
                :field="field"
                :icon="icon"
                :inline="inline"
                :input-class="inputClass"
                :input-mode="inputMode"
                :items="items"
                :label="label"
                :max="max"
                :min="min"
                :name="name"
                :placeholder="placeholder"
                :required="required"
                :show-error="showError"
                :step="step"
                :time-format="timeFormat"
                :type="type"
                :value="value"
                @change="$emit('change')"
                @focus="$emit('focus')"
                @input="onInput">
                <slot v-if="hasSlot('label')" slot="label" name="label"/>
                <slot v-if="hasSlot('file-info')" slot="file-info" name="file-info"/>
                <slot v-if="hasSlot('selector')" slot="selector" name="selector"/>
                <slot v-if="hasSlot('delete-file')" slot="delete-file" name="delete-file"/>
            </ssf-input>


        </div>

        <slot/>

    </div>
</template>

<script>

    import SsfInput            from "./includes/input/main";
    import SsfSelect           from "./includes/select";
    import SsfTextarea         from "./includes/textarea";
    import { defineComponent } from "vue";
    import { hasSlot }         from "@sofiakb/vue-element/utils";

    const types = {
        checkbox: 'ssf-checkbox-group',
        switch  : 'ssf-checkbox-switch',
        radio   : 'ssf-radio-group'
    }

    export default defineComponent({
        name: "ssf-form-group",

        components: { SsfInput, SsfSelect, SsfTextarea },

        emits: [ 'click', 'focus', 'change', 'input', 'update:value' ],

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

            /* TEXTAREA */
            textarea : { type: Boolean, required: false, default: false },
            autosize : { type: Boolean, default: true },
            minHeight: { type: [ Number ], 'default': null },
            maxHeight: { type: [ Number ], 'default': null },

            /* INPUT */
            type        : { type: [ String, Object ], required: false, default: 'text' },
            disabled    : { type: Boolean, required: false, default: false },
            placeholder : { type: [ Boolean, String ], required: false, default: false },
            autocomplete: { type: [ Boolean, String ], required: false, default: false },

            /* NUMBER */
            step     : { type: [ Number, String ], required: false, default: 1 },
            min      : { type: [ Number, String ], required: false, default: null },
            max      : { type: [ Number, String ], required: false, default: null },
            inputMode: { type: [ Boolean, String ], required: false, default: false },

            /* RADIO */
            items : { type: Array, required: false },
            field : { type: String, required: false, default: null },
            inline: { type: Boolean, required: false, default: false },

            /* DATE */
            dateFormat: { type: String, required: false, default: 'DD/MM/YYYY' },

            /* TIME */
            timeFormat: { type: String, required: false, default: 'HH:mm:ss' },

            /* FILE */
            showError   : { type: Boolean, required: false, default: true },
            mimes       : { type: String, required: false, default: 'pdf, csv, text, gif, jpeg, png, icon' },
            fileAccepted: { type: String, required: false, default: '*' },
            filePreview : { type: Boolean, required: false, default: false },

            /* ICONS */
            icon: { type: [ String, Object ], required: false, default: null },
        },

        data() {
            return {}
        },

        watch: {},

        computed: {

            mainClasses() {
                let classes = this.row ? { row: true } : {}

                return { ...classes, ...this.colClasses }
            },

            colClasses() {
                if (typeof this.col === 'boolean')
                    return { 'col-12': true }
                if (typeof this.col === 'number' || !isNaN(this.col)) {
                    let object = {}
                    object[`col-${this.col}`] = true
                    return object
                }

                if (typeof this.col === 'string') {
                    let object = {}
                    object[this.col] = true
                    return object
                }

                if (typeof this.col === 'object') {
                    let object = {}
                    const keys = Object.keys(this.col)
                    keys.forEach(key => object[`col-${key}-${this.col[key]}`] = true)
                    return object
                }

                return null;
            },

            containerClass() {
                return `${types[this.type] || 'ssf-form-group'} ${this.formGroupClass} ${this.hasSlot() ? 'has-slot' : ''}`.trim()
            },

            xIcon() {
                if (typeof this.icon === 'string')
                    return { type: 'fa', icon: this.icon, weight: 'regular', size: '1x' }
                else return this.icon

            }

        },

        methods: {

            hasSlot(name = 'default') {
                return hasSlot(this, name)
            },

            onInput(value) {
                if (!this.disabled) {
                    this.$emit('change')
                    this.$emit('input', value)
                    this.$emit('update:value', value)
                }
                this.$forceUpdate()
            }
        }
    })
</script>

<style lang="scss">

    $defaultBorder: #ddd;
    $defaultBorderRadius: 4px;

    :root {
        --form-radius: 6px
    }

    /*.ssf-row {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        width: 100%;
    }*/

    .ssf-form-group {
        position: relative;
        width: 100%;

        .ssf-form-control {
            font-size: 14px;
            width: 100%;
            padding: 14px 18px;
            background-color: transparent;
            min-height: 45px;
            box-sizing: border-box;
            border: 1px solid $defaultBorder;
            -webkit-border-radius: var(--form-radius, $defaultBorderRadius);
            -moz-border-radius: var(--form-radius, $defaultBorderRadius);
            border-radius: var(--form-radius, $defaultBorderRadius);
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;


            &:focus,
            &:focus + .ssf-number-control {
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                border-color: #225a94;
                outline: 0;
            }

            &:-webkit-autofill,
            &:-webkit-autofill:hover,
            &:-webkit-autofill:focus,
            &:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 0 white inset;
                -moz-box-shadow: 0 0 0 0 white inset;
                box-shadow: 0 0 0 0 white inset;
            }

            .is-valid {
                border-color: #6aa280;
            }

            .is-invalid {
                border-color: #d6534c;
            }
        }

        label {
            position: absolute;
            font-size: 13px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 10px;
            color: #9e9e9e;
            margin-left: 0;
            transition: all .25s;
            cursor: pointer;
            background: transparent;
        }

        .ssf-form-control:focus + label,
        label.active {
            top: -8px;
            left: inherit;
            right: inherit;
            margin-left: 15px;
            height: 16px;
            font-size: 10px;
            background-color: #fff;
            z-index: 1;
        }

        input.ssf-form-control, select.ssf-form-control {
            -moz-appearance: none !important;
            -webkit-appearance: none !important;
            appearance: none !important;
        }

    }

    .ssf-form-group:not(.has-slot),
    .ssf-checkbox-group:not(.has-slot),
    .ssf-checkbox-switch:not(.has-slot),
    .ssf-radio-group:not(.has-slot) {
        margin-top: 8px;
        margin-bottom: 20px;
    }


</style>
