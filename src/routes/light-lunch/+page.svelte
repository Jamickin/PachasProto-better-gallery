<script>
	import { onMount } from 'svelte';
	import { fetchLiteMenu } from '$lib/litelunch.js';

	let lightMenuData = {};
	let lightMenuCategories = [];
	let showMobileNav = false;

	onMount(async () => {
		try {
			const lightMenuResult = await fetchLiteMenu();
			lightMenuData = lightMenuResult;
			lightMenuCategories = Object.keys(lightMenuData || {});
			console.log('Light menu data loaded:', lightMenuData); // Debug log
		} catch (error) {
			console.error('Error loading light menu', error);
			lightMenuData = {};
		}
	});

	function toggleMobileNav() {
		showMobileNav = !showMobileNav;
	}

	function scrollToCategory(category) {
		const targetId =
			category === 'Additional Info'
				? '#additional-info'
				: `#${category.toLowerCase().replace(/ /g, '-')}`;
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		showMobileNav = false;
	}
</script>

<svelte:head>
	<title>Light Lunch | Pachas Restaurant | Midday Dining Pretoria</title>
	<meta
		name="description"
		content="Enjoy our delightful light lunch menu at Pachas Restaurant. Available Monday to Saturday 12:00-14:30. Premium dishes at great value."
	/>
</svelte:head>

<!-- Mobile Navigation Bar -->
{#if lightMenuCategories.length > 0}
	<div class="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-md md:hidden">
		<div class="px-12 py-3">
			<button
				class="flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 transition-colors hover:bg-rose-100"
				on:click={toggleMobileNav}
			>
				<span class="font-medium text-gray-800">Light Lunch Categories</span>
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
					{#each lightMenuCategories as category}
						<button
							class="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-rose-50"
							on:click={() => scrollToCategory(category)}
						>
							{category}
						</button>
					{/each}
					<button
						class="w-full px-4 py-3 text-left transition-colors hover:bg-rose-50"
						on:click={() => scrollToCategory('Additional Info')}
					>
						Additional Info
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<section class="py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 id="light-lunch" class="section-title">Light Lunch</h2>
			<p class="section-subtitle">Enjoy our delightful light lunch options.</p>
		</div>

		{#if Object.keys(lightMenuData).length === 0}
			<div class="flex h-64 items-center justify-center">
				<div class="text-xl text-gray-600">Loading light lunch menu...</div>
			</div>
		{:else}
			<section class="grid grid-cols-1 gap-6 text-center md:grid-cols-2">
				{#each Object.keys(lightMenuData) as cuisine}
					<div class="card" id={cuisine.toLowerCase().replace(/ /g, '-')}>
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
		{/if}
	</div>
</section>
