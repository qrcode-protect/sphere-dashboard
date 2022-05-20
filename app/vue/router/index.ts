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
import { Factory, Route }                        from 'vue-routisan'
import { AdminGuard, AuthGuard, MarketingGuard } from "@app/http/guards";

Factory.usingResolver((path: string | any) => () => (typeof path) === 'string' ? path.includes('.') ? import(`@/views/${path.split('.')[0]}/components/${path.split('.')[1]}`) : import(`@/views/${path}`) : path)


Factory.withGuards({
    auth     : AuthGuard,
    admin    : AdminGuard,
    marketing: MarketingGuard,
})

Route.group({ guard: 'auth' }, () => {
    /* Page d'accueil */
    Route.view('/', 'home').name('home');

    Route.group({ guard: 'admin' }, () => {
        Route.view('/members', 'members').name('members.index');
        Route.view('/users', 'users').name('users.index');

        Route.view('/members2', 'members').name('members.index2');
        Route.view('/members3', 'members').name('members.index3');
        Route.view('/members5', 'members').name('members.index5');
        Route.view('/members6', 'members').name('members.index6');
    });

    Route.view('/articles', 'articles').name('articles.index');
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
