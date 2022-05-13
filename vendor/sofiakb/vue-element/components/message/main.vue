<template>
  <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
    <ssf-container not-full
                   class="ssf__message ssf__message-success"
                   :class="cssClass"
                   :style="`--message-height: ${height}; --message-width: ${width}; border-color: ${color}`"
                   v-if="visible">

      <ssf-container not-full class="position-absolute close-container">
        <ssf-icon icon="times" class="cursor-pointer" :style="`color: ${color}`"
                  @click="close" la/>
      </ssf-container>

      <ssf-container class="message-container">

        <ssf-row class="full-flex">
          <ssf-container type="inline-block" not-full class="icon-container">
            <ssf-icon :icon="icon" size="2x" :style="`color: ${color}`" la/>
          </ssf-container>

          <ssf-container type="inline-block" not-full class="content">
            <p>{{ message }}</p>
          </ssf-container>

          <ssf-container v-if="timer" class="position-absolute message-timer" not-full
                         :style="`width: ${((timeout - (1000 * remain)) / timeout) * 100}%`">
          </ssf-container>
        </ssf-row>

      </ssf-container>
    </ssf-container>
  </transition>
</template>

<script>
  export default {
    name: "ssf-message",

    props: {
      color  : { type: String, required: false, default: '#6aa280' },
      timer  : { type: Boolean, required: false, default: false },
      timeout: { type: Number, required: false, default: 5000 },
      icon   : { type: String, required: false, default: 'check-circle' },
      message: { type: String, required: true },
    },

    data() {
      return {
        visible : false,
        position: null,
        height  : 0,
        width   : 0,
        remain  : 0
      }
    },

    mounted() {
      this.$nextTick(() => {
        let items = document.getElementsByClassName(`ssf__message`), position,
          classes = _.map(items, item => item.getAttribute('class'));

        position = classes.length + 1;

        this.position = `ssf__message--item${position}`
      })
    },

    computed: {
      cssClass() {
        let classes = { 'visible': this.visible }, positionClass = this.position;

        if (this.position)
          classes[positionClass] = true;

        return classes
      },
    },

    watch: {
      position() {
        this.$nextTick(() => {
          const positionClass = this.position, item = document.getElementsByClassName(`${positionClass}`)[0];
          this.height = item ? `${item.clientHeight}px` : 0;
          this.width = item ? `${item.clientWidth}px` : 0;
          this.$forceUpdate()
        })
      }
    },

    methods: {

      open() {
        this.visible = true;
        this.$emit('open')
        if (this.timer) {
          const seconds = this.timeout / 1000
          for (let i = 0; i < (seconds + 1); i++)
            setTimeout(() => this.remain = i, i * 1000)
          setTimeout(() => this.close(), this.timeout + 1000)
        }
      },

      close() {
        this.visible = false;
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="scss">

  .ssf__message {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: calc(calc(var(--message-height, 0) / 2) * -1);
    margin-left: calc(calc(var(--message-width, 0) / 2) * -1);
    max-width: 514px;
    z-index: 2051;
    background: #ffffff;

    border-radius: 4px;
    border-left-width: 4px;
    border-left-style: solid;


    padding: 20px 30px 20px 10px;

    /*padding-bottom: 10px;*/
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;

    .close-container {
      top: 5px;
      right: 8px;
    }

    .message-container {
      --icon-width: 70px;

      .icon-container {
        width: var(--icon-width, 50px);
        text-align: center;
      }

      .content {
        width: calc(100% - var(--icon-width, 50px));
        padding: 2px 5px;
      }
    }

    .message-timer {
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: #ccc;
      transition: width 1s linear;
    }


    p {
      margin: 0 !important;
    }


  }

</style>
