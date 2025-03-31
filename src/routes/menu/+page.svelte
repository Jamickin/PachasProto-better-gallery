<script>
	import { onMount } from 'svelte';
	import { fetchMenu } from '$lib/menu.js';
	import { fetchLiteMenu } from '$lib/litelunch.js';

	let litemenuData = {};
	let menuData = {};
	let aLaCarteCategories = [];

	onMount(async () => {
		try {
			const menuResult = await fetchMenu();
			const litemenuResult = await fetchLiteMenu();
			litemenuData = litemenuResult;
			menuData = menuResult;
			aLaCarteCategories = Object.keys(menuData || {});
		} catch (error) {
			console.error('Error loading menu', error);
			menuData = {};
			litemenuData = {};
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

		// Override default scroll behavior for anchor links
		const handleAnchorClick = (event) => {
			const targetId = event.target.getAttribute('href');
			if (targetId) {
				event.preventDefault();

				// Use requestAnimationFrame to ensure layout is complete
				requestAnimationFrame(() => {
					const targetElement = document.querySelector(targetId);
					if (targetElement) {
						// Recalculate navHeight *and* document offsets *right before* scrolling
						const navHeight = document.querySelector('nav').offsetHeight;
						const extraOffset = 500;
						const targetPosition = getDocumentOffset(targetElement) - navHeight - extraOffset;

						window.scrollTo({
							top: Math.max(0, targetPosition),
							behavior: 'smooth'
						});
					}
				});
			}
		};

		// Add event listeners to anchor links (ensure this happens *after* initial render)
		requestAnimationFrame(() => {
			const anchorLinks = document.querySelectorAll('nav a');
			anchorLinks.forEach((link) => {
				link.addEventListener('click', handleAnchorClick);
			});
		});

		// Clean up event listeners on unmount (optional but good practice)
		return () => {
			const anchorLinks = document.querySelectorAll('nav a');
			anchorLinks.forEach((link) => {
				link.removeEventListener('click', handleAnchorClick);
			});
		};
	});
</script>

<nav class="fixed top-0 left-0 z-10 w-screen bg-slate-50 py-4 shadow-md">
	<div
		class="container mx-auto flex flex-wrap justify-center space-x-2 px-4 pt-8 md:space-x-6 md:pt-20"
	>
		<a href="#a-la-carte" class="py-2 font-medium transition-colors duration-200">A La Carte</a>
		{#each aLaCarteCategories as category}
			<a
				href="#{category.toLowerCase().replace(/ /g, '-')}"
				class="py-2 font-medium transition-colors duration-200">{category}</a
			>
		{/each}
		<a href="#light-lunch" class="py-2 font-medium transition-colors duration-200">Light Lunch</a>
		<a href="#additional-info" class="py-2 font-medium transition-colors duration-200"
			>Additional Info</a
		>
	</div>
</nav>

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
			<section id={category.toLowerCase().replace(/ /g, '-')} class="mb-8">
				<h3 class="mb-3 text-center text-2xl font-semibold">{category}</h3>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each menuData[category]?.items || [] as item}
						<div class="rounded-lg bg-white p-5 shadow-md transition-transform hover:scale-105">
							<div class="text-lg font-semibold text-gray-900">
								{typeof item === 'string' ? item : item.name || item}
							</div>
							{#if typeof item === 'object' && item.description}
								<p class="mt-2 text-sm text-gray-600">{item.description}</p>
							{/if}
						</div>
					{/each}
				</div>
			</section>
		{/each}

		<div class="mt-16 mb-12 text-center">
			<h2
				id="light-lunch"
				class="relative mb-4 inline-block text-3xl font-semibold after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
			>
				Light Lunch
			</h2>
			<p class="text-gray-600">Enjoy our delightful light lunch options.</p>
		</div>

		<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each Object.keys(litemenuData || {}) as cuisine}
				<div class="rounded-lg bg-white p-5 shadow-md">
					<h3 class="mb-3 text-xl font-semibold">{cuisine}</h3>
					<ul class="list-inside list-disc">
						{#each litemenuData[cuisine]?.items || [] as item}
							<li class="mb-1">{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</section>

		<div class="mx-auto mt-16 max-w-3xl">
			<section id="additional-info" class="rounded-lg bg-white p-6 shadow-md">
				<h3 class="mb-4 text-center text-2xl font-semibold">Additional Info</h3>
				<ul class="space-y-3">
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-5 w-5 text-blue-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>Light Lunch R200 p/p</span>
					</li>
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-5 w-5 text-blue-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
						<span>Available Monday to Saturday 12:00 – 14:30</span>
					</li>
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-5 w-5 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							></path>
						</svg>
						<span
							>Not available for take away / group bookings / office parties during festive season</span
						>
					</li>
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-5 w-5 text-red-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
						<span>The meals cannot be shared</span>
					</li>
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-5 w-5 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>All meals served with veggies and your choice of starch</span>
					</li>
					<li class="flex items-start">
						<svg
							class="mt-1 mr-2 h-5 w-5 text-green-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>Table salad to be ordered separately</span>
					</li>
				</ul>
			</section>
		</div>
	</div>
</section>

<style>
</style>
