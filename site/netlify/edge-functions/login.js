// POST /api/login  (form fields: email, code, lang, next)
// Access codes live in the MEMBERS_ACCESS_CODES environment variable (comma-separated),
// so you can rotate them without redeploying.
import { COOKIE, MAX_AGE, sign, safeEqual, env } from '../shared/session.js';

export default async (request, context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const url = new URL(request.url);
  const form = await request.formData();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const code = String(form.get('code') || '').trim();
  const lang = ['en', 'pt', 'es'].includes(form.get('lang')) ? form.get('lang') : 'en';
  const referer = new URL(request.headers.get('referer') || url);
  const nextParam = referer.searchParams.get('next') || '';
  const next = /^\/members(\/|$)/.test(nextParam) ? nextParam : `/members/${lang}/`;

  const codes = String(env('MEMBERS_ACCESS_CODES') || '').split(',').map((c) => c.trim()).filter(Boolean);
  const secret = env('MEMBERS_SECRET');
  const valid = secret && email.includes('@') && codes.some((c) => safeEqual(c, code));

  if (!valid) {
    return Response.redirect(new URL(`/${lang}/login/?error=1${nextParam ? `&next=${encodeURIComponent(nextParam)}` : ''}`, url), 303);
  }

  const token = await sign({ e: email, exp: Date.now() + MAX_AGE * 1000 }, secret);
  context.cookies.set({ name: COOKIE, value: token, path: '/', httpOnly: true, secure: true, sameSite: 'Lax', maxAge: MAX_AGE });
  return Response.redirect(new URL(next, url), 303);
};

export const config = { path: '/api/login' };
