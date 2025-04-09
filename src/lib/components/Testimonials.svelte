<script>
	import { onMount, tick } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { fetchTestimonials, calculateAverageRating } from '$lib/testimonials.js';

	let testimonials = [];
	let loading = true;
	let error = false;
	let testimonialsContainer;
	let averageRating = 5; // Default value, will be calculated once data is loaded

	let currentIndex = 0;
	let previousIndex = 0;
	let testimonialInterval;
	let transitioning = false;

	// Update content height on resize and initial load
	let contentHeight = 380; // Default minimum height

	// Enhanced transition with direction awareness
	async function setTestimonial(index, immediate = false) {
		// Removed the transitioning check to fix the button not working
		previousIndex = currentIndex;
		currentIndex = index;

		resetInterval();

		if (!immediate) {
			transitioning = true;
			// Wait for transition to complete
			await tick();
			setTimeout(() => {
				transitioning = false;
			}, 500); // Match transition duration
		} else {
			transitioning = false;
		}
	}

	function nextTestimonial() {
		if (testimonials.length > 0) {
			// Removed the transitioning check
			const nextIndex = (currentIndex + 1) % testimonials.length;
			setTestimonial(nextIndex);
		}
	}

	function previousTestimonial() {
		if (testimonials.length > 0) {
			// Removed the transitioning check
			const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
			setTestimonial(prevIndex);
		}
	}

	function resetInterval() {
		clearInterval(testimonialInterval);
		testimonialInterval = setInterval(() => {
			nextTestimonial();
		}, 8000);
	}

	// Handle keyboard navigation
	function handleKeydown(event) {
		if (event.key === 'ArrowLeft') {
			previousTestimonial();
		} else if (event.key === 'ArrowRight') {
			nextTestimonial();
		}
	}

	// Get the direction of the transition
	function getDirection(current, previous, total) {
		if (current === 0 && previous === total - 1) return 1; // Wrap forward
		if (current === total - 1 && previous === 0) return -1; // Wrap backward
		return current > previous ? 1 : -1;
	}

	onMount(async () => {
		try {
			// Fetch the testimonials from the external JSON file
			testimonials = await fetchTestimonials();

			// Calculate average rating
			averageRating = calculateAverageRating(testimonials);

			loading = false;

			// Add keyboard navigation
			window.addEventListener('keydown', handleKeydown);
		} catch (e) {
			console.error('Error loading testimonials:', e);
			loading = false;
			error = true;
		}

		// Automatically rotate testimonials
		resetInterval();

		return () => {
			clearInterval(testimonialInterval);
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<section class="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
	<div class="container mx-auto px-4">
		<!-- Elegant testimonials heading section -->
		<div class="mb-16 text-center">
			<div class="mb-4 flex justify-center">
				<div
					class="inline-flex items-center gap-1 rounded-full bg-rose-100 px-4 py-1 text-sm font-medium tracking-wide text-rose-600 uppercase"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						></path>
					</svg>
					<span>{averageRating}/5 Dining Experience</span>
				</div>
			</div>
			<h2 class="mb-2 text-4xl font-bold text-gray-800">What Our Guests Say</h2>
			<div
				class="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-rose-400 to-rose-600"
			></div>
			<p class="mx-auto mt-6 max-w-2xl text-gray-700">
				Authentic experiences from our valued guests who have enjoyed the Pachas dining experience.
			</p>
		</div>

		{#if loading}
			<!-- Elegant loading state -->
			<div class="flex h-64 items-center justify-center">
				<div class="flex flex-col items-center">
					<div class="relative h-14 w-14">
						<div class="absolute inset-0 animate-ping rounded-full bg-rose-400 opacity-30"></div>
						<div
							class="relative flex h-14 w-14 animate-spin items-center justify-center rounded-full bg-white shadow-md"
						>
							<div
								class="h-10 w-10 rounded-full border-2 border-transparent border-t-rose-600 border-b-rose-600"
							></div>
						</div>
					</div>
					<div class="mt-4 text-xl text-gray-700">Loading testimonials...</div>
				</div>
			</div>
		{:else if error || testimonials.length === 0}
			<!-- Elegant error state -->
			<div class="mx-auto max-w-lg overflow-hidden rounded-xl bg-white p-8 shadow-xl">
				<div class="text-center">
					<svg
						class="mx-auto mb-4 h-16 w-16 text-rose-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						></path>
					</svg>
					<p class="text-gray-700">
						We're currently gathering our customer testimonials. Check back soon to hear about our
						guests' experiences!
					</p>
				</div>
			</div>
		{:else}
			<div class="relative mx-auto max-w-4xl" bind:this={testimonialsContainer}>
				<!-- Decorative Design Elements -->
				<div
					class="absolute -top-10 left-0 h-64 w-64 rounded-full bg-rose-100 opacity-10 blur-3xl"
				></div>
				<div
					class="absolute right-0 -bottom-10 h-64 w-64 rounded-full bg-rose-100 opacity-10 blur-3xl"
				></div>

				<!-- Quote decorations -->
				<div
					class="absolute -top-8 -right-8 hidden font-serif text-8xl text-rose-200 italic opacity-60 md:block"
				>
					"
				</div>
				<div
					class="absolute -bottom-24 -left-8 hidden font-serif text-8xl text-rose-200 italic opacity-60 md:block"
				>
					"
				</div>

				<!-- Main Testimonial Card - FIXED HEIGHT to prevent jumping -->
				<div
					class="relative z-10 overflow-hidden rounded-2xl bg-white p-6 ring-1 shadow-2xl ring-gray-100 md:p-10"
				>
					<!-- Fixed height container -->
					<div class="relative h-[420px] md:h-[380px]">
						<!-- Subtle pattern background -->
						<div class="absolute inset-0 opacity-5">
							<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
								<defs>
									<pattern id="quotesPattern" patternUnits="userSpaceOnUse" width="40" height="40">
										<path d="M10 10 L15 10 L15 15 L10 15Z" fill="currentColor" />
									</pattern>
								</defs>
								<rect width="100%" height="100%" fill="url(#quotesPattern)" />
							</svg>
						</div>

						{#each testimonials as testimonial, i}
							{#if i === currentIndex}
								<div
									class="absolute inset-0 flex h-full flex-col items-center justify-between md:flex-row md:items-start md:space-x-8"
									in:fly={{
										x: getDirection(currentIndex, previousIndex, testimonials.length) * 80,
										duration: 600,
										opacity: 0,
										easing: cubicOut
									}}
									out:fly={{
										x: -getDirection(currentIndex, previousIndex, testimonials.length) * 80,
										duration: 600,
										opacity: 0,
										easing: cubicOut
									}}
								>
									<div class="md:w-1/3">
										<!-- Removed the image container -->
										<!-- Star Rating display -->
										<div class="mb-4 flex justify-center md:justify-start">
											<div class="relative">
												<!-- Background stars (gray) -->
												<div class="flex">
													{#each Array(5) as _}
														<svg
															class="h-6 w-6 text-gray-200"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
															/>
														</svg>
													{/each}
												</div>

												<!-- Foreground stars (yellow/gold) - width based on rating -->
												<div
													class="absolute inset-0 flex overflow-hidden"
													style="width: {testimonial.rating * 20}%"
												>
													{#each Array(5) as _}
														<svg
															class="h-6 w-6 text-yellow-400"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
															/>
														</svg>
													{/each}
												</div>
											</div>
										</div>

										<!-- Quote icon -->
										<div class="mb-4 flex justify-center text-rose-400 md:justify-start">
											<svg class="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
												<path
													d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
												></path>
											</svg>
										</div>
									</div>

									<div class="md:w-2/3">
										<!-- Testimonial quote with elegant styling -->
										<p
											class="relative mb-6 text-center text-xl leading-relaxed font-light text-gray-700 italic md:text-left"
										>
											<span class="relative">
												<span class="invisible">\"</span>
												<span class="absolute top-0 -left-2 font-serif text-2xl text-rose-300"
													>"</span
												>
											</span>
											{testimonial.quote}
											<span class="relative">
												<span class="invisible">\"</span>
												<span class="absolute -right-1 bottom-0 font-serif text-2xl text-rose-300"
													>"</span
												>
											</span>
										</p>

										<!-- Author info with elegant styling -->
										<div class="mt-8 text-center md:text-left">
											<div class="mb-1 flex items-center justify-center md:justify-start">
												<span class="mr-2 h-px w-8 bg-rose-300"></span>
												<p class="text-lg font-semibold text-gray-800">{testimonial.author}</p>
											</div>

											<div class="flex items-center justify-center md:justify-start">
												<svg
													class="mr-2 h-4 w-4 text-rose-500"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fill-rule="evenodd"
														d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
														clip-rule="evenodd"
													></path>
												</svg>
												<p class="text-sm text-gray-600">{testimonial.location}</p>
											</div>

											<!-- Verified badge -->
											<div
												class="mt-4 inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-100"
											>
												Verified Guest
											</div>
										</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Enhanced Navigation Dots -->
				<div class="mt-8 flex justify-center space-x-3">
					{#each testimonials as _, i}
						<button
							on:click={() => setTestimonial(i)}
							class="group relative h-3 w-3 transition-all duration-300 focus:outline-none"
							aria-label={`Go to testimonial ${i + 1}`}
						>
							<span
								class="absolute inset-0 h-3 w-3 rounded-full transition-all duration-300 {i ===
								currentIndex
									? 'scale-100 bg-rose-500'
									: 'bg-gray-300 group-hover:bg-rose-300'}"
								in:scale={{ duration: 200, start: 0.8, easing: cubicOut }}
							></span>
							{#if i === currentIndex}
								<span
									class="absolute -inset-1 h-5 w-5 animate-ping rounded-full bg-rose-400 opacity-75"
									in:scale={{ duration: 400, start: 0, easing: cubicOut }}
								></span>
							{/if}
						</button>
					{/each}
				</div>

				<!-- Enhanced Navigation Controls -->
				<div class="mt-6 flex items-center justify-between">
					<!-- Previous Button -->
					<button
						on:click={previousTestimonial}
						type="button"
						class="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-md transition-all hover:bg-rose-50 hover:text-rose-600 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none"
						aria-label="Previous testimonial"
					>
						<svg
							class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						<span class="hidden sm:inline">Previous</span>
					</button>

					<div class="text-center text-sm text-gray-600">
						<span class="font-medium text-rose-600">{currentIndex + 1}</span> of
						<span>{testimonials.length}</span>
					</div>

					<!-- Next Button -->
					<button
						on:click={nextTestimonial}
						type="button"
						class="group z-50 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-md transition-all hover:bg-rose-50 hover:text-rose-600 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:outline-none"
						aria-label="Next testimonial"
					>
						<span class="hidden sm:inline">Next</span>
						<svg
							class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>

				<!-- Google Reviews CTA - Simplified -->
				<div class="mt-10 flex justify-center">
					<a
						href="https://g.co/kgs/pachasrestaurant"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 rounded-lg bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-rose-600"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
							/>
						</svg>
						<span>Leave a review on Google</span>
					</a>
				</div>
			</div>
		{/if}
	</div>
</section>
