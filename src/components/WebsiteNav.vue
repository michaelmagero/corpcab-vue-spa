<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="white" v-b-scrollspy="{offset:100, method:'auto'}" fixed="top">
            <b-container>

                <b-navbar-brand><router-link to="/" class="links"><b-img class="logo" src="/img/logo.png"></b-img></router-link></b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item> <router-link class="text-dark" to="/">Home</router-link>               </b-nav-item>
                        <b-nav-item> <router-link class="text-dark" to="#about">About</router-link>         </b-nav-item>
                        <b-nav-item> <router-link class="text-dark" to="#solutions">Solutions</router-link> </b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item><router-link to="/login" class="links text-dark">Login</router-link></b-nav-item>
                        <b-nav-item><router-link to="/register-driver" class="links text-dark">Driver Registration</router-link></b-nav-item>
                        <b-nav-item><router-link to="/register-owner" class="links text-dark">Owner Registration</router-link></b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<style scoped>
	.logo {
		width: 50px;
		height: 50px;
	}

	.active {
		color: #dc3545;
		text-decoration: underline;
	}
	#scrollspy-example {
		position: relative;
		height: 200px;
		overflow-y: scroll;
		border: 1px solid blue;
	}
</style>

<script>
	export default {
		data() {
			return {
				targetActive: "",
			};
		},

		computed: {},
		methods: {
			onActivate(target) {
				console.log("Received Event: scrollspy::activate for target ", target);
			},
		},
		created() {
			this.$root.$on("scrollspy::activate", this.onActivate);
		},
	};
</script>