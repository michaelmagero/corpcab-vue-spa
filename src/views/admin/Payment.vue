<template>
    <div>
        <Dashboard />

		<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Payments</h1>
            </div>

			<b-container fluid>
				<b-row>
					<b-col md="12">
						<b-card class="mt-3 mb-5 border-light rounded-0">
							<b-container fluid>
								<!-- User Interface controls -->
								<b-row class="mt-5">
									<b-col md="4" class="my-1">
										<b-form-group class="mb-2">
											<b-input-group size="sm">
												<b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
												<b-input-group-append>
													<b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
												</b-input-group-append>
											</b-input-group>
										</b-form-group>
									</b-col>
									<b-col md="4"></b-col>
									<b-col md="4" class="my-1">
										<b-form-datepicker id="datepicker-sm" size="sm" local="en" class="mb-2" placeholder="Filter data by date"></b-form-datepicker>
									</b-col>
								</b-row>

								{{ payments }}

								<!-- Main table element -->
								<b-table class="mt-5" bordered striped show-empty stacked="md" :items="drivers" :fields="fields" :current-page="currentPage"
								:per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
								:sort-direction="sortDirection" @filtered="onFiltered">
									<template v-slot:cell(name)="row">
										<b-img class="avatar" :src="url"></b-img>

										{{ row.item.name + " " + row.item.lastname }}

										<b-row class="ml-5 mb-n">
											<b-col md="3">
												<span class="text-muted">Total</span>
											</b-col>
											<b-col md="3"><span class="font-weight-bolder"> Ksh 5000 </span></b-col>
										</b-row>
										<b-row class="ml-5 mb-n">
											<b-col md="3">
												<span class="text-muted">Today</span>
											</b-col>
											<b-col md="3"><span class="font-weight-bolder"> Ksh 5000 </span></b-col>
										</b-row>
										<b-row class="ml-5 mb-n">
											<b-col md="3">
												<span class="text-muted"> This Week </span>
											</b-col>
											<b-col md="3"><span class="font-weight-bolder"> Ksh 5000 </span></b-col>
										</b-row>
										<b-row class="ml-5 mb-n">
											<b-col md="3">
												<span class="text-muted"> This Month </span>
											</b-col>
											<b-col md="3"><span class="font-weight-bolder"> Ksh 5000 </span></b-col>
										</b-row>
									</template>

									<template v-slot:cell(status)="row">
										<b-badge variant="danger" :show="row.item.status ? '1' : '0' "> 
											<strong>In Active</strong>
										</b-badge>
									</template>

									<!-- <template v-slot:cell(actions)="row">
																				
										<b-icon v-b-tooltip.hover.top="'Edit Details'" size="sm" @click="info(row.item, row.index, $event.target)" class="ml-3 mb-1 text-muted" icon="pencil-square"></b-icon>
									
										<b-icon v-b-tooltip.hover.top="'Delete'" size="sm" class="ml-3 mb-1 text-muted" icon="trash-fill"></b-icon>

									</template> -->

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
				payments: [],
				fields: [{ key: "name", label: "Names", sortable: true }],
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
				.get("v1/drivers")
				.then((res) => {
					this.drivers = res.data.data;
					//console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});

			// axios
			// 	.get("https://corpcab.co.ke/safdaraja/liveCallbackResponse.json")
			// 	.then((response) => {
			// 		this.payments = response;
			// 		console.log(response);
			// 	});
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