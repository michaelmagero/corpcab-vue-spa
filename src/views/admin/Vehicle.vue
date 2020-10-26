<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Vehicles</h1>
				<b-button size="md" @click="info($event.target)" class="ml-3">
					<b-icon icon="truck"></b-icon>  Create Vehicles
				</b-button>
            </div>

			<b-container fluid>
				<b-row>
					<b-col md="12">
						<b-card class="mt-5 mb-5 border-light rounded-0">
							<b-container fluid>
								<!-- User Interface controls -->
								<b-row class="mt-5">
									<b-col lg="4" class="my-1">
										<b-form-group class="mb-2">
											<b-input-group size="sm">
												<b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
												<b-input-group-append>
													<b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
												</b-input-group-append>
											</b-input-group>
										</b-form-group>
									</b-col>
									<b-col lg="4"></b-col>
									<b-col lg="4" class="my-1">
										<b-form-datepicker id="datepicker-sm" size="sm" local="en" class="mb-2" placeholder="Filter data by date"></b-form-datepicker>
									</b-col>

								</b-row>

								<!-- Main table element -->
								<b-table class="mt-5" bordered striped show-empty stacked="md" :items="vehicles" :fields="fields" :current-page="currentPage"
								:per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
								:sort-direction="sortDirection" @filtered="onFiltered">
									<template v-slot:cell(name)="row">
										<b-img class="avatar" :src="url"></b-img>
										{{ row.item.make + " " + row.item.model }}
									</template>

									<template v-slot:cell(driver_id)="row">
										{{ row.item.driver_id.name + " " + row.item.driver_id.lastname }}
									</template>

									<template v-slot:cell(status)="row">
										<div v-if="row.item.status == 2">
											<b-badge pill variant="success">Active</b-badge>
										</div>

										<div v-else-if="row.item.status == 1">
											<b-badge pill variant="warning">In-Garage</b-badge>
										</div>

										<div v-else>
											<b-badge pill variant="danger">Our of Service</b-badge>
										</div>
									</template>

									<template v-slot:cell(actions)="row">
										
										<b-icon v-b-tooltip.hover.top="'View Details'" size="sm" @click="row.toggleDetails" class="ml-3 mb-1 text-muted" icon="eye-fill"> {{ row.detailsShowing ? 'Hide ' : 'Show ' }} Details </b-icon>
										
										<b-icon v-b-tooltip.hover.top="'Edit Details'" size="sm" @click="info(row.item, row.index, $event.target)" class="ml-3 mb-1 text-muted" icon="pencil-square"></b-icon>
									
										<b-icon v-b-tooltip.hover.top="'Delete'" size="sm" class="ml-3 mb-1 text-muted" icon="trash-fill"></b-icon>

									</template>

									<template v-slot:row-details="row">
										<b-card>
											<ul id="show-list">
												<li v-for="(value, key) in row.item" :key="key"><strong> {{ key }} : </strong> {{ value }}</li>
											</ul>
										</b-card>
									</template>

								</b-table>

								<b-row class="mt-5">
									<b-col sm="5" md="3" class="my-1">
										<b-form-group label="Show" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="sm" label-for="perPageSelect" class="mb-2">
											<b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
										</b-form-group>
									</b-col>
									
									<b-col md="6"></b-col>
									<b-col sm="7" md="3" class="my-1">
										<b-pagination first-text="First" prev-text="Prev" next-text="Next" last-text="Last" v-model="currentPage" :total-rows="rows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
									</b-col>
								</b-row>



								<!-- Edit modal -->
								<b-modal size="lg" :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
									<!-- <pre>{{ infoModal.content }}</pre> -->
									<b-form @submit="onSubmit" @reset="onReset" v-if="show">
											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-1" label="Vehicle:" label-for="input-1">
														<b-file id="input-1" type="file" v-model="form.vehicle_image" class="form-control"></b-file>
													</b-form-group>
												</b-col>
												<b-col md="6">
													<b-form-group id="input-group-2" label="Registration No:" label-for="input-2">
														<b-form-input id="input-2" v-model="form.registration_no" class="form-control" type="text" required></b-form-input>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-3" label="Vehicle Owner:" label-for="input-3">

														<select id="input-3" class="form-control">
															<option disabled>Select Owner</option>
															<option v-for="owner in owners" v-bind:value="owner.value">{{ owner.name }} {{ owner.lastname }}</option>
														</select>
													</b-form-group>
												</b-col>

												<b-col md="6">
													<b-form-group id="input-group-4" label="Vehicle Driver:" label-for="input-4">
														<select id="input-4" class="form-control">
															<option disabled>Select Driver</option>
															<option v-for="driver in drivers" v-bind:value="driver.value">{{ driver.name }} {{ driver.middlename }} {{ driver.lastname }}</option>
														</select>
													</b-form-group>
												</b-col>
											</b-row>


											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-5" label="Make:" label-for="input-5">
														<b-form-input id="input-5" v-model="form.make" class="form-control" type="text" required></b-form-input>
													</b-form-group>
												</b-col>
												<b-col md="6">
													<b-form-group id="input-group-6" label="Model:" label-for="input-6">
														<b-form-input id="input-6" v-model="form.model" class="form-control" type="email" required></b-form-input>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-7" label="YOM (Year of Manufacture):" label-for="input-7">
														<select id="input-7" class="form-control">
															<option v-for="year in years" v-bind:value="year.value">{{ year.text }}</option>
														</select>
													</b-form-group>
												</b-col>

												<b-col md="6">
													<b-form-group id="input-group-8" label="Color:" label-for="input-8">
														<select id="input-8" class="form-control">
															<option v-for="color in colors" v-bind:value="color.value">{{ color.text }}</option>
														</select>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-9" label="Fuel Type:" label-for="input-9">
														<select id="input-9" class="form-control">
															<option v-for="fuel in fuels" v-bind:value="fuel.value">{{ fuel.text }}</option>
														</select>
													</b-form-group>
												</b-col>

												<b-col md="6">
													<b-form-group id="input-group-10" label="Status:" label-for="input-10">
														<select id="input-10" class="form-control">
															<option v-for="state in status" v-bind:value="state.value">{{ state.text }}</option>
														</select>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-11" label="Logbook:" label-for="input-11">
														<b-file id="input-11" type="file" class="form-control"></b-file>
													</b-form-group>
												</b-col>
												<b-col md="6">
													<b-form-group id="input-group-12" label="Insurance Sticker:" label-for="input-12">
														<b-file id="input-12" type="file" class="form-control"></b-file>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-13" label="Uber Inspection:" label-for="input-13">
														<b-file id="input-13" type="file" class="form-control"></b-file>
													</b-form-group>
												</b-col>

												<b-col md="6">
													<b-form-group id="input-group-14" label="NTSA Inspection:" label-for="input-14">
														<b-file id="input-14" type="file" class="form-control"></b-file>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row class="mt-5 ml-1">
												<b-form-group>
													<b-button type="submit" variant="primary">Submit</b-button>&nbsp;
													<b-button type="reset" variant="danger">Reset</b-button>
												</b-form-group>
											</b-row>
									</b-form>
								</b-modal>
							</b-container>
						</b-card>
					</b-col>
				</b-row>
			</b-container>
        </main>

    </div>
</template>

<style scoped>
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	#show-list {
		list-style: none;
	}

	#show-list li {
		padding: 5px 0 5px 0;
	}
</style>

<script>
	import axios from "axios";
	import Dashboard from "@/layouts/DashLayout";

	export default {
		data() {
			return {
				//tables data
				vehicles: [],
				owners: [],
				drivers: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "name", label: "Vehicle", sortable: true },
					{ key: "registration_no", label: "Registration", sortable: true },
					{ key: "driver_id", label: "Driver", sortable: true },
					{ key: "status", label: "Status", sortable: true },
					{ key: "actions", label: "Actions" },
				],
				totalRows: 1,
				currentPage: 1,
				perPage: 15,
				pageOptions: [15, 30, 50, 100],
				sortBy: "",
				sortDesc: false,
				sortDirection: "asc",
				filter: null,
				filterOn: [],
				infoModal: {
					id: "info-modal",
					title: "",
					content: "",
				},

				//edit form data
				show: true,
				form: {
					vehicle_image: "",
					registration_no: "",
					owner_id: "",
					driver_id: "",
					make: "",
					model: "",
					yom: "",
					color: "",
					fuel_type: "",
					status: "",
					logobook: "",
					insurance_sticker: "",
					uber_inspection: "",
					ntsa_inspection: "",
				},
				status: [
					{ text: "Select Role" },
					{ text: "Active", value: "2" },
					{ text: "In-Garage", value: "1" },
					{ text: "Out Of Service", value: "0" },
				],
				fuels: [
					{ text: "Select Fuel Type" },
					{ text: "Petrol", value: "petrol" },
					{ text: "Diesel", value: "diesel" },
				],
				colors: [
					{ text: "Select Color" },
					{ text: "Black", value: "black" },
					{ text: "White", value: "white" },
					{ text: "Silver", value: "silver" },
					{ text: "Grey", value: "grey" },
					{ text: "Red", value: "red" },
					{ text: "Blue", value: "blue" },
					{ text: "Maroon", value: "maroon" },
					{ text: "Purple", value: "purple" },
					{ text: "Pink", value: "pink" },
					{ text: "Green", value: "green" },
				],
				years: [
					{ text: "Select Year" },
					{ text: "2020", value: "2020" },
					{ text: "2019", value: "2019" },
					{ text: "2018", value: "2018" },
					{ text: "2017", value: "2017" },
					{ text: "2016", value: "2016" },
					{ text: "2015", value: "2015" },
					{ text: "2014", value: "2014" },
					{ text: "2013", value: "2013" },
					{ text: "2012", value: "2012" },
					{ text: "2011", value: "2011" },
					{ text: "2010", value: "2010" },
				],
			};
		},

		components: {
			Dashboard,
		},

		computed: {
			rows() {
				return this.vehicles.length;
			},
			sortOptions() {
				// Create an options list from our fields
				return this.fields
					.filter((f) => f.sortable)
					.map((f) => {
						return { text: f.label, value: f.key };
					});
			},

			url: function () {
				let theUrl = "http://via.placeholder.com/350x150";
				return theUrl;
			},
		},
		mounted() {
			//vehicles
			axios
				.get("/v1/vehicles")
				.then((res) => {
					this.vehicles = res.data.data;
					//console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});

			//owners
			axios
				.get("/v1/owners")
				.then((result) => {
					this.owners = result.data.data;
					//console.log(result);
				})
				.catch((err) => {
					console.error(err);
				});

			//drivers
			axios
				.get("/v1/drivers")
				.then((results) => {
					this.drivers = results.data.data;
					//console.log(results);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.form));
			},
			onReset(evt) {
				evt.preventDefault();
				// Reset our form values
				this.form.vehicle_image = "";
				this.form.registration_no = "";
				this.form.owner_id = "";
				this.form.driver_id = "";
				this.form.make = "";
				this.form.model = "";
				this.form.yom = "";
				this.form.color = "";
				this.form.fuel_type = "";
				this.form.status = "";
				this.form.logobook = "";
				this.form.insurance_sticker = "";
				this.form.uber_inspection = "";
				this.form.ntsa_inspection = "";
				// Trick to reset/clear native browser form validation state
				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				});
			},
			info(item, index, button) {
				this.infoModal.title = "Edit";
				this.infoModal.content = JSON.stringify(item, null, 2);
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},
			resetInfoModal() {
				this.infoModal.title = "";
				this.infoModal.content = "";
			},
			onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.totalRows = filteredItems.length;
				this.currentPage = 1;
			},
		},
	};
</script>