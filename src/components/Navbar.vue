<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="danger">
            <b-navbar-brand><router-link to="/" class="links">Corpcab</router-link></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item><router-link to="/home" class="links">Home</router-link></b-nav-item>
                <b-nav-item><router-link to="/about" class="links">About</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item><router-link to="/login" class="links">Login</router-link></b-nav-item>
                <b-nav-item><router-link to="/register-driver" class="links">Driver Registration</router-link></b-nav-item>
                <b-nav-item><router-link to="/register-owner" class="links">Owner Registration</router-link></b-nav-item>

                <template v-if="authenticated">
                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <b-img src=""></b-img>
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item><router-link to="/" class="links"></router-link>  Profile</b-dropdown-item>
                    <b-dropdown-item><router-link to="/" class="links"></router-link>  Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </template>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
	.links {
		color: #fff;
	}
</style>

<script>
	export default {};
</script>