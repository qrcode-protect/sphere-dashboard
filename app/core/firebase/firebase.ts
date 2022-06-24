"use strict";

/*
 * partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 15:04
 * File src/core/firebase/firebase
 */

import { initializeApp } from "@firebase/app";
import firebaseConfig    from "@config/firebase";
import { getAuth }       from "@firebase/auth";
import { getStorage }    from "@firebase/storage";

const firebaseApp = initializeApp(firebaseConfig)


export default firebaseApp

export const firebaseAuth = getAuth(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp);

