<template>
  <div class="triple-spinner"
       :style="{borderTopColor: shape.color, height: shape.size + 'px', width: shape.size + 'px', 'border-width': shape.thickness + 'px'}"></div>
</template>

<script>
  export default {
    name: "TripleSpinner",

    props: {
      size     : Number,
      thickness: Number,
      color1   : String,
      color2   : String,
      color3   : String,
    },

    watch: {
      size(value) {
        this.shape.size = value
      },

      thickness(value) {
        this.shape.thickness = value
        this.setBeforeStyle('border-width', `${value}px`)
        this.setAfterStyle('border-width', `${value}px`)
      },

      color1(value) {
        this.shape.color = value
      },

      color2(value) {
        this.setBeforeStyle('border-top-color', value)
      },

      color3(value) {
        this.setAfterStyle('border-top-color', value)
      }
    },

    mounted() {
      this.run()
    },

    data() {
      return {
        shape: {
          size     : 150,
          thickness: 2,
          color    : '#F8B195',
        }
      }
    },

    methods: {

      setBeforeStyle(prop, value) {
        this.setPseudoElementStyle(".triple-spinner", "::before", `{${prop}: ${value} !important;}`)
      },

      setAfterStyle(prop, value) {
        this.setPseudoElementStyle(".triple-spinner", "::after", `{${prop}: ${value} !important;}`)
      },

      setPseudoElementStyle(parent, pseudo, styles) {
        document.head.appendChild(document.createElement("style")).innerHTML = `${parent}${pseudo} ${styles}`;
      },

      checkSizeProp() {
        this.shape.size = this.size ? this.size : this.shape.size
      },

      checkColorProp() {
        this.shape.color = this.color1 ? this.color1 : this.shape.color
      },

      checkThicknessProp() {
        this.shape.thickness = this.thickness ? this.thickness : this.shape.thickness
        this.setBeforeStyle('border-width', `${this.thickness}px`)
        this.setAfterStyle('border-width', `${this.thickness}px`)
      },

      checkColor2Prop() {
        if (this.color2) this.setBeforeStyle('border-top-color', this.color2)
      },

      checkColor3Prop() {
        if (this.color3) this.setAfterStyle('border-top-color', this.color3)
      },

      checkAllProps() {
        this.checkSizeProp()
        this.checkColorProp()
        this.checkThicknessProp()
        this.checkColor2Prop()
        this.checkColor3Prop()
      },

      run() {
        this.checkAllProps()
      }
    }


  }
</script>

<style lang="scss" scoped>


  .triple-spinner {
    display: block;
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid #F8B195;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;


    &::before,
    &::after {
      content: "";
      position: absolute;
      border-radius: 50%;
      border: 2px solid transparent;
      -webkit-animation-name: spin;
      -moz-animation-name: spin;
      animation-name: spin;
      -webkit-animation-timing-function: linear;
      -moz-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }

    &::before {
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-top-color: #F67280;
      -webkit-animation-duration: 3.5s;
      -moz-animation-duration: 3.5s;
      animation-duration: 3.5s;
    }

    &::after {
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-top-color: #355C7D;
      -webkit-animation-duration: 1.75s;
      -moz-animation-duration: 1.75s;
      animation-duration: 1.75s;
    }

  }


  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }


</style>
