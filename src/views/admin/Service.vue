<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Service</h1>

				<b-button size="md" @click="createService()" class="ml-3">
					<b-icon icon="wrench"></b-icon>  Create Service
				</b-button>
            </div>

			<b-container fluid>
				<b-row>
					<b-col md="12">
						<b-card class="mt-3 mb-5 border-light rounded-0">
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
								<b-table class="mt-5" bordered striped show-empty stacked="md" :items="services" :fields="fields" :current-page="currentPage"
								:per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
								:sort-direction="sortDirection" @filtered="onFiltered">
									<template v-slot:cell(name)="row">
										<b-img class="avatar" :src=" '/src/assets/uploads/profile_picture/' + row.item.vehicle_image "></b-img>
										{{ row.item.make + " " + row.item.model }}
									</template>

									<template v-slot:cell(driver_id)="row">
										{{ row.item.driver_id.name + " " + row.item.driver_id.lastname }}
									</template>

									<template v-slot:cell(status)="row">
										<div v-if="row.item.status == 0">
											<b-badge pill variant="danger">Expired</b-badge>
										</div>

										<div v-else-if="row.item.status == 1">
											<b-badge pill variant="warning">Almost Due</b-badge>
										</div>

										<div v-else>
											<b-badge pill variant="success">Active</b-badge>
										</div>
									</template>

									<template v-slot:cell(actions)="row">
										
										<b-icon v-b-tooltip.hover.top="'View Details'" size="sm" @click="row.toggleDetails" class="ml-3 mb-1 text-muted" icon="eye-fill"> {{ row.detailsShowing ? 'Hide ' : 'Show ' }} Details </b-icon>
										
										<b-icon v-b-tooltip.hover.top="'Edit Details'" size="sm" @click="updateService(row.item, row.index, $event.target)" class="ml-3 mb-1 text-muted" icon="pencil-square"></b-icon>
									
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
								<b-modal size="lg" :id="infoModal.id" :title="infoModal.title" hide-footer>
									<!-- <pre>{{ infoModal.content }}</pre> -->
									<b-form @submit.prevent="editMode ? updateService() : createOupdateService()" v-if="show" autocomplete="off">
										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-1" label="Vehicle Registration:" label-for="input-1">

													<select v-show="!editMode" class="form-control" name="registration_no">
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.value">{{ vehicle.text }}</option>
													</select>

													<select  v-show="editMode" class="form-control" name="registration_no">
														<option v-show="editMode" v-for="vehicle in vehicles" v-bind:key="vehicle.value" selected>{{ vehicle.value }}</option>
														<option v-show="!editMode" v-for="vehicle in vehicles" v-bind:key="vehicle.value">{{ vehicle.text }}</option>
													</select>
												</b-form-group>
											</b-col>

											<b-col md="6">
												<b-form-group id="input-group-2" label="Service Date:" label-for="input-2">
													<b-form-datepicker id="datepicker-sm" v-model="form.service_date" size="sm" local="en" class="mb-2" placeholder="Select date"></b-form-datepicker>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-3" label="Current Odometer Reading:" label-for="input-3">
													<b-form-input id="input-3" v-model="form.current_odometer_reading" class="form-control" type="email" required></b-form-input>
												</b-form-group>
											</b-col>
											<b-col md="6">
												<b-form-group id="input-group-4" label="Kilometres Serviced:" label-for="input-4">
													<b-form-input id="input-4" v-model="form.kms_serviced" class="form-control" type="email" required></b-form-input>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-5" label="Next Service (KMS):" label-for="input-5">
													<b-form-input id="input-5" v-model="form.next_kms_service" class="form-control" type="email" required></b-form-input>
												</b-form-group>
											</b-col>
											<b-col md="6">
												<b-form-group id="input-group-6" label="Reminder Date:" label-for="input-6">
													<b-form-datepicker id="datepicker-sm-1" size="sm" local="en" class="mb-2" placeholder="Select date"></b-form-datepicker>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-7" label="Battery Service:" label-for="input-7">
													<b-checkbox id="input-7">Changed</b-checkbox>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row class="mt-4 ml-1">
											<b-form-group>
												<b-button v-show="editMode" type="submit" variant="success">Update Driver</b-button>&nbsp;
												<b-button v-show="!editMode" type="submit" variant="primary">Create Driver</b-button>&nbsp;
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
		width: 32px;
		height: 32px;
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
				services: [],
				vehicles: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "vehicle_registration", label: "Vehicle", sortable: true },
					{ key: "service_date", label: "Service Date", sortable: true },
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
				editMode: false,
				title: true,
				show: true,
				form: {
					vehicle_registration: "",
					service_date: "",
					current_odometer_reading: "",
					kms_serviced: "",
					next_kms_service: "",
					remider_date: "",
					battery_service: "",
				},

				//battery change --- 0 (not-changed)---- 1(changed)
			};
		},

		components: {
			Dashboard,
		},

		computed: {
			rows() {
				return this.services.length;
			},
			sortOptions() {
				// Create an options list from our fields
				return this.fields
					.filter((f) => f.sortable)
					.map((f) => {
						return { text: f.label, value: f.key };
					});
			},
		},
		mounted() {
			// Set the initial number of items
			//this.totalRows = this.items.length;

			//vehicles
			axios
				.get("/v1/services")
				.then((res) => {
					this.services = res.data.data;
					//console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});

			//owners
			axios
				.get("/v1/vehicles")
				.then((result) => {
					this.vehicles = result.data.data;
					//console.log(result);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		methods: {
			//tables methods
			onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.totalRows = filteredItems.length;
				this.currentPage = 1;
			},

			filteredList() {
				return this.users.filter(
					(item) => moment(item.date, "DD-MM-YYYY").month() === this.searchMonth
				);
			},

			//form/modal methods

			createService(item, index, button) {
				this.editMode = false;
				this.infoModal.content = item;
				this.infoModal.title = "Create Service";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			updateService(item, index, button) {
				this.editMode = true;
				this.infoModal.content = item;
				this.infoModal.title = "Edit Service";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},
		},
	};
</script>