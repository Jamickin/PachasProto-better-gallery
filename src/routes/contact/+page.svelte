<script>
	// Svelte 5 component using runes
	// Data could be made dynamic using $state if needed
</script>

<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4">
		<div class="mb-12 text-center">
			<h2
				class="relative mb-4 inline-block text-3xl font-semibold text-gray-800 after:absolute after:bottom-[-10px] after:left-1/2 after:h-[3px] after:w-12 after:-translate-x-1/2 after:bg-rose-500"
			>
				Visit Pachas Restaurant
			</h2>
			<p class="text-gray-600">Find us and plan your visit.</p>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<section class="rounded-lg bg-white p-6 shadow-md lg:col-span-2">
				<div class="mb-6">
					<iframe
						title="map"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.33715553513!2d28.254576074342648!3d-25.778473777341304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9560e2e15059df%3A0xbc4fbea700760311!2sPachas%20Restaurant!5e1!3m2!1sen!2sza!4v1742934959162!5m2!1sen!2sza"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						class="h-64 w-full rounded-md border border-gray-200 md:h-96"
					></iframe>
				</div>

				<div class="mb-4">
					<h3 class="mb-2 text-lg font-semibold text-gray-700">Address:</h3>
					<p class="text-gray-600">
						Pachas Restaurant, The Club Retail, <br />
						22 Dely Road, Hazelwood, <br />
						Pretoria, 0181
					</p>
					<p class="mt-1 text-sm text-gray-500 italic">Just a short drive from Lynnwood Ridge!</p>
				</div>

				<div>
					<h3 class="mb-3 text-lg font-semibold text-gray-700">Parking & Access:</h3>
					<ul class="space-y-3 text-gray-700">
						<li class="flex items-start">
							<svg
								class="mt-1 mr-2 h-5 w-5 text-rose-500"
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
							<span>Safe parking at The Club Centre (ground/underground).</span>
						</li>
						<li class="flex items-start">
							<svg
								class="mt-1 mr-2 h-5 w-5 text-rose-500"
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
							<span>Use escalators or lift to Level 1.</span>
						</li>
					</ul>
				</div>
			</section>

			<div class="space-y-6">
				<section class="rounded-lg bg-white p-6 shadow-md">
					<h2
						class="relative mb-6 inline-block text-2xl font-semibold text-gray-800 after:absolute after:bottom-[-8px] after:left-0 after:h-[3px] after:w-12 after:bg-rose-500"
					>
						Contact & Bookings
					</h2>
					<ul class="mb-6 space-y-3 text-gray-700">
						<li class="flex items-start">
							<svg
								class="mt-1 mr-2 h-5 w-5 text-rose-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								></path></svg
							>
							<span><strong>Tel:</strong> 012 460 5063 / 3220</span>
						</li>
						<li class="flex items-start">
							<svg
								class="mt-1 mr-2 h-5 w-5 text-rose-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
								></path></svg
							>
							<span><strong>Fax:</strong> 086 695 8762</span>
						</li>
						<li class="flex items-start">
							<svg
								class="mt-1 mr-2 h-5 w-5 text-rose-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path></svg
							>
							<span>
								<strong>Email:</strong>
								<a href="mailto:mail@pachas.co.za">mail@pachas.co.za</a>
							</span>
						</li>
					</ul>

					<div
						class="mt-4 flex items-start rounded-lg border border-rose-100 bg-rose-50 p-3 text-sm text-rose-800"
					>
						<svg
							class="mt-1 mr-2 h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path></svg
						>
						<span class="font-semibold">
							Planning an Event?
							<br />
							Book early for year-end functions/celebrations. Set menus available.
							<em class="mt-1 block">Thank you to our loyal clients!</em>
						</span>
					</div>
				</section>
			</div>
		</div>
	</div>
</section>
