<script>
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { trackPageview } from '$lib/analytics.js';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import '../app.css';

	let { children } = $props();

	let isAdmin = $derived($page.url.pathname.startsWith('/admin'));

	afterNavigate(({ to }) => {
		if (browser && to?.url) {
			trackPageview(to.url);
		}
	});
</script>

<svelte:head>
	{#if !isAdmin}
		<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "Restaurant",
				"name": "Pachas Restaurant",
				"image": "https://pachas.co.za/pachas_logo.jpg",
				"telephone": "+27124605063",
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "22 Dely Road, The Club Retail",
					"addressLocality": "Hazelwood",
					"addressRegion": "Gauteng",
					"postalCode": "0181",
					"addressCountry": "ZA"
				},
				"geo": {
					"@type": "GeoCoordinates",
					"latitude": -25.778474,
					"longitude": 28.254576
				},
				"url": "https://pachas.co.za",
				"servesCuisine": ["South African", "Steakhouse", "Seafood"],
				"priceRange": "$$$$",
				"openingHours": "Mo-Sa 12:00-22:00"
			}
		</script>
	{/if}
</svelte:head>

{#if !isAdmin}
	<header class="max-md:hidden"><Topbar></Topbar></header>
	<header class="fixed top-0 left-0 z-30 w-full bg-slate-50 py-3 shadow-sm min-md:hidden">
		<a href="/" class="block text-center transition-transform duration-300 hover:scale-105">
			<img
				class="mx-auto h-14 object-contain"
				src="/pachas_logo.jpg"
				alt="logo"
				width="1000"
				height="397"
				fetchpriority="high"
			/>
		</a>
	</header>
	<div class="min-md:hidden"><Sidebar></Sidebar></div>

	<main class="mt-68 mb-24 px-8 max-md:mt-24 max-md:px-6">
		{@render children()}
	</main>
{:else}
	{@render children()}
{/if}
