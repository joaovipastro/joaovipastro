// Signed session tokens using Web Crypto (works in Netlify Edge / Deno and Node 20+).
// Token format: base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload))
const enc = new TextEncoder();
export const COOKIE = 'mep_session';
export const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

async function key(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function sign(payload, secret) {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign('HMAC', await key(secret), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}

export async function verify(token, secret, now = Date.now()) {
  if (!token || !secret || typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  try {
    const ok = await crypto.subtle.verify('HMAC', await key(secret), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    if (!payload.exp || payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}

// Constant-time comparison of two strings.
export function safeEqual(a, b) {
  a = String(a); b = String(b);
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export function env(name) {
  try { if (typeof Netlify !== 'undefined') return Netlify.env.get(name); } catch {}
  try { if (typeof Deno !== 'undefined') return Deno.env.get(name); } catch {}
  return globalThis.process?.env?.[name];
}
