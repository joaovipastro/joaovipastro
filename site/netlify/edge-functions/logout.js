import { COOKIE } from '../shared/session.js';

export default async (request, context) => {
  context.cookies.delete({ name: COOKIE, path: '/' });
  return Response.redirect(new URL('/', request.url), 303);
};

export const config = { path: '/api/logout' };
