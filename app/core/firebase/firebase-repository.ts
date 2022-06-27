"use strict";

/*
 * partners
 *
 * (c) Sofiane Akbly <sofiane.akbly@qrcode-protect.com>
 *
 * Created by WebStorm on 03/06/2022 at 15:10
 * File src/core/firebase/firebase-repository
 */

import firebase             from "@app/core/firebase/firebase";
import { FirebaseApp }      from "@firebase/app";
import {
    collection,
    CollectionReference,
    doc,
    DocumentData,
    DocumentReference,
    DocumentSnapshot,
    FieldPath,
    Firestore,
    FirestoreError,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    OrderByDirection,
    query,
    Query, QueryConstraint,
    QueryDocumentSnapshot,
    QuerySnapshot,
    setDoc,
    startAfter,
    Timestamp,
    updateDoc,
    where,
    WhereFilterOp
} from "@firebase/firestore";
import { ClassConstructor } from "@app/core/types/class-constructor";
import { redirect }         from "@app/commons/auth";
import cookie               from "@sofiakb/cookie";
import store                from "@app/vue/store";
import { Nullable }         from "../../../types/nullable";

export interface FirebaseRepositoryAttributes {
    collectionName: string
}

export default class FirebaseRepository {
    instance: FirebaseApp
    firestore: Firestore
    collection: CollectionReference<DocumentData>
    snapshot: Nullable<Query<DocumentData>>;

    model: ClassConstructor<any> | null = null

    constructor(attributes: FirebaseRepositoryAttributes) {
        this.instance = firebase
        this.firestore = getFirestore()
        this.collection = collection(this.firestore, attributes.collectionName)
    }

    async casting(data: any) {
        return this.model ? new this.model(data) : null;
    }

    async _castData(querySnapshot: QuerySnapshot<DocumentData>) {
        return await Promise.all(querySnapshot.docs.map(async (doc: QueryDocumentSnapshot<DocumentData>) => await this.casting(doc.data())))
    }

    all() {
        this.snapshot = query(this.collection)
        return this;
    }

    where(column: string, value: string | string[] | number | boolean | null, operator: WhereFilterOp = "=="): this {
        return this.whereSnapshot(column, value, operator)
    }

    whereSnapshot(column: string, value: string | string[] | number | boolean | null, operator: WhereFilterOp = "=="): this {
        this.snapshot = query(this.snapshot ?? this.collection, where(column, operator, value))
        return this;
    }

    async findOneById(id: string): Promise<any[] | null> {
        return this.doc(id)
    }

    documentReference(docID: string): null | DocumentReference<DocumentData> {
        if (docID.trim() === "")
            return null;
        return doc(this.firestore, this.collection.path, docID)
    }

    async doc(docID: string, cast: boolean = true): Promise<any> {
        if (docID.trim() === "")
            return null;
        return new Promise(async (resolve, reject) => {
            const documentData: DocumentSnapshot<DocumentData> | void = await getDoc(this.documentReference(docID)!)
                .catch((error) => reject(FirebaseRepository.verifyLogin(error)))

            if (documentData instanceof DocumentSnapshot) {
                return documentData.exists()
                    ? resolve(cast ? await this.casting(documentData.data()) : documentData)
                    : resolve(null);
            } else reject(null)

        })
    }

    orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): this {
        this.snapshot = query(this.snapshot ?? this.collection, orderBy(fieldPath, directionStr))

        return this
    }

    async get(snapshot?: QuerySnapshot): Promise<any[] | null> {

        return new Promise((resolve, reject) => {

            if (!this.snapshot) {
                return reject(null)
            }

            const _query: Query = this.snapshot;

            getDocs(_query)
                .then(async (querySnapshot: QuerySnapshot<DocumentData>) => {
                    this.snapshot = null
                    resolve(await this._castData(querySnapshot));
                })
                .catch((error) => reject(FirebaseRepository.verifyLogin(error)))
                .finally(() => this.snapshot = null)
        })
    }

    async snapshots(callback?: Function): Promise<any[] | null> {

        return new Promise((resolve, reject) => {

            if (!this.snapshot) {
                return reject(null)
            }

            const _query: Query = this.snapshot;

            onSnapshot(_query, async (querySnapshot: QuerySnapshot<DocumentData>) => {
                this.snapshot = null
                const results = await this._castData(querySnapshot)
                if (callback) {
                    callback(results)
                }
                return resolve(results);
            }, (error) => reject(FirebaseRepository.verifyLogin(error)), () => this.snapshot = null);

        })
    }

    async update(docID: string, data: any, force = false): Promise<any> {
        if (docID.trim() === "")
            return null;

        const documentReference: Nullable<DocumentReference> = this.documentReference(docID)

        if (documentReference) {
            data.updatedAt = FirebaseRepository._now();
            delete data.createdAt
            if (force) {
                await setDoc(documentReference, data)
            } else {
                await updateDoc(documentReference, data)
            }
        }

        return this.doc(docID)
    }

    async count(_where?: QueryConstraint) {
        const _limit = 100;
        let count = 0;

        const _query = _where ? query(this.collection, _where, orderBy('id', 'desc'), limit(_limit)): query(this.collection, orderBy('id', 'desc'), limit(_limit))

        let snapshot: QuerySnapshot = await getDocs(_query)

        if (snapshot.docs != null) {
            while (snapshot.size > 0 && !snapshot.empty) {
                count += snapshot.size;
                snapshot = await getDocs(query(_query, startAfter(snapshot.docs[snapshot.size - 1])))
            }

        }
        return count;
    }

    static verifyLogin(error: FirestoreError): null | Promise<any> | FirestoreError {
        if (error.code === 'permission-denied') {
            cookie.delete(store.getters.TOKEN_NAME)
            return redirect.login.view()
        } else {
            return error
        }
    }

    static _now(): Date {
        return Timestamp.now().toDate()
    }

    /*async store(data): Promise<any> {
        if (!data.id) {
            data.id = "";
        }

        data.createdAt = Model._now();
        data.updatedAt = Model._now();

        const documentReference: DocumentReference = await this.collection.add({ ...this.cleanup(data) });
        await documentReference.update({ id: documentReference.id })
        return await this.casting({ ...data, id: documentReference.id, });
    }

    async update(docID: string, data, force = false): Promise<any> {
        if (docID.trim() === "")
            return null;

        const documentReference: DocumentReference = (await this.collection.doc(docID))
        data.updatedAt = Model._now();
        delete data.createdAt
        if (force) {
            await documentReference.set({ ...this.cleanup(data) })
        } else {
            await documentReference.update({ ...this.cleanup(data) })
        }

        return this.doc(docID)
    }

    async delete(docID: string): Promise<boolean> {
        if (docID.trim() === "")
            return false;

        return new Promise<boolean>((resolve, reject) => {
            this.collection.doc(docID)
                .delete()
                .then(() => resolve(true))
                .catch(() => reject(false))
        })

    }

    async casting(data) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return (new this.model()).createWithAttributes(data);
    }

    // async docs() {
    //     return (await this.collection.docs()).docs.map((doc: QueryDocumentSnapshot) => await this.casting(doc.data()))
    // }



    public async findOneBy(column: string, value: string): Promise<any> {
        const data = await this.where(column, value)
        return data ? data[0] || null : data
    }

    async get(snapshot?: QuerySnapshot): Promise<any[] | null> {

        if (this.snapshot) {
            snapshot = await this.snapshot.get()
        }

        if (!snapshot || snapshot.empty) {
            return null;
        }

        return await Promise.all(snapshot.docs.map(async (doc: QueryDocumentSnapshot<DocumentData>) => await this.casting(doc.data())))
    }

    orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): this {
        this.snapshot = (this.snapshot ?? this.collection).orderBy(fieldPath, directionStr)

        return this
    }

    async groupBy(fieldPath: string | FieldPath) {
        const orderedResult = await this.orderBy(fieldPath).get()
        let result: Nullable<Dictionary<any[]>> = null

        if (orderedResult && orderedResult.length) {
            result = groupBy(orderedResult, fieldPath)
        }

        return result;
    }*/

}
