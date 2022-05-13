<template>
  <div class="ssf-input-container ssf-form-number">

    <input-label :label="parent.label" :placeholder="placeholder" :icon="icon" @label-click="onLabelClick"
                 key="number-label"/>

    <!-- TYPE : NUMBER -->
    <input class="ssf-form-control" :type="inputType" :inputmode="parent.inputmode ? 'decimal' : ''" :id="parent.name"
           :name="parent.name" :value="parent.value" :class="parent.inputClass" :required="parent.required"
           :disabled="parent.disabled" :placeholder="placeholder" :autocomplete="autocomplete" :step="parent.step"
           :min="parent.min" :max="parent.max" @input="onInput()" @change="$emit('change')" @focusin="focused = true"
           @focusout="focused = false" ref="inputComponent" @focus="$emit('focus')">

    <div class="ssf-number-control">
      <div class="control control-more" @click="onInput(1)">
        <span></span>
      </div>
      <div class="control control-less" @click="onInput(-1)">
        <span></span>
      </div>
    </div>

  </div>
</template>

<script>

  import InputLabel from "./includes/InputLabel";

  export default {
    name: "SsfInputNumber",

    components: { InputLabel },

    props: {},

    data() {
      return {
        focused: false,
      }
    },

    computed: {

      icon() {
        return this.parent.$data.options.icon
      },

      parent() {
        return this.$parent
      },

      placeholder() {
        let placeholder = this.parent.placeholder, label = this.parent.label;
        return (placeholder === true) ? label : (typeof placeholder).toLowerCase() === 'string' ? placeholder : ''
      },

      autocomplete() {
        let autocomplete = this.parent.autocomplete;
        return `${autocomplete ? autocomplete === true ? this.parent.name : autocomplete : ''}`
      },

      small() {
        return window.innerWidth < 768
      },

      inputType() {
        return this.small ? 'text' : this.parent.type
      }
    },

    methods: {

      onLabelClick() {
        this.$nextTick(() => {
          this.focused = true;
          this.$refs.inputComponent.focus();
          this.$forceUpdate()
        })
      },

      format(value = null) {
        if (!value && !this.$parent.value)
          return 0;
        if (!value)
          value = this.$parent.value;
        value = (value || 0).toString().replace('.', ',');
        value = !value.includes(',') || (value).toString().split(',').length > 1 ? value : parseInt(`${value}00`);
        return (Math.round(value) === value ? parseInt(value) : parseFloat(value))
      },

      increase(value) {
        return !this.parent.max || (this.parent.max && value + this.parent.step <= this.parent.max) ? value + this.parent.step : this.parent.max && value + this.parent.step > this.parent.max ? this.parent.max : 0;
      },

      decrease(value) {
        return (!this.parent.min && parseInt(this.parent.min) !== 0) || ((this.parent.min || parseInt(this.parent.min) === 0) && value - this.parent.step >= this.parent.min) ? value - this.parent.step : (this.parent.min || parseInt(this.parent.min) === 0) && value - this.parent.step < this.parent.min ? this.parent.min : 0;
      },

      onInput(direction = null) {
        let value = this.format();
        value = Number.isNaN(value) ? Number.isNaN(this.parent.min) ? 0 : this.parent.min : value;
        return direction === 1
          ? this.$emit('input', this.format(this.increase(value)))
          : direction === -1
            ? this.$emit('input', this.format(this.decrease(value)))
            : this.$nextTick(() => {
              this.$emit('input', this.format(this.$refs.inputComponent.value))
            });
      }
    }
  }
</script>

<style lang="scss" scoped>

  $defaultBorder: #ddd;
  $defaultBorderRadius: 4px;

  .ssf-form-number {
    position: relative;

    .ssf-form-control {
      padding-right: 0;
      padding-left: 50px;
    }

    label {
      margin-left: 42px;
    }

    .ssf-form-control:focus + label,
    label.active {
      margin-left: 42px;
    }

    .ssf-number-control {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;

      .control {
        position: absolute;
        top: 1px;
        bottom: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        cursor: pointer;
        background: #fff;
        transition: all .5s;

        &:hover {
          background: #000;

          &.control-more:before,
          &.control-less:before {
            color: #ffffff;
          }
        }

        &.control-more {
          right: 1px;
          border-top-right-radius: $defaultBorderRadius;
          border-bottom-right-radius: $defaultBorderRadius;

          &:before {
            content: '+';
          }
        }

        &.control-less {
          left: 1px;
          border-top-left-radius: $defaultBorderRadius;
          border-bottom-left-radius: $defaultBorderRadius;

          &:before {
            content: '-';
          }
        }

        &.control-more:before,
        &.control-less:before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
          -ms-flex-align: center;
          align-items: center;
          -ms-flex-pack: center;
          justify-content: center;
          display: -ms-flexbox;
          display: flex;
          font-weight: 300;
          font-size: 1.5rem;
        }

      }
    }

  }

</style>
