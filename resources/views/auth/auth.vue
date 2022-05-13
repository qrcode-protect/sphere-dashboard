<template>
	<div class="auth-container">

		<div class="img-bg">
			<!--      <img src="../../../assets/img/main.jpg" class="full-absolute" alt="Auth bg">-->
		</div>

		<div class="row">
			<div class="mx-auto form-container white full-flex">

				<ssf-container>

					<div class="row w-100">

						<div class="col-12 text-center color-1 my-4 my-md-5">
							<router-link :to="{name: 'home'}">
								<img src="@/assets/img/logo.png" alt="Logo" class="d-block mx-auto auth-logo bg-color-1 img-fluid rounded"
										 style="height: 25px">
							</router-link>
						</div>

						<div class="col-12">
							<hr class="w-50 mt-0 mb-4 mb-md-5">
						</div>

					</div>

					<transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
						<div class="row w-100 col-12 mb-3" v-if="hasSlot('error') || hasSlot('success')">
							<div class="col-12 rounded form-error-container d-flex align-items-center"
									 :class="{'danger-color-dark': hasSlot('error'), 'success-color-dark': hasSlot('success')}">
								<ssf-icon :icon="`${hasSlot('error') ? 'times-circle': 'check-circle'}`" size="2x" class="mr-2"
													type="la"/>
								<slot name="error"/>
								<slot name="success"/>
							</div>
						</div>
					</transition>

					<div class="row w-100">
						<slot name="form"/>
					</div>

				</ssf-container>

			</div>
		</div>

	</div>
</template>

<script>
	import { hasSlot } from "@sofiakb/vue-element/utils";

	export default {
		name      : "Auth",
		components: {},
		data() {
			return {}
		},
		created() {
		},
		watch  : {},
		methods: {
			hasSlot(name = 'default') {
				return hasSlot(this, name)
			}
		}
	}
</script>

<style lang="scss">
	.auth-container {
		.img-bg img {
			position: fixed !important;
		}

		.form-container {
			min-height: 100vh;
			width: 450px;
			padding-left: 25px;
			padding-right: 25px;
			max-width: 100vh;
		}

		.auth-logo {
			height: 100px;
			width: auto
		}

		@media screen and (max-width: 768px) {
			padding-left: 15px !important;
			padding-right: 15px !important;
		}

		.form-error-container {
			padding: 10px 15px;
			color: #ffffff;
		}
	}
</style>
