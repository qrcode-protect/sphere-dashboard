/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File src/modules/request/request-repository
 */

import { Repository }        from "@sofiakb/vue3-framework/repository";
import { RequestController } from "@app/modules/request/request-controller";
import Request               from "@app/modules/request/request";
import { AxiosApiError }     from "@sofiakb/axios-api/lib/tools/api";
import Upload                from "@sofiakb/vue3-framework/models/upload";

import configAttributes  from "@config/api";
import { __createError } from "@sofiakb/vue3-framework/http/utils";


class RequestRepository extends Repository<Request> {
    constructor() {
        super({ controller: RequestController, model: Request });
    }

    decline(request: Request) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('decline'))
                return reject(<AxiosApiError>{ message: "Method [decline] not allowed", status: 400 })

            this.controller.update(`/${this.table}/decline`, this.__id(request.id), this.__data(request))
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        });
    }

    accept(data: any) {
        /*return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('accept'))
                return reject(<AxiosApiError>{ message: "Method [accept] not allowed", status: 400 })

            this.controller.update(`/${this.table}/accept`, this.__id(request.id), this.__data(request))
                .then((data: any) => resolve(this.setAttributes(data)))
                .catch((error: any) => reject(error))
        });*/

        const request = new Request()
        if (data.expiresAt) {
            data.expiresAt = data.expiresAt.valueOf()
        }
        const upload = new Upload(data, data, [
            'quotation',
            'memberId',
            'expiresAt',
            'amount'
        ])

        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('accept'))
                return reject(<AxiosApiError>{ message: "Method [accept] not allowed", status: 400 })

            upload.send(`${request.table}/accept/${data.id}`, { controller: { attributes: { server: configAttributes.server } } })
                .then((response) => resolve(response))
                .catch((error) => reject(__createError(error)))
        })
    }

    declined() {
        return this.fetchBy('declined')
    }

    accepted() {
        return this.fetchBy('accepted')
    }

    pending() {
        return this.fetchBy('pending')
    }

    terminated() {
        return this.fetchBy('terminated')
    }

    deniedByMember() {
        return this.fetchBy('denied-by-member')
    }

    allPaginated(page: number = 1, limit: number = 10, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('allPaginated'))
                return reject(<AxiosApiError>{ message: "Method [allPaginated] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}/paginate?page=${page}&limit=${limit}`, options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }

    pendingPaginated(page: number = 1, limit: number = 10, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('pendingPaginated'))
                return reject(<AxiosApiError>{ message: "Method [pendingPaginated] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}/pending/paginate?page=${page}&limit=${limit}`, options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }

    acceptedPaginated(page: number = 1, limit: number = 10, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('acceptedPaginated'))
                return reject(<AxiosApiError>{ message: "Method [acceptedPaginated] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}/accepted/paginate?page=${page}&limit=${limit}`, options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }

    declinedPaginated(page: number = 1, limit: number = 10, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('declinedPaginated'))
                return reject(<AxiosApiError>{ message: "Method [declinedPaginated] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}/declined/paginate?page=${page}&limit=${limit}`, options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }

    terminatedPaginated(page: number = 1, limit: number = 10, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('terminatedPaginated'))
                return reject(<AxiosApiError>{ message: "Method [terminatedPaginated] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}/terminated/paginate?page=${page}&limit=${limit}`, options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }

    deniedByMemberPaginated(page: number = 1, limit: number = 10, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.modelObject.isMethodAllowed('deniedByMemberPaginated'))
                return reject(<AxiosApiError>{ message: "Method [deniedByMemberPaginated] not allowed", status: 400 })

            this.controller.fetch(`/${this.table}/denied-by-member/paginate?page=${page}&limit=${limit}`, options)
                .then((data: any) => resolve(data))
                .catch((error: any) => reject(error))
        })
    }


}

export const requestRepository = new RequestRepository()

export const fetchAllRequests = () => requestRepository.all()
export const fetchAllRequestsPaginated = (page?: number) => requestRepository.allPaginated(page)

export const fetchPendingRequests = () => requestRepository.pending()
export const fetchPendingPaginated = (page?: number) => requestRepository.pendingPaginated(page)

export const fetchAcceptedRequests = () => requestRepository.accepted()
export const fetchAcceptedPaginated = (page?: number) => requestRepository.acceptedPaginated(page)

export const fetchDeclinedRequests = () => requestRepository.declined()
export const fetchDeclinedPaginated = (page?: number) => requestRepository.declinedPaginated(page)

export const fetchDeniedByMemberRequests = () => requestRepository.deniedByMember()
export const fetchDeniedByMemberPaginated = (page?: number) => requestRepository.deniedByMemberPaginated(page)

export const fetchTerminatedRequests = () => requestRepository.terminated()
export const fetchTerminatedPaginated = (page?: number) => requestRepository.terminatedPaginated(page)


