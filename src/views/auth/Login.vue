<template>
  <div>
	<b-container class="pt-5">

		<b-row class="text-center">
			<b-col md="12">
				<b-img class="logo" :src="url"></b-img>
				<p class="mt-3 text-muted text-uppercase text-bold text-medium">Corpcab Limited</p>
			</b-col>
		</b-row>
		
		<b-row>
			<b-col md="6" offset-md="3">
				<b-card class="border-light rounded-0 font-weight-bold" header="DASHBOARD LOGIN" header-bg-variant="danger" header-text-variant="white">
					<b-form @submit.prevent="submit" class="p-4" >
						<b-form-group id="input-group-1" label="Email:" label-for="input-1">
							<b-form-input class="rounded-0" size="lg" id="input-1" v-model="form.email" type="email" name="email" ></b-form-input>
						</b-form-group>

						<b-form-group id="input-group-2" label="Password:" label-for="input-2">
							<b-form-input class="rounded-0" size="lg" id="input-2" v-model="form.password" type="password" name="password" ></b-form-input>
						</b-form-group>

						<b-form-group>
							<b-button class="mt-4 rounded-0 font-weight-bold" block type="submit" variant="outline-primary">Sign In</b-button>&nbsp;
						</b-form-group>

						<b-form-group>
							<p class="mt-3 text-center font-weight-bold">Don't have an account yet? <router-link to="/register-driver">Sign up as a Driver</router-link> or <router-link to="/register-owner">Sign up as an Owner</router-link></p>
						</b-form-group>
					</b-form>

				</b-card>
			</b-col>
		</b-row>

	</b-container>
    
  </div>
</template>

<style scoped>
	.logo {
		width: 70px;
		height: 70px;
	}
	.text-bold {
		font-weight: 600;
	}
	.text-medium {
		font-size: 20px;
	}
</style>

<script>
	import { mapActions } from "vuex";

	export default {
		name: "login",
		data() {
			return {
				form: {
					email: "",
					password: "",
				},
			};
		},

		computed: {
			url() {
				let theUrl = "/img/logo.png";
				return theUrl;
			},
		},
		methods: {
			...mapActions({
				SignIn: "auth/signIn",
			}),

			submit() {
				this.SignIn(this.form).then(() => {
					this.$router.replace({
						name: "Dashboard",
					});
				});
			},
		},
		components: {},
	};
</script>