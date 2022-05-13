<template>
	<auth id="login">

		<template #error v-if="error">{{ error }}</template>

		<template #form>

			<form id="formLogin" class="w-100" @submit.prevent="login()">

				<ssf-form-group :row="true" col="col-12" name="email" label="Adresse e-mail" :required="true" icon="at"
												@update:value="event => user.email = event"
												:value="user.email"/>

				<ssf-form-group :row="true" col="col-12" name="password" type="password" label="Mot de passe" :required="true"
												icon="lock"
												@update:value="event => user.password = event"
												:value="user.password"/>

				<ssf-form-group :row="true"
												col="col-12"
												type="checkbox"
												name="checkbox"
												v-model="user.remember"
												label="Se souvenir de mes informations"/>

				<!--				<div class="row">
									<div class="col-12 ssf-form-group mt-1">
										<router-link :to="{name: 'password.forgot'}">
											<icon icon="lock-forgot-color"/>
											Mot de passe oublié
										</router-link>
									</div>
								</div>-->

				<div class="row">
					<div class="col-12 ssf-form-group text-right mt-1 mb-0">
						<button class="btn bg-color-1 btn-block text-white" type="submit">Connexion</button>
					</div>
				</div>

				<!--				<div class="row">
									<hr class="w-25 my-4 my-md-5 border-color-1">
								</div>

								<div class="row">
									<div class="col-12 ssf-form-group mt-0">
										<button class="btn border-color-1 color-1 btn-block bg-transparent"
														@click.prevent="$router.push({name: 'register'})">
											Inscription
										</button>
									</div>
								</div>-->

			</form>
		</template>

	</auth>
</template>

<script>
	import Icon      from "@/components/commons/partials/icon";
	import Auth      from "./auth";
	import MainError from "@app/vue/utils/swal/errors/main-error";

	export default {
		name      : "login",
		components: { Auth, Icon },
		metaInfo  : { title: 'Connexion', },
		data() {
			return {
				error: null,
				user : { email: null, password: null, remember: false },
			}
		},
		methods: {
			login() {
				this.error = null;

				if (this.user.email === 'sphere-dev' && this.user.password === 'spheredev') {
					this.$localStorage.set('token', 'ok')
					this.$router.push({ name: 'members.index' })
					// location.reload()
				} else MainError.fire({ title: 'Outch', text: 'Merci de vérifier vos informations' })

				/*this.$controller.auth
				 .login(this.user)
				 .then(() => location.reload())
				 .catch((error) => this.error = error)*/
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
