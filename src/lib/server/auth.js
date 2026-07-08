import crypto from 'node:crypto';
import { env } from '$env/dynamic/private';

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
export const SESSION_COOKIE = 'admin_session';

function sign(value) {
	return crypto.createHmac('sha256', env.ANALYTICS_COOKIE_SECRET).update(value).digest('hex');
}

export function createSessionCookieValue() {
	const expires = String(Date.now() + SESSION_TTL_MS);
	return `${expires}.${sign(expires)}`;
}

export function verifySessionCookie(value) {
	if (!value) return false;
	const [expires, signature] = value.split('.');
	if (!expires || !signature) return false;
	if (Date.now() > Number(expires)) return false;

	const expected = sign(expires);
	const expectedBuf = Buffer.from(expected);
	const actualBuf = Buffer.from(signature);
	if (expectedBuf.length !== actualBuf.length) return false;
	return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

export function checkPassword(candidate) {
	if (typeof candidate !== 'string' || !candidate) return false;
	const expected = Buffer.from(env.ANALYTICS_PASSWORD ?? '');
	const actual = Buffer.from(candidate);
	if (expected.length !== actual.length) return false;
	return crypto.timingSafeEqual(expected, actual);
}
