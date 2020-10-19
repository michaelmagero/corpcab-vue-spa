<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Expenditures</h1>
				<b-button size="md" @click="info($event.target)" class="ml-3">
					<b-icon icon="wallet-fill"></b-icon>  Create Expenditure
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
								<b-table class="mt-5" bordered striped show-empty stacked="md" :items="expenditures" :fields="fields" :current-page="currentPage"
								:per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
								:sort-direction="sortDirection" @filtered="onFiltered">
									<template v-slot:cell(name)="row">
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
										<b-button size="sm" @click="info(row.item, row.index, $event.target)" class="ml-2 mb-1">
											<b-icon icon="pencil-fill"></b-icon>  Edit Details
										</b-button>
										<b-button size="sm" @click="row.toggleDetails" class="ml-2 mb-1">
											{{ row.detailsShowing ? 'Hide' : 'Show' }} Details
										</b-button>
										<b-button size="sm" class="ml-2 mb-1">
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
											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-1" label="Paid To:" label-for="input-1">
														<b-form-input id="input-1" v-model="form.paid_to" class="form-control" type="text" required></b-form-input>
													</b-form-group>
												</b-col>

												<b-col md="6">
													<b-form-group id="input-group-2" label="Expenditure:" label-for="input-2">
														<b-form-input id="input-2" v-model="form.expenditure" class="form-control" type="text" required></b-form-input>
													</b-form-group>
												</b-col>
											</b-row>

											<b-row>
												<b-col md="6">
													<b-form-group id="input-group-3" label="Amount:" label-for="input-3">
														<b-form-input id="input-3" v-model="form.amount" class="form-control" type="text" required></b-form-input>
													</b-form-group>
												</b-col>

												<b-col md="6">
													<b-form-group id="input-group-4" label="Receipts:" label-for="input-4">
														<b-file id="input-4" v-model="form.receipts" type="file" class="form-control"></b-file>
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
				expenditures: [],
				vehicles: [],
				drivers: [],
				fields: [
					{ key: "id", label: "ID", sortable: true },
					{ key: "paid_to", label: "Paid To", sortable: true },
					{ key: "expenditure", label: "Expenditure", sortable: true },
					{ key: "amount", label: "Amount", sortable: true },
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
					paid_to: "",
					expenditure: "",
					amount: "",
					receipts: "",
				},
			};
		},

		components: {
			Dashboard,
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

			//documents
			axios
				.get("/v1/expenditures")
				.then((res) => {
					this.expenditures = res.data.data;
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
				this.form.paid_to = "";
				this.form.expenditure = "";
				this.form.amount = "";
				this.form.receipts = "";
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