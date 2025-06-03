<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

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

	let modalOpen = $state(false);
	let selectedImage = $state('');
	let selectedAlt = $state('');

	function openModal(src, alt) {
		selectedImage = src;
		selectedAlt = alt;
		modalOpen = true;
		if (browser) {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		modalOpen = false;
		selectedImage = '';
		selectedAlt = '';
		if (browser) {
			document.body.style.overflow = 'auto';
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && modalOpen) {
			closeModal();
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = 'auto';
		}
	});
</script>

<svelte:head>
	<title>Gallery | Pachas Restaurant | Food & Drinks Showcase</title>
	<meta
		name="description"
		content="Explore our gallery showcasing exquisite dishes and signature drinks from Pachas Restaurant. Fine dining photography from Pretoria's premier steakhouse."
	/>
</svelte:head>

<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="section-title">Signature Drinks</h2>
			<p class="section-subtitle">Explore our unique and refreshing drink creations.</p>
		</div>

		<div class="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each drinks as img}
				<div
					class="card hover-card cursor-pointer overflow-hidden p-0"
					onclick={() => openModal(img, 'Elegant drink')}
				>
					<img
						src={img}
						alt="Elegant drink"
						class="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
					/>
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
				<div
					class="card hover-card cursor-pointer overflow-hidden p-0"
					onclick={() => openModal(img, 'Gourmet dish')}
				>
					<img
						src={img}
						alt="Gourmet dish"
						class="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Modal for enlarged images -->
{#if modalOpen && selectedImage}
	<div
		class="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
		onclick={closeModal}
	>
		<div class="relative max-h-full max-w-4xl">
			<button
				class="absolute -top-10 right-0 z-10 text-2xl text-white hover:text-gray-300"
				onclick={closeModal}
			>
				✕
			</button>
			<img
				src={selectedImage}
				alt={selectedAlt}
				class="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
				onclick={(e) => e.stopPropagation()}
			/>
		</div>
	</div>
{/if}
