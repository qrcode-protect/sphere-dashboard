/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/quote/quote-repository
 */

import Quote from './quote'

const quote = new Quote()

const fetchAllQuote = () => quote.all()

const fetchWithStatus = (status: string, options: {} = {}): Promise<unknown> => quote.fetchBy(`by-current-transmitter/${status}`, options)


export const fetchAcceptedQuotes = (options: {} = {}): Promise<unknown> => fetchWithStatus('accepted', options)


export const fetchDeclinedQuotes = (options: {} = {}): Promise<unknown> => fetchWithStatus('declined', options)


export const fetchPendingQuotes = (options: {} = {}): Promise<unknown> => fetchWithStatus('pending', options)


export const fetchExpiredQuotes = (options: {} = {}): Promise<unknown> => fetchWithStatus('expired', options)

export const searchQuotation = (query: string, options: {} = {}): Promise<unknown> => quote.search(query, options)


export {
    fetchAllQuote,
}
