<template>
    <form-input
        :key="`input-component-${name}-${inputKey}`"
        :ref="el => { input = el }"
        :autocomplete="autocomplete"
        :col="col"
        :disabled="disabled"
        :error-messages="errorMessages"
        :errors="errors"
        :form-group-class="formGroupClass"
        :icon="icon"
        :input-class="`qrcp-form-control ${inputClass}`"
        :label="label"
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
        :wheel-propagation="wheelPropagation"
        :type="type"
        :value="value"

        @update:value="onUpdateValue">

        <template v-if="withHelp" #default>
            <div :style="`--help-item-bottom: ${helpItemBottom}px`"
                 class="help-item align-flex"
                 @mouseenter="hoverHelp = true"
                 @mouseleave="hoverHelp = false">

                <ssf-icon :class="helpColor" icon="question-circle" la size="lg"/>

                <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <div v-if="hoverHelp" class="help-content small rounded p-1 text-center text-white full-flex">
                        {{ helpText }}
                    </div>
                </transition>

            </div>
        </template>

    </form-input>
</template>

<script>

    import { defineComponent, onMounted, ref, watch } from "vue";
    import { filter, includes }                       from "lodash";

    import { messages as errorMessages } from "@app/commons/validation";
    import FormInput                     from "@/components/commons/form-input";


    export default defineComponent({
        name: "qrcp-input",
        components: { FormInput },
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

            /* SELECT */
            select      : { type: Boolean, required: false, default: false },
            optionItems : { type: [ Array, Object ], required: false },
            optionField : { type: String, required: false, default: null },
            optionLabel : { type: String, required: false, default: 'label' },
            optionGroup : { type: Boolean, required: false, default: false },
            multiple    : { type: Boolean, required: false, default: false },
            scrollX     : { type: Boolean, required: false, default: false },
            wheelPropagation: { type: Boolean, required: false, default: false },
            selectHeight: { type: [ Number, String ], required: false, default: 350 },

            icon: { type: [ String ], required: false },

            errors: { type: Array },

            withHelp : { type: Boolean, required: false, default: false },
            helpText : { type: String, required: false },
            helpColor: { type: String, required: false, default: 'help-text-info' }
        },

        setup(props) {
            ////////// data
            const hoverHelp = ref(false)
            const helpItemBottom = ref(0)
            const inputKeyIndex = ref(0)
            const inputKey = ref(`input-component-${props.name}-${inputKeyIndex.value}`)

            ////////// computed
            const input = ref(null)

            ////////// methods
            const updateHelpItemBottom = () => {
                helpItemBottom.value = 0
                filter(input.value?.$el?.children, (i) => includes(i.classList, 'form-input-error'))
                    .forEach(item => helpItemBottom.value += (item?.clientHeight || 0))
                helpItemBottom.value += 7
            }

            ////////// mount
            onMounted(() => updateHelpItemBottom())

            ////////// watch
            watch(inputKeyIndex, () => inputKey.value = `input-component-${props.name}-${inputKeyIndex.value}`)
            watch(input, () => updateHelpItemBottom())

            return {
                //// data
                hoverHelp,
                helpItemBottom,
                inputKey,

                //// computed
                input,

                errorMessages
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

<style lang="scss" scoped>
    .help-item {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: calc(var(--help-item-bottom, 0) + 10px);
        height: 15px;
        width: 15px;
        margin-top: auto;
        margin-bottom: auto;

        .help-text-info {
            color: var(--color-info);
        }

        .help-content {
            position: absolute;
            top: -62px;
            left: -67.5px;
            right: -67.5px;
            width: 150px;
            height: 55px;
            background: rgba(0, 0, 0, .6);

            &:before {
                top: 100%;
                left: 50%;
                border: solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
            }

            &:before {
                border-color: rgba(194, 225, 245, 0);
                border-top-color: rgba(0, 0, 0, .6);
                border-width: 5px;
                margin-left: -5px;
            }

        }
    }
</style>
