"use strict";

import { memberRepository } from "@app/modules/firebase/member/member-repository";

export const memberCount = async () => await memberRepository.count()
export const memberPremiumCount = async () => {
    const test = await memberRepository.countPremium()
    return test;
}
