<script>
	import { onMount } from 'svelte';

	let setMenuData = {};

	onMount(async () => {
		try {
			const response = await fetch('/setmenu.json');
			setMenuData = await response.json();
		} catch (error) {
			console.error('Error loading set menu data', error);
		}
	});

	// src/routes/+page.js
	export const load = () => {
		return {
			title: 'Pachas Restaurant | Fine Dining Pretoria | Steakhouse & Seafood',
			description:
				'Fine dining restaurant in Pretoria offering premium steaks, fresh seafood, and South African cuisine. Private function rooms available. Est. 1985.'
		};
	};
</script>

<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2 class="section-title">Set Menus</h2>
			<p class="section-subtitle">Explore our curated set menu options.</p>
		</div>

		<div class="px-4 md:px-12 lg:px-24 xl:px-36">
			{#if setMenuData['Set Menu Options']}
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each setMenuData['Set Menu Options'].menus as menu}
						<section class="card">
							<h3 class=" section-subheading text-center">{menu.name}</h3>

							<div class="mt-4 text-center text-2xl font-bold text-rose-600">R{menu.price}</div>

							<div class="mt-8 space-y-6">
								<div>
									<h4 class="mb-3 text-xl font-semibold text-gray-800">Starter</h4>
									<ul class="mt-2 space-y-2 text-gray-700">
										{#each menu.starter as item}
											<li class="border-l-2 border-rose-300 pl-2">{item}</li>
										{/each}
									</ul>
								</div>

								<div>
									<h4 class="mb-3 text-xl font-semibold text-gray-800">Main Course</h4>
									<ul class="mt-2 space-y-2 text-gray-700">
										{#each menu.mainCourse as item}
											<li class="border-l-2 border-rose-300 pl-2">{item}</li>
										{/each}
									</ul>
								</div>

								<div>
									<h4 class="mb-3 text-xl font-semibold text-gray-800">Dessert</h4>
									<ul class="mt-2 space-y-2 text-gray-700">
										{#each menu.dessert as item}
											<li class="border-l-2 border-rose-300 pl-2">{item}</li>
										{/each}
									</ul>
								</div>
							</div>
						</section>
					{/each}
				</div>
			{/if}
		</div>

		<div
			class="my-20 h-px w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
		></div>

		<div class="px-4 md:px-12 lg:px-24 xl:px-36">
			<section class="card">
				<h3 class="section-subheading">Function Rooms</h3>

				<p class="mb-6 text-gray-700">
					Our restaurant features 5 spacious private rooms. Perfect for parties and corporate
					events.
				</p>

				<div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="rounded-lg border border-gray-100 bg-gray-50 p-4">
						<span class="font-semibold text-rose-600">F1 & F2</span>
						<p class="mt-1 text-gray-700">Can be combined to seat 34 people</p>
					</div>

					<div class="rounded-lg border border-gray-100 bg-gray-50 p-4">
						<span class="font-semibold text-rose-600">F3</span>
						<p class="mt-1 text-gray-700">Seats 12 people</p>
					</div>

					<div class="rounded-lg border border-gray-100 bg-gray-50 p-4">
						<span class="font-semibold text-rose-600">F4</span>
						<p class="mt-1 text-gray-700">Seats 8 people</p>
					</div>

					<div class="rounded-lg border border-gray-100 bg-gray-50 p-4">
						<span class="font-semibold text-rose-600">F5</span>
						<p class="mt-1 text-gray-700">Seats 8 people</p>
					</div>
				</div>
			</section>

			<section class="card mt-8">
				<h3 class="section-subheading">Additional Information</h3>

				<ul class="space-y-4 text-gray-700">
					<li class="mt-4 flex items-start p-3">
						<span class="font-semibold"
							>Nothing is set in stone at Pachas. Feel free to call in and adjust the menu to your
							requirements!</span
						>
					</li>
					<li class="list-item">
						<svg
							class="list-item-icon"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path></svg
						>
						<span>Prices are per person</span>
					</li>

					<li class="list-item">
						<svg
							class="list-item-icon"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path></svg
						>
						<span>Drinks and Service Fee Excluded</span>
					</li>

					<li class="list-item">
						<svg
							class="list-item-icon"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path></svg
						>
						<span>All meals served with vegetables</span>
					</li>

					<li class="list-item">
						<svg
							class="list-item-icon"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path></svg
						>
						<span>Table salad to be ordered separately</span>
					</li>

					<!-- <li class="alert alert-warning mt-4">
						<svg
							class="list-item-icon"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							></path></svg
						>
						<span class="font-semibold"
							>Please note that, during the festive season, these menus are not available for take
							away, group bookings or office parties</span
						>
					</li> -->
				</ul>
			</section>
		</div>
	</div>
</section>
