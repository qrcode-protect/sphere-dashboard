const mapping = {
	'home'         : {
		label: 'Accueil',
		icon : 'home',
		show : false
	},
	'members.index': {
		label: 'Adhérents',
		icon : 'users'
	}
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
