"use strict";

/*
 * sphere-dashboard
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 16/05/2022 at 10:50
 * File app/commons/validation
 */


import { keys } from "lodash";

const fields: any = {
    email      : "l'adresse e-mail",
    firstname  : "le prénom",
    lastname   : "le nom",
    company    : "la société / organisation",
    phone      : "le numéro de téléphone",
    password   : "le mot de passe",
    companyName: "le nom commercial",
    siret      : "le siret",
    activityId : "le domaine d'activité",
    certificate: "le kbis",
    label      : "le libellé",
}

const requiredMessage = (field: string) => `${fields[field].capitalize()} est obligatoire`
const formatMessage = (field: string) => `${fields[field].capitalize()} a un mauvais format`

export const messages = {
    'email.required'           : requiredMessage("email"),
    'email.format'             : formatMessage("email"),
    'firstname.required'       : requiredMessage("firstname"),
    'lastname.required'        : requiredMessage("lastname"),
    'company.required'         : requiredMessage("company"),
    'phone.required'           : requiredMessage("phone"),
    'phone.format'             : formatMessage("phone"),
    'password.required'        : requiredMessage("password"),
    'companyName.required'     : requiredMessage("companyName"),
    'siret.required'           : requiredMessage("siret"),
    'activityId.required'      : requiredMessage("activityId"),
    'certificate.required'     : requiredMessage("certificate"),
    'label.required'           : requiredMessage("label"),
    'confirmPassword.different': "Le mot de passe et la confirmation doivent être identiques",
}

const inputError = (key: string, clear: boolean = false) => clear ? $(`input[name=${key}]`).removeClass('invalid') : $(`input[name=${key}]`).addClass('invalid');

export const validator = (data: any) => {
    if (!data) return { valid: false };

    let valid = true, error = null, errors: string[] = [];
    keys(data).forEach(key => {
        if (data[key] === null || typeof data[key] === "undefined" || (typeof data[key] === 'string' && data[key].trim() === '')) {
            inputError(key);
            valid = false;
            error = "Merci de renseigner tous les champs marqués d'un *"
            errors.push(`${key}.required`)
        } else inputError(key, true);

    });

    return { valid, error, errors }
}

export const validate = {
    email(email: string): boolean {
        if (email === null || email.trim() === '') {
            inputError('email')
            return false
        }

        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    },

    phone(phone: string): boolean {
        return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(phone)
    },

    password(password: string) {
        if (/(?=.*[A-Z])/.test(password) && /(?=.*[a-z])/.test(password) && /(?=.*\d)/.test(password) && /(?=.*?[\/+~"'{}()|#`_\[\]=%§.,:;?!@$^&*-])/.test(password) && /.{8,}/.test(password))
            return true

        inputError('password')
        return false
    },

    confirmPassword(password: string, confirmation: string) {
        if (password && password.trim() !== '' && validate.password(password) && password === confirmation)
            return true

        inputError('confirmPassword')
        return false
    }
}
