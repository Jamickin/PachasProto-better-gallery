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
	<header class="min-md:hidden">
		<a href="/">
			<div class="flex justify-center bg-slate-50 pt-8">
				<img
					class="max-h-48"
					src="/pachas_logo.jpg"
					alt="logo"
					width="1000"
					height="397"
					fetchpriority="high"
				/>
			</div>
		</a>
		<Sidebar></Sidebar>
	</header>

	<main class="mt-68 mb-24 max-md:{'mt-12'} max-md:{'px-6'} px-8">
		{@render children()}
	</main>
{:else}
	{@render children()}
{/if}
