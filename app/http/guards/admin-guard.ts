// @ts-ignore
import { Guard } from 'vue-routisan'

import { handle }   from "@app/http/guards/utils";
import { RoleType } from "@app/modules/role/role-type";

export default class AdminGuard extends Guard {
    handle(resolve: any, reject: any, { from, to }: any) {
        return handle(RoleType.admin, resolve, reject, { from, to }, 'articles.index')
    }
}
