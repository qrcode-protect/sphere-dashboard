// @ts-ignore
import { Guard } from 'vue-routisan'
import cookie    from "@sofiakb/cookie";
import store     from "@app/vue/store";

export default class AuthenticationGuard extends Guard {
    handle(resolve: any, reject: any, { from, to }: any) {
        const token = cookie.get(store.getters.TOKEN_NAME)

        if (token && token.trim() !== '')
            return reject(from ? from : { name: from.name });

        return resolve()
    }
}
