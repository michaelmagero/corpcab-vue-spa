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
			<b-col md="8" offset-md="2">
				<b-card class="border-light rounded-0 font-weight-bold" header="DRIVER REGISTRATION" header-bg-variant="danger" header-text-variant="white">
					<b-form @submit.prevent="register" class="p-4" autocomplete="off">

						<b-row>
							<b-col md="6">
								<b-form-group id="input-group-1" label="Firstname:" label-for="input-1">
									<b-form-input class="form-control rounded-0" size="lg" id="input-1" v-model="form.name" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group id="input-group-2" label="Middlename:" label-for="input-2">
									<b-form-input class="form-control rounded-0" size="lg" id="input-2" v-model="form.middlename" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>

						<b-row>
							<b-col md="6">
								<b-form-group id="input-group-3" label="Lastname:" label-for="input-3">
									<b-form-input class="form-control rounded-0" size="lg" id="input-3" v-model="form.lastname" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group id="input-group-4" label="National ID:" label-for="input-4">
									<b-form-input class="form-control rounded-0" size="lg" id="input-4" v-model="form.national_id" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>

						<b-row>
							<b-col md="6">
								<b-form-group id="input-group-5" label="Email:" label-for="input-5">
									<b-form-input class="form-control rounded-0" size="lg" id="input-5" v-model="form.email" type="email" required></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group id="input-group-6" label="Phone:" label-for="input-6">
									<b-form-input class="form-control rounded-0" size="lg" id="input-6" v-model="form.phone" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>


						<b-form-group>
							<b-button class="mt-4 form-control rounded-0 font-weight-bold" block type="submit" variant="outline-primary">Sign Up</b-button>&nbsp;
						</b-form-group>

						<b-form-group>
							<p class="mt-3 text-center font-weight-bold">Already have an account? <router-link to="/login">Sign In</router-link></p>
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
	import axios from "axios";

	export default {
		data() {
			return {
				form: {
					name: "",
					middlename: "",
					lastname: "",
					national_id: "",
					email: "",
					phone: "",
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
			async register() {
				// let response = await axios.post("v1/drivers");
				// console.log(response);
				await axios
					.post("auth/register-driver", this.form)
					.then((res) => {
						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Driver Registered Successfully",
							type: "success",
						});

						this.$router.replace({
							name: "Login",
						});
					})
					.catch((err) => {
						console.error(err);
					});
			},
		},
	};
</script>