import moment     from 'moment-timezone'
import { number } from "./helpers";

export default class DateJs {

    constructor() {
        moment.locale('fr');
        moment.tz.setDefault('Europe/Paris');
    }

    static moment(date: string | null = null, format = 'YYYY/MM/DD') {
        moment.locale('fr');
        // moment.tz.setDefault('Europe/Paris');
        return date === null ? moment().tz('Europe/Paris') : format ? moment(date, format).tz('Europe/Paris') : moment(date).tz('Europe/Paris')
    }

    static momentSql(date: string | null = null, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.moment(date, format)
    }

    static age(birthday: string | any, unit = true) {
        let year = this.moment().diff(this.moment(birthday), 'years'), month, week;
        return unit || year > 0
            ? unit ? `${year} an${Math.abs(year || 0) > 1 ? 's' : ''}` : year
            : (month = this.moment().diff(this.moment(birthday), 'month')) > 0
                ? `${Math.abs(month)} mois`
                : `${week = this.moment().diff(this.moment(birthday), 'week')} semaine${Math.abs(week) > 1 ? 's' : ''}`
    }

    static between(start: string | any,end: string | any, unit = true) {
        let year = this.moment(end).diff(this.moment(start), 'years'), month, week;
        return year > 0
            ?`${year} an${Math.abs(year || 0) > 1 ? 's' : ''}`
            : (month = this.moment(end).diff(this.moment(start), 'month')) > 0
                ? `${Math.abs(month)} mois`
                : `${week = this.moment(end).diff(this.moment(start), 'week')} semaine${Math.abs(week) > 1 ? 's' : ''}`
    }

    static from(date: string | any) {
        const diff = this.diff(this.moment(), this.moment(date), false)
        let minutes = Math.abs(typeof diff === 'number' ? diff : 0), hours,
            when = this.moment() > this.moment(date) ? "il y a" : "dans", duration, unit;
        if (minutes < 60) {
            duration = minutes;
            unit = 'minutes'
        } else if ((hours = (minutes / 60)) < 24) {
            duration = hours;
            unit = 'heures'
        } else {
            duration = hours / 24;
            unit = 'jours'
        }

        return { when, duration, unit }
    }

    static diff(start: any = null, end: any = null, format: boolean = true) {
        let minutes = this.moment(end).diff(this.moment(start), 'minutes')
        return start && end
            ? format
                ? this.formatHoursAndMinutes(minutes / 60, minutes % 60)
                : minutes
            : null
    }

    static formatHoursAndMinutes(hours: string | number, minutes: string | number, separator = 'h') {
        return `${number.twoDigits(hours)}${separator}${number.twoDigits(minutes)}`
    }

    static formatTime(date: any, separator = 'h') {
        return this.formatHoursAndMinutes(date.hours(), date.minutes(), separator)
    }

}