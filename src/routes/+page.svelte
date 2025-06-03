<script>
	import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<svelte:head>
	<title>Pachas Restaurant | Fine Dining Pretoria | Steakhouse & Seafood</title>
	<meta
		name="description"
		content="Fine dining restaurant in Pretoria offering premium steaks, fresh seafood, and South African cuisine. Private function rooms available. Est. 1985."
	/>
</svelte:head>

<section
	class="relative mx-auto max-w-6xl overflow-hidden rounded-lg border-l-4 border-rose-500 pt-12 shadow-xl"
>
	<div class="flex h-72 justify-center gap-4 overflow-hidden rounded-t-lg">
		<!-- <img
			src="/resized/johny.jpg"
			alt="Johnny"
			class="h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
		/> -->
		<img
			src="/images/food/resized/Dessert_Top.jpg"
			alt="Dessert"
			class="h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105 max-md:hidden"
		/>
		<img
			src="/images/food/resized/steak.JPG"
			alt="Steak"
			class="h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
		/>
		<img
			src="/images/food/resized/Biltong_Filo.jpg"
			alt="Biltong Filo"
			class="h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105 max-md:hidden"
		/>
	</div>

	<div class="rounded-b-lg p-4 pl-5 text-center shadow-sm">
		<p class="m-0 text-gray-700">
			Take a Virtual Tour
			<a
				href="http://360sa.co.za/pretoria/pachas2/"
				class="mx-2 font-semibold text-rose-600 transition-colors duration-200 hover:text-rose-500 hover:underline"
				>through the restaurant</a
			>
			<span class="mt-2 block text-sm text-gray-700 italic"
				>For reservations, call <a
					href="tel:+27124605063"
					class="font-bold text-rose-600 underline hover:text-rose-500">012 460 5063</a
				></span
			>
		</p>
	</div>

	<section class="rounded-lg p-6">
		<h2 class="section-subheading text-center">What We Offer</h2>
		<ul class="mt-6 space-y-4 text-gray-700">
			<li class="list-item">
				<svg
					class="list-item-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
					></path>
				</svg>
				<span
					><strong class="font-medium">Menu:</strong> Upmarket Steakhouse fare, seafood & poultry.</span
				>
			</li>
			<li class="list-item">
				<svg
					class="list-item-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
					></path>
				</svg>
				<span
					><strong class="font-medium">Venues:</strong> Private options for functions & business meals.</span
				>
			</li>
			<li class="list-item">
				<svg
					class="list-item-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
					></path>
				</svg>
				<span><strong class="font-medium">Wheelchair-friendly</strong> establishment</span>
			</li>
		</ul>
	</section>

	<!-- Elegant Heritage Section -->
	<section class="rounded-lg p-6">
		<!-- Heritage Badge -->
		<div class="mb-6 flex justify-center">
			<div
				class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-6 py-2 ring-1 ring-rose-100"
			>
				<svg class="h-5 w-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
				<span class="text-sm font-medium tracking-wide text-rose-700 uppercase">Est. 1985</span>
			</div>
		</div>

		<!-- Main Title -->
		<h2 class="section-subheading text-center text-2xl">A Legacy of Excellence</h2>

		<!-- Decorative Elements -->
		<div class="my-6 flex justify-center">
			<div class="flex items-center gap-2">
				<div class="h-px w-8 bg-rose-300"></div>
				<div class="h-2 w-2 rounded-full bg-rose-400"></div>
				<div class="h-px w-8 bg-rose-300"></div>
			</div>
		</div>

		<!-- Content -->
		<div class="mx-auto max-w-2xl text-center">
			<p class="mb-4 text-lg leading-relaxed text-gray-700">
				For over <strong class="font-semibold text-rose-600">39 years</strong>, Pachas has remained
				a cornerstone of fine dining in Pretoria, guided by the unwavering dedication of its
				founding partners.
			</p>

			<div class="mt-6 rounded-lg bg-gray-50 p-6">
				<p class="mb-2 font-medium text-gray-800">
					<span class="text-rose-600">Jan Willem Pont</span> and
					<span class="text-rose-600">Andreas Henrich</span>
				</p>
				<p class="text-gray-600 italic">
					continue to uphold the tradition of culinary excellence and warm hospitality that has
					defined Pachas since its establishment.
				</p>
			</div>

			<!-- Updated Timeline accent - now just shows "Since 1985" -->
			<div class="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
				<span class="text-lg font-semibold text-rose-600">Since 1985</span>
			</div>
		</div>
	</section>
</section>

<!-- <Testimonials /> -->
