'use strict';

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/vue/router/index
 */

import { createRouter, createWebHistory, RouterOptions } from 'vue-router'
// @ts-ignore
import { Factory, Route }                                from 'vue-routisan'
import AuthenticationGuard                               from '../../http/guards/auth-guard'

Factory.usingResolver((path: string | any) => () => (typeof path) === 'string' ? path.includes('.') ? import(`@/views/${path.split('.')[0]}/components/${path.split('.')[1]}`) : import(`@/views/${path}`) : path)


Factory.withGuards({
    auth: AuthenticationGuard
})

Route.group({ guard: 'auth' }, () => {
    /* Page d'accueil */
    Route.view('/', 'home').name('home');
    Route.view('/members', 'members').name('members.index');
})

Route.group({}, () => {
    /* Page de connexion */
    Route.view('/login', 'auth/login').name('login');
    /* Page d'inscription*/
    // Router.view('/register', 'auth/register').name('register');
    /* Page de mot de passe oublié */
    // Router.view('/password/forgot', 'auth/password/forgot').name('password.forgot');
    /* Page de reset mot de passe */
    // Router.view('/password/reset/:email', 'auth/password/reset').name('password.reset')
});


Route.redirect('/:fallback(.*)*', { name: 'home' });

const router = createRouter(<RouterOptions>{
    history: createWebHistory(process.env.PUBLIC_PATH),
    routes : Factory.routes()
})

export default router
