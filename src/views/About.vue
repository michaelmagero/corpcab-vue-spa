<template>
  <div class="home">
    <!-- Navigation -->
    <Navbar />
    
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>this is the about page</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	// @ is an alias to /src
	import Navbar from "@/components/Navbar";

	export default {
		components: {
			Navbar,
		},
	};
</script>
