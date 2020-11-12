<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Expenses</h1>
				<b-button size="md" @click="createModal()" class="ml-3">
					<b-icon icon="cash"></b-icon>  Create Expense
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
								<b-table class="mt-5" bordered striped show-empty stacked="md" :items="expenses" :fields="fields" :current-page="currentPage"
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
									<b-form @submit.prevent="editMode ? updateExpense() : createExpense()" v-if="show" autocomplete="off">
										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-1" label="Vehicle:" label-for="input-1">

													<select v-show="!editMode" class="form-control" name="car_registration" v-model="form.car_registration">
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.id">{{ vehicle.registration_no }}</option>
													</select>

													<select v-show="editMode" class="form-control" name="car_registration" v-model="infoModal.content.car_registration">
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.id" selected>{{ vehicle.registration_no }}</option>
														<option v-for="vehicle in vehicles" v-bind:key="vehicle.id">{{ vehicle.registration_no }}</option>
													</select>
												</b-form-group>
											</b-col>

											<b-col md="6">
												<b-form-group id="input-group-2" label="Expense:" label-for="input-2">
													<b-form-input v-show="editMode" id="input-2" v-model="infoModal.content.expense" class="form-control" type="text"></b-form-input>
													<b-form-input v-show="!editMode" id="input-2" v-model="infoModal.content.expense" class="form-control" type="text"></b-form-input>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row>
											<b-col md="6">
												<b-form-group id="input-group-3" label="Amount:" label-for="input-3">
													<b-form-input v-show="editMode"  v-model="infoModal.content.amount" class="form-control" type="text"></b-form-input>
													<b-form-input v-show="!editMode"  v-model="form.amount" class="form-control" type="text"></b-form-input>
												</b-form-group>
											</b-col>

											<b-col md="6">
												<b-form-group id="input-group-4" label="Receipts:" label-for="input-4">
													<b-file v-show="editMode" v-model="infoModal.content.receipts" type="file" class="form-control"></b-file>
													<b-file v-show="!editMode" v-model="infoModal.content.receipts" type="file" class="form-control"></b-file>
												</b-form-group>
											</b-col>
										</b-row>

										<b-row class="mt-5 ml-1">
											<b-form-group>
												<b-button v-show="editMode" type="submit" variant="success">Update Expense</b-button>&nbsp;
												<b-button v-show="!editMode" type="submit" variant="primary">Create Expense</b-button>&nbsp;
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
				expenses: [],
				vehicles: [],
				drivers: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "car_registration", label: "Vehicle", sortable: true },
					{ key: "expense", label: "Expense", sortable: true },
					{ key: "amount", label: "Amount", sortable: true },
					{ key: "created_at", label: "Date", sortable: true },
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
					car_registration: "",
					expense: "",
					amount: "",
					receipts: "",
				},
			};
		},

		components: {
			Dashboard,
		},

		computed: {
			rows() {
				return this.expenses.length;
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
				.get("/v1/expenses")
				.then((res) => {
					this.expenses = res.data.data;
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
				this.infoModal.title = "Create Expense";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			updateModal(item, index, button) {
				this.editMode = true;
				this.infoModal.content = item;
				this.infoModal.title = "Edit Expense";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			async createExpense() {
				await axios
					.post("/v1/expenses", this.form)
					.then((res) => {
						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Expense Added Successfully",
							type: "success",
						});

						this.$bvModal.hide("info-modal");

						this.$router.replace({
							name: "Expense",
						});
					})
					.catch((err) => {
						console.error(err);

						this.$toast.open({
							message:
								`<i class="fa fa-check-circle"></i>` +
								" " +
								"Registration Failure",
							type: "error",
						});
					});
			},

			async updateExpense() {
				await axios
					.put(
						"/v1/expenses/" + this.infoModal.content.id,
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
							name: "Expense",
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