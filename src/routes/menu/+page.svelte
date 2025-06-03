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

	// src/routes/+page.js
	export const load = () => {
		return {
			title: 'Pachas Restaurant | Fine Dining Pretoria | Steakhouse & Seafood',
			description:
				'Fine dining restaurant in Pretoria offering premium steaks, fresh seafood, and South African cuisine. Private function rooms available. Est. 1985.'
		};
	};
</script>

<section class="py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 id="a-la-carte" class="section-title">À La Carte</h2>
			<p class="section-subtitle">Explore our exquisite selection of dishes.</p>
		</div>

		{#each Object.keys(menuData || {}) as category}
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
	</div>
</section>
