import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { checkPassword, createSessionCookieValue, SESSION_COOKIE } from '$lib/server/auth.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const password = form.get('password');

		if (!checkPassword(password)) {
			return fail(401, { error: 'Incorrect password' });
		}

		cookies.set(SESSION_COOKIE, createSessionCookieValue(), {
			path: '/',
			httpOnly: true,
			secure: !dev,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(303, '/admin');
	}
};
