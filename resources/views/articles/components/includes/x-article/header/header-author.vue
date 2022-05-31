<template>

    <ssf-container class="border-top border-bottom border-color-2 border-strong-2" name="article-writer" not-full>

        <ssf-title h1 no-margin>
            {{ fullName.firstname }}
        </ssf-title>
        <ssf-title v-if="fullName.lastname" h1 no-margin>{{ fullName.lastname }}</ssf-title>

    </ssf-container>

</template>

<script lang="ts">
    import { computed, defineComponent, PropType } from "vue"

    export default defineComponent({
        name: "article-header-writer",

        props: {
            writer: { type: [ String, null ] as PropType<string>, required: true, }
        },

        setup(props) {
            ////////// init

            ////////// data

            ////////// computed
            const fullName = computed(() => {
                const name = (props.writer ?? 'réseau sphère').toUpperCase().split(' ')
                return {
                    firstname: name[0],
                    lastname : name[1] ?? null,
                };
            })

            ////////// methods

            return {
                //// computed
                fullName
            }
        }

    })
</script>

<style lang="scss" scoped>

    .ssf__section--article-writer {
        .ssf__title {
            font-weight: 500;
            @media screen and (max-width: 991px) {
                font-size: 1.5rem !important;
            }
        }
    }

</style>
