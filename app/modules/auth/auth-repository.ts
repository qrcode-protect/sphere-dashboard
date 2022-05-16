/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/example/example-repository
 */

import Auth from './auth'

const auth = new Auth()

const fetchAllAuth = () => auth.all()

export {
    fetchAllAuth,
}
