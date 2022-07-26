'use strict';

/*
 * vue3-project-default
 *
 * (c) Sofiane Akbly <sofiane.akbly@gmail.com>
 *
 * Created by WebStorm on 28/09/2021 at 10:11
 * File app/vue/router/index
 */

import { createRouter, createWebHashHistory, createWebHistory, RouterOptions } from 'vue-router'
// @ts-ignore
import { Factory, Route }                                                      from 'vue-routisan'
import { AdminGuard, AuthGuard, GuestGuard, MarketingGuard }                   from "@app/http/guards";

Factory.usingResolver((path: string | any) => () => (typeof path) === 'string' ? path.includes('.') ? import(`@/views/${path.split('.')[0]}/components/${path.split('.')[1]}`) : import(`@/views/${path}`) : path)


Factory.withGuards({
    auth     : AuthGuard,
    admin    : AdminGuard,
    marketing: MarketingGuard,
    guest    : GuestGuard,
})

Route.group({ guard: 'auth' }, () => {
    /* Page d'accueil */
    Route.view('/', 'home').name('home');

    Route.group({ guard: 'admin' }, () => {

        Route.group({ prefix: 'members' }, () => {
            Route.view('/', 'members').name('members.index');
            Route.view('/:memberNumber', 'members.by-number').name('members.by-number');
            Route.view('/create', 'members.create').name('members.create');
        });

        Route.view('/users', 'users').name('users.index');

        Route.group({ prefix: 'partners' }, () => {
            Route.view('/', 'partners').name('partners.index');
            Route.view('/:partnerNumber', 'partners.by-number').name('partners.by-number');
            Route.view('/create', 'partners.create').name('partners.create');
        })

        Route.group({ prefix: 'activities' }, () => {
            Route.view('/', 'activities').name('activities.index');
        });

        Route.group({ prefix: 'rfa' }, () => {
            Route.view('/', 'quote').name('rfa.index');
        });

        Route.group({ prefix: 'history' }, () => {
            Route.view('/', 'history.index').name('history.index');
            Route.view('/quotation', 'quote').name('history.quotation');
            Route.view('/requests', 'requests').name('history.requests');
            Route.view('/requests/accepted', 'requests').name('history.requests.accepted');
            Route.view('/requests/declined', 'requests').name('history.requests.declined');
            Route.view('/requests/pending', 'requests').name('history.requests.pending');
            Route.view('/requests/denied-by-member', 'requests').name('history.requests.denied-by-member');
            Route.view('/requests/terminated', 'requests').name('history.requests.terminated');

            Route.view('/:id', 'history.messages').name('history.messages');
        });

        Route.view('/members5', 'members').name('members.index5');



        Route.group({ prefix: 'tenders' }, () => {
            Route.view('/', 'tenders').name('tenders.index');
            Route.view('/create', 'tenders.create').name('tenders.create.public');
            Route.view('/create/private', 'tenders.create').name('tenders.create.private');

            Route.view('/create/choose-type', 'tenders.choose').name('tenders.create');

            Route.view('/edit/:id', 'tenders.edit').name('tenders.edit');
        });

    });

    Route.group({ guard: 'marketing' }, () => {

        Route.group({ prefix: 'articles' }, () => {
            Route.view('/', 'articles').name('articles.index');
            Route.view('/create', 'articles.create').name('articles.create');
            Route.view('/edit', 'articles.edit').name('articles.edit');
        })

        Route.group({ prefix: 'networks' }, () => {
            Route.view('/', 'networks').name('networks.index');
        })

    })
})

Route.group({ guard: 'guest' }, () => {
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
    history: process.env.ROUTER_MODE === 'history' ? createWebHistory(process.env.PUBLIC_PATH) : createWebHashHistory(process.env.PUBLIC_PATH),
    routes : Factory.routes()
})

export default router
