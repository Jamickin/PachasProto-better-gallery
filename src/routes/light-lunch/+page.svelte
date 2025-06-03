<script>
	import { onMount, onDestroy } from 'svelte';
	import { fetchMenu } from '$lib/menu.js';
	import { fetchLiteMenu } from '$lib/litelunch.js';
	import { browser } from '$app/environment';

	let lightMenuData = {};
	let menuData = {};
	let aLaCarteCategories = [];

	onMount(async () => {
		try {
			const menuResult = await fetchMenu();
			const lightMenuResult = await fetchLiteMenu();
			lightMenuData = lightMenuResult;
			menuData = menuResult;
			aLaCarteCategories = Object.keys(menuData || {});
		} catch (error) {
			console.error('Error loading menu', error);
			menuData = {};
			lightMenuData = {};
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
			<h2 id="light-lunch" class="section-title">Light Lunch</h2>
			<p class="section-subtitle">Enjoy our delightful light lunch options.</p>
		</div>

		<section class="grid grid-cols-1 gap-6 text-center md:grid-cols-2">
			{#each Object.keys(lightMenuData || {}) as cuisine}
				<div class="card">
					<h3
						class="relative mb-6 text-xl font-semibold text-gray-800 after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
					>
						{cuisine}
					</h3>
					<ul class="mt-4 list-inside list-disc text-gray-700">
						{#each lightMenuData[cuisine]?.items || [] as item}
							<li class="mb-2">{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</section>

		<div class="mx-auto mt-16 max-w-3xl">
			<section id="additional-info" class="card">
				<h3 class="mb-6 text-center text-2xl font-semibold text-gray-800">Additional Info</h3>
				<ul class="space-y-4 text-gray-700">
					<li class="list-item">
						<svg
							class="list-item-icon"
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
						<span>Light Lunch R220 p/p</span>
					</li>
					<li class="list-item">
						<svg
							class="list-item-icon"
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
					<li class="list-item">
						<svg
							class="list-item-icon text-rose-500"
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
					<li class="list-item">
						<svg
							class="list-item-icon text-rose-500"
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
					<li class="list-item">
						<svg
							class="list-item-icon text-green-500"
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
						<span>All meals served with vegetables and your choice of starch</span>
					</li>
					<li class="list-item">
						<svg
							class="list-item-icon text-green-500"
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
