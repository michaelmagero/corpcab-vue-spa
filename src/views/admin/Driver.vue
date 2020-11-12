<template>
    <div>
        <Dashboard />

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Drivers</h1>
                <b-button size="md" @click="createModal()" class="ml-3">
                    <b-icon icon="people-fill"></b-icon>  Create Driver
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
										<b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" v-model="filter" id="datepicker-sm" size="sm" local="en" class="mb-3" placeholder="Filter data by date"></b-form-datepicker>
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
										
										<b-icon v-b-tooltip.hover.top="'Edit Details'" size="sm" @click="updateModal(row.item, row.index, $event.target)" class="ml-3 mb-1 text-muted" icon="pencil-square"></b-icon>
									
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
                                    <b-form @submit.prevent="editMode ? updateDriver() : createDriver()" v-if="show" autocomplete="off">
                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-1" label="Firstname:" label-for="input-1">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.name" name="name" class="form-control" type="text"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.name" name="name" class="form-control" type="text"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-2" label="Middlename:" label-for="input-2">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.middlename" name="middlename" class="form-control" type="text"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.middlename" name="middlename" class="form-control" type="text"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-3" label="Lastname:" label-for="input-3">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.lastname" name="lastname" class="form-control" type="text"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.lastname" name="lastname" class="form-control" type="text"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-4" label="Profile Photo:" label-for="input-4">
                                                    <b-file v-show="editMode" type="file" v-model="infoModal.content.profile_picture" name="profile_picture" class="form-control"></b-file>
                                                    <b-file v-show="!editMode" type="file" v-model="form.profile_picture" name="profile_picture" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>


                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-5" label="National ID:" label-for="input-5">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.national_id" name="national_id" class="form-control" type="text"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.national_id" name="national_id" class="form-control" type="text"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-6" label="Phone:" label-for="input-6">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.phone" name="phone" class="form-control" type="text"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.phone" name="phone" class="form-control" type="text"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        
                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-7" label="Email:" label-for="input-7">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.email" name="email" class="form-control" type="email"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.email" name="email" class="form-control" type="email"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col md="6">
                                                <b-form-group id="input-group-8" label="Password:" label-for="input-8">
                                                    <b-form-input v-show="editMode" v-model="infoModal.content.password" name="password" class="form-control" type="password"></b-form-input>
                                                    <b-form-input v-show="!editMode" v-model="form.password" name="password" class="form-control" type="password"></b-form-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-9" label="Status:" label-for="input-9">

                                                    <select v-show="!editMode" class="form-control" name="status">
                                                        <option v-for="state in status" v-bind:key="state.value">{{ state.text }}</option>
                                                    </select>

                                                    <select  v-show="editMode" class="form-control" name="status">
                                                        <option v-for="state in status" v-bind:key="state.value" selected>{{ state.text }}</option>
                                                    </select>

                                                </b-form-group>
                                            </b-col>

                                            <b-col md="6">
                                                <b-form-group id="input-group-10" label="Driver License:" label-for="input-10">
                                                    <b-file v-show="editMode" type="file" v-model="infoModal.content.driver_license" name="driver_license" class="form-control"></b-file>
                                                    <b-file v-show="!editMode" type="file" v-model="form.driver_license" name="driver_license" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>


                                        <b-row>
                                            <b-col md="6">
                                                <b-form-group id="input-group-11" label="Good Conduct Cert:" label-for="input-11">
                                                    <b-file v-show="editMode" type="file" v-model="infoModal.content.good_conduct_cert" name="good_conduct_cert" class="form-control"></b-file>
                                                    <b-file v-show="!editMode" type="file" v-model="form.good_conduct_cert" name="good_conduct_cert" class="form-control"></b-file>
                                                </b-form-group>
                                            </b-col>

                                            <b-col md="6">
                                                <b-form-group id="input-group-12" label="PSV:" label-for="input-12">
                                                    <b-file v-show="editMode" type="file" v-model="infoModal.content.psv" name="psv" class="form-control"></b-file>
                                                    <b-file v-show="!editMode" type="file" v-model="form.psv" name="psv" class="form-control"></b-file>
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
	import moment from "moment";
	import Dashboard from "@/layouts/DashLayout";

	export default {
		data() {
			return {
				//table data
				drivers: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "name", label: "Names", sortable: true },
					{ key: "status", label: "Status", sortable: true },
					{
						key: "created_at",
						label: "Created At",
						sortByFormatted: true,
						formatter: (value, key, item) => {
							return moment(value).format("L");
						},
						sortable: true,
					},
					{ key: "actions", label: "Actions" },
				],
				totalRows: 1,
				currentPage: 1,
				perPage: 15,
				pageOptions: [15, 30, 50, 100],
				sortBy: "id",
				sortDesc: true,
				sortDirection: "desc",
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
					name: "",
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

			url() {
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
			//tables methods
			onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.totalRows = filteredItems.length;
				this.currentPage = 1;
			},

			//form/modal methods

			createModal(item, index, button) {
				this.editMode = false;
				this.infoModal.content = item;
				this.infoModal.title = "Create Driver";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			updateModal(item, index, button) {
				this.editMode = true;
				this.infoModal.content = item;
				this.infoModal.title = "Edit Driver";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			async createStaff() {
				await axios
					.post("/v1/drivers", this.form)
					.then((res) => {
						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Driver Registered Successfully",
							type: "success",
						});

						this.$bvModal.hide("info-modal");

						this.$router.replace({
							name: "Driver",
						});
					})
					.catch((err) => {
						console.error(err);

						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Registration Failed",
							type: "error",
						});
					});
			},

			async updateStaff() {
				await axios
					.put("/v1/drivers/" + this.infoModal.content.id, this.infoModal.content)
					.then((res) => {
						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` + " " + "Update Successful",
							type: "success",
						});

						this.$bvModal.hide("info-modal");

						this.$router.replace({
							name: "Driver",
						});
					})
					.catch((err) => {
						console.error(err);

						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` + " " + "Updated Failed",
							type: "error",
						});
					});
			},
		},
	};
</script>