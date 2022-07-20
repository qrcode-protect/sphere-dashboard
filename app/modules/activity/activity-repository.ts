/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/activity/activity-repository
 */

import Activity     from './activity'
import { Nullable } from "../../../types/nullable";

const activity = new Activity()

export const fetchAllActivities = () => activity.all()
export const fetchActivityById = (activityId: string): Promise<Nullable<Activity>> => activity.fetchBy(activityId) as Promise<Nullable<Activity>>
