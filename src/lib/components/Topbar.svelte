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
	class="fixed top-0 left-0 z-[99] flex w-full flex-col items-center justify-between px-6 py-3 transition-all duration-300 max-md:hidden md:px-12 lg:px-20"
>
	<div class="flex justify-center">
		<a href="/" class="block transition duration-300 hover:scale-105">
			<img
				class="h-28 object-contain md:h-36"
				src="/pachas_logo.jpg"
				alt="Pachas Restaurant Logo"
			/>
		</a>
	</div>

	<nav class="mt-2 flex flex-wrap items-center justify-center">
		<div class="flex gap-2 py-3 text-sm font-medium uppercase md:gap-4 md:text-base lg:gap-6">
			<a
				href="/menu"
				class="border-b-2 border-transparent px-2 py-1 transition-all hover:border-rose-500 hover:text-rose-600"
				>Menu</a
			>
			<a
				href="/private-dining"
				class="border-b-2 border-transparent px-2 py-1 transition-all hover:border-rose-500 hover:text-rose-600"
				>Private Dining & Events</a
			>
			<a
				href="/gallery"
				class="border-b-2 border-transparent px-2 py-1 transition-all hover:border-rose-500 hover:text-rose-600"
				>Gallery</a
			>
			<a
				href="/contact-reservations"
				class="border-b-2 border-transparent px-2 py-1 transition-all hover:border-rose-500 hover:text-rose-600"
				>Contact & Reservations</a
			>
			<a
				href="/wine-list"
				class="border-b-2 border-transparent px-2 py-1 transition-all hover:border-rose-500 hover:text-rose-600"
				>Wine List</a
			>
			<a
				href="/light-lunch"
				class="border-b-2 border-transparent px-2 py-1 transition-all hover:border-rose-500 hover:text-rose-600"
				>Light Lunch Menu</a
			>
		</div>
	</nav>
</header>
