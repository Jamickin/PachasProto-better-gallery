<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	const drinks = [
		{ base: 'anothercocktail.JPG', alt: 'Signature cocktail at Pachas' },
		{ base: 'chamonix.JPG', alt: 'Chamonix cocktail' },
		{ base: 'daquiry.jpg', alt: 'Daiquiri cocktail' },
		{ base: 'lavenir.JPG', alt: "L'Avenir cocktail" },
		{ base: 'lebonheur.JPG', alt: 'Le Bonheur cocktail' },
		{ base: 'margherita.JPG', alt: 'Margarita cocktail' },
		{ base: 'milkshake.jpg', alt: 'Milkshake' }
	].map((d) => toPaths(d, 'drinks'));

	const food = [
		{ base: 'beautifulsoup.jpg', alt: 'Soup starter' },
		{ base: 'Biltong_Filo.jpg', alt: 'Biltong in phyllo pastry' },
		{ base: 'biltongmushroom.jpg', alt: 'Biltong and mushroom soup' },
		{ base: 'blmeringue.jpg', alt: 'Lemon meringue dessert, close up' },
		{ base: 'brownie.JPG', alt: 'Chocolate brownie dessert' },
		{ base: 'carpaccio.jpg', alt: 'Carpaccio starter' },
		{ base: 'Citrus.jpg', alt: 'Citrus dessert plate' },
		{ base: 'crumble.JPG', alt: 'Apple crumble dessert' },
		{ base: 'cupcake.JPG', alt: 'Cupcake dessert' },
		{ base: 'Dessert_Top.jpg', alt: 'Assorted desserts' },
		{ base: 'filostarter2.JPG', alt: 'Phyllo pastry starter' },
		{ base: 'fondant.jpg', alt: 'Chocolate fondant dessert' },
		{ base: 'greensoup.jpg', alt: 'Green soup starter' },
		{ base: 'IMG_3245.jpg', alt: 'Plated dish at Pachas' },
		{ base: 'IMG_5381.JPG', alt: 'Plated dish at Pachas' },
		{ base: 'meringue.JPG', alt: 'Lemon meringue dessert' },
		{ base: 'pretty.jpg', alt: 'Beautifully plated dish' },
		{ base: 'steak.JPG', alt: 'Grilled steak' },
		{ base: 'tempuraprawn.jpg', alt: 'Tempura prawn starter' }
	].map((d) => toPaths(d, 'food'));

	function toPaths({ base, alt }, category) {
		const dot = base.lastIndexOf('.');
		const stem = base.slice(0, dot);
		return {
			jpg: `/images/${category}/${base}`,
			webp: `/images/${category}/${stem}.webp`,
			alt
		};
	}

	let modalOpen = $state(false);
	let selectedImage = $state(null);
	let selectedAlt = $state('');

	function openModal(image, alt) {
		selectedImage = image;
		selectedAlt = alt;
		modalOpen = true;
		if (browser) {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		modalOpen = false;
		selectedImage = null;
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
	<link rel="canonical" href="https://pachas.co.za/gallery" />
</svelte:head>

<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h1 class="section-title">Signature Drinks</h1>
			<p class="section-subtitle">Explore our unique and refreshing drink creations.</p>
		</div>

		<div class="mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each drinks as { jpg, webp, alt }}
				<div
					class="card hover-card cursor-pointer overflow-hidden p-0"
					onclick={() => openModal(jpg, alt)}
				>
					<picture>
						<source srcset={webp} type="image/webp" />
						<img
							src={jpg}
							{alt}
							loading="lazy"
							decoding="async"
							width="512"
							height="256"
							class="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
						/>
					</picture>
				</div>
			{/each}
		</div>

		<div class="divider"></div>

		<div class="mb-12 text-center">
			<h2 class="section-title">Culinary Delights</h2>
			<p class="section-subtitle">Discover our exquisite dishes crafted with passion.</p>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each food as { jpg, webp, alt }}
				<div
					class="card hover-card cursor-pointer overflow-hidden p-0"
					onclick={() => openModal(jpg, alt)}
				>
					<picture>
						<source srcset={webp} type="image/webp" />
						<img
							src={jpg}
							{alt}
							loading="lazy"
							decoding="async"
							width="512"
							height="256"
							class="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
						/>
					</picture>
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
