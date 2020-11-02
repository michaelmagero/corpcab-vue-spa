<template>
    <div>
        <b-navbar toggleable="lg" id="top-nav">

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="mt-1 mr-3"><router-link to="/register-owner" class="links">{{ new Date().toLocaleString() }}</router-link></b-nav-item>

                    <template>
                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content>
                                <span class="mr-1">Hello</span>
                                <span class="links">{{ user.name }} {{ user.lastname }}</span>
                                <b-img class="avatar mr-1 ml-3" :src="url"></b-img>
                            </template>
                            <b-dropdown-item><router-link to="/" class="links"></router-link>  Profile</b-dropdown-item>
                            <b-dropdown-item><router-link @click.prevent.native="signOut" to="" class="links">  Sign Out </router-link></b-dropdown-item>
                        </b-nav-item-dropdown>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
	#top-nav {
		background-color: #fff;
		color: #000;
	}
	.links {
		color: #000;
		font-weight: 500;
	}

	.avatar {
		border-radius: 50%;
		width: 36px;
		height: 36px;
	}
</style>

<script>
	import { mapGetters, mapActions } from "vuex";

	export default {
		computed: {
			...mapGetters({
				authenticated: "auth/authenticated",
				user: "auth/user",
			}),

			url: function () {
				let theUrl = "http://via.placeholder.com/350x150";
				return theUrl;
			},
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