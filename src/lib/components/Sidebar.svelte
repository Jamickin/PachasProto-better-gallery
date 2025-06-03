<script>
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	let sidebarOpen = $state(false);

	const toggleSidebar = () => {
		sidebarOpen = !sidebarOpen;
	};

	const closeSidebar = () => {
		sidebarOpen = false;
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

<!-- Menu Button with improved styling and better click area -->
<button
	class="menu-button fixed top-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-lg transition-all duration-300 hover:bg-rose-50 hover:shadow-xl"
	on:click={toggleSidebar}
	type="button"
	aria-label="Toggle menu"
>
	{#if sidebarOpen}
		<svg
			class="pointer-events-none h-6 w-6 text-gray-700"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				class="pointer-events-none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			></path>
		</svg>
	{:else}
		<svg
			class="pointer-events-none h-6 w-6 text-gray-700"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				class="pointer-events-none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		</svg>
	{/if}
</button>

<!-- Backdrop overlay -->
{#if sidebarOpen}
	<div
		class="bg-opacity-50 fixed inset-0 z-40 bg-black transition-opacity duration-300"
		on:click={closeSidebar}
	></div>
{/if}

<!-- Updated Sidebar with consistent styling -->
<aside
	class="sidebar fixed top-0 left-0 z-50 flex h-screen w-80 transform flex-col bg-slate-50 shadow-2xl transition-transform duration-300 ease-in-out"
	class:translate-x-[-100%]={!sidebarOpen}
>
	<!-- Header Section -->
	<div class="border-b border-gray-200 bg-white p-6 shadow-sm">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-semibold text-gray-800">Menu</h2>
			<button
				class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-rose-100 hover:text-rose-600"
				on:click={closeSidebar}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Logo Section -->
	<div class="bg-white px-6 py-4 shadow-sm">
		<a
			on:click={closeSidebar}
			href="/"
			class="block transition-transform duration-300 hover:scale-105"
		>
			<img class="mx-auto w-full max-w-48" src="/pachas_logo.jpg" alt="Pachas Restaurant Logo" />
		</a>
	</div>

	<!-- Navigation Section -->
	<nav class="flex-1 overflow-y-auto bg-slate-50 p-6">
		<div class="space-y-2">
			<a
				on:click={closeSidebar}
				href="/"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					></path>
				</svg>
				<span class="font-medium">Home</span>
			</a>

			<a
				on:click={closeSidebar}
				href="/menu"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					></path>
				</svg>
				<span class="font-medium">À La Carte Menu</span>
			</a>

			<a
				on:click={closeSidebar}
				href="/light-lunch"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					></path>
				</svg>
				<span class="font-medium">Light Lunch Menu</span>
			</a>

			<a
				on:click={closeSidebar}
				href="/wine-list"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
					></path>
				</svg>
				<span class="font-medium">Wine List</span>
			</a>

			<!-- Divider -->
			<div class="my-4 h-px bg-gray-200"></div>

			<a
				on:click={closeSidebar}
				href="/private-dining"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
					></path>
				</svg>
				<span class="font-medium">Private Dining & Events</span>
			</a>

			<a
				on:click={closeSidebar}
				href="/gallery"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					></path>
				</svg>
				<span class="font-medium">Gallery</span>
			</a>

			<a
				on:click={closeSidebar}
				href="/contact-reservations"
				class="group flex items-center rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-rose-600 hover:shadow-md"
			>
				<svg
					class="mr-3 h-5 w-5 text-gray-400 transition-colors group-hover:text-rose-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					></path>
				</svg>
				<span class="font-medium">Contact & Reservations</span>
			</a>
		</div>
	</nav>

	<!-- Footer Section -->
	<div class="border-t border-gray-200 bg-white p-6">
		<div class="text-center">
			<p class="text-sm text-gray-600">Est. 1985</p>
			<p class="mt-1 text-xs text-gray-500">Fine Dining • Pretoria</p>
			<div class="mt-3 flex justify-center space-x-4">
				<a href="tel:+27124605063" class="text-rose-600 hover:text-rose-700">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
						></path>
					</svg>
				</a>
				<a href="mailto:mail@pachas.co.za" class="text-rose-600 hover:text-rose-700">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						></path>
					</svg>
				</a>
			</div>
		</div>
	</div>
</aside>
