import { json } from '@sveltejs/kit';
import { getStore } from '@netlify/blobs';

const SOCIAL_HOSTS = /facebook\.|instagram\.|tiktok\.|twitter\.|x\.com|linkedin\./;

function parseUserAgent(ua = '') {
	const isTablet = /Tablet|iPad/.test(ua);
	const isMobile = !isTablet && /Mobile|Android|iPhone|iPod/.test(ua);
	const device = isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop';

	let browser = 'Other';
	if (/Edg\//.test(ua)) browser = 'Edge';
	else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = 'Chrome';
	else if (/Firefox\//.test(ua)) browser = 'Firefox';
	else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = 'Safari';

	return { device, browser };
}

function bucketReferrer(referrer) {
	if (!referrer) return 'Direct';
	try {
		const host = new URL(referrer).hostname.replace(/^www\./, '');
		if (/google\./.test(host)) return 'Google';
		if (/bing\./.test(host)) return 'Bing';
		if (SOCIAL_HOSTS.test(host)) return 'Social';
		return host;
	} catch {
		return 'Direct';
	}
}

export async function POST({ request, platform }) {
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false }, { status: 400 });
	}

	const { path, referrer, utmSource, utmMedium, utmCampaign } = body ?? {};
	if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('/admin')) {
		return json({ ok: false }, { status: 400 });
	}

	const geo = platform?.context?.geo;
	const { device, browser } = parseUserAgent(request.headers.get('user-agent') ?? '');
	const timestamp = new Date().toISOString();

	const event = {
		timestamp,
		path,
		referrerSource: bucketReferrer(referrer),
		utmSource: utmSource || null,
		utmMedium: utmMedium || null,
		utmCampaign: utmCampaign || null,
		country: geo?.country?.name ?? null,
		city: geo?.city ?? null,
		device,
		browser
	};

	const day = timestamp.slice(0, 10);
	const id = crypto.randomUUID();
	const store = getStore('analytics');
	await store.setJSON(`events/${day}/${id}`, event);

	return json({ ok: true });
}
