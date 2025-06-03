<script>
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let sidebarOpen = $state(false);

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};

	const handleOutsideClick = (event) => {
		if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
			sidebarOpen = false;
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleOutsideClick);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleOutsideClick);
		}
	});
</script>

<button
	class="menu-button fixed top-4 left-4 z-50 w-8 rounded-lg bg-gray-800 p-2 text-white"
	onclick={toggleSidebar}
>
	{#if sidebarOpen}
		X
	{:else}
		☰
	{/if}
</button>

<aside
	class="sidebar fixed top-0 left-0 z-40 flex h-screen w-64 transform flex-col gap-4 bg-slate-50 p-6 backdrop-blur-lg transition-transform duration-300"
	class:translate-x-[-100%]={!sidebarOpen}
>
	<button class="self-end text-2xl text-gray-800" onclick={toggleSidebar}>×</button>
	<nav class="flex flex-col gap-4 text-lg">
		<a onclick={toggleSidebar} href="/"><img class="w-full" src="/pachas_logo.jpg" alt="logo" /></a>
		<a onclick={toggleSidebar} href="/" class="border-b border-gray-100 py-2 hover:text-rose-600"
			>Home</a
		>
		<a
			onclick={toggleSidebar}
			href="/menu"
			class="border-b border-gray-100 py-2 hover:text-rose-600">Menu</a
		>
		<a
			onclick={toggleSidebar}
			href="/private-dining"
			class="border-b border-gray-100 py-2 hover:text-rose-600">rivate Dining & Events</a
		>
		<a
			onclick={toggleSidebar}
			href="/gallery"
			class="border-b border-gray-100 py-2 hover:text-rose-600">Gallery</a
		>
		<a
			onclick={toggleSidebar}
			href="/contact-reservations"
			class="border-b border-gray-100 py-2 hover:text-rose-600">Contact & Reservations</a
		>
		<a
			onclick={toggleSidebar}
			href="/wine-list"
			class="border-b border-gray-100 py-2 hover:text-rose-600">Wine List</a
		>
		<a
			onclick={toggleSidebar}
			href="/light-lunch"
			class="border-b border-gray-100 py-2 hover:text-rose-600">Light Lunch Menu</a
		>
	</nav>
</aside>
