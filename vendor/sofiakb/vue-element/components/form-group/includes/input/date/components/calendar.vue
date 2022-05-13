<template>
  <div v-if="calendar" class="calendar-container" id="calendarContainer" @click="$emit('click', $event)">
    <div class="calendar-overlay" @click="onSelectDate()"></div>
    <div class="calendar-header">

      <div class="month-selector" @click="openSelector">
        <span class="month-label">{{ current.day.format('MMMM') | capitalize }}</span>
        <span class="year space-year">{{ current.year }}</span>
        <div class="selector-triangle"></div>
        <!--        <span class="year">{{ currentDay.format('YYYY') | capitalize }}</span>-->
      </div>

      <div class="month-cursor ssf-row">
        <div class="month-cursor-prev month-cursor-item" @click="setDate(-1)">
          <div class="month-chevron"></div>
        </div>
        <div class="month-cursor-next month-cursor-item" @click="setDate(1)">
          <div class="month-chevron"></div>
        </div>
      </div>

    </div>

    <div class="calendar-body">

      <div class="ssf-row">
        <div class="ssf-calendar-grid date-container" v-for="d in daysLabels">
          <div class="date-label">
            {{ d.substr(0, windowSmall() ? 1 : 3) | capitalize }}
          </div>
        </div>
      </div>

      <div v-for="c in calendar" class="ssf-row">
        <div class="ssf-calendar-grid date-container" v-for="(d, $i) in c">
          <div class="date-content" @click="onSelectDate(d)">
            <span class="date-cell" :class="`${getClass(d)}`" v-if="d">{{ Math.abs(d) }}</span>
            <span class="date-cell cell-hide" v-else>0</span>
          </div>
        </div>
      </div>

      <div v-for="i in complete" class="ssf-row">
        <div class="ssf-calendar-grid date-container">
          <div class="date-content">
            <span class="date-cell cell-hide">{{ i }}</span>
          </div>
        </div>
      </div>

    </div>

    <transition name="fade">
      <div class="months-container" v-show="show.selector">
        <div class="ssf-row">

          <div class="ssf-month-grid">
            <vue-custom-scrollbar class="years-selector" id="scrollMonth">
              <ul>
                <li v-for="(month, $idx) in months" :id="`${$idx + 1 === selected.month ? 'currentMonth' : ''}`"
                    @click="selected.month = $idx + 1">
                  <span>{{ month | capitalize }}</span>
                </li>
              </ul>
            </vue-custom-scrollbar>
          </div>

          <div class="ssf-year-grid">
            <vue-custom-scrollbar class="years-selector" :settings="{wheelPropagation: false}" id="scrollYear">
              <ul>
                <li v-for="n in 100" :id="`${parseInt(n + 1950) === selected.year ? 'currentYear' : ''}`"
                    @click="selected.year = n + 1950">
                  <span>{{ n + 1950 }}</span>
                </li>
              </ul>
            </vue-custom-scrollbar>
          </div>

        </div>

        <div class="ssf-row ssf-date-selector-actions">
          <div class="save" @click="select"></div>
          <div class="cancel" @click="cancel"></div>
        </div>

        <!--<div class="ssf-row current-year">
          <span>{{ currentDay.format('YYYY') }}</span>
        </div>
        <div class="ssf-row">
          <div class="ssf-month-grid" v-for="month in months">
            <div class="ssf-month-grid-content">
              <span>{{ month }}</span>
            </div>
          </div>
        </div>-->
      </div>
    </transition>
  </div>
</template>

<script>

  import moment   from "moment";
  import {Matrix} from '../../../../utils'

  import Helpers from '../../../../utils/helpers'

  import { PerfectScrollbar as VueCustomScrollbar } from 'vue3-perfect-scrollbar'

  export default {
    name: "SsfCalendar",

    components: {
      VueCustomScrollbar
    },

    props: {
      value: { required: false, default: null }
    },

    data() {
      return {

        current : { day: null, month: null, year: null },
        selected: { month: null, year: null },
        show    : { selector: false },

        calendar: null,

        helpers: Helpers,

        daysLabels: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
        months    : []
      }
    },

    created() {
      this.months = moment.months();
      return this.run()
    },

    filters: {
      capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    computed: {
      complete() {
        return (6 - this.calendar.length)
      },

      clientHeight() {
        let calendarContainer = document.getElementById('calendarContainer');
        return calendarContainer ? calendarContainer.clientHeight : null
      }
    },

    watch: {
      value() {
        if (this.value) {
          this.current.day = null;
          this.run()
        }
      }
    },

    methods: {

      select() {
        if (this.selected.year && this.selected.month)
          this.current.day = this.$date.moment(`${this.selected.year}-${this.$helpers.number.twoDigits(this.selected.month)}-01`);
        else if (this.selected.year)
          this.current.day = this.$date.moment(`${this.selected.year}-01-01`);
        this.run();
        this.show.selector = false
      },

      cancel() {
        this.selected = { month: null, year: null };
        this.show.selector = false
      },

      selectCurrentYear() {
        let currentYear = document.getElementById('currentYear'),
          scrollYear = document.getElementById('scrollYear');
        scrollYear.scrollTop = currentYear.offsetTop - (scrollYear.offsetHeight / 2)
      },

      openSelector() {
        this.selected = { month: this.current.day.month() + 1, year: this.current.day.year() };
        this.show.selector = true;
        this.$nextTick(() => {
          this.selectCurrentYear()
        })
      },

      setDate(o) {
        this.current.day.add(o, 'months');
        this.run()
      },

      getClass(dom) {
        let c = this.value === null ? '' : this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month + 1)}-${this.$helpers.number.twoDigits(dom)}`, 'YYYY-MM-DD').format('L') === this.$date.moment(this.value, this.$parent.format).format('L') ? ' active ' : '';
        return dom === 0 ? '' :
          dom > 0 ? c + this.getTodayClass(this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month + 1)}-${this.$helpers.number.twoDigits(dom)}`, 'YYYY-MM-DD'))
            : (c + 'cell-previous-month ' + this.getTodayClass(this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month)}-${this.$helpers.number.twoDigits(Math.abs(dom))}`, 'YYYY-MM-DD'))).trim();
      },

      getTodayClass(date) {
        return date.format('l') === this.$date.moment().format('l') ? 'today' : '';
      },

      fillCalendar() {
        let matrix = Matrix(this.current.year, this.current.month);
        for (let i = 0; i < matrix.length; i++) {
          let tmp = matrix[i][0];
          matrix[i].splice(0, 1);
          if (i > 0)
            matrix[i - 1].push(tmp);
          else if (tmp > 0 && i === 0) {
            matrix.unshift([0, 0, 0, 0, 0, 0, tmp]);
            i++
          }
        }
        this.calendar = matrix
      },

      run() {
        this.current.day = this.current.day || this.$date.moment(this.value, this.$parent.format);
        this.current.month = this.current.day.month();
        this.current.year = this.current.day.year();
        this.fillCalendar()
      },

      windowSmall() {
        return (window.innerWidth < 425)
      },

      onSelectDate(dom = null) {
        if (date === 0)
          return false;
        if (dom === null)
          return this.$emit('selected', this.value ? this.$date.moment(this.value, this.$parent.format) : null);
        let date = dom > 0 ? this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month + 1)}-${this.$helpers.number.twoDigits(dom)}`, 'YYYY-MM-DD')
          : this.$date.moment(`${this.current.year}-${this.$helpers.number.twoDigits(this.current.month)}-${this.$helpers.number.twoDigits(Math.abs(dom))}`, 'YYYY-MM-DD');
        this.$emit('selected', date)
      }

    }
  }
</script>

<style lang="scss">

  .calendar-container {
    position: relative;
    width: 375px;
    max-width: 100vw;
    box-sizing: border-box;
    border: 1px solid #ddd;
    user-select: none;

    @media screen and (max-width: 767px) {
      & {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-height: 415px;
        background: #fff;
        border: none;
        z-index: 1050;

        .calendar-header,
        .calendar-body {
          background: #FFFFFF;
        }

        .calendar-overlay {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, .5);
          z-index: -1;
        }
      }
    }

    .calendar-header {
      position: relative;
      height: 50px;

      .month-selector {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        height: 30px;
        width: 200px;
        margin-top: auto;
        margin-bottom: auto;
        cursor: pointer;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-left: .75rem;

        .selector-triangle {
          width: 0;
          height: 0;
          margin-left: 5px;
          border: 0 solid transparent;
          border-left-width: 6px;
          border-right-width: 6px;
          border-top: 5px solid black;
        }
      }

      .month-cursor {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        height: 30px;
        width: 75px;
        margin-top: auto;
        margin-bottom: auto;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: .75rem;

        .month-cursor-item {
          display: inline-block;
          position: relative;
          min-height: 1px;
          -webkit-box-flex: 0;
          -ms-flex: 0 0 50%;
          flex: 0 0 50%;
          max-width: 50%;
          width: 100%;

          $cursorColor: black;

          .month-chevron {
            border-bottom: 2px solid $cursorColor;
            width: 10px;
            height: 10px;
          }

          &.month-cursor-prev .month-chevron {
            border-left: 2px solid $cursorColor;
            transform: rotate(45deg);
          }

          &.month-cursor-next .month-chevron {
            margin-left: auto;
            border-right: 2px solid $cursorColor;
            transform: rotate(-45deg);
          }
        }

      }

    }

    .calendar-body {
      padding-top: 20px;

      .ssf-calendar-grid {
        display: inline-block;
        position: relative;
        width: 100%;
        min-height: 1px;
        flex: 0 0 14.285714%;
        max-width: 14.285714%;

        .date-label {
          font-weight: 700;
          text-align: center;
        }

        .date-content {
          height: 54px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;

          span.date-cell {
            font-weight: 400;
            height: 30px;
            width: 30px;
            border-radius: 50%;

            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &.active:not(.cell-previous-month) {
              background: #0f0f0f;
              color: #fff;
            }

            &.today:not(.cell-previous-month) {
              background: #2196F3;
              color: #fff;
            }

            &.cell-hide {
              opacity: 0;
            }

            &.cell-previous-month {
              color: #ddd;

              &.today {
                background: #ddd;
                color: #fff;
              }

            }
          }

        }


      }

    }

    .months-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;

      .years-selector {
        position: relative;
        height: 384px;
      }

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style-type: none;
          padding: 10px 0;
          cursor: pointer;

          &#currentYear,
          &#currentMonth {
            color: #fff;
            background-color: #0f0f0f;
          }
        }
      }

      .ssf-month-grid,
      .ssf-year-grid {
        display: inline-block;
        position: relative;
        width: 100%;
        min-height: 1px;
        box-sizing: border-box;

        li {
          padding: 0 .75rem;
          height: 32px;
          display: flex;
          align-items: center;
        }
      }

      .ssf-year-grid {
        flex: 0 0 30%;
        max-width: 30%;
        text-align: center;

        li {
          justify-content: center;
        }
      }

      .ssf-month-grid {
        flex: 0 0 70%;
        max-width: 70%;
        border-right: 1px solid #ddd;

        .ssf-month-grid-content {
          height: 33%;
          width: 100%;
        }

      }

      .ssf-date-selector-actions {
        border-top: 1px solid #ddd;
        height: 23px;

        .save, .cancel {
          display: inline-block;
          width: 50%;
          cursor: pointer;
        }

        .save {
          position: relative;

          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 2px;
            height: 14px;
            width: 7px;
            border-bottom: 2px solid #6aa280;
            border-right: 2px solid #6aa280;
            transform: rotate(45deg);
            margin: auto;
          }
        }

        .cancel {
          position: relative;

          &:before,
          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 2px;
            height: 16px;
            width: 2px;
            margin: auto;
            background: #d6534c;
          }

          &:before {
            transform: rotate(45deg);
          }

          &:after {
            transform: rotate(-45deg);
          }
        }
      }
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .34s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

  }

  .space-year {
    margin-left: 5px;
  }

</style>
