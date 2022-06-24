"use strict";

import { partnerRepository } from "@app/modules/firebase/partner/partner-repository";

export const partnerCount = async () => await partnerRepository.count()
