"use strict";

/*
 * sphere-partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 13/06/2022 at 14:12
 * File src/commons/file
 */


import { FullMetadata, getMetadata, ref as firebaseStorageRef } from "firebase/storage";
import { firebaseStorage }                                      from "@app/core/firebase/firebase";
import { includes } from "lodash";
import { Nullable } from "../../types/nullable";
import { defined }  from "@app/commons/index";



export const filename = (fullPath: Nullable<string>): Nullable<string> => defined(fullPath) ? fullPath?.replace(/^.*[\\\/]/, '') ?? '' : null
export const extension = (fullPath: Nullable<string>, withDot?: boolean): Nullable<string> => defined(fullPath) ? (withDot === true ? '.' : '') + (filename(fullPath)?.split('.')?.pop() ?? '') : null

const firebaseStorageMetadata: (url: string) => Promise<Nullable<FullMetadata>> = (url: string) => {
    return new Promise((resolve) => {
        try {
            const attachmentStorageRef = firebaseStorageRef(firebaseStorage, url);

            getMetadata(attachmentStorageRef)
                .then((metadata: FullMetadata) => resolve(metadata))
                .catch(() => resolve(null));
        } catch (e) {
            return resolve(null);
        }
    })

}
const firebaseStorageMimeType = async (url: string, metadata?: Nullable<FullMetadata>): Promise<Nullable<string>> => (metadata ?? await firebaseStorageMetadata(url))?.contentType ?? null
const firebaseStorageFilename = async (url: string, metadata?: Nullable<FullMetadata>): Promise<Nullable<string>> => filename((metadata ?? await firebaseStorageMetadata(url))?.fullPath ?? null)
const firebaseStorageSize = async (url: string, metadata?: Nullable<FullMetadata>): Promise<Nullable<number>> => (metadata ?? await firebaseStorageMetadata(url))?.size ?? null

export const firebaseFile = {
    metadata: firebaseStorageMetadata,
    mimeType: firebaseStorageMimeType,
    filename: firebaseStorageFilename,
    filesize: firebaseStorageSize,
}

const isMimeType = (fileMimeType: string, target: string, strict = false) => strict ? fileMimeType === target : includes(fileMimeType, target)
export const isPdf = (mimeType: string): boolean => isMimeType(mimeType, 'application/pdf')
export const isImage = (mimeType: string): boolean => isMimeType(mimeType, 'image')

export const fileIcon = (filename: Nullable<string>): string => {
    const _extension: Nullable<string> = extension(filename),
        icons: any = {
            pdf : 'file-pdf',
            doc : 'file-word',
            docx: 'file-word',
            csv : 'file-csv',
            xls : 'file-excel',
            xlsx: 'file-excel',
            zip : 'file-archive',
            gz  : 'file-archive',
            tar : 'file-archive',
            rar : 'file-archive',
            '7z': 'file-archive',
            jpg : 'file-image',
            png : 'file-image',
            gif : 'file-image',
            txt : 'file-lines',
        };

    return _extension ? icons[_extension] ?? 'file' : 'file'
}

export const humanizeSize = (size: Nullable<number>, unit: boolean = true): string | number =>
    size === null || typeof size === 'undefined' ? 0 :
        size / 1000 < 1000
            ? Number((size / 1000).toFixed(1)) + (unit ? ' Ko' : '')
            : size / 1000 / 1000 < 1000
                ? Number((size / 1000 / 1000).toFixed(1)) + (unit ? ' Mo' : '')
                : Number((size / 1000 / 1000 / 1000).toFixed(1)) + (unit ? ' Go' : '')

