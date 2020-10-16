<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4">
                    <h1>Service</h1>
					<b-button size="sm" @click="info($event.target)">
						<b-icon icon="wrench"></b-icon>  Create Service
					</b-button>
                </div>
                <div class="col-md-4"></div>
                <div class="col-md-3 mt-4 ml-5">
                    <p class="text-secondary">{{ new Date().toLocaleString() }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <b-card class="mt-5 mb-5">
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
                            <b-table class="mt-5" bordered striped show-empty small stacked="md" :items="services" :fields="fields" :current-page="currentPage"
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
										<b-badge variant="danger">In Active</b-badge>
									</div>

									<div v-else>
										<b-badge variant="success">Active</b-badge>
									</div>
                                </template>

                                <template v-slot:cell(actions)="row">
                                    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="ml-2 mr-2">
                                        <b-icon icon="pencil-fill"></b-icon>  Edit Details
                                    </b-button>
                                    <b-button size="sm" @click="row.toggleDetails">
                                        <b-icon icon="eye-fill"></b-icon>  {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                                    </b-button>
									<b-button size="sm" class="ml-2">
                                        <b-icon icon="trash-fill"></b-icon>  Delete
                                    </b-button>
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
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
                                </b-col>
                            </b-row>



                            <!-- Edit modal -->
                            <b-modal size="lg" :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                                <!-- <pre>{{ infoModal.content }}</pre> -->
								<b-form @submit="onSubmit" @reset="onReset" v-if="show">
                                        

                                        <div class="row">
                                            <div class="col-md-6">
                                                <b-form-group id="input-group-3" label="Vehicle Registration:" label-for="input-3">

                                                    <select id="input-3" class="form-control">
                                                        <option disabled>Select Owner</option>
                                                        <option v-for="vehicle in vehicles" v-bind:value="vehicle.value">{{ vehicle.registration_no }}</option>
                                                    </select>
                                                </b-form-group>
                                            </div>

                                            <div class="col-md-6">
                                                <b-form-group id="input-group-4" label="Service Date:" label-for="input-4">
                                                    <b-form-datepicker id="datepicker-sm" size="sm" local="en" class="mb-2" placeholder="Select date"></b-form-datepicker>
                                                </b-form-group>
                                            </div>
                                        </div>


                                        <div class="row">
                                            
                                            <div class="col-md-6">
                                                <b-form-group id="input-group-6" label="Current Odometer Reading:" label-for="input-6">
                                                    <b-form-input id="input-6" v-model="form.current_odometer_reading" class="form-control" type="email" required></b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-md-6">
                                                <b-form-group id="input-group-6" label="Kilometres Serviced:" label-for="input-6">
                                                    <b-form-input id="input-6" v-model="form.kms_serviced" class="form-control" type="email" required></b-form-input>
                                                </b-form-group>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <b-form-group id="input-group-6" label="Next Service (KMS):" label-for="input-6">
                                                    <b-form-input id="input-6" v-model="form.next_kms_service" class="form-control" type="email" required></b-form-input>
                                                </b-form-group>
                                            </div>
                                            <div class="col-md-6">
                                                <b-form-group id="input-group-4" label="Reminder Date:" label-for="input-4">
                                                    <b-form-datepicker id="datepicker-sm" size="sm" local="en" class="mb-2" placeholder="Select date"></b-form-datepicker>
                                                </b-form-group>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <b-form-group id="input-group-5" label="Battery Service:" label-for="input-5">
                                                    <b-checkbox>Changed</b-checkbox>
                                                </b-form-group>
                                            </div>
                                        </div>


                                        <b-form-group>
                                            <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
                                            <b-button type="reset" variant="danger">Reset</b-button>
                                        </b-form-group>
								</b-form>
                            </b-modal>
                        </b-container>
                    </b-card>
                </div>
            </div>
        </div>

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

	import Navbar from "@/components/Navbar";

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
				status: [
					{ text: "Select Role" },
					{ text: "Active", value: "Active" },
					{ text: "In-Garage", value: "In-Garage" },
					{ text: "Out Of Service", value: "Out Of Service" },
				],
			};
		},

		components: {
			Navbar,
		},

		computed: {
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
					console.log(res);
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
			onSubmit(evt) {
				evt.preventDefault();
				alert(JSON.stringify(this.form));
			},
			onReset(evt) {
				evt.preventDefault();
				// Reset our form values
				this.form.vehicle_registration = "";
				this.form.service_date = "";
				this.form.current_odometer_reading = "";
				this.form.kms_serviced = "";
				this.form.next_kms_service = "";
				this.form.remider_date = "";
				this.form.battery_service = "";
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