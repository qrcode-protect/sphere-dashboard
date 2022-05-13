<template>
  <div class="ssf-input-container ssf-form-select" @click="toggleShowItems">

    <ssf-input-label
      :label="parent.label"
      :icon="parent.xIcon"
      @label-click="onLabelClick"
      :key="`select-label-${parent.label}`"
      v-if="parent.label"/>

    <ssf-container
      class="ssf-select-container"
      @dblclick="onDoubleClick">

      <ssf-container not-full class="selector-triangle"/>

      <ssf-container
        name="form-control"
        class="ssf-form-control"
        :class="parent.inputClass"
        :id="parent.name">

        <vue-custom-scrollbar
          class="ssf-select-input-container"
          :class="{open: show.items}"
          :style="{height: ssfContainerHeight}"
          :options="{wheelPropagation: false, suppressScrollX: !this.parent.scrollX}">

          <ssf-container
            name="text-container"
            class="ssf-text-container"
            :class="{open: show.items}"
            ref="ssfTextContainer">
            <span :value="parent.value">{{ textValue }}</span>
          </ssf-container>

          <ssf-container
            name="value-container"
            class="ssf-value-container">

            <ul v-show="show.items" id="ssfValueList" ref="ssfValueList">
              <li
                class="ssf-value-item"
                :class="{selected: selectedValue(item)}"
                v-if="parent.optionItems && parent.optionField"
                v-for="item in parent.optionItems"
                @click.stop="onSelectedOption(item[parent.optionField])">
                {{ parent.optionLabel ? item[parent.optionLabel] : item[parent.optionField] }}
              </li>
              <li
                class="ssf-value-item"
                :class="{selected: selectedValue(item)}"
                v-else-if="parent.optionItems"
                v-for="item in parent.optionItems"
                @click.stop="onSelectedOption(item)">
                {{ item }}
              </li>
            </ul>
          </ssf-container>
        </vue-custom-scrollbar>

      </ssf-container>

    </ssf-container>
  </div>
</template>


<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<script>

  import { PerfectScrollbar as VueCustomScrollbar } from 'vue3-perfect-scrollbar'

  import SsfInputLabel from "./input-label";

  export default {
    name: "ssf-select",

    props: {},

    components: {
      SsfInputLabel,
      VueCustomScrollbar
    },

    computed: {
      parent() {
        return this.$parent
      },

      textValue() {
        if (this.parent.value && this.parent.multiple === false && !Array.isArray(this.parent.value))
          return this.parent.optionLabel ? this.parent.optionItems.find(item => item[this.parent.optionField] === this.parent.value)[this.parent.optionLabel] || '' : this.parent.value
        else if (this.parent.value && this.parent.multiple && Array.isArray(this.parent.value) && this.parent.value.length > 0)
          return (this.parent.optionItems.filter(item => this.parent.value.includes(item[this.parent.optionField])).map(item => item[this.parent.optionLabel]).join(', '))
        else if (this.show.items || !this.parent.label)
          return `Choisir une valeur... ${this.parent.required ? '(*)' : ''}`
        return null
        // return this.parent.value && this.parent.multiple === false && !Array.isArray(this.parent.value)
        //        ? (this.parent.optionLabel ? this.parent.optionItems.find(item => item[this.parent.optionField] === this.parent.value)[this.parent.optionLabel] : this.parent.value)
        //        : this.parent.value && this.parent.multiple && Array.isArray(this.parent.value) && this.parent.value.length > 0
        //          ? (this.parent.optionItems.filter(item => this.parent.value.includes(item[this.parent.optionField])).map(item => item[this.parent.optionLabel]).join(', '))
        //          : this.show.items || !this.parent.label
        //            ? `Choisir une valeur... ${this.parent.required ? '(*)' : ''}`
        //            : null
      }
    },

    data() {
      return {
        show              : { items: false },
        ssfContainerHeight: 0,
        focused           : false,
        value             : null
      }
    },

    mounted() {
      this.$nextTick(() => this.ssfContainerHeight = this.getSsfContainerHeight())
    },

    methods: {

      onLabelClick() {
        // this.toggleShowItems()
      },

      toggleShowItems() {
        this.show.items = !this.show.items
        this.$nextTick(() => this.ssfContainerHeight = this.getSsfContainerHeight())
      },

      getSsfContainerHeight() {
        let element = this.$refs.ssfValueList
        return element && element.clientHeight > 0 ? `${Math.min(this.parent.selectHeight, element.clientHeight + this.$refs.ssfTextContainer.$el.clientHeight)}px` : 'inherit';
      },

      selectedValue(item) {
        if (!this.parent.multiple || !Array.isArray(this.parent.value)) {
          if (this.parent.optionField && this.parent.optionLabel)
            return item[this.parent.optionField] === this.parent.value
          else return item === this.parent.value
        } else {
          if (this.parent.optionField && this.parent.optionLabel)
            return this.parent.value.find(data => item[this.parent.optionField] === data)
          else return this.parent.value.find(data => item === data)
        }
      },

      onSelectedOption(value) {
        if (!this.parent.multiple)
          this.toggleShowItems()
        else {
          if (Array.isArray(this.parent.value))
            value = this.parent.value.find(data => data === value) ? this.parent.value.filter(data => data !== value) : this.parent.value.concat([ value ])
          else value = this.parent.value ? [ this.parent.value, value ] : [ value ]
        }
        this.$emit('input', value)
      },

      onDoubleClick(event) {
        event.preventDefault()
      },

      updateValue() {
        this.$nextTick(() => this.$emit('input', this.$refs.selectComponent.value))
        this.$forceUpdate()
      },

    }
  }
</script>

<style scoped lang="scss">

  .ssf-form-select {
    .ssf-select-container {
      position: relative;
      cursor: pointer;

      .selector-triangle {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        margin-top: auto;
        margin-bottom: auto;
        width: 5px;
        height: 5px;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      .ssf-select-input-container {
        &.open {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 2px 5px 0 rgba(255, 255, 255, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
          background: #FFF;
          -webkit-border-radius: var(--form-radius);
          -moz-border-radius: var(--form-radius);
          border-radius: var(--form-radius);
          z-index: 1051;

          &:before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            z-index: -1;
            background: transparent;
            cursor: default;
          }
        }
      }

      .ssf-text-container {
        &.open {
          height: 50px;
          line-height: 50px;
          padding-left: 10px;
          width: 100%;
          color: #dddddd;
        }
      }

      .ssf-value-container {
        & > ul {
          padding: 0;
          margin: 0;
        }

        & li {
          list-style-type: none;
          padding: 10px;

          &:last-of-type {
            -webkit-border-bottom-left-radius: var(--form-radius);
            -moz-border-radius-bottomleft: var(--form-radius);
            border-bottom-left-radius: var(--form-radius);
            -webkit-border-bottom-right-radius: var(--form-radius);
            -moz-border-radius-bottomright: var(--form-radius);
            border-bottom-right-radius: var(--form-radius);
          }

          &.ssf-value-item {
            &:hover {
              background: #000;
              color: #FFF;
            }

            &.selected {
              background: #ddd;
            }
          }
        }
      }

    }
  }

</style>
