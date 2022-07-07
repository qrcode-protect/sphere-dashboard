"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 07/07/2022 at 10:42
 * File app/modules/common-module
 */

import { reactive, toRefs } from "vue";
import { Nullable }         from "../../types/nullable";
import { isPdf }            from "@app/commons/file";
import { defined }          from "@app/commons";

export const useFormFile = () => {
    ////////// data


    const state = reactive({
        showInputFile: true,
        isFilePdf    : null as Nullable<boolean>,
        fileUrl      : null as Nullable<string>,
        file         : null as Nullable<File>
    })

    ////////// computed

    ////////// methods
    const onFileChange = (e: any) => {
        const event = (e || window.event), file = ((event.target || event.dataTransfer).files ?? [])[0] ?? null
        state.isFilePdf = isPdf(file?.type);
        state.fileUrl = defined(file) && !state.isFilePdf ? URL.createObjectURL(file!) : null;
        state.file = file
    }


    return {
        ...toRefs(state),
        onFileChange
    }
}
