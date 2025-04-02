<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let hideTitle = $state(false);
	let isScrolled = $state(false);

	const handleScroll = () => {
		hideTitle = window.scrollY > 50;
		isScrolled = window.scrollY > 10;
	};

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
			handleScroll();
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header
	class:shadow-md={isScrolled}
	class:bg-white={isScrolled}
	class:bg-opacity-95={isScrolled}
	class:-translate-y-36={hideTitle}
	class="fixed top-0 left-0 z-[99] flex w-full flex-col items-center justify-between px-6 py-3 transition-all duration-300 max-md:hidden md:px-12 lg:px-24"
>
	<div class="flex justify-center">
		<a href="/" class="block transform transition-transform duration-300 hover:scale-105">
			<img
				class="h-28 object-contain md:h-36"
				src="/pachas_logo.jpg"
				alt="Pachas Restaurant Logo"
			/>
		</a>
	</div>

	<nav class="mt-2 flex flex-wrap items-center justify-center">
		<div class="flex gap-2 py-3 text-sm font-medium uppercase md:gap-4 md:text-base lg:gap-6">
			<a href="/menu" class="border-b-2 border-transparent px-2 py-1 transition-all">A La Carte</a>
			<a href="/facilities" class="border-b-2 border-transparent px-2 py-1 transition-all"
				>Facilities & Functions</a
			>
			<a href="/gallery" class="border-b-2 border-transparent px-2 py-1 transition-all">Gallery</a>
			<a href="/contact" class="border-b-2 border-transparent px-2 py-1 transition-all"
				>Contact & Location</a
			>
			<a href="/wine-menu" class="border-b-2 border-transparent px-2 py-1 transition-all"
				>Wine Menu</a
			>
			<a href="/lite-lunch" class="border-b-2 border-transparent px-2 py-1 transition-all"
				>Lunch Special</a
			>
		</div>
	</nav>
</header>
