// @ts-ignore
import { Guard } from 'vue-routisan'

export default class AuthenticationGuard extends Guard {
    handle(resolve: any, reject: any, { from, to }: any) {
        const token = localStorage.getItem('storage:sphere-dashboard:token')
        console.log(token)
        token && JSON.parse(token) === 'ok'
            ? resolve()
            : reject({ name: 'login' })
    }
}
