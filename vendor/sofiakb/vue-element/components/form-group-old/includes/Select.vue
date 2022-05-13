<template>
  <div class="ssf-input-container ssf-form-select">

    <input-label :label="parent.label" :icon="icon" @label-click="onLabelClick"
                 key="select-label"/>

    <div class="ssf-select-container" @click="toggleShowItems" @dblclick="onDoubleClick">

      <div class="selector-triangle"></div>

      <div class="ssf-form-control" :class="parent.inputClass" :id="parent.name">

        <vue-custom-scrollbar class="ssf-select-input-container" :class="{open: show.items}"
                              :style="{height: ssfContainerHeight}"
                              :settings="{wheelPropagation: false, suppressScrollX: !this.parent.scrollX}">
          <div class="ssf-text-container" :class="{open: show.items}" ref="ssfTextContainer">
            <span v-if="parent.value && parent.multiple === false && !Array.isArray(parent.value)"
                  :value="parent.value">
              {{ parent.optionLabel ? parent.optionItems.find(item => item[parent.optionField] === parent.value)[parent.optionLabel] : parent.value }}
            </span>
            <span v-else-if="parent.value && parent.multiple && Array.isArray(parent.value) && parent.value.length > 0"
                  :value="parent.value">
              {{ parent.optionItems.filter(item => parent.value.includes(item[parent.optionField])).map(item => item[parent.optionLabel]).join(', ') }}
              <!--              {{ parent.optionLabel ? parent.optionItems.find(item => item[parent.optionField] === parent.value)[parent.optionLabel] : parent.value }}-->
            </span>
            <span v-else-if="show.items || !parent.label" class="ssf-select-option-title">Choisir une valeur... {{ parent.required ? '(*)' : '' }}</span>
          </div>
          <div class="ssf-value-container">
            <ul v-show="show.items" id="ssfValueList" ref="ssfValueList">
              <li class="ssf-value-item" :class="{selected: selectedValue(item)}"
                  v-if="parent.optionItems && parent.optionField"
                  v-for="item in parent.optionItems"
                  @click.stop="onSelectedOption(item[parent.optionField])">
                {{ parent.optionLabel ? item[parent.optionLabel] : item[parent.optionField] }}
              </li>
              <li class="ssf-value-item" :class="{selected: selectedValue(item)}" v-else-if="items"
                  v-for="item in items"
                  @click.stop="onSelectedOption(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </vue-custom-scrollbar>

      </div>
    </div>
  </div>
</template>

<script>

  import InputLabel from "./Input/includes/InputLabel";
  import SsfIcon    from '../../icon/'

  import VueCustomScrollbar from 'vue-custom-scrollbar'

  export default {
    name: "SsfSelect",

    props: {
      /* /!* COMMONS *!/
       name      : { type: String, required: true },
       label     : { type: String, required: false },
       value     : { required: false, default: null },
       required  : { type: Boolean, required: false, default: false },
       inputClass: { type: String, required: false, default: '' },

       /!* SELECT *!/
       items      : { type: Array, required: true },
       field      : { type: String, required: false, default: null },
       optionLabel: { type: String, required: false, default: null },*/
    },

    components: {
      InputLabel,
      SsfIcon,
      VueCustomScrollbar
    },

    computed: {
      icon() {
        return this.parent.icon
      },

      parent() {
        return this.$parent
      },
    },

    data() {
      return {
        show              : { items: false },
        ssfContainerHeight: 0,
        focused           : false
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.ssfContainerHeight = this.getSsfContainerHeight()
      })
    },

    methods: {

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

      onLabelClick() {
        this.toggleShowItems()
      },

      getSsfContainerHeight() {
        let element = this.$refs.ssfValueList
        return element && element.clientHeight > 0 ? `${Math.min(this.parent.selectHeight, element.clientHeight + this.$refs.ssfTextContainer.clientHeight)}px` : 'inherit';
      },

      toggleShowItems() {
        this.show.items = !this.show.items
        this.$nextTick(() => {
          this.ssfContainerHeight = this.getSsfContainerHeight()
        })
      },

      onSelectedOption(value) {
        if (!this.parent.multiple)
          this.toggleShowItems()
        else {
          if (Array.isArray(this.parent.value))
            value = this.parent.value.find(data => data === value) ? this.parent.value.filter(data => data !== value) : this.parent.value.concat([value])
          else value = this.parent.value ? [this.parent.value, value] : [value]
        }
        this.$emit('input', value)
      },

      onDoubleClick(event) {
        event.preventDefault()
      },

      updateValue() {
        this.$nextTick(() => {
          this.$emit('input', this.$refs.selectComponent.value)
        })
      },

    }
  }
</script>

<style scoped>

  .ssf-select-container {
    position: relative;
    cursor: pointer;
  }

  .ssf-select-input-container.open {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    background: #FFF;
    z-index: 1051;
  }

  .ssf-select-input-container.open:before {
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

  .ssf-value-container {
    /*background-color: #fff;*/
  }

  .ssf-value-container > ul {
    padding: 0;
    margin: 0;
  }

  .ssf-value-container li {
    list-style-type: none;
    padding: 10px;
  }

  /*.ssf-text-container {
    cursor: pointer;
  }*/

  .ssf-text-container.open {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    width: 100%;
    color: #dddddd;
  }

  .ssf-value-item:hover {
    background: #000;
    color: #FFF;
  }

  .ssf-value-item.selected {
    background: #ddd;
    /*color: #FFF;*/
  }

  .ssf-select-option-title {
    color: #ddd;
  }

  .selector-triangle {
    position: absolute;
    top: 0;
    right: 10px;
    /*left: 0;*/
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    width: 5px;
    height: 5px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    transform: rotate(45deg);
    /*margin-left: 5px;*/
    /*border: 0 solid transparent;*/
    /*border-left-width: 5px;*/
    /*border-right-width: 5px;*/
    /*border-top: 5px solid black;*/
  }

  /*

 */

</style>
