<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand><router-link to="/" class="links"><b-img class="logo" src="/img/logo.png"></b-img></router-link></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link to="/home" class="links">Home</router-link></b-nav-item>
                    <b-nav-item><router-link to="/about" class="links">About</router-link></b-nav-item>
                    <b-nav-item><router-link to="/what-we-do" class="links">Services</router-link></b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item><router-link to="/login" class="links">Login</router-link></b-nav-item>
                    <b-nav-item><router-link to="/register-driver" class="links">Driver Registration</router-link></b-nav-item>
                    <b-nav-item><router-link to="/register-owner" class="links">Owner Registration</router-link></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
	.links {
		color: #fff;
	}

	.logo {
		width: 50px;
		height: 50px;
	}
</style>

<script>
	export default {};
</script>