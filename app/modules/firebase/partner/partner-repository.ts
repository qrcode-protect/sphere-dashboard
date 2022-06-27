/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File src/modules/partner/partner-repository
 */

import Partner                 from "@app/modules/firebase/partner/partner";
import FirebaseRepository   from "@app/core/firebase/firebase-repository";
import { ClassConstructor } from "@app/core/types/class-constructor";

class PartnerRepository extends FirebaseRepository {
    model: ClassConstructor<Partner>

    constructor() {
        super({ collectionName: Partner.collection });

        this.model = Partner
    }
}

export const partnerRepository = new PartnerRepository();
