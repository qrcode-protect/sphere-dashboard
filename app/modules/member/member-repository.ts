/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/member/member-repository
 */

import Member       from './member'
import { Nullable } from "../../../types/nullable";

const member = new Member()

export const fetchAllMembers = () => member.all()
export const fetchAllActiveMembers = (activityId?: Nullable<string>) => member.findActive(activityId)
export const fetchActiveMembersByNumber = (memberNumber: Nullable<string>) => member.findActiveByNumber(memberNumber)
export const fetchAllPremiumMembers = (activityId?: Nullable<string>) => member.findPremium(activityId)
export const fetchAllInactiveMembers = () => member.findInactive()
export const byEmail = (email: string) => member.byEmail({ email })

