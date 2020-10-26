<template>
    <div>
        <Dashboard />

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Drivers</h1>
                <b-button size="md" @click="info($event.target)" class="ml-3">
                    <b-icon icon="people-fill"></b-icon>  Create Driver
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
                                <b-table class="mt-5" bordered striped show-empty stacked="md" :items="drivers" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                                :sort-direction="sortDirection" @filtered="onFiltered" responsive="sm">
                                    <template v-slot:cell(name)="row">
                                        <b-img class="avatar" :src="url"></b-img>
                                        {{ row.item.name + " " + row.item.middlename + " " + row.item.lastname }}
                                    </template>

                                    <template v-slot:cell(status)="row">
                                        <div v-if="row.item.status == 1">
                                            <b-badge pill variant="success">Active</b-badge>
                                        </div>

                                        <div v-else>
                                            <b-badge pill variant="danger">In-Active</b-badge>
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
                                                <b-form-group id="input-group-1" label="Firstname:" label-for="input-1">
                                                    <b-form-input id="input-1" v-model="form.firstname" class="form-control" type="text" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-2" label="Middlename:" label-for="input-2">
                                                    <b-form-input id="input-2" v-model="form.middlename" class="form-control" type="text" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-3" label="Lastname:" label-for="input-3">
                                                    <b-form-input id="input-3" v-model="form.lastname" class="form-control" type="text" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-4" label="Profile Photo:" label-for="input-4">
                                                    <b-file id="input-4" type="file" v-model="form.profile_picture" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>


                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-5" label="National ID:" label-for="input-5">
                                                    <b-form-input id="input-5" v-model="form.national_id" class="form-control" type="text" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-6" label="Phone:" label-for="input-6">
                                                    <b-form-input id="input-6" v-model="form.phone" class="form-control" type="email" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        
                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-7" label="Email:" label-for="input-7">
                                                    <b-form-input id="input-7" v-model="form.email" class="form-control" type="email" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-8" label="Password:" label-for="input-8">
                                                    <b-form-input id="input-8" v-model="form.password" class="form-control" type="password" required></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-9" label="Status:" label-for="input-9">
                                                    <select id="input-9" class="form-control">
                                                        <option v-for="state in status" v-bind:value="state.value">{{ state.text }}</option>
                                                    </select>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-10" label="Driver License:" label-for="input-10">
                                                    <b-file id="input-10" type="file" v-model="form.driver_license" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>


                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-11" label="Good Conduct Cert:" label-for="input-11">
                                                    <b-file id="input-11" type="file" v-model="form.good_conduct_cert" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>

                                            <b-col md="6">
                                                <b-form-group id="input-group-12" label="PSV:" label-for="input-12">
                                                    <b-file id="input-12" type="file" v-model="form.psv" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                        

                                        <b-row class="mt-4 ml-1">
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
				drivers: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "name", label: "Names", sortable: true },
					{ key: "status", label: "Status", sortable: true },
					{ key: "created_at", label: "Registered", sortable: true },
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
					firstname: "",
					middlename: "",
					lastname: "",
					profile_photo: "",
					national_id: "",
					phone: "",
					email: "",
					password: "",
					status: "",
					driver_license: "",
					good_conduct_cert: "",
					psv_license: "",
				},
				status: [
					{ text: "Select Role" },
					{ text: "Active", value: "1" },
					{ text: "In-Active", value: "0" },
				],
			};
		},

		components: {
			Dashboard,
		},

		computed: {
			rows() {
				return this.drivers.length;
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
			// Set the initial number of items
			//this.totalRows = this.items.length;
			axios
				.get("/v1/drivers")
				.then((res) => {
					this.drivers = res.data.data;
					//console.log(res);
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
				this.form.firstname = "";
				this.form.middlename = "";
				this.form.lastname = "";
				this.form.profile_photo = "";
				this.form.national_id = "";
				this.form.phone = "";
				this.form.email = "";
				this.form.password = "";
				this.form.status = "";
				this.form.driver_license = "";
				this.form.good_conduct_cert = "";
				this.form.psv_license = "";
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