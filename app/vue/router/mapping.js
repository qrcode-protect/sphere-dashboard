import { RoleType } from "@app/modules/role/role-type";

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
        icon : 'screen-users',
        level: RoleType.admin
    },
    'users.index'   : {
        name : 'users.index',
        label: 'Utilisateurs',
        icon : 'users',
        level: RoleType.admin
    },
    'members.index2': {
        name : 'members.index2',
        label: 'Domaines d\'activités',
        icon : 'asterisk',
        level: RoleType.admin
    },
    'members.index3': {
        name : 'members.index3',
        label: 'Partenaires',
        icon : 'building',
        level: RoleType.admin
    },
    'articles.index': {
        name : 'articles.index',
        label: 'Articles',
        icon : 'blog',
        level: RoleType.marketing
    },
    'members.index5': {
        name : 'members.index5',
        label: 'RFA',
        icon : 'receipt',
        level: RoleType.admin
    },
    'members.index6': {
        name : 'members.index6',
        label: 'Bourse aux affaires',
        icon : 'receipt',
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
