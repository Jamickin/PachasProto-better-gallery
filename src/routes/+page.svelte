<script>
	import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<section
	class="relative mx-auto max-w-6xl overflow-hidden rounded-lg border-l-4 border-rose-500 pt-12 shadow-xl"
>
	<div class="flex h-72 justify-center gap-4 overflow-hidden rounded-t-lg">
		<img
			src="/resized/johny.jpg"
			alt="Johnny"
			class="h-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
		/>
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
				>For reservations, call <strong>012 460 5063</strong></span
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
</section>

<Testimonials />
