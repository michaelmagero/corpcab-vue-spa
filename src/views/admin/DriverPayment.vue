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

								<!-- Main table element -->
								<b-table-simple hover>
                                    <b-thead><b-tr></b-tr></b-thead>

                                    <b-tbody>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1000</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1200</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1300</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1500</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1600</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1700</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 1800</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 2000</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 2500</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 3000</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 3500</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 4000</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 4500</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                        <b-tr>
                                            <b-td colspan="12">
                                                <strong>Pay 5000</strong>  <b-button variant="primary" class="ml-3">Make Payment</b-button>
                                            </b-td>
                                        </b-tr>
                                    </b-tbody>
                                </b-table-simple>

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
				payments: [
					{ key: "id", label: "ID" },
					{ key: "id", label: "ID" },
					{ key: "id", label: "ID" },
					{ key: "id", label: "ID" },
				],
				fields: [
					{ key: "pay1000", label: "Pay 1000" },
					{ key: "pay2000", label: "Pay 2000" },
					{ key: "pay3000", label: "Pay 3000" },
					{ key: "pay4000", label: "Pay 4000" },
					{ key: "pay5000", label: "Pay 5000" },
					{ key: "pay6000", label: "Pay 6000" },
					{ key: "pay7000", label: "Pay 7000" },
					{ key: "pay8000", label: "Pay 8000" },
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

			url: function () {
				let theUrl = "http://via.placeholder.com/350x150";
				return theUrl;
			},
		},
		mounted() {
			// Set the initial number of items
			//this.totalRows = this.items.length;
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