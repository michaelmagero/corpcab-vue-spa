<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="white" >
            <b-container>

                <b-navbar-brand><router-link to="/" class="links"><b-img class="logo" src="/img/logo.png"></b-img></router-link></b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item><router-link to="/" class="links text-dark">Home</router-link></b-nav-item>
                        <b-nav-item><router-link to="/about" class="links text-dark">About</router-link></b-nav-item>
                        <b-nav-item><router-link to="/solutions" class="links text-dark">Solutions</router-link></b-nav-item>
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
	.links {
		font-size: 17px;
	}

	.logo {
		width: 50px;
		height: 50px;
	}
</style>

<script>
	export default {};
</script>