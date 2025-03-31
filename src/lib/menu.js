export async function fetchMenu() {
	const response = await fetch('/menu.json');
	if (!response.ok) {
		throw new Error('Failed to load menu data');
	}
	return await response.json();
}
