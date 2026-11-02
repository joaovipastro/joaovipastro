// Quick checks for the session helpers used by the edge functions.
import assert from 'node:assert/strict';
import { sign, verify, safeEqual } from '../netlify/shared/session.js';

const secret = 'test-secret';
const token = await sign({ e: 'a@b.com', exp: Date.now() + 60_000 }, secret);
assert.equal((await verify(token, secret)).e, 'a@b.com', 'valid token verifies');
assert.equal(await verify(token, 'wrong-secret'), null, 'wrong secret rejected');
const [body, sig] = token.split('.');
const forged = Buffer.from(JSON.stringify({ e: 'x@y.com', exp: Date.now() + 9e9 })).toString('base64url');
assert.equal(await verify(`${forged}.${sig}`, secret), null, 'tampered payload rejected');
assert.equal(await verify(await sign({ e: 'a', exp: Date.now() - 1 }, secret), secret), null, 'expired token rejected');
assert.equal(await verify('garbage', secret), null, 'garbage rejected');
assert.equal(await verify(token, undefined), null, 'missing secret rejected');
assert.ok(safeEqual('abc', 'abc') && !safeEqual('abc', 'abd') && !safeEqual('abc', 'abcd'));
console.log('session tests passed');
