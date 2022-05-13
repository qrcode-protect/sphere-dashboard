<template>
    <img :src="imgPath" alt="Logo" :height="imgHeight" :width="imgWidth"/>
</template>

<script>
    export default {
        name : "logo",
        props: {
            src   : { type: String, required: false, default: 'img/logo.png' },
            height: { type: String | Number, required: false, default: 'auto' },
            width : { type: String | Number, required: false, default: 'auto' },
        },

        data() {
            return {
                imgPath  : null,
                imgHeight: 'auto',
                imgWidth : 'auto',
            }
        },

        watch: {
            src   : {
                immediate: true,
                handler(val, oldVal) {
                    this.editPath()
                }
            },
            height: {
                immediate: true,
                handler(val, oldVal) {
                    this.setImgSize(val)
                }
            },
            width : {
                immediate: true,
                handler(val, oldVal) {
                    this.setImgSize(val, 'width')
                }
            },

        },

        methods: {
            setImgSize(val, type = 'height') {
                type = type.capitalize()
                if (val === 'auto')
                    this[`img${type}`] = val
                else if (typeof val === 'string') {
                    if (val.includes('%'))
                        this[`img${type}`] = val
                    else this[`img${type}`] = val.includes('px') ? val : `${val}px`
                }
            },

            editPath() {
                try {
                    this.imgPath = require(`@/assets/${this.src}`).default
                }
                catch (e) {
                    console.warn(e)
                    // this.imgPath = this.src
                }
            }
        }
    }
</script>

<style scoped>

</style>
