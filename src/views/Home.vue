<template>
  <div class="home">
    <!-- Navigation -->
    <Navbar />

	<b-jumbotron fluid class="hero-jumbotron border-light rounded-0 mb-0" text-variant="white">
		<template class="mt-5 pt-5" #header >Your trusted <br> corporate taxi partner</template>

		<p class="mt-5">Download our app</p>

		<b-row>
			<b-col md="2">
				<b-img class="download-btns" src="/img/bt2.png"></b-img>
			</b-col>
			<b-col md="2">
				<b-img class="download-btns" src="/img/bt3.png"></b-img>
			</b-col>
		</b-row>
	</b-jumbotron>

	<section id="about" class="mt-5 mb-5 py-8 py-md-11">
		<b-container>
			<b-row>
				<b-col md="12">
					<h3 class="font-weight-normal">Who are we?</h3>

					<p class="paragraph mt-5 text-muted text-justify">CORPCAB Ltd is a revolutionary new car management service – both for customers and partners intent on elevating their level of car-fleet management. CORPCAB Ltd allows car owners to subscribe their vehicles to the company, and in turn the company oversees a well-mannered oversight and management of their vehicle to ensure profitability both for the car owner and the enterprise – mutual growth is imperative for us. </p>

					<p class="paragraph mt-5 text-muted text-justify">We also support the overall ecosystem of beneficiaries, by sub-letting drivers the cars to use for the currently most viable taxi services; Taxify, Uber and Little, while maintaining the driver commission at a flexible and beneficial rate to the drivers – allowing for profitability of the car owner too – because the car owner realizes a percentage of monthly commission dividends for the useof his/her car.</p>

					<p class="paragraph mt-5 text-muted text-justify">
						Through our efficient, reliable and flexible car management service, CORPCAB Ltd intends on broadening and enhancing the well-being of the entire mobility ecosystem by ensuring mutually beneficial growth for all the parties involved through proactive financial measures and thorough business modeling to allow for sustainability and growth. 
					</p>
				</b-col>
			</b-row>
		</b-container>
	</section>

	<section id="app-features" class="row align-items-center">
		<b-container>
			<b-row>
				<b-col md="7">
					<h2> We value our users experience <br>
					<span class="text-primary">Monitor your vehicles wherever at whatever time</span>.
					</h2>

					<p class="font-size-lg text-muted mb-6"> We make sure all your fleet management needs are in your pocket.</p>

					<div class="d-flex mt-2">
						<b-icon icon="phone"></b-icon>
						<div class="ml-5 mb-2">
							<h4 class="mb-1">Fast mobile friendly PWA application</h4>
							<p class="text-muted mb-6"> We created a blazing fast PWA app to make sure you keep up with you fleet performance wherever you.</p>
						</div>
					</div>

					<div class="d-flex mt-2">
						<b-icon icon="eye-fill"></b-icon>

						<div class="ml-5 mb-2">
							<h4 class="mb-1">Comprehensive admin dashboard for all fleet management</h4>
							<p class="text-muted mb-6 mb-md-0">We've watched Bootstrap grow up over the years and understand it better than almost anyone.</p>
						</div>
					</div>

					<div class="d-flex mt-2">
						<b-icon icon="cash"></b-icon>

						<div class="ml-5 mb-2">
							<h4 class="mb-1">Real time payment monitoring</h4>
							<p class="text-muted mb-6 mb-md-0">Check in real-time as your drivers make their daily payments right from your phone.</p>
						</div>
					</div>

					<div class="d-flex mt-2">
						<b-icon icon="map-fill"></b-icon>

						<div class="ml-5 mb-2">
							<h4 class="mb-1">Intergrating Car Tracking</h4>
							<p class="text-muted mb-6 mb-md-0">Get bleeding edge accurate car tracking solution right from your dashboard and track your fleet locations.</p>
						</div>
					</div>
				</b-col>

				<b-col md="5">
					<div class="w-md-150 w-lg-130 position-relative">
					<div class="img-skewed img-skewed-left">
						<img src="/img/phone.png" class="screenshot img-fluid img-skewed-item" alt="...">
					</div>
					</div>
				</b-col>
			</b-row>
		</b-container>
    </section>

	<section id="qualifications" class="mt-5 mb-5 py-8 py-md-11">
      <b-container>
        <b-row>
          <b-col md="4">
            <b-icon variant="danger" icon="star-fill" font-scale="3"></b-icon>
            <h3 class="pt-3 text-muted">Qualified Drivers</h3>

            <p class="text-muted pt-3 mb-6 mb-md-0 paragraph text-justify">
				We vet and assess our drivers to make sure they are qualified in training and posses certificates of good conduct before assigning them to our vehicles.
            </p>
          </b-col>


          <b-col md="4">
            <b-icon variant="danger" icon="hand-thumbs-up" font-scale="3"></b-icon>
            <h3 class="pt-3 text-muted">World class services</h3>

            <p class="text-muted pt-3 mb-6 mb-md-0 paragraph text-justify">
				Our fleet consists of well maintained brand new vehicles which gurantee our clients a comfortable and safe commute.
            </p>
          </b-col>

          <b-col md="4">
            <b-icon variant="danger" icon="clock-fill" font-scale="3"></b-icon>
            <h3 class="pt-3 text-muted">Quick booking</h3>

            <p class="text-muted pt-3 mb-6 mb-md-0 paragraph text-justify">
				Booking a trip with CorpCab is a three clicks away process and allocation of vehicle and driver is almost instant. We value timely service for our clients.
            </p>
          </b-col>
          
        </b-row>
      </b-container>
    </section>


	<b-jumbotron fluid bg-variant="danger" text-variant="white" class="text-center">
		<template #header> <h1>Want to drive?</h1> </template>
		<p class="mb-5 mt-3"><router-link to="/register-driver" class="cta-link text-white">Register as driver</router-link></p>
		<b-row>
			<b-col md="2" offset-md="4">
				<b-img class="download-btns" src="/img/bt2.png"></b-img>
			</b-col>
			<b-col md="2">
				<b-img class="download-btns" src="/img/bt3.png"></b-img>
			</b-col>
		</b-row>
	</b-jumbotron>

	<section class="pt-4 my-md-5 pt-md-5">
		<b-container>

			<b-row>
				<b-col md="3">
					<img class="mb-2" src="/img/logo.png" alt="" width="24" height="24"> Corpcab Limited
					<small class="d-block mb-3 text-muted">&copy; 2020</small>
					<ul class="list-unstyled socials">
						<li class="ml-2 mr-2"><router-link to="/" class="text-muted"><b-icon icon="eye-fill"></b-icon></router-link></li>
						<li class="ml-2 mr-2"><router-link to="/" class="text-muted"><b-icon icon="eye-fill"></b-icon></router-link></li>
						<li class="ml-2 mr-2"><router-link to="/" class="text-muted"><b-icon icon="eye-fill"></b-icon></router-link></li>
						<li class="ml-2 mr-2"><router-link to="/" class="text-muted"><b-icon icon="eye-fill"></b-icon></router-link></li>
					</ul>
				</b-col>
				<b-col md="3">
					<h5>Contact info</h5>
					<ul class="list-unstyled text-small">
						<li><router-link to="/" class="text-muted">P.O Box 60163-00100</router-link></li>
						<li><router-link to="/" class="text-muted">Nairobi</router-link></li>
						<li><router-link to="/" class="text-muted">Royal Square 7th floor</router-link></li>
						<li><router-link to="/" class="text-muted">Ngong road</router-link></li>
						<li><router-link to="/" class="text-danger font-weight-bold" href="#">0701 294 042 / 0700 599 138 / 0796 730 862</router-link></li>
						<li><router-link to="/" class="text-primary font-weight-bold" href="#">info@corpcabs.co.ke</router-link></li>
					</ul>
				</b-col>
				<b-col md="3">
					<h5>Useful links</h5>
					<ul class="list-unstyled text-small">
						<li><router-link to="/" class="text-muted">About Corpcab</router-link></li>
						<li><router-link to="/" class="text-muted">Privacy Policy</router-link></li>
						<li><router-link to="/" class="text-muted">Driver FAQ</router-link></li>
						<li><router-link to="/" class="text-muted">Driver Registration</router-link></li>
						</ul>
				</b-col>
				<b-col md="3">
					<br>
					<ul class="list-unstyled text-small">
						<li><router-link to="/" class="text-muted">Terms of service</router-link></li>
						<li><router-link to="/" class="text-muted">Support FAQ</router-link></li>
						<li><router-link to="/" class="text-muted">Register Vehicle</router-link></li>
					</ul>
				</b-col>
			</b-row>
		</b-container>
  	</section>


  </div>
</template>

<style scoped>
	body,
	html {
		overflow-x: hidden;
		padding: 0;
		margin: 0;
	}
	.hero-jumbotron {
		background: linear-gradient(rgba(220, 53, 69, 0.9), rgba(220, 53, 69, 0.9)),
			url("/img/nairobi.png");

		height: 700px;
		background-size: cover;
		-moz-background-size: cover;
		-webkit-background-size: cover;
		-o-webkit-background-size: cover;
	}

	.download-btns {
		width: 160px;
		height: 50px;
	}

	#about {
		padding: 50px 0 50px 0;
	}

	.paragraph {
		font-size: 18px;
	}

	#app-features {
		background-color: #f2f3f8;
		padding: 70px 0 70px 0;
	}

	#qualifications {
		padding: 50px 0 50px 0;
	}

	.cta-link {
		text-decoration: underline;
	}

	.socials li {
		display: inline-block;
	}
</style>

<script>
	// @ is an alias to /src
	import Navbar from "@/components/WebsiteNav";

	export default {
		components: {
			Navbar,
		},
	};
</script>
