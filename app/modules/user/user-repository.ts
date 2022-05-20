/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/user/user-repository
 */

import User from './user'

const user = new User()


const fetchAllUsers = () => user.all()
const fetchAllDashboard = () => user.dashboard()
const fetchCurrentUser = () => User.current()


export {
    fetchAllUsers,
    fetchAllDashboard,
    fetchCurrentUser
}
