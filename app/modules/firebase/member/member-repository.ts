/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File src/modules/member/member-repository
 */

import Member               from "@app/modules/firebase/member/member";
import FirebaseRepository   from "@app/core/firebase/firebase-repository";
import { ClassConstructor } from "@app/core/types/class-constructor";
import { where }            from "@firebase/firestore";

class MemberRepository extends FirebaseRepository {
    model: ClassConstructor<Member>

    constructor() {
        super({ collectionName: Member.collection });

        this.model = Member
    }

    countPremium() {
        return this.count(where('premium', '==', true))
    }
}

export const memberRepository = new MemberRepository();
