<script>
	// Drink images
	let drinks = [
		'/images/drinks/resized/anothercocktail.JPG',
		'/images/drinks/resized/chamonix.JPG',
		'/images/drinks/resized/daquiry.jpg',
		'/images/drinks/resized/lavenir.JPG',
		'/images/drinks/resized/lebonheur.JPG',
		'/images/drinks/resized/margherita.JPG',
		'/images/drinks/resized/milkshake.jpg'
	];

	// Food images
	let food = [
		'/images/food/resized/beautifulsoup.jpg',
		'/images/food/resized/Biltong_Filo.jpg',
		'/images/food/resized/biltongmushroom.jpg',
		'/images/food/resized/blmeringue.jpg',
		'/images/food/resized/brownie.JPG',
		'/images/food/resized/carpaccio.jpg',
		'/images/food/resized/Citrus.jpg',
		'/images/food/resized/crumble.JPG',
		'/images/food/resized/cupcake.JPG',
		'/images/food/resized/Dessert_Top.jpg',
		'/images/food/resized/filostarter2.JPG',
		'/images/food/resized/fondant.jpg',
		'/images/food/resized/greensoup.jpg',
		'/images/food/resized/IMG_3245.jpg',
		'/images/food/resized/IMG_5381.JPG',
		'/images/food/resized/meringue.JPG',
		'/images/food/resized/pretty.jpg',
		'/images/food/resized/steak.JPG',
		'/images/food/resized/tempuraprawn.jpg'
	];
</script>

<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="section-title">Signature Drinks</h2>
			<p class="section-subtitle">Explore our unique and refreshing drink creations.</p>
		</div>

		<div class="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each drinks as img}
				<div class="card hover-card overflow-hidden p-0">
					<img src={img} alt="Elegant drink" class="h-64 w-full object-cover" />
				</div>
			{/each}
		</div>

		<div class="divider"></div>

		<div class="mb-12 text-center">
			<h2 class="section-title">Culinary Delights</h2>
			<p class="section-subtitle">Discover our exquisite dishes crafted with passion.</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each food as img}
				<div class="card hover-card overflow-hidden p-0">
					<img src={img} alt="Gourmet dish" class="h-64 w-full object-cover" />
				</div>
			{/each}
		</div>
	</div>
</section>
