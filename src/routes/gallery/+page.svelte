<script>
	// Drink images
	let drinks = [
		'/images/drinks/anothercocktail.JPG',
		'/images/drinks/chamonix.JPG',
		'/images/drinks/daquiry.jpg',
		'/images/drinks/lavenir.JPG',
		'/images/drinks/lebonheur.JPG',
		'/images/drinks/margherita.JPG',
		'/images/drinks/milkshake.jpg'
	];

	// Food images
	let food = [
		'/images/food/beautifulsoup.jpg',
		'/images/food/Biltong_Filo.jpg',
		'/images/food/biltongmushroom.jpg',
		'/images/food/blmeringue.jpg',
		'/images/food/brownie.JPG',
		'/images/food/carpaccio.jpg',
		'/images/food/Citrus.jpg',
		'/images/food/crumble.JPG',
		'/images/food/cupcake.JPG',
		'/images/food/Dessert_Top.jpg',
		'/images/food/filostarter2.JPG',
		'/images/food/fondant.jpg',
		'/images/food/greensoup.jpg',
		'/images/food/IMG_3245.jpg',
		'/images/food/IMG_5381.JPG',
		'/images/food/meringue.JPG',
		'/images/food/pretty.jpg',
		'/images/food/steak.JPG',
		'/images/food/tempuraprawn.jpg'
	];
</script>

<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2
				class="relative mb-4 inline-block text-3xl font-semibold text-gray-800 after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
			>
				Signature Drinks
			</h2>
			<p class="text-gray-600">Explore our unique and refreshing drink creations.</p>
		</div>

		<div class="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each drinks as img}
				<div
					class="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
				>
					<img src={img} alt="Elegant drink" class="h-64 w-full object-cover" />
				</div>
			{/each}
		</div>

		<div
			class="my-20 h-px w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
		></div>

		<div class="mb-12 text-center">
			<h2
				class="relative mb-4 inline-block text-3xl font-semibold text-gray-800 after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
			>
				Culinary Delights
			</h2>
			<p class="text-gray-600">Discover our exquisite dishes crafted with passion.</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each food as img}
				<div
					class="overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
				>
					<img src={img} alt="Gourmet dish" class="h-64 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>
