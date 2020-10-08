<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <b-card class="mt-5" header="Vehicles">
                        <h3>20</h3>
                    </b-card>
                </div>
                <div class="col-md-3">
                    <b-card class="mt-5" header="Drivers">
                        <h3>20</h3>
                    </b-card>
                </div>
                <div class="col-md-3">
                    <b-card class="mt-5" header="Due Service">
                        <h3>20</h3>
                    </b-card>
                </div>
                <div class="col-md-3">
                    <b-card class="mt-5" header="Due Documents">
                        <h3>20</h3>
                    </b-card>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <b-card class="mt-5" header="Graphs and Charts">
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
	};
</script>