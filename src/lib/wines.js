export async function fetchWines() {
	const response = await fetch('/wines.json');
	if (!response.ok) {
		throw new Error('Failed to load wine data');
	}
	return await response.json();
}
