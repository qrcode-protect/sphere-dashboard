/**
 * File app/http/controllers/auth-controller.ts
 *
 * @author sofianeakbly
 **/

import { __createError } from '@sofiakb/vue3-framework/http/utils';
import configAttributes  from '@config/auth';

import Controller from "@sofiakb/vue3-framework/http/controllers/controller";

export class AuthController extends Controller {

    constructor(attributes = configAttributes) {
        super(attributes);
    }

    login(data: any) {
        let user = { ...data };
        user.password = data.password;

        this.deleteUserData();

        return new Promise((resolve, reject) => {
            this.request('POST', '/login', { ...{ redirectIfNotLogged: false }, ...{ data: user } })
                .then((response) => {
                    this.setTokenAndStorage(response);
                    return resolve(response)
                })
                .catch((error) => reject(__createError(error).message))
        })

    };

    register(data: any, url = '/register') {
        // let user = { ...data };
        // user.password = data.password;
        // delete user.confirm_password;
        //
        // return new Promise((resolve, reject) => {
        //     if (data.password !== data.confirm_password)
        //         return reject("Les mots de passes ne correspondent pas");
        //     if (!UserAuth.is.strongPassword(data.password))
        //         return reject("Le mot de passe doit contenir 8 caractère minimum dont au moins : 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial");
        //     this.request('POST', url, { ...{ redirectIfNotLogged: false }, ...{ data: user } })
        //         .then((response) => {
        //             this.setTokenAndStorage(response);
        //             return resolve(response)
        //         })
        //         .catch((error) => reject(error))
        // })
    };

    forgot(data: any) {
        return new Promise((resolve, reject) => {
            this.request('POST', '/password/forgot', { ...{ redirectIfNotLogged: false }, ...{ data } })
                .then((response) => resolve(response))
                .catch((error) => reject(error))
        })
    }

    reset(data: any) {
        return this.register(data, '/password/reset');
    }

    logout() {
        // return new Promise((resolve, reject) => {
        //     this.request('POST', '/logout', { ...{ redirectIfNotLogged: false } })
        //         .then((response) => resolve(response))
        //         .catch((error) => reject(error))
        //         .finally(() => UserAuth.deleteTokenAndStorage())
        // })
    }

    setTokenAndStorage(data: any) {
        // return data ? UserAuth.setTokenAndStorage(data.token, data.user) : null
    }

    deleteUserData() {
        // return UserAuth.deleteTokenAndStorage()
    }
}

export default new AuthController()
