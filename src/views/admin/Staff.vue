<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-3 mb-3 border-bottom">
                <h1 class="h2">Staff</h1>
				<b-button size="md" @click="createStaff()" class="ml-3">
					<b-icon icon="people-fill"></b-icon>  Create Staff
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
										<b-form-group class="mb-3">
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
										<b-form-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" v-model="dateValue" id="datepicker-sm" size="sm" local="en" class="mb-3" placeholder="Filter data by date"></b-form-datepicker>
										     <p>Value: <b>'{{  formattedDate }}'</b></p>
									</b-col>

								</b-row>

								<!-- Main table element -->
								<b-table id="my-table" class="mt-5" bordered striped show-empty stacked="sm" :items="users" :fields="fields" :current-page="currentPage"
								:per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
								:sort-direction="sortDirection" @filtered="onFiltered">
									<template v-slot:cell(name)="row">
										{{ row.item.name + " " + row.item.lastname }}
									</template>

									<!-- <template v-slot:cell(status)="row">
										<div v-if="row.item.status == 1">
											<b-badge pill variant="success">Active</b-badge>
										</div>

										<div v-else>
											<b-badge pill variant="danger">In-Active</b-badge>
										</div>
									</template> -->

									<template v-slot:cell(actions)="row">
										
										<b-icon v-b-tooltip.hover.top="'View Details'" size="sm" @click="row.toggleDetails" class="ml-3 mb-1 text-muted" icon="eye-fill"> {{ row.detailsShowing ? 'Hide ' : 'Show ' }} Details </b-icon>
										
										<b-icon v-b-tooltip.hover.top="'Edit Details'" size="sm" @click="updateStaff(row.item, row.index, $event.target)" class="ml-3 mb-1 text-muted" icon="pencil-square"></b-icon>
									
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
										<b-form-group label="Show" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-size="sm" label-for="perPageSelect" class="mb-3">
											<b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
										</b-form-group>
									</b-col>
									
									<b-col md="6"></b-col>
									<b-col sm="7" md="3" class="my-1">
										<b-pagination first-text="First" prev-text="Prev" next-text="Next" last-text="Last" v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table" align="fill" size="sm" class="my-0"></b-pagination>
									</b-col>
								</b-row>

								<!-- Edit modal -->
									<div>
										<b-modal :id="infoModal.id" :title="infoModal.title" hide-footer>
		
												<b-form @submit.prevent="editMode ? updateStaff() : createStaff()" v-if="show" autocomplete="off">
													<b-form-group id="input-group-1" label="Firstname:" label-for="input-1">
														<b-form-input id="input-1" name="name" v-model="infoModal.content.name" class="form-control" type="text" required></b-form-input>
													</b-form-group>

													<b-form-group id="input-group-2" label="Lastname:" label-for="input-2">
														<b-form-input id="input-2" name="lastname"  v-model="infoModal.content.lastname" class="form-control" type="text" required></b-form-input>
													</b-form-group>

													<b-form-group id="input-group-3" label="Email:" label-for="input-3">
														<b-form-input id="input-3" name="email"  v-model="infoModal.content.email" class="form-control" type="email" required></b-form-input>
													</b-form-group>

													<b-form-group id="input-group-5" label="Role:" label-for="input-5">
														<select v-show="!editMode" class="form-control" name="role">
															<option v-for="role in roles" v-bind:key="role.value">{{ role.text }}</option>
														</select>

														<select  v-show="editMode" class="form-control" name="role">
															<option v-show="editMode" v-for="role in roles" v-bind:key="role.value" selected>{{ role.value }}</option>
															<option v-show="!editMode" v-for="role in roles" v-bind:key="role.value">{{ role.text }}</option>
														</select>
													</b-form-group>

													<b-form-group class="mt-5">
														<b-button v-show="editMode" type="submit" variant="success">Update Staff</b-button>&nbsp;
														<b-button v-show="!editMode" type="submit" variant="primary">Create Staff</b-button>&nbsp;
														<b-button type="reset" variant="danger">Reset</b-button>
													</b-form-group>
												</b-form>
										</b-modal>
									</div>
									
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
	import moment from "moment";
	import Dashboard from "@/layouts/DashLayout";

	export default {
		data() {
			return {
				//tables data
				dateValue: "",
				users: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "name", label: "Names", sortable: true },
					{ key: "role", label: "Role", sortable: true },
					{ key: "created_at", label: "Created At", sortable: true },
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
					name: "",
					lastname: "",
					email: "",
					role: "",
				},

				roles: [
					{ text: "Select Role" },
					{ text: "Admin", value: "admin" },
					{ text: "Administrator", value: "administrator" },
					{ text: "Accountant", value: "accountant" },
				],
			};
		},

		components: {
			Dashboard,
		},

		computed: {
			formattedDate() {
				return moment(this.dateValue).format("DD-MM-YYYY");
			},

			rows() {
				return this.users.length;
			},

			sortOptions() {
				// Create an options list from our fields
				return this.fields
					.filter((f) => f.created_at)
					.map((f) => {
						return { text: f.label, value: f.key };
					});
			},
		},

		mounted() {
			axios
				.get("/v1/users")
				.then((res) => {
					this.users = res.data.data;
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

			createDriver(item, index, button) {
				this.editMode = false;
				this.infoModal.content = item;
				this.infoModal.title = "Create Staff";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},

			updateDriver(item, index, button) {
				this.editMode = true;
				this.infoModal.content = item;
				this.infoModal.title = "Edit Staff";
				this.$root.$emit("bv::show::modal", this.infoModal.id, button);
			},
		},
	};
</script>