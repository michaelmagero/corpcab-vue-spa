<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Documents</h1>
				<b-button size="md" @click="createModal()" class="ml-3">
					<b-icon icon="folder"></b-icon>  Create Document
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
								<b-table class="mt-5" bordered striped show-empty stacked="md" :items="documents" :fields="fields" :current-page="currentPage"
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
											<b-badge pill variant="danger">In Active</b-badge>
										</div>

										<div v-else>
											<b-badge pill variant="success">Active</b-badge>
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
									<b-form @submit.prevent="editMode ? updateDocument() : createDocument()" v-if="show" autocomplete="off">
										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-1" label="Document Type:" label-for="input-1">

													<select v-show="!editMode" class="form-control" name="document_type" v-model="form.document_type">
														<option v-for="doc in docs" v-bind:key="doc.value">{{ doc.text }}</option>
													</select>

													<select  v-show="editMode" class="form-control" name="document_type" v-model="infoModal.content.document_type">
														<option v-for="doc in docs" v-bind:key="doc.value" selected>{{ doc.value }}</option>
														<option v-for="doc in docs" v-bind:key="doc.value">{{ doc.text }}</option>
													</select>
												</b-form-group>
											</b-col>

											<b-col md="6">
												<b-form-group id="input-group-2" label="Document Owner:" label-for="input-2">

													<select v-show="!editMode" class="form-control" name="document_owner" v-model="form.document_owner">
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.value">{{ vehicle.text }}</option>
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.value">{{ vehicle.text }}</option>
													</select>

													<select  v-show="editMode" class="form-control" name="document_owner" v-model="infoModal.content.document_owner">
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.value" selected>{{ vehicle.value }}</option>
														<option v-for="driver in drivers" v-bind:key="driver.value" selected>{{ driver.value }}</option>
													</select>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-3" label="Issue Date:" label-for="input-3">
													<b-form-datepicker v-show="editMode" name="issue_date" id="datepicker-sm" v-model="infoModal.content.issue_date" size="sm" local="en" class="form-control mb-2" placeholder="Select date"></b-form-datepicker>
													<b-form-datepicker v-show="!editMode" name="issue_date" id="datepicker-sm" v-model="form.issue_date" size="sm" local="en" class="form-control mb-2" placeholder="Select date"></b-form-datepicker>
												</b-form-group>
											</b-col>

											<b-col md="6">
												<b-form-group id="input-group-4" label="Expiry Date:" label-for="input-4">
													<b-form-datepicker v-show="editMode" name="expiry_date" id="datepicker-sm-1" v-model="infoModal.content.expiry_date" size="sm" local="en" class="form-control mb-2" placeholder="Select date"></b-form-datepicker>
													<b-form-datepicker v-show="!editMode" name="expiry_date" id="datepicker-sm-1" v-model="form.expiry_date" size="sm" local="en" class="form-control mb-2" placeholder="Select date"></b-form-datepicker>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-5" label="Reminder Date:" label-for="input-5">
													<b-form-datepicker v-show="editMode" name="reminder_date" id="datepicker-sm-2" v-model="infoModal.content.reminder_date" size="sm" local="en" class="form-control mb-2" placeholder="Select date"></b-form-datepicker>
													<b-form-datepicker v-show="!editMode" name="reminder_date" id="datepicker-sm-2" v-model="form.reminder_date" size="sm" local="en" class="form-control mb-2" placeholder="Select date"></b-form-datepicker>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row class="mt-5 ml-1">
											<b-form-group>
												<b-button v-show="editMode" type="submit" variant="success">Update Document</b-button>&nbsp;
												<b-button v-show="!editMode" type="submit" variant="primary">Create Document</b-button>&nbsp;
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
				documents: [],
				vehicles: [],
				drivers: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "document_type", label: "Document", sortable: true },
					{ key: "document_owner", label: "Owner", sortable: true },
					{ key: "issue_date", label: "Issued", sortable: true },
					{ key: "expiry_date", label: "Expiry", sortable: true },
					{ key: "status", label: "Status", sortable: true },
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
					document_type: "",
					document_owner: "",
					issue_date: "",
					expiry_date: "",
					reminder_date: "",
				},
				docs: [
					{ text: "Select Document" },
					{ text: "Psv License", value: "psv" },
					{ text: "Driver License", value: "driver_license" },
					{ text: "Good Conduct Cert.", value: "good_conduct" },
					{ text: "Insurance Sticker", value: "insurance_sticker" },
					{ text: "NTSA Inspection", value: "ntsa_inspection" },
					{ text: "Uber Inspection", value: "uber_inspection" },
				],
			};
		},

		components: {
			Dashboard,
		},

		computed: {
			rows() {
				return this.documents.length;
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

			//documents
			axios
				.get("/v1/documents")
				.then((res) => {
					this.documents = res.data.data;
					//console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});

			//vehicles
			axios
				.get("/v1/vehicles")
				.then((result) => {
					this.vehicles = result.data.data;
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

			createModal(item, index, button) {
				this.editMode = false;
				this.infoModal.content = item;
				this.infoModal.title = "Create Document";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			updateModal(item, index, button) {
				this.editMode = true;
				this.infoModal.content = item;
				this.infoModal.title = "Edit Document";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			async createDocument() {
				await axios
					.post("/v1/documents", this.form)
					.then((res) => {
						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Staff Registered Successfully",
							type: "success",
						});

						this.$bvModal.hide("info-modal");

						this.$router.replace({
							name: "Staff",
						});
					})
					.catch((err) => {
						console.error(err);

						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Registration Failed",
							type: "erro",
						});
					});
			},

			async updateDocument() {
				await axios
					.put(
						"/v1/documents/" + this.infoModal.content.id,
						this.infoModal.content
					)
					.then((res) => {
						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` + " " + "Update Successful",
							type: "success",
						});

						this.$bvModal.hide("info-modal");

						this.$router.replace({
							name: "Staff",
						});
					})
					.catch((err) => {
						console.error(err);

						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` + " " + "Updated Failed",
							type: "erro",
						});
					});
			},
		},
	};
</script>