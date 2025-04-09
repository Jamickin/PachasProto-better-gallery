/**
 * Fetches testimonials from the JSON file
 * @returns {Promise<Array>} Array of testimonial objects
 */
export async function fetchTestimonials() {
	try {
		const response = await fetch('/testimonials.json');

		if (!response.ok) {
			throw new Error(`Failed to load testimonials: ${response.statusText}`);
		}

		const data = await response.json();
		return data.testimonials || [];
	} catch (error) {
		console.error('Error fetching testimonials:', error);
		return []; // Return empty array on error
	}
}

/**
 * Calculates the average rating from testimonials
 * @param {Array} testimonials - Array of testimonial objects
 * @returns {Number} The average rating (1-5)
 */
export function calculateAverageRating(testimonials) {
	if (!testimonials || testimonials.length === 0) {
		return 0;
	}

	const sum = testimonials.reduce((total, testimonial) => total + (testimonial.rating || 0), 0);
	return (sum / testimonials.length).toFixed(1);
}
