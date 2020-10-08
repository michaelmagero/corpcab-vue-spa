<template>
  <div>
	<Navbar />

	<div class="container">
		<div class="col-md-6 offset-3">
			<b-card class="mt-5" header="LOGIN">
				<b-form @submit="onSubmit" @reset="onReset" v-if="show">
					<b-form-group id="input-group-1" label="Email:" label-for="input-1">
						<b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
					</b-form-group>

					<b-form-group id="input-group-2" label="Password:" label-for="input-2">
						<b-form-input id="input-2" v-model="form.password" type="password" required></b-form-input>
					</b-form-group>

					<b-form-group>
						<b-button type="submit" variant="primary">Submit</b-button>&nbsp;
						<b-button type="reset" variant="danger">Reset</b-button>
					</b-form-group>
				</b-form>
			</b-card>
		</div>
	</div>
    
  </div>
</template>

<script>
	import Navbar from "@/components/Navbar";

	export default {
		data() {
			return {
				form: {
					email: "",
					password: "",
				},
				show: true,
			};
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.form));
			},
			onReset(evt) {
				evt.preventDefault();
				// Reset our form values
				this.form.email = "";
				this.form.password = "";
				// Trick to reset/clear native browser form validation state
				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				});
			},
		},
		components: {
			Navbar,
		},
	};
</script>