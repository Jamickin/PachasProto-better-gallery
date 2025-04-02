<script>
	import { onMount } from 'svelte';
	import { fetchWines } from '$lib/wines.js';

	let wineCategories = [];
	let wineData = {};
	let loading = true;

	onMount(async () => {
		try {
			const wineResult = await fetchWines();
			wineData = wineResult;
			wineCategories = Object.keys(wineData || {});
			loading = false;
		} catch (error) {
			console.error('Error loading wine menu', error);
			wineData = {};
		}

		// Function to get the document-relative offset of an element
		function getDocumentOffset(element) {
			let top = 0;
			let el = element;
			while (el) {
				top += el.offsetTop + (el.offsetParent?.offsetTop || 0);
				el = el.offsetParent;
			}
			return top;
		}

		// Override default scroll behavior for in-page anchor links
		const handleAnchorClick = (event) => {
			const target = event.target;
			if (target.classList.contains('in-page-link')) {
				const targetId = target.getAttribute('href');
				if (targetId) {
					event.preventDefault();

					requestAnimationFrame(() => {
						const targetElement = document.querySelector(targetId);
						if (targetElement) {
							const navHeight = document.querySelector('nav').offsetHeight;
							const extraOffset = 20;
							const targetPosition = getDocumentOffset(targetElement) - navHeight - extraOffset;

							window.scrollTo({
								top: Math.max(0, targetPosition),
								behavior: 'smooth'
							});
						}
					});
				}
			}
		};

		// Add event listeners to in-page anchor links
		requestAnimationFrame(() => {
			const anchorLinks = document.querySelectorAll('nav .in-page-link');
			anchorLinks.forEach((link) => {
				link.addEventListener('click', handleAnchorClick);
			});
		});

		// Clean up event listeners on unmount
		return () => {
			const anchorLinks = document.querySelectorAll('nav .in-page-link');
			anchorLinks.forEach((link) => {
				link.removeEventListener('click', handleAnchorClick);
			});
		};
	});
</script>

<!-- <nav class="fixed top-0 left-0 z-10 w-screen bg-slate-50 py-4 shadow-md">
	<div class="container mx-auto px-4">
		<h1 class="mb-4 text-center text-2xl font-bold text-rose-600">Wine Menu</h1>
		<div class="flex flex-wrap justify-center space-x-2 overflow-x-auto py-2 md:space-x-4">
			{#each wineCategories as category}
				<a
					href="#{category.toLowerCase().replace(/ /g, '-')}"
					class="in-page-link py-2 font-medium whitespace-nowrap transition-colors duration-200 hover:text-rose-600"
					>{category}</a
				>
			{/each}
		</div>
	</div>
</nav> -->

<section class="">
	<h1>Wine List</h1>

	<div class="container mx-auto px-4">
		{#if loading}
			<div class="flex h-64 items-center justify-center">
				<div class="text-xl text-gray-600">Loading wine menu...</div>
			</div>
		{:else}
			{#each wineCategories as category}
				<section id={category.toLowerCase().replace(/ /g, '-')} class="mb-16">
					<h3
						class="relative mb-8 text-center text-2xl font-semibold after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
					>
						{category}
					</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each wineData[category]?.items || [] as wine}
							<div class="rounded-lg bg-white p-5 shadow-md transition-transform hover:scale-105">
								<div class="flex items-start justify-between">
									<div class="text-lg font-semibold text-gray-900">
										{typeof wine === 'string' ? wine : wine.name || wine}
									</div>
									{#if typeof wine === 'object' && wine.price}
										<div class="text-sm font-bold text-rose-600">{wine.price}</div>
									{/if}
								</div>
								{#if typeof wine === 'object' && wine.description}
									<p class="mt-3 text-sm text-gray-600">{wine.description}</p>
								{/if}
							</div>
						{/each}
					</div>
				</section>
			{/each}
		{/if}
	</div>
</section>

<style>
</style>
