<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<header class="max-md:hidden"><Topbar></Topbar></header>
<header class="min-md:hidden">
	<a href="/">
		<div class="flex justify-center bg-slate-50 pt-8">
			<img class="max-h-48" src="/pachas_logo.jpg" alt="logo" />
		</div>
	</a>
	<Sidebar></Sidebar>
</header>

<main class="mt-68 max-md:{'mt-12'} max-md:{'px-6'} px-8">
	{@render children()}
</main>

<style></style>
