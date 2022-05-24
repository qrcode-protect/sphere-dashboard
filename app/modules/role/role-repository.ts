/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/role/role-repository
 */

import Role from './role'

const role = new Role()


const fetchAllRoles = () => role.all()

export {
    fetchAllRoles,
}
