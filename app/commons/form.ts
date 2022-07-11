"use strict";

/*
 * vue-auth
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 01/07/2022 at 11:13
 * File src/commons/form
 */

import { reactive, Ref, toRefs }   from "vue";
import { validator as xValidator } from "@app/commons/validation";
import { Nullable }                from "../../types/nullable";

interface _FormState {
    error: Nullable<string>,
    success: Nullable<string>,
    errors: string[],
    loading: boolean,
}

export interface FormState {
    error: Ref<Nullable<string>>,
    success: Ref<Nullable<string>>,
    errors: Ref<string[]>,
    loading: Ref<boolean>,

    validator(data: unknown): boolean

    setLoading(value: boolean): void

    setError(value: Nullable<string>): void

    setSuccess(value: Nullable<string>): void
}

export const useForm = () => {
    const state = reactive<_FormState>({
        error  : null,
        success: null,
        errors : [],
        loading: false,
    })

    const validator = (data: unknown) => {
        const result = xValidator(data)
        state.errors = result.errors ?? []
        state.error = result.error
        return result.valid
    }

    const setLoading = (value: boolean) => state.loading = value
    const setError = (value: Nullable<string>) => state.error = value
    const setSuccess = (value: Nullable<string>) => state.success = value

    return {
        ...toRefs(state),
        validator,
        setLoading,
        setError,
        setSuccess,
    }
}
