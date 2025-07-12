<script>
	import { onMount, onDestroy } from 'svelte';
	import { fetchWines } from '$lib/wines.js';
	import { browser } from '$app/environment';

	let wineCategories = [];
	let wineData = {};
	let wineInfo = {};
	let loading = true;
	let showMobileNav = false;
	let selectedCategory = null;
	let modalOpen = false;
	let keydownHandler; // Store reference for proper cleanup

	// Comprehensive list of categories with detailed information
	const educationalCategories = [
		'Method Cap Classique',
		'Champagne',
		'Prosecco',
		'Sparkling Wine',
		'Chardonnay',
		'Chenin Blanc',
		'Sauvignon Blanc',
		'Semi-Sweet',
		'White Blends',
		'Merlot',
		'Shiraz',
		'Cabernet Sauvignon',
		'Pinotage',
		'Pinot Noir',
		'Red Blends',
		'Malbec',
		'Rosé',
		'Dessert Wine',
		'De-Alcoholised',
		'Magnums',
		'Limited Reserve Wines',
		'By the Glass'
	];

	onMount(async () => {
		try {
			// Load wine data
			const wineResult = await fetchWines();
			wineData = wineResult || {};
			wineCategories = Object.keys(wineData);

			// Load wine info with error handling
			try {
				const infoResponse = await fetch('/wine-info.json');
				if (!infoResponse.ok) {
					throw new Error(`HTTP error! status: ${infoResponse.status}`);
				}
				wineInfo = await infoResponse.json();
			} catch (infoError) {
				console.error('Error loading wine info:', infoError);
				wineInfo = {}; // Fallback to empty object
			}

			loading = false;
			console.log('Wine data loaded:', wineData);
		} catch (error) {
			console.error('Error loading wine menu', error);
			wineData = {};
			loading = false;
		}

		// Add keyboard event listener with proper reference
		if (browser) {
			keydownHandler = handleKeydown;
			document.addEventListener('keydown', keydownHandler);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.body.style.overflow = 'auto';
			// Use stored reference for proper cleanup
			if (keydownHandler) {
				document.removeEventListener('keydown', keydownHandler);
			}
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

	function openModal(category) {
		selectedCategory = category;
		modalOpen = true;
		if (browser) {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		modalOpen = false;
		selectedCategory = null;
		if (browser) {
			document.body.style.overflow = 'auto';
		}
	}

	function handleKeydown(event) {
		if (event.key === 'Escape' && modalOpen) {
			closeModal();
		}
	}

	function handleOutsideClick(event) {
		// Since we're using a backdrop button, we can directly close the modal
		closeModal();
	}

	function shouldShowLearnButton(category) {
		return educationalCategories.includes(category);
	}

	function getCategoryIcon(category) {
		const icons = {
			'Method Cap Classique': '🥂',
			Champagne: '🍾',
			Prosecco: '✨',
			'Sparkling Wine': '💫',
			Chardonnay: '🍇',
			'Chenin Blanc': '🌟',
			'Sauvignon Blanc': '🌿',
			Merlot: '🍷',
			Shiraz: '🔥',
			'Cabernet Sauvignon': '👑',
			Pinotage: '🇿🇦',
			'Pinot Noir': '🌹',
			Malbec: '🖤',
			Rosé: '🌸',
			'Dessert Wine': '🍯',
			Magnums: '🏆',
			'Limited Reserve Wines': '💎',
			'By the Glass': '🥃'
		};
		return icons[category] || '🍷';
	}
</script>

<svelte:head>
	<title>Wine List | Pachas Restaurant | Premium South African Wines & Education</title>
	<meta
		name="description"
		content="Explore our comprehensive wine collection with detailed education about each wine style. From Method Cap Classique to Limited Reserves, learn about characteristics, food pairings, and serving suggestions."
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
							{getCategoryIcon(category)}
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
		<!-- Enhanced Header Section -->
		<div class="mb-16 text-center">
			<h2 class="section-title">Wine Collection</h2>
			<p class="section-subtitle text-lg">Discover our curated selection</p>

			<!-- Educational Notice -->
			<div class="mx-auto mt-6 max-w-4xl">
				<div
					class="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
				>
					<div class="mb-4 flex items-center justify-center gap-3">
						<svg
							class="h-6 w-6 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							></path>
						</svg>
						<h3 class="text-xl font-semibold text-blue-800">Note:</h3>
					</div>
					<p class="leading-relaxed text-blue-700">
						Each wine category features detailed educational information including tasting
						characteristics, food pairing suggestions, optimal serving temperatures, and aging
						potential. Click "Learn More" on any category to discover the fascinating world of wine
						and enhance your dining experience.
					</p>
					<div class="mt-4 grid grid-cols-1 place-items-center gap-4 text-sm md:grid-cols-3">
						<div class="flex items-center gap-2 text-blue-600">
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
							<span>Tasting Characteristics</span>
						</div>
						<div class="flex items-center gap-2 text-blue-600">
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
								></path>
							</svg>
							<span>Food Pairings</span>
						</div>
						<div class="flex items-center gap-2 text-blue-600">
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clip-rule="evenodd"
								></path>
							</svg>
							<span>Service Guidelines</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		{#if loading}
			<div class="flex h-64 items-center justify-center">
				<div class="text-center">
					<div
						class="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-rose-500"
					></div>
					<div class="mt-4 text-xl text-gray-600">Loading wine collection...</div>
				</div>
			</div>
		{:else if Object.keys(wineData).length === 0}
			<div class="flex h-64 items-center justify-center">
				<div class="text-xl text-gray-600">No wine data available</div>
			</div>
		{:else}
			{#each wineCategories as category}
				<section id={category.toLowerCase().replace(/ /g, '-')} class="mb-16">
					<div class="mb-8 text-center">
						<h3 class="category-title relative mb-4 text-2xl font-semibold text-gray-800">
							{getCategoryIcon(category)}
							{category}
						</h3>

						{#if shouldShowLearnButton(category)}
							<div class="mt-4 flex flex-col items-center gap-3">
								<button
									class="wine-category-btn inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none"
									on:click={() => openModal(category)}
								>
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										></path>
									</svg>
									Learn About {category}
								</button>
								{#if wineInfo[category]?.description}
									<p class="max-w-2xl text-sm text-gray-600 italic">
										{wineInfo[category].description.slice(0, 150)}...
									</p>
								{/if}
							</div>
						{/if}
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each wineData[category]?.items || [] as wine}
							<div
								class="wine-card rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
							>
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

<!-- Enhanced Wine Education Modal -->
{#if modalOpen && selectedCategory && wineInfo[selectedCategory]}
	<div
		class="modal-backdrop bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 transition-opacity duration-300"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<!-- Invisible backdrop button for click-to-close -->
		<button
			class="absolute inset-0 h-full w-full cursor-default"
			aria-label="Close modal"
			on:click={handleOutsideClick}
		></button>

		<div
			class="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
		>
			<!-- Modal Header -->
			<div
				class="sticky top-0 z-10 bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-4 text-white"
			>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<span class="text-2xl">{getCategoryIcon(selectedCategory)}</span>
						<span id="modal-title" class="text-xl font-semibold">{selectedCategory}</span>
					</div>
					<button
						class="hover:bg-opacity-20 focus:ring-opacity-50 rounded-full p-2 transition-colors hover:bg-white focus:ring-2 focus:ring-white focus:outline-none"
						on:click={closeModal}
						aria-label="Close modal"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Modal Content -->
			<div class="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
				{#if wineInfo[selectedCategory]}
					{@const info = wineInfo[selectedCategory]}

					<!-- Description -->
					<div class="mb-8">
						<p class="text-lg leading-relaxed text-gray-700">{info.description}</p>
					</div>

					<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
						<!-- Characteristics -->
						{#if info.characteristics}
							<div class="rounded-xl bg-gray-50 p-6">
								<h3 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
									<svg
										class="h-5 w-5 text-rose-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
										></path>
									</svg>
									Wine Characteristics
								</h3>
								<div class="space-y-3">
									{#each Object.entries(info.characteristics) as [key, value]}
										<div
											class="wine-characteristic relative flex justify-between border-b border-gray-200 pb-2"
										>
											<span class="font-medium text-gray-600 capitalize"
												>{key.replace(/([A-Z])/g, ' $1')}:</span
											>
											<span class="text-gray-800">{value}</span>
										</div>
									{/each}
								</div>
							</div>
						{/if}

						<!-- Serving Info -->
						<div class="rounded-xl bg-blue-50 p-6">
							<h3 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
								<svg
									class="h-5 w-5 text-blue-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								Serving Guide
							</h3>
							<div class="space-y-3">
								{#if info.servingTemp}
									<div class="flex justify-between border-b border-blue-200 pb-2">
										<span class="font-medium text-gray-600">Temperature:</span>
										<span class="text-gray-800">{info.servingTemp}</span>
									</div>
								{/if}
								{#if info.ageingPotential}
									<div class="flex justify-between border-b border-blue-200 pb-2">
										<span class="font-medium text-gray-600">Aging Potential:</span>
										<span class="text-gray-800">{info.ageingPotential}</span>
									</div>
								{/if}
								{#if info.regions}
									<div class="flex justify-between">
										<span class="font-medium text-gray-600">Key Regions:</span>
										<span class="text-right text-gray-800">{info.regions}</span>
									</div>
								{/if}
							</div>
						</div>
					</div>

					<!-- Food Pairings -->
					{#if info.foodPairings && info.foodPairings.length > 0}
						<div class="mt-8 rounded-xl bg-green-50 p-6">
							<h3 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
								<svg
									class="h-5 w-5 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
									></path>
								</svg>
								Perfect Food Pairings
							</h3>
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								{#each info.foodPairings as pairing}
									<div
										class="food-pairing-card flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
									>
										<div class="h-2 w-2 rounded-full bg-green-500"></div>
										<span class="text-gray-700">{pairing}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Additional Information (if available) -->
					{#if info.winemaking || info.benefits || info.purpose || info.significance}
						<div class="mt-8 rounded-xl bg-purple-50 p-6">
							<h3 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
								<svg
									class="h-5 w-5 text-purple-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								Expert Knowledge
							</h3>
							{#if info.winemaking}
								<div class="mb-4">
									<h4 class="mb-2 font-semibold text-gray-800">Winemaking:</h4>
									<p class="text-gray-700">{info.winemaking}</p>
								</div>
							{/if}
							{#if info.benefits}
								<div class="mb-4">
									<h4 class="mb-2 font-semibold text-gray-800">Special Benefits:</h4>
									<p class="text-gray-700">{info.benefits}</p>
								</div>
							{/if}
							{#if info.purpose}
								<div class="mb-4">
									<h4 class="mb-2 font-semibold text-gray-800">Purpose & Selection:</h4>
									<p class="text-gray-700">{info.purpose}</p>
								</div>
							{/if}
							{#if info.significance}
								<div>
									<h4 class="mb-2 font-semibold text-gray-800">Significance:</h4>
									<p class="text-gray-700">{info.significance}</p>
								</div>
							{/if}
						</div>
					{/if}

					<!-- Professional Tips -->
					{#if info.characteristics}
						<div class="mt-8 rounded-xl bg-yellow-50 p-6">
							<h3 class="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800">
								<svg
									class="h-5 w-5 text-yellow-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
									></path>
								</svg>
								Service Tips
							</h3>
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div class="rounded-lg bg-white p-4 shadow-sm">
									<h4 class="mb-2 font-semibold text-gray-800">For Guests:</h4>
									<p class="text-sm text-gray-600">
										Recommend this wine for diners who enjoy {info.characteristics.body?.toLowerCase() ||
											'medium'}
										bodied wines with {info.characteristics.acidity?.toLowerCase() || 'balanced'} acidity.
									</p>
								</div>
								<div class="rounded-lg bg-white p-4 shadow-sm">
									<h4 class="mb-2 font-semibold text-gray-800">Menu Pairing:</h4>
									<p class="text-sm text-gray-600">
										{#if info.foodPairings && info.foodPairings.length > 0}
											Suggest pairing with our {info.foodPairings[0].toLowerCase()} dishes for the perfect
											dining experience.
										{:else}
											Perfect for pairing with a variety of dishes from our menu.
										{/if}
									</p>
								</div>
							</div>
						</div>
					{/if}
				{/if}
			</div>

			<!-- Modal Footer -->
			<div class="sticky bottom-0 bg-gray-50 px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="text-sm text-gray-600">
						💡 <strong>Tip:</strong> Use this information to enhance your wine service and guest recommendations
					</div>
					<button
						class="rounded-lg bg-rose-500 px-6 py-2 font-medium text-white transition-colors hover:bg-rose-600 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none"
						on:click={closeModal}
					>
						Got it, thanks!
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Add missing CSS classes */

	/* Enhanced styles for the wine education system */
	.wine-category-btn {
		background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
		box-shadow: 0 4px 15px rgba(244, 63, 94, 0.3);
	}

	.wine-category-btn:hover {
		background: linear-gradient(135deg, #e11d48 0%, #be185d 100%);
		box-shadow: 0 6px 20px rgba(244, 63, 94, 0.4);
		transform: translateY(-1px);
	}

	/* Fixed positioning issue */
	.wine-characteristic {
		position: relative;
	}

	.wine-characteristic:hover::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #f43f5e, transparent);
		transform: translateX(0);
		animation: shimmer 0.3s ease;
	}

	.food-pairing-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
	}

	@keyframes shimmer {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.modal-backdrop {
		backdrop-filter: blur(4px);
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-backdrop > div {
		animation: slideInScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	@keyframes slideInScale {
		from {
			opacity: 0;
			transform: translate3d(0, -50px, 0) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0) scale(1);
		}
	}
</style>
