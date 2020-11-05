<template>
    <div>
        <Navbar />

        <b-container fluid>
            <b-row>
                <b-navbar toggleable="lg" md="3" lg="2" type="dark" id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse" >
                    <b-navbar-brand><router-link to="/admin/dashboard" class="navbar-brand ml-4">Corpcab Limited</router-link></b-navbar-brand>
                        <div class="sidebar-sticky pt-3">
                            <b-navbar-nav class="flex-column">
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/dashboard" class="links">
                                        <b-icon class="mr-2" icon="server"></b-icon>
                                        Dashboard <span class="sr-only">(current)</span>
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/staff" class="links">
                                        <b-icon class="mr-2" icon="people-fill"></b-icon>
                                        Staff
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/drivers" class="links">
                                        <b-icon class="mr-2" icon="people-fill"></b-icon>
                                        Drivers
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/owners" class="links">
                                        <b-icon class="mr-2" icon="people-fill"></b-icon>
                                        Owners
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/vehicles" class="links">
                                        <b-icon class="mr-2" icon="truck"></b-icon>
                                        Vehicles
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/service" class="links">
                                        <i class="fa fa-wrench mr-3"></i>
                                        Service
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/documents" class="links">
                                        <b-icon class="mr-2" icon="folder-fill"></b-icon>
                                        Documents
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/expenses" class="links">
                                        <b-icon class="mr-2" icon="cash"></b-icon>
                                        Car Expenses
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/expenditures" class="links">
                                        <b-icon class="mr-2" icon="wallet-fill"></b-icon>
                                        Expenditures
                                    </router-link>
                                </b-nav-item>
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link to="/admin/payments" class="links">
                                        <b-icon class="mr-2" icon="cash"></b-icon>
                                        Payments
                                    </router-link>
                                </b-nav-item>
                            

								<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark">
									<span>Settings</span>
								</h6>
                            
                                <b-nav-item class="pb-2 pl-4">
                                    <router-link @click.prevent.native="signOut" to="" class="links"><b-icon class="mr-2" icon="box-arrow-right"></b-icon> Sign Out </router-link>
                                </b-nav-item>
								
							</b-navbar-nav>
                        </div>
                </b-navbar>

                <!-- Main dashboard section content goes here start -->
                <!-- end section -->
            </b-row>
        </b-container>
    </div>
</template>


<style scoped>
	body,
	html {
		font-size: 16px;
		height: 100%;
	}

	/** Sidebar*/
	.sidebar {
		background-color: #d61536;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 100; /* Behind the navbar */
		padding: 48px 0 0; /* Height of navbar */
		/* box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1); */
	}

	@media (max-width: 767.98px) {
		.sidebar {
			top: 5rem;
		}
	}

	.sidebar-sticky {
		position: relative;
		top: 0;
		height: calc(100vh - 48px);
		padding-top: 0.5rem;
		overflow-x: hidden;
		overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
	}

	@supports ((position: -webkit-sticky) or (position: sticky)) {
		.sidebar-sticky {
			position: -webkit-sticky;
			position: sticky;
		}
	}

	.sidebar .links {
		font-weight: 500;
		font-size: 17px;
		color: #fff;
		text-decoration: none;
	}

	.sidebar .links.active {
		color: #007bff;
		background: #343a40 !important;
	}

	.sidebar .nav-link:hover .feather,
	.sidebar .nav-link.active .feather {
		color: inherit;
	}

	.sidebar .pb-2:hover {
		font-weight: 500;
		font-size: 17px;
		color: #007bff;
		background: #343a40 !important;
	}
	.sidebar .pb-2 .links:hover {
		font-weight: 500;
		font-size: 17px;
		color: #007bff;
		background: #343a40 !important;
	}
	.sidebar-heading {
		font-size: 0.75rem;
		text-transform: uppercase;
	}

	/** Navbar*/
	.navbar-brand {
		font-size: 1.2rem;
		text-transform: uppercase;
		margin: 0 auto;
		font-weight: 500;
	}

	.navbar .navbar-toggler {
		top: 0.25rem;
		right: 1rem;
	}

	.navbar .form-control {
		padding: 0.75rem 1rem;
		border-width: 0;
		border-radius: 0;
	}

	.form-control-dark {
		color: #fff;
		background-color: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.form-control-dark:focus {
		border-color: transparent;
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
	}
</style>

<script>
	import { mapActions } from "vuex";
	import Navbar from "@/components/Navbar";

	export default {
		data() {
			return {
				isActive: false,
			};
		},

		components: {
			Navbar,
		},

		methods: {
			...mapActions({
				signOutAction: "auth/signOut",
			}),

			signOut() {
				this.signOutAction().then(() => {
					this.$router.replace({
						name: "Login",
					});
				});
			},
		},
	};
</script>