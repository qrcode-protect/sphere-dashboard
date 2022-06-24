/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File src/modules/user/user-repository
 */

import User                 from "@app/modules/firebase/user/user";
import FirebaseRepository   from "@app/core/firebase/firebase-repository";
import { ClassConstructor } from "@app/core/types/class-constructor";

class UserRepository extends FirebaseRepository {
    model: ClassConstructor<User>

    constructor() {
        super({ collectionName: User.collection });

        this.model = User
    }
}

export const userRepository = new UserRepository();
