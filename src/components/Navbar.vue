<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item><router-link to="/register-owner" class="links">{{ new Date().toLocaleString() }}</router-link></b-nav-item>

                    <template>
                        
                        <b-nav-item>Hello</b-nav-item>
                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <b-img class="avatar" src=""></b-img>

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