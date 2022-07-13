import { RoleType } from "@app/modules/role/role-type";
import Partner      from "@app/modules/partner/partner";
import Member       from "@app/modules/member/member";
import Activity     from "@app/modules/activity/activity";

const mapping = {
    'home'            : {
        name : 'home',
        label: 'Accueil',
        icon : 'home',
        level: RoleType.marketing,
        show : false
    },
    'members.index'   : {
        name  : 'members.index',
        label : 'Adhérents',
        routes: [ 'members.index', 'members.create', 'members.by-number' ],
        icon  : Member.icon.name,
        level : RoleType.admin,
        badge: null
    },
    'partners.index'  : {
        name  : 'partners.index',
        label : 'Fournisseurs',
        routes: [ 'partners.index', 'partners.create', 'partners.by-number' ],
        icon  : Partner.icon.name,
        level : RoleType.admin,
        badge: null
    },
    'users.index'     : {
        name : 'users.index',
        label: 'Utilisateurs',
        icon : 'users',
        level: RoleType.admin
    },
    'activities.index': {
        name : 'activities.index',
        label: 'Domaines d\'activités',
        icon : Activity.icon.name,
        level: RoleType.admin
    },
    'articles.index'  : {
        name  : 'articles.index',
        label : 'Articles',
        routes: [ 'articles.index', 'articles.create', 'articles.edit' ],
        icon  : 'blog',
        level : RoleType.marketing
    },
    'networks.index'  : {
        name : 'networks.index',
        label: 'Réseaux',
        // routes: ['networks.index', 'articles.create'],
        icon : 'network-wired',
        level: RoleType.marketing
    },
    'rfa.index'  : {
        name : 'rfa.index',
        label: 'RFA',
        icon : 'receipt',
        level: RoleType.admin
    },
    'history.index'   : {
        name : 'history.index',
        label: 'Historique des conversations',
        icon : 'clock-rotate-left',
        routes: [ 'history.index', 'history.messages' ],
        level: RoleType.admin
    },
    'tenders.index'   : {
        name  : 'tenders.index',
        label : 'Bourse aux affaires',
        icon  : 'shop',
        routes: [ 'tenders.index', 'tenders.create', 'tenders.edit' ],
        level : RoleType.admin
    },
};

const exclude = [
    'login',
    'register',
    'password.forgot',
    'password.reset',
    'logout'
];

export {
    mapping,
    exclude
}
