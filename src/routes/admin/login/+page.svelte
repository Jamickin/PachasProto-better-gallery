<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Admin Login | Pachas Restaurant</title>
</svelte:head>

<div class="mx-auto max-w-sm">
	<div class="rounded-lg bg-white p-8 shadow-md">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">Analytics Login</h1>

		<form method="POST" use:enhance>
			<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				required
				autofocus
				class="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
			/>

			{#if form?.error}
				<p class="mb-4 text-sm text-rose-700">{form.error}</p>
			{/if}

			<button type="submit" class="btn btn-primary w-full">Log In</button>
		</form>
	</div>
</div>
