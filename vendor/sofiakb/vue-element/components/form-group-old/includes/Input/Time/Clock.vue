<template>
  <div class="clock-container" id="clockContainer" @click="$emit('click', $event)">

    <div class="clock-body">

      <div class="ssf-row ssf-clock-row">

        <div class="ssf-clock-grid time-container">
          <div class="clock-controls">
            <div class="clock-control clock-control-more" @click.stop="increase('hours')"></div>
            <div class="clock-control clock-control-less" @click.stop="decrease('hours')"></div>
          </div>
          <transition name="bounce" enter-active-class="ssf-bounce-enter" leave-active-class="ssf-bounce-leave"
                      mode="out-in">
            <div :key="`hours-${selected.hours}`" class="time-cell">{{ $helpers.number.twoDigits(selected.hours) }}</div>
          </transition>
        </div>

        <div class="ssf-clock-grid time-container">
          <div class="clock-controls">
            <div class="clock-control clock-control-more" @click.stop="increase('minutes')"></div>
            <div class="clock-control clock-control-less" @click.stop="decrease('minutes')"></div>
          </div>
          <transition name="bounce" enter-active-class="ssf-bounce-enter" leave-active-class="ssf-bounce-leave"
                      mode="out-in">
            <div :key="`minutes-${selected.minutes}`" class="time-cell">{{ $helpers.number.twoDigits(selected.minutes) }}</div>
          </transition>
        </div>

        <div class="ssf-clock-grid time-container">
          <div class="clock-controls">
            <div class="clock-control clock-control-more" @click.stop="increase('seconds')"></div>
            <div class="clock-control clock-control-less" @click.stop="decrease('seconds')"></div>
          </div>
          <transition name="bounce" enter-active-class="ssf-bounce-enter" leave-active-class="ssf-bounce-leave"
                      mode="out-in">
            <div :key="`minutes-${selected.seconds}`" class="time-cell">{{ $helpers.number.twoDigits(selected.seconds) }}</div>
          </transition>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

  import moment  from "moment";
  import Helpers from '../../../utils/helpers'

  import VueCustomScrollbar from 'vue-custom-scrollbar'

  export default {
    name: "SsfClock",

    components: {
      VueCustomScrollbar
    },

    props: {
      value: { required: false, default: null }
    },

    data() {
      return {

        current : { time: null, hours: null, minutes: null, seconds: null },
        selected: { hours: null, minutes: null, seconds: null },
        show    : { selector: true },

        clock: null,

        helpers: Helpers,

        daysLabels: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
        months    : []
      }
    },

    created() {
      this.months = moment.months()
      return this.run()
    },

    watch: {
      value() {
        if (this.value) {
          this.current.time = null;
          this.run()
        }
      }
    },

    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    computed: {
      time() {
        let result
        if (this.value) {
          let tmp = this.value.split(':')
          result = { hours: tmp[0] || 14, minutes: tmp[1] || 0, seconds: tmp[2] || 0 }
        } else result = { hours: 14, minutes: 0, seconds: 0 }
        return result
      },

      formatted() {
        return `${this.$helpers.number.twoDigits(this.current.time.hours)}:${this.$helpers.number.twoDigits(this.current.time.minutes)}:${this.$helpers.number.twoDigits(this.current.time.seconds)}`
      }
    },

    methods: {

      increase(type, value = 1) {
        let max = type === 'hours' ? 24 : 60
        this.selected[type] = (parseInt(this.selected[type]) + value) % max
        if (this.selected[type] < 0)
          this.selected[type] = max + this.selected[type]
        this.current.time[type] = this.selected[type]
        this.run()
        this.$emit('selected', this.formatted)
      },

      decrease(type, value = -1) {
        this.increase(type, value)
      },

      select() {
        if (this.selected.year && this.selected.month)
          this.current.day = this.$date.moment(`${this.selected.year}-${this.$helpers.number.twoDigits(this.selected.month)}-01`)
        else if (this.selected.year)
          this.current.day = this.$date.moment(`${this.selected.year}-01-01`)
        this.run()
        this.show.selector = false
      },

      cancel() {
        this.selected = { month: null, year: null }
        this.show.selector = false
      },

      selectCurrentYear() {
        let currentYear = document.getElementById('currentYear'),
          scrollYear = document.getElementById('scrollYear')
        scrollYear.scrollTop = currentYear.offsetTop - (scrollYear.offsetHeight / 2)
      },

      openSelector() {
        this.selected = { month: this.current.day.month() + 1, year: this.current.day.year() }
        this.show.selector = true
        this.$nextTick(() => {
          this.selectCurrentYear()
        })
      },

      setDate(o) {
        this.current.day.add(o, 'month')
        this.run()
      },

      getClass(dom) {
        let c = this.value === null ? '' : this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month + 1)}-${this.$helpers.number.twoDigits(dom)}`, 'YYYY-MM-DD').format('L') === this.$date.moment(this.value, 'YYYY-MM-DD').format('L') ? ' active ' : ''
        return dom === 0 ? '' :
          dom > 0 ? c + this.getTodayClass(this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month + 1)}-${this.$helpers.number.twoDigits(dom)}`, 'YYYY-MM-DD'))
            : (c + 'cell-previous-month ' + this.getTodayClass(this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month)}-${this.$helpers.number.twoDigits(Math.abs(dom))}`, 'YYYY-MM-DD'))).trim();
      },

      getTodayClass(date) {
        return date.format('l') === this.$date.moment().format('l') ? 'today' : '';
      },

      fillCalendar() {
        this.selected = {
          hours  : this.current.hours,
          minutes: this.current.minutes,
          seconds: this.current.seconds
        }
      },

      run() {
        this.current.time = this.current.time || this.time
        this.current.hours = this.current.time.hours
        this.current.minutes = this.current.time.minutes
        this.current.seconds = this.current.time.seconds
        this.fillCalendar()
      },

      windowSmall() {
        return (window.innerWidth < 425)
      },

      onSelectDate(dom) {
        if (date === 0)
          return false
        let date = dom > 0 ? this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month + 1)}-${this.$helpers.number.twoDigits(dom)}`, 'YYYY-MM-DD')
          : this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month)}-${this.$helpers.number.twoDigits(Math.abs(dom))}`, 'YYYY-MM-DD')
        this.$emit('selected', date)
      }

    }
  }
</script>

<style lang="scss">

  .clock-container {
    position: relative;
    height: 100px;
    width: 250px;
    max-width: 100vw;
    box-sizing: border-box;
    border: 1px solid #ddd;
    user-select: none;

    .clock-body {
      height: 100%;

      .ssf-row.ssf-clock-row {
        height: 100%;
      }

      .ssf-clock-grid {
        position: relative;
        width: 100%;
        min-height: 1px;
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
        display: flex;
        justify-content: center;
        align-items: center;

        .clock-control {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 50px;
          cursor: pointer;
          transition: all .5s;
          z-index: 1;

          &.clock-control-more {
            top: 1px;

            &:before {
              border-top: 2px solid #0f0f0f;
              border-left: 2px solid #0f0f0f;
              top: 10px;
            }

          }

          &.clock-control-less {
            bottom: 1px;

            &:after {
              border-bottom: 2px solid #0f0f0f;
              border-right: 2px solid #0f0f0f;
              bottom: 10px;
            }
          }

          &.clock-control-more:before,
          &.clock-control-less:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            transform: rotate(45deg);
            width: 10px;
            height: 10px;
          }

        }

        .time-cell {
          font-size: 20px;
        }

      }

    }

    .ssf-bounce,
    .ssf-bounce-enter,
    .ssf-bounce-leave {
      animation-duration: .3s;
      margin: 0 auto 0 auto;
      transform-origin: bottom;
      animation-timing-function: ease;
    }

    .ssf-bounce-leave {
      animation-name: bounce-leave;
    }

    .ssf-bounce-enter {
      animation-name: bounce-enter;
    }

    @keyframes bounce-leave {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      30% {
        transform: translateY(-20px);
      }
      100% {
        opacity: 0;
        transform: translateY(0);
      }
    }

    @keyframes bounce-enter {
      0% {
        opacity: 0;
        transform: translateY(0);
      }
      70% {
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

  }

</style>
