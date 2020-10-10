<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="row mt-5">
                <div class="col-md-4">
                    <h1>Driver Payments</h1>
                </div>
                <div class="col-md-6"></div>
                <div class="col-md-2 mt-3">
                    <p class="text-secondary">{{ new Date().toLocaleString() }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <b-card class="mt-5">
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
                            <b-table class="mt-5" bordered striped show-empty small stacked="md" :items="users" :fields="fields" :current-page="currentPage"
                            :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection" @filtered="onFiltered">
                            
                                <template v-slot:cell(name)="row" >
                                    {{ row.value }}
                                </template>

                                <template v-slot:cell(actions)="row">
                                    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                                        Edit Details
                                    </b-button>
                                    <b-button size="sm" @click="row.toggleDetails">
                                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                                    </b-button>
                                </template>

                                <template v-slot:row-details="row">
                                    <b-card>
                                        <ul>
                                            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                                        </ul>
                                    </b-card>
                                </template>
                            </b-table>

                            <b-row class="mt-5">
                                <b-col sm="5" md="3" class="my-1">
                                    <b-form-group label="Show" label-cols-sm="6" label-cols-md="4" label-cols-lg="3"
                                    label-size="sm" label-for="perPageSelect" class="mb-2">
                                        <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
                                    </b-form-group>
                                </b-col>
                                
                                <b-col md="6"></b-col>
                                <b-col sm="7" md="3" class="my-1">
                                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm" class="my-0"></b-pagination>
                                </b-col>
                            </b-row>

                            <!-- Info modal -->
                            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                                <pre>{{ infoModal.content }}</pre>
                            </b-modal>
                        </b-container>
                    </b-card>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
	import axios from "axios";

	import Navbar from "@/components/Navbar";

	export default {
		data() {
			return {
				users: [],
				fields: [
					{
						key: "id",
						label: "ID",
						sortable: true,
					},
					{
						key: ["name", "lastname"],
						label: "Firstname" + "Lastname",
						sortable: true,
					},
					{
						key: "lastname",
						label: "Lastname",
						sortable: true,
					},
					{
						key: "created_at",
						label: "Created At",
						sortable: true,
					},
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
			axios
				.get("/v1/drivers")
				.then((res) => {
					this.users = res.data.data;
					console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		methods: {
			info(item, index, button) {
				this.infoModal.title = `Row index: ${index}`;
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