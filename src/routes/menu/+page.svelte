<script>
	import { onMount } from 'svelte';
	import { fetchMenu } from '$lib/menu.js';

	let menuData = {};
	let aLaCarteCategories = [];
	let showMobileNav = false;

	onMount(async () => {
		try {
			const menuResult = await fetchMenu();
			menuData = menuResult;
			aLaCarteCategories = Object.keys(menuData || {});
			console.log('Menu data loaded:', menuData); // Debug log
		} catch (error) {
			console.error('Error loading menu', error);
			menuData = {};
		}
	});

	function toggleMobileNav() {
		showMobileNav = !showMobileNav;
	}

	function scrollToCategory(category) {
		const targetId = `#${category.toLowerCase().replace(/ /g, '-')}`;
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		showMobileNav = false;
	}
</script>

<svelte:head>
	<title>Menu | Pachas Restaurant | À La Carte Dining Pretoria</title>
	<meta
		name="description"
		content="View our à la carte menu featuring premium steaks, fresh seafood, and South African specialties. Fine dining in Pretoria since 1985."
	/>
</svelte:head>

<!-- Mobile Navigation Bar -->
{#if aLaCarteCategories.length > 0}
	<div class="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-md md:hidden">
		<div class="px-12 py-3">
			<button
				class="flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 transition-colors hover:bg-rose-100"
				on:click={toggleMobileNav}
			>
				<span class="font-medium text-gray-800">Menu Categories</span>
				<svg
					class="h-5 w-5 text-gray-600 transition-transform duration-200"
					class:rotate-180={showMobileNav}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>

			{#if showMobileNav}
				<div
					class="mt-3 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
				>
					{#each aLaCarteCategories as category}
						<button
							class="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-rose-50"
							on:click={() => scrollToCategory(category)}
						>
							{category}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<section class="py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 id="a-la-carte" class="section-title">À La Carte</h2>
			<p class="section-subtitle">Explore our exquisite selection of dishes.</p>
		</div>

		{#if Object.keys(menuData).length === 0}
			<div class="flex h-64 items-center justify-center">
				<div class="text-xl text-gray-600">Loading menu...</div>
			</div>
		{:else}
			{#each Object.keys(menuData) as category}
				<section id={category.toLowerCase().replace(/ /g, '-')} class="my-12">
					<h3
						class="relative mb-8 text-center text-2xl font-semibold text-gray-800 after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
					>
						{category}
					</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each menuData[category]?.items || [] as item}
							<div class="card hover-card">
								<div class="text-lg font-semibold text-gray-800">
									{typeof item === 'string' ? item : item.name || item}
								</div>
								{#if typeof item === 'object' && item.description}
									<p class="mt-3 text-gray-700">{item.description}</p>
								{/if}
								{#if typeof item === 'object' && item.price}
									<p class="mt-3 font-semibold text-rose-600">{item.price}</p>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/each}
		{/if}
	</div>
</section>
