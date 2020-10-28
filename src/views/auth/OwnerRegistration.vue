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
				<b-card class="border-light rounded-0" header="CAR OWNER REGISTRATION" header-bg-variant="danger" header-text-variant="white">
					<b-form @submit="onSubmit" @reset="onReset" v-if="show" class="p-4">
						
						<b-row>
							<b-col md="6">
								<b-form-group id="input-group-1" label="Firstname:" label-for="input-1">
									<b-form-input class="rounded-0" size="lg" id="input-1" v-model="form.firstname" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group id="input-group-1" label="Lastname:" label-for="input-1">
									<b-form-input class="rounded-0" size="lg" id="input-1" v-model="form.lastname" type="text" required></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>

						<b-row>
							<b-col md="6">
								<b-form-group id="input-group-1" label="Email:" label-for="input-1">
									<b-form-input class="rounded-0" size="lg" id="input-1" v-model="form.email" type="email" required></b-form-input>
								</b-form-group>
							</b-col>
							<b-col md="6">
								<b-form-group id="input-group-2" label="Phone:" label-for="input-2">
									<b-form-input class="rounded-0" size="lg" id="input-2" v-model="form.phone" type="phone" required></b-form-input>
								</b-form-group>
							</b-col>
						</b-row>

						<b-form-group>
							<b-button class="mt-4 rounded-0" block type="submit" variant="outline-primary">Sign Up</b-button>
						</b-form-group>

						<b-form-group>
							<p class="mt-3 text-center">Already have an account? <router-link to="/login">Sign In</router-link></p>
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
	export default {
		data() {
			return {
				form: {
					firstname: "",
					lastname: "",
					email: "",
					phone: "",
				},
				show: true,
			};
		},

		computed: {
			url() {
				let theUrl = "/img/logo.png";
				return theUrl;
			},
		},

		methods: {
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.form));
			},
			onReset(evt) {
				evt.preventDefault();
				// Reset our form values
				this.form.firstname = "";
				this.form.lastname = "";
				this.form.email = "";
				this.form.phone = "";
				// Trick to reset/clear native browser form validation state
				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				});
			},
		},
	};
</script>