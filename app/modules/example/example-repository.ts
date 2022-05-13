/*
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/modules/example/example-repository
 */

import Example from './example'

const example = new Example()

const fetchAllExample = () => example.all()

export {
    fetchAllExample,
}