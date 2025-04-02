<script>
	import { onMount, onDestroy } from 'svelte';
	import { fetchMenu } from '$lib/menu.js';
	import { browser } from '$app/environment';

	let menuData = {};
	let aLaCarteCategories = [];

	onMount(async () => {
		try {
			const menuResult = await fetchMenu();
			menuData = menuResult;
			aLaCarteCategories = Object.keys(menuData || {});
		} catch (error) {
			console.error('Error loading menu', error);
			menuData = {};
		}

		// Function to get the document-relative offset of an element (most robust)
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
			const target = event.target; // Get the clicked element
			if (target.classList.contains('in-page-link')) {
				// Check for the class
				const targetId = target.getAttribute('href');
				if (targetId) {
					event.preventDefault();

					requestAnimationFrame(() => {
						const targetElement = document.querySelector(targetId);
						if (targetElement) {
							const navHeight = document.querySelector('nav').offsetHeight;
							const extraOffset = 400;
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

		// Add event listeners to in-page anchor links (ensure this happens *after* initial render)
		requestAnimationFrame(() => {
			const anchorLinks = document.querySelectorAll('nav .in-page-link'); // Select by class
			anchorLinks.forEach((link) => {
				link.addEventListener('click', handleAnchorClick);
			});
		});

		// Clean up event listeners on unmount (optional but good practice)
		return () => {
			if (browser) {
				const anchorLinks = document.querySelectorAll('nav .in-page-link'); // Select by class
				anchorLinks.forEach((link) => {
					link.removeEventListener('click', handleAnchorClick);
				});
			}
		};
	});
</script>

<!-- 
<nav class="fixed top-0 left-0 z-10 w-screen bg-slate-50 py-4 shadow-md">
	<div
		class="container mx-auto flex flex-wrap justify-center space-x-2 px-4 pt-8 md:space-x-6 md:pt-20"
	>
		<a href="#a-la-carte" class="in-page-link py-2 font-medium transition-colors duration-200"
			>A La Carte</a
		>
		{#each aLaCarteCategories as category}
			<a
				href="#{category.toLowerCase().replace(/ /g, '-')}"
				class="in-page-link py-2 font-medium transition-colors duration-200">{category}</a
			>
		{/each}
		<a href="#light-lunch" class="in-page-link py-2 font-medium transition-colors duration-200"
			>Light Lunch</a
		>
		<a href="#additional-info" class="in-page-link py-2 font-medium transition-colors duration-200"
			>Additional Info</a
		>
	</div>
</nav> -->

<section class="py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2
				id="a-la-carte"
				class="relative mb-4 inline-block text-3xl font-semibold after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
			>
				A La Carte
			</h2>
			<p class="text-gray-600">Explore our exquisite selection of dishes.</p>
		</div>

		{#each Object.keys(menuData || {}) as category}
			<section id={category.toLowerCase().replace(/ /g, '-')} class="my-8">
				<h3
					class="relative mb-6 text-center text-2xl font-semibold after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
				>
					{category}
				</h3>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each menuData[category]?.items || [] as item}
						<div class="rounded-lg p-5 shadow-md transition-all hover:scale-105">
							<div class="text-lg font-semibold text-gray-900">
								{typeof item === 'string' ? item : item.name || item}
							</div>
							{#if typeof item === 'object' && item.description}
								<p class="mt-2 text-sm text-gray-600">{item.description}</p>
							{/if}
							{#if typeof item === 'object' && item.price}
								<p class="mt-2 font-semibold text-rose-500">{item.price}</p>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</section>

<style>
</style>
