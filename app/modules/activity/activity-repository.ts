/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/activity/activity-repository
 */

import Activity from './activity'

const activity = new Activity()

const fetchAllActivity = () => activity.all()

export {
    fetchAllActivity,
}
