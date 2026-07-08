<script>
	let { children } = $props();
</script>

<div
	class="admin-root min-h-screen bg-gray-100 px-4 py-8 md:px-8"
	style="font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;"
>
	{@render children()}
</div>

<style>
	.admin-root :global(*) {
		font-family: inherit;
	}
</style>
