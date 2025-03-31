export async function fetchLiteMenu() {
	try {
		const response = await fetch('/litelunchmenu.json');
		if (!response.ok) {
			console.error(
				'Failed to load lite lunch data. Response status:',
				response.status,
				response.statusText
			);
			throw new Error(
				`Failed to load lite lunch data. Status: ${response.status} ${response.statusText}`
			);
		}
		const data = await response.json();
		console.log('fetchLiteMenu() data:', data); // Log the data here
		return data;
	} catch (error) {
		console.error('Error fetching lite menu:', error);
		return {}; // Return empty object on error, but log the error
	}
}
