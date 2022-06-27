<template>

    <div class="ssf-input-container ssf-form-text">

        <ssf-input-label
            :label="parent.label"
            :placeholder="placeholder"
            :icon="icon"
            @label-click="onLabelClick"
            :key="`text-label-${parent.label}`"
            v-if="parent.label"/>

        <textarea
            :id="parent.name"
            ref="inputComponent"
            :autocomplete="autocomplete"
            :class="`ssf-form-control ${parent.inputClass}`"
            :disabled="parent.disabled"
            :inputmode="parent.type"
            :name="parent.name"
            :placeholder="placeholder"
            :required="parent.required"
            :style="computedStyles"
            :value="val"
            @change="$emit('change')"
            @focus="resize"
            @input="onInput()"
        ></textarea>

    </div>
</template>
<script>

    import { defineComponent, ref, watch } from "vue";

    import SsfInputLabel from "./input-label";

    export default defineComponent({
        name: 'ssf-textarea',

        emits: [ 'focus', 'change', 'input' ],

        components: {SsfInputLabel},

        props: {
            value    : {
                type   : [ String, Number ],
                default: ''
            },
            autosize : {
                type   : Boolean,
                default: true
            },
            minHeight: {
                type     : [ Number ],
                'default': null
            },
            maxHeight: {
                type     : [ Number ],
                'default': null
            },
            /*
             * Force !important for style properties
             */
            important: {
                type   : [ Boolean, Array ],
                default: false
            }
        },

        setup(props) {
            ////////// data
            // data property for v-model binding with real textarea tag
            const val = ref(null)

            watch(() => props.value, () => val.value = props.value, { immediate: true })
        },

        data() {
            return {

                // works when content height becomes more then value of the maxHeight property
                maxHeightScroll: false,
                height         : 'auto'
            }
        },
        computed: {
            icon() {
                return this.parent.xIcon
            },

            parent() {
                return this.$parent
            },

            placeholder() {
                const placeholder = this.parent.placeholder, label = this.parent.label;
                return (placeholder === true) ? label : (typeof placeholder).toLowerCase() === 'string' ? placeholder : ''
            },

            autocomplete() {
                const autocomplete = this.parent.autocomplete;
                return `${autocomplete ? autocomplete === true ? this.parent.name : autocomplete : ''}`
            },
            computedStyles() {
                if (!this.autosize) return {}
                return {
                    resize  : !this.isResizeImportant ? 'none' : 'none !important',
                    height  : this.height,
                    overflow: this.maxHeightScroll ? 'auto' : (!this.isOverflowImportant ? 'hidden' : 'hidden !important')
                }
            },
            isResizeImportant() {
                const imp = this.important
                return imp === true || (Array.isArray(imp) && imp.includes('resize'))
            },
            isOverflowImportant() {
                const imp = this.important
                return imp === true || (Array.isArray(imp) && imp.includes('overflow'))
            },
            isHeightImportant() {
                const imp = this.important
                return imp === true || (Array.isArray(imp) && imp.includes('height'))
            }
        },
        watch   : {
            value(val) {
                this.resize()
                this.$emit('input', val)
            },
            val(val) {
                this.resize()
                this.$emit('input', val)
            },
            minHeight() {
                this.$nextTick(this.resize)
            },
            maxHeight() {
                this.$nextTick(this.resize)
            },
            autosize(val) {

                if (val) this.resize()
            }
        },
        methods : {
            resize() {
                const important = this.isHeightImportant ? 'important' : ''
                this.height = `auto${important ? ' !important' : ''}`
                this.$nextTick(() => {
                    let contentHeight = this.$refs.inputComponent.scrollHeight + 1

                    if (this.minHeight) {
                        contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight
                    }

                    if (this.maxHeight) {
                        if (contentHeight > this.maxHeight) {
                            contentHeight = this.maxHeight
                            this.maxHeightScroll = true
                        } else {
                            this.maxHeightScroll = false
                        }
                    }

                    const heightVal = contentHeight + 'px'
                    this.height = `${heightVal}${important ? ' !important' : ''}`
                })

                return this
            },

            onLabelClick() {
                this.$nextTick(() => {
                    this.focused = true
                    this.$refs.inputComponent.focus()
                    this.$forceUpdate()
                })
            },

            onInput() {
                this.$nextTick(() => {
                    this.val = this.$refs.inputComponent.value
                    return this.$emit('input', this.$refs.inputComponent.value);
                })
            }
        },
        created() {
            this.val = this.value
        },
        mounted() {
            this.resize()
        }
    })
</script>
