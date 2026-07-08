export function trackPageview(url) {
	if (url.pathname.startsWith('/admin')) return;

	const payload = JSON.stringify({
		path: url.pathname,
		referrer: document.referrer,
		utmSource: url.searchParams.get('utm_source'),
		utmMedium: url.searchParams.get('utm_medium'),
		utmCampaign: url.searchParams.get('utm_campaign')
	});

	if (navigator.sendBeacon) {
		navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
	} else {
		fetch('/api/track', { method: 'POST', body: payload, keepalive: true });
	}
}
