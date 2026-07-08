<script>
	import { enhance } from '$app/forms';

	let { data } = $props();

	const CHART_W = 600;
	const CHART_H = 180;
	const PAD = 8;

	let hoverIndex = $state(null);

	const maxCount = $derived(Math.max(1, ...data.series.map((d) => d.count)));

	const points = $derived(
		data.series.map((d, i) => {
			const x = PAD + (i / (data.series.length - 1)) * (CHART_W - PAD * 2);
			const y = CHART_H - PAD - (d.count / maxCount) * (CHART_H - PAD * 2);
			return { ...d, x, y };
		})
	);

	const linePath = $derived(points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' '));

	const maxBar = (list) => Math.max(1, ...list.map((i) => i.count));

	function formatDate(iso) {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-ZA', {
			day: 'numeric',
			month: 'short'
		});
	}

	function handleMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const relX = ((event.clientX - rect.left) / rect.width) * CHART_W;
		let nearest = 0;
		let nearestDist = Infinity;
		points.forEach((p, i) => {
			const dist = Math.abs(p.x - relX);
			if (dist < nearestDist) {
				nearestDist = dist;
				nearest = i;
			}
		});
		hoverIndex = nearest;
	}

	function handleLeave() {
		hoverIndex = null;
	}
</script>

<svelte:head>
	<title>Analytics | Pachas Restaurant</title>
</svelte:head>

<div class="mx-auto max-w-6xl">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-semibold text-gray-900">Analytics</h1>
		<form method="POST" action="?/logout" use:enhance>
			<button type="submit" class="text-sm font-medium text-gray-500 hover:text-gray-700"
				>Log out</button
			>
		</form>
	</div>

	{#if data.blobsUnavailable}
		<div class="rounded-lg bg-white p-8 text-center shadow-sm">
			<p class="text-gray-600">
				Analytics storage isn't available in this environment (this is expected in local dev — it
				requires the real Netlify Blobs runtime, which only exists on the deployed site).
			</p>
		</div>
	{:else if data.totalVisits === 0}
		<div class="rounded-lg bg-white p-8 text-center shadow-sm">
			<p class="text-gray-600">
				No visits recorded yet. Data will appear here once people start visiting the site.
			</p>
		</div>
	{:else}
		<!-- Stat tiles -->
		<div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div class="rounded-lg bg-white p-5 shadow-sm">
				<p class="text-sm text-gray-500">Today</p>
				<p class="mt-1 text-3xl font-semibold text-gray-900">{data.visitsToday}</p>
			</div>
			<div class="rounded-lg bg-white p-5 shadow-sm">
				<p class="text-sm text-gray-500">Last 7 days</p>
				<p class="mt-1 text-3xl font-semibold text-gray-900">{data.visits7d}</p>
			</div>
			<div class="rounded-lg bg-white p-5 shadow-sm">
				<p class="text-sm text-gray-500">Last 30 days</p>
				<p class="mt-1 text-3xl font-semibold text-gray-900">{data.visits30d}</p>
			</div>
			<div class="rounded-lg bg-white p-5 shadow-sm">
				<p class="text-sm text-gray-500">All time</p>
				<p class="mt-1 text-3xl font-semibold text-gray-900">{data.totalVisits}</p>
			</div>
		</div>

		<!-- Visits over time -->
		<div class="mb-6 rounded-lg bg-white p-5 shadow-sm">
			<h2 class="mb-4 text-sm font-semibold text-gray-700">Visits over the last 30 days</h2>
			<div class="relative">
				<svg
					viewBox="0 0 {CHART_W} {CHART_H}"
					class="w-full"
					role="img"
					aria-label="Line chart of visits over the last 30 days"
					onpointermove={handleMove}
					onpointerleave={handleLeave}
				>
					<!-- gridlines -->
					{#each [0, 0.25, 0.5, 0.75, 1] as frac (frac)}
						<line
							x1={PAD}
							x2={CHART_W - PAD}
							y1={PAD + frac * (CHART_H - PAD * 2)}
							y2={PAD + frac * (CHART_H - PAD * 2)}
							stroke="#e1e0d9"
							stroke-width="1"
						/>
					{/each}

					<path
						d={linePath}
						fill="none"
						stroke="#e11d48"
						stroke-width="2"
						stroke-linejoin="round"
						stroke-linecap="round"
					/>

					{#if hoverIndex !== null}
						<line
							x1={points[hoverIndex].x}
							x2={points[hoverIndex].x}
							y1={PAD}
							y2={CHART_H - PAD}
							stroke="#c3c2b7"
							stroke-width="1"
						/>
						<circle
							cx={points[hoverIndex].x}
							cy={points[hoverIndex].y}
							r="4"
							fill="#e11d48"
							stroke="#fff"
							stroke-width="2"
						/>
					{/if}
				</svg>

				{#if hoverIndex !== null}
					{@const p = points[hoverIndex]}
					<div
						class="pointer-events-none absolute rounded-md bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white"
						style="left: {(p.x / CHART_W) * 100}%; top: 0; transform: translate(-50%, -110%);"
					>
						<span class="font-semibold">{p.count}</span> visits · {formatDate(p.date)}
					</div>
				{/if}
			</div>
		</div>

		<!-- Breakdown bar lists -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each [{ title: 'Top pages', list: data.topPages }, { title: 'Traffic sources', list: data.topReferrers }, { title: 'Devices', list: data.devices }, { title: 'Browsers', list: data.browsers }, { title: 'Countries', list: data.countries }] as section (section.title)}
				{#if section.list.length > 0}
					<div class="rounded-lg bg-white p-5 shadow-sm">
						<h2 class="mb-4 text-sm font-semibold text-gray-700">{section.title}</h2>
						<div class="space-y-2">
							{#each section.list as item (item.label)}
								<div class="flex items-center gap-3">
									<span class="w-28 shrink-0 truncate text-sm text-gray-600" title={item.label}
										>{item.label}</span
									>
									<div class="h-4 flex-1 rounded bg-gray-100">
										<div
											class="h-4 rounded bg-rose-600"
											style="width: {(item.count / maxBar(section.list)) * 100}%"
										></div>
									</div>
									<span class="w-10 shrink-0 text-right text-sm font-medium text-gray-700"
										>{item.count}</span
									>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>
