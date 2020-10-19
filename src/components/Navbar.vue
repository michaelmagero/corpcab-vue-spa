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
                                <span class="links">Mike Magero</span>
                                <b-img class="avatar mr-1 ml-3" :src="url"></b-img>
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
	@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

	body,
	html {
		font-family: "Poppins", sans-serif;
	}
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
	export default {
		computed: {
			url: function () {
				let theUrl = "http://via.placeholder.com/350x150";
				return theUrl;
			},
		},
	};
</script>