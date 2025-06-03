<script>
	import { onMount } from 'svelte';
	import { fetchWines } from '$lib/wines.js';

	let wineCategories = [];
	let wineData = {};
	let loading = true;
	let showMobileNav = false;

	onMount(async () => {
		try {
			const wineResult = await fetchWines();
			wineData = wineResult;
			wineCategories = Object.keys(wineData || {});
			loading = false;
			console.log('Wine data loaded:', wineData); // Debug log
		} catch (error) {
			console.error('Error loading wine menu', error);
			wineData = {};
			loading = false;
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
	<title>Wine List | Pachas Restaurant | Premium South African Wines</title>
	<meta
		name="description"
		content="Explore our extensive wine collection featuring the finest South African wines. From Chenin Blanc to Pinotage, perfect pairings for fine dining."
	/>
</svelte:head>

<!-- Mobile Navigation Bar -->
{#if !loading && wineCategories.length > 0}
	<div class="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-md md:hidden">
		<div class="px-12 py-3">
			<button
				class="flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 transition-colors hover:bg-rose-100"
				on:click={toggleMobileNav}
			>
				<span class="font-medium text-gray-800">Wine Categories</span>
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
					{#each wineCategories as category}
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
			<h2 class="section-title">Wine Menu</h2>
			<p class="section-subtitle">Explore our exquisite selection of wines</p>
		</div>

		{#if loading}
			<div class="flex h-64 items-center justify-center">
				<div class="text-xl text-gray-600">Loading wine menu...</div>
			</div>
		{:else if Object.keys(wineData).length === 0}
			<div class="flex h-64 items-center justify-center">
				<div class="text-xl text-gray-600">No wine data available</div>
			</div>
		{:else}
			{#each wineCategories as category}
				<section id={category.toLowerCase().replace(/ /g, '-')} class="mb-16">
					<h3
						class="relative mb-8 text-center text-2xl font-semibold text-gray-800 after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
					>
						{category}
					</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each wineData[category]?.items || [] as wine}
							<div class="card hover-card">
								<div class="flex items-start justify-between">
									<div class="text-lg font-semibold text-gray-800">
										{typeof wine === 'string' ? wine : wine.name || wine}
									</div>
									{#if typeof wine === 'object' && wine.price}
										<div class="text-sm font-bold text-rose-600">{wine.price}</div>
									{/if}
								</div>
								{#if typeof wine === 'object' && wine.description}
									<p class="mt-3 text-gray-700">{wine.description}</p>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/each}
		{/if}
	</div>
</section>
