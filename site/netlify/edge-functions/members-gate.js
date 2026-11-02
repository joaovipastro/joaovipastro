// Protects everything under /members. Unauthenticated visitors are sent to the login page.
import { COOKIE, verify, env } from '../shared/session.js';

export default async (request, context) => {
  const session = await verify(context.cookies.get(COOKIE), env('MEMBERS_SECRET'));
  if (session) {
    const res = await context.next();
    res.headers.set('Cache-Control', 'private, no-store');
    res.headers.set('X-Robots-Tag', 'noindex');
    return res;
  }
  const url = new URL(request.url);
  const lang = (url.pathname.match(/^\/members\/(?:workbook\/)?(en|pt|es)\b/) || [, 'en'])[1];
  const login = new URL(`/${lang}/login/`, url);
  login.searchParams.set('next', url.pathname);
  return Response.redirect(login, 302);
};

export const config = { path: ['/members', '/members/*'] };
