import { RoleType } from "@app/modules/role/role-type";
import Partner      from "@app/modules/partner/partner";
import Member       from "@app/modules/member/member";
import Activity     from "@app/modules/activity/activity";

const mapping = {
    'home'          : {
        name : 'home',
        label: 'Accueil',
        icon : 'home',
        level: RoleType.marketing,
        show : false
    },
    'members.index' : {
        name : 'members.index',
        label: 'Adhérents',
        routes: ['members.index', 'members.create'],
        icon : Member.icon.name,
        level: RoleType.admin
    },
    'partners.index': {
        name : 'partners.index',
        label: 'Partenaires',
        routes: ['partners.index', 'partners.create'],
        icon : Partner.icon.name,
        level: RoleType.admin
    },
    'users.index'   : {
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
    'articles.index': {
        name : 'articles.index',
        label: 'Articles',
        routes: ['articles.index', 'articles.create', 'articles.edit'],
        icon : 'blog',
        level: RoleType.marketing
    },
    'networks.index': {
        name : 'networks.index',
        label: 'Réseaux',
        // routes: ['networks.index', 'articles.create'],
        icon : 'network-wired',
        level: RoleType.marketing
    },
    'members.index5': {
        name : 'members.index5',
        label: 'RFA',
        icon : 'receipt',
        level: RoleType.admin
    },
    'members.index7': {
        name : 'members.index5',
        label: 'Historique des conversations',
        icon : 'receipt',
        level: RoleType.admin
    },
    'tenders.index': {
        name : 'tenders.index',
        label: 'Bourse aux affaires',
        icon : 'shop',
        level: RoleType.admin
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
