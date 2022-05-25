/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/member/member-repository
 */

import Member       from './member'
import { Nullable } from "../../../types/nullable";

const member = new Member()

const fetchAllMembers = () => member.all()
const fetchAllActiveMembers = (activityId?: Nullable<string>) => member.findActive(activityId)
const fetchAllInactiveMembers = () => member.findInactive()

export {
    fetchAllMembers,
    fetchAllActiveMembers,
    fetchAllInactiveMembers,
}
