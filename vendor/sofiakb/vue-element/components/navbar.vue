<template>

	<ssf-container :class="{'open': full, 'ssf__fixed-top': fixed, 'ssf__navbar-mobile': small}"
								 :style="{height: navHeight}"
								 class="ssf__navbar"
								 name="navbar"
								 not-full>

		<ssf-container v-if="small" class="ssf__navbar-toggle cursor-pointer" not-full @click="toggleFull()">
			<ssf-icon v-if="full" icon="times" la size="1x5"/>
			<ssf-icon v-else :icon="`${toggleIcon ? toggleIcon : 'bars'}`" la size="1x5"/>
		</ssf-container>

		<ssf-row :class="{'h-100': small && !full}">
			<ssf-col v-if="brandRight !== true"
							 :class="{'h-100': small}"
							 :size="small ? 12 : size.brand" c
							 lass="ssf__navbar-brand"
							 no-padding>
				<slot name="brand" @click="$emit('click')"></slot>
			</ssf-col>

			<ssf-col :class="{'full-height': fullHeight, 'ssf__navbar-list-mobile': small, 'open': full}"
							 :size="small ? 12 : size.list"
							 class="ssf__navbar-list" no-padding>

				<ul :class="{'ml-auto': right, 'w-100': small}" class="pl-0 mb-0">

					<li v-for="(link, idx) in links"
							:class="{'active-item': isActive(link), 'd-none': !visible(link)}"
							class="ssf__navbar-item">

						<ssf-container v-if="visible(link)" class="h-100">
							<ssf-container v-if="!link.children"
														 class="ssf__navbar-link"
														 not-full
														 @click.prevent="action(link)">

								<ssf-icon :class="{'mr-1': showTitle}"
													:icon="link.icon"
													:type="link.iconType || 'fa'"
													class="ssf__navbar-icon"/>

								<span v-if="showTitle">{{ link.label || link.name || link.title || 'N/D' }}</span>

							</ssf-container>

							<ssf-container v-else
														 :class="{'active-item': dropdowns[idx]}"
														 class="ssf__navbar-link ssf__navbar-dropdown"
														 not-full
														 @click="toggleDropdown(idx)">

								<ssf-icon :class="{'mr-1': showTitle}"
													:icon="link.icon"
													:type="link.iconType || 'fa'"
													class="ssf__navbar-icon"/>

								<span>
                                <span v-if="showTitle">{{ link.label || link.name || link.title || 'N/D' }}</span>
                                <ssf-icon :icon="`${dropdowns[idx] ? 'angle-up' : 'angle-down'}`"
																					class="ssf__vue-dropdown-icon"
																					light/>
                            </span>

								<ssf-container :class="{'open': dropdowns[idx]}"
															 :style="`height: ${getHeight(link.children.length)}px`"
															 class="ssf__vue-dropdown-menu"
															 not-full
															 @click.stop>
									<ul class="pl-0 mb-0">
										<li v-for="child in link.children" @click="toggleDropdown(idx)">
											<router-link v-if="visible(child)"
																	 ref="vueDropdownItem"
																	 :class="{'active-item': isActive(child)}"
																	 :to="{'name': child.name}" class="ssf__navbar-link ssf__vue-dropdown-item">
												<ssf-row>
													<ssf-col size="2">
														<ssf-icon :icon="child.icon"
																			:type="child.iconType || 'fa'"
																			class="ssf__navbar-icon"/>
														<!--                                                              :class="{'mr-1': showTitle}"-->
													</ssf-col>
													<ssf-col size="10">
                                                    <span v-if="showTitle">{{
																												child.label || child.name || child.title || 'N/D'
																											}}</span>
													</ssf-col>
												</ssf-row>

												<!--                                            <div class="ssf__w-15"><i :class="`${child.icon}`"></i></div>-->
												<!--                                            <div class="ssf__w-85">{{ child.title }}</div>-->
											</router-link>
										</li>
									</ul>
								</ssf-container>

							</ssf-container>
						</ssf-container>


					</li>

				</ul>

			</ssf-col>


			<ssf-col v-if="brandRight"
							 :class="{'h-100': small}"
							 :size="small ? 12 : size.brand"
							 class="ssf__navbar-brand"
							 no-padding>
				<slot name="brand" @click="$emit('click')"></slot>
			</ssf-col>
		</ssf-row>

	</ssf-container>
</template>

<script>

	// require('./static/css/font-awesome.css')
	// require('./static/css/fonts.css')
	// require('./static/css/main.css')

	import SsfIcon         from "./icon";
	import { routeExists } from "@sofiakb/vue-element/utils";

	export default {
		name      : "navbar",
		components: { SsfIcon },
		props     : {
			links     : { type: Array, required: true },
			height    : { type: [ String, Number ], required: false },
			right     : { type: Boolean, required: false },
			toggleIcon: { type: String, required: false },
			fixed     : { type: Boolean, required: false },
			showTitle : { type: Boolean, required: false, default: true },
			fullHeight: { type: Boolean, required: false, default: true },

			brandColSize: { type: [ String, Number ], required: false, default: 2 },
			brandRight  : { type: Boolean, required: false, default: false },
			listColSize : { type: [ String, Number ], required: false, default: -1 },
		},

		data() {
			return {
				full     : false,
				fullTitle: false,
				small    : false,
				dropdowns: {},

				navbarHeight: 'auto'
			}
		},

		computed: {
			navHeight() {
				const height = this.height

				if (typeof height === 'string')
					return height

				if (typeof height === 'number')
					return `${height}px`
			},
			size() {

				let listSize = this.listColSize, brandSize = this.brandColSize, leftSize = 12 - brandSize
				if (listSize === -1) {
					if (leftSize <= 0) {
						listSize = 0
						brandSize = 12
					} else listSize = leftSize
				}

				return {
					list : listSize,
					brand: brandSize,
				}
			}
		},

		watch: {
			height: {
				immediate: true,
				handler(val, oldVal) {
					this.setImgSize(val)
				}
			},
		},

		mounted() {
			window.addEventListener('resize', this.onResize)
			this.onResize()
		},

		beforeDestroy() {
			// Unregister the event listener before destroying this Vue instance
			window.removeEventListener('resize', this.onResize)
		},

		methods: {

			setImgSize(val, type = 'height') {
				type = type.capitalize()
				if (val === 'auto')
					this[`navbar${type}`] = val
				else if (typeof val === 'string') {
					if (val.includes('%'))
						this[`navbar${type}`] = val
					else this[`navbar${type}`] = val.includes('px') ? val : `${val}px`
				}
			},

			visible(link) {
				return link && routeExists(link.name) && !(link.visible === false)
			},

			action(link) {
				return link.action
							 ? this.$emit('custom-action', link.action)
							 : this.$router.push({ 'name': link.name, 'params': link.params })
			},

			isActive(link) {
				return link.routes
							 ? link.routes.includes(this.$route?.name?.toLowerCase())
							 : link?.name?.toLowerCase() === this.$route?.name?.toLowerCase()
			},

			toggleFull() {
				this.full = !this.full
				if (this.full)
					setTimeout(() => {
						this.fullTitle = true
					}, 400)
				else this.fullTitle = false

				this.$emit('collapse', this.full)
			},

			toggleDropdown(id) {
				this.dropdowns[id] = !this.dropdowns[id]
				this.dropdowns = JSON.parse(JSON.stringify(this.dropdowns))
			},

			getHeight(nb) {
				return nb * (($('.ssf__vue-dropdown-item')[0] || {}).height || 50);
			},

			onResize(event) {
				this.small = window.innerWidth < 767
			}
		}
	}
</script>

<style lang="scss">
	.ssf__navbar {
		/*position: fixed;
		top: 0;
		left: 0;
		bottom: 0;*/
		height: 60px;
		width: 100%;
		-webkit-transition: width .5s;
		-moz-transition: width .5s;
		-ms-transition: width .5s;
		-o-transition: width .5s;
		transition: width .5s;
		background-color: var(--color-1);
		font-family: "Poppins", sans-serif;
		z-index: 1050;
		display: -ms-flexbox !important;
		display: flex !important;
		-ms-flex-wrap: wrap !important;
		flex-wrap: wrap !important;
		/*width: 100% !important;*/

		&.ssf__navbar-mobile {
			position: relative;
			display: block !important;

			&.open {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: 100% !important;
				width: 100% !important;
				overflow-y: auto;
			}
		}
	}

	.ssf__navbar.ssf__fixed-top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.ssf__navbar.open {
		width: 250px;
	}

	.ssf__navbar .ssf__navbar-list.ssf__navbar-list-mobile:not(.open) {
		display: none !important;
	}

	.ssf__navbar:not(.ssf__navbar-mobile) .ssf__navbar-list.full-height > ul,
	.ssf__navbar:not(.ssf__navbar-mobile) .ssf__navbar-list.full-height > ul li.ssf__navbar-item,
	.ssf__navbar:not(.ssf__navbar-mobile) .ssf__navbar-list.full-height > ul li.ssf__navbar-item .ssf__navbar-link {
		height: 100%;
	}

	/*.ssf__navbar .ssf__navbar-brand,*/
	.ssf__navbar .ssf__navbar-list {
		display: flex;
		flex-basis: auto;
		-ms-flex-preferred-size: 100%;
		flex-basis: 100%;
		-ms-flex-positive: 1;
		flex-grow: 1;
		-ms-flex-align: center;
		align-items: center;
	}

	.ssf__navbar .ssf__navbar-brand,
	.ssf__navbar .ssf__navbar-list > ul li.ssf__navbar-item .ssf__navbar-link {
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item {
		position: relative;
		display: inline-block;
	}

	.ssf__navbar .ssf__navbar-list.ssf__navbar-list-mobile .ssf__navbar-item {
		display: block !important;
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item .ssf__navbar-link {
		position: relative;
		display: block;
		font-size: 16px;
		font-weight: 400;
		padding: 10px;
		line-height: 30px;
		text-decoration: none;
		-webkit-transition: 0.3s all;
		transition: 0.3s all;
		color: inherit;
		cursor: pointer;
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item.active-item .ssf__navbar-link:not(.ssf__vue-dropdown-item),
	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-menu .ssf__navbar-link.ssf__vue-dropdown-item.active-item {
		-webkit-box-shadow: inset 0 -3px 0 0 #212529;
		box-shadow: inset 0 -3px 0 0 #212529;
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item.active-item .ssf__navbar-link:not(.ssf__vue-dropdown-item),
	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-menu .ssf__navbar-link.ssf__vue-dropdown-item.active-item {
		background-color: #212529;
		color: #fff;
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item:hover .ssf__navbar-link:not(.ssf__vue-dropdown-item) {
		background-color: #fff;
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item.active-item:hover .ssf__navbar-link:not(.ssf__vue-dropdown-item) {
		color: var(--color-black, #000000);
	}

	.ssf__navbar .ssf__navbar-list .ssf__navbar-item .ssf__navbar-link.ssf__vue-dropdown-item:hover {
		background-color: var(--color-black, #000000);
		color: var(--color-1);
	}

	.ssf__navbar .ssf__navbar-icon {
		width: 30px;
		text-align: center;
	}

	.ssf__navbar .ssf__navbar-toggle {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		height: 30px;
		width: 50px;
		/*margin-top: auto;
		margin-bottom: auto;*/
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2000;
		/*margin: 10px auto 30px auto;*/
	}

	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown {
		position: relative;
	}

	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-icon {
		/*position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		height: 20px;
		width: 20px;
		margin: auto;*/
		margin-right: 5px;
	}

	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-menu {
		position: absolute;
		top: 100%;
		/*left: 0;*/
		right: 0;
		/*width: 100%;*/
		min-width: 200px;
		background: #fff;
		-webkit-transition: height .3s;
		-moz-transition: height .3s;
		-ms-transition: height .3s;
		-o-transition: height .3s;
		transition: height .3s;
		z-index: 1052;
	}

	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-menu:not(.open) {
		height: 0 !important;
	}

	.ssf__navbar .mr-2 {
		margin-right: 8px;
	}

	.ssf__navbar .mb-0 {
		margin-bottom: 0;
	}

	.ssf__navbar .ml-auto {
		margin-left: auto;
	}

	.ssf__navbar .pl-0 {
		padding-left: 0;
	}

	.ssf__vue-dropdown-menu ul li,
	.ssf__vue-dropdown-menu ul li a {
		display: -ms-flexbox !important;
		display: flex !important;
		-ms-flex-wrap: wrap !important;
		flex-wrap: wrap !important;
		width: 100% !important;
	}

	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-menu ul {
		display: none;
	}

	.ssf__navbar .ssf__navbar-link.ssf__navbar-dropdown .ssf__vue-dropdown-menu.open ul {
		display: block;
	}

	.ssf__navbar .ssf__w-15 {
		position: relative;
		min-height: 1px;
		-ms-flex: 0 0 15%;
		flex: 0 0 15%;
		max-width: 15%;
	}

	.ssf__navbar .ssf__w-85 {
		position: relative;
		min-height: 1px;
		-ms-flex: 0 0 85%;
		flex: 0 0 85%;
		max-width: 85%;
	}

	.w-100 {
		width: 100% !important;
	}

	.h-100 {
		height: 100% !important;
	}

	.ssf__navbar .fa-1x5 {
		font-size: 1.5em;
	}

	.ssf__navbar .cursor-pointer {
		cursor: pointer;
	}

	.ssf__navbar .text-right {
		text-align: right !important;
	}
</style>
