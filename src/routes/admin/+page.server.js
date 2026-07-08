import { redirect } from '@sveltejs/kit';
import { getStore } from '@netlify/blobs';
import { SESSION_COOKIE } from '$lib/server/auth.js';

const SERIES_DAYS = 30;
const DAY_MS = 1000 * 60 * 60 * 24;

function topN(counts, n = 8) {
	return Object.entries(counts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, n)
		.map(([label, count]) => ({ label, count }));
}

export async function load() {
	let events = [];
	let blobsUnavailable = false;

	try {
		const store = getStore('analytics');
		const { blobs } = await store.list({ prefix: 'events/' });
		events = (
			await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' }).catch(() => null)))
		).filter(Boolean);
	} catch {
		blobsUnavailable = true;
	}

	const now = Date.now();
	const cutoff24h = now - DAY_MS;
	const cutoff7d = now - DAY_MS * 7;
	const cutoff30d = now - DAY_MS * 30;

	let visitsToday = 0;
	let visits7d = 0;
	let visits30d = 0;

	const byDay = {};
	const byPage = {};
	const byReferrer = {};
	const byDevice = {};
	const byBrowser = {};
	const byCountry = {};

	for (const event of events) {
		const t = new Date(event.timestamp).getTime();
		if (t >= cutoff24h) visitsToday++;
		if (t >= cutoff7d) visits7d++;
		if (t >= cutoff30d) visits30d++;

		const day = event.timestamp.slice(0, 10);
		byDay[day] = (byDay[day] || 0) + 1;
		byPage[event.path] = (byPage[event.path] || 0) + 1;
		byReferrer[event.referrerSource] = (byReferrer[event.referrerSource] || 0) + 1;
		byDevice[event.device] = (byDevice[event.device] || 0) + 1;
		byBrowser[event.browser] = (byBrowser[event.browser] || 0) + 1;
		if (event.country) byCountry[event.country] = (byCountry[event.country] || 0) + 1;
	}

	const series = [];
	for (let i = SERIES_DAYS - 1; i >= 0; i--) {
		const key = new Date(now - i * DAY_MS).toISOString().slice(0, 10);
		series.push({ date: key, count: byDay[key] || 0 });
	}

	return {
		blobsUnavailable,
		totalVisits: events.length,
		visitsToday,
		visits7d,
		visits30d,
		series,
		topPages: topN(byPage),
		topReferrers: topN(byReferrer),
		devices: topN(byDevice),
		browsers: topN(byBrowser),
		countries: topN(byCountry)
	};
}

export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		redirect(303, '/admin/login');
	}
};
