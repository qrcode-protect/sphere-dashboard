/**
 * File app/http/controllers/upload-controller.ts
 *
 * @author sofianeakbly
 **/
import Controller from "@sofiakb/vue3-framework/http/controllers/controller";

class UploadController extends Controller {
    post(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this.request('POST', url, {
                    ...{
                        redirectIfNotLogged: false,
                        file               : true,
                        headers            : { 'Content-Type': 'multipart/form-data' }
                    }, ...{ data }
                })
                .then((response) => resolve(response))
                .catch((error) => reject(error))
        })
    };
}

export default new UploadController()
