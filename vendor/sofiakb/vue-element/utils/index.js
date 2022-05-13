import router from "@app/vue/router";

const hasSlot = (component, name = 'default') => !!component.$slots[name] //|| !!component.$scopedSlots[name];

const routeExists = (name) => router.hasRoute(name)

const src = (path) => {
	try {
		return require(`@/assets/img/${path}`)
	} catch (e) {
		throw e
	}
}

export {
	hasSlot,
	routeExists,
	src
}
