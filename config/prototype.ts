import { controllers, middleware } from "@app/http";
import date                        from "@app/vue/utils/date";

const prototypes = (Vue: any, App: any, Npm: any) => {
    const properties: any = {
        $controller: controllers,
        $middleware: middleware,
        $swal      : Npm.sweetalert2,
        $cookie    : Npm.cookie,
        $helpers   : App.helpers,
        $date      : date
    }

    Object.keys(properties)
        .forEach(item => Vue.provide(item, properties[item]))

    return Object.assign(Vue.config.globalProperties, properties)
};

export default prototypes
