import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, verifySessionCookie } from '$lib/server/auth.js';

export async function load({ cookies, url }) {
	if (url.pathname === '/admin/login') {
		return {};
	}

	if (!verifySessionCookie(cookies.get(SESSION_COOKIE))) {
		redirect(303, '/admin/login');
	}

	return {};
}
