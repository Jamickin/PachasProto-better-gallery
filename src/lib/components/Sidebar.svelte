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
	<button class="self-end text-2xl text-white" onclick={toggleSidebar}> × </button>
	<nav class="flex flex-col gap-4 text-lg">
		<a onclick={toggleSidebar} href="/"><img class="w-full" src="/pachas_logo.jpg" alt="logo" /></a>
		<a onclick={toggleSidebar} href="/">Home</a>
		<a onclick={toggleSidebar} href="/menu">Menu & Light Lunch</a>
		<a onclick={toggleSidebar} href="/facilities">Facilities & Functions</a>
		<a onclick={toggleSidebar} href="/gallery">Gallery</a>
		<a onclick={toggleSidebar} href="/contact">Contact & Location</a>
		<a onclick={toggleSidebar} href="/wine-menu">Wine Menu</a>
	</nav>
</aside>
