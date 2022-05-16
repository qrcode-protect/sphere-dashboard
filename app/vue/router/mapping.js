const mapping = {
	'home'         : {
		label: 'Accueil',
		icon : 'home',
		show : false
	},
	'members.index': {
		label: 'Adhérents',
		icon : 'screen-users',
		active: false
	},
	'members.index2': {
		label: 'Domaines d\'activités',
		icon : 'asterisk'
	},
	'members.index3': {
		label: 'Partenaires',
		icon : 'building',
		active: false
	},
	'members.index4': {
		label: 'Articles',
		icon : 'file',
		active: false
	},
	'members.index5': {
		label: 'RFA',
		icon : 'receipt',
		active: false
	},
	'members.index6': {
		label: 'Bourse aux affaires',
		icon : 'receipt',
		active: false
	},
	/*'members.index3': {
		label: 'Adhérents',
		icon : 'users'
	},
	'members.index4': {
		label: 'Adhérents',
		icon : 'users'
	}*/
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

/*
 * computed: {
 links() {
 let routes = _.filter(this.$router.options.routes, route => route.path !== '*' && _.indexOf(exclude, route.name) < 0),
 links = [],
 moreLinks = [
 { label: "Déconnexion", name: "logout", icon: 'power-off', },
 ];
 _.map(routes, route => route.name).forEach(route => links.push({ ...mapping[route], ...{ name: route } }));
 return links.concat(moreLinks)
 },
 },
 * */
