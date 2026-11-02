# Mise en Place — website, workbook and members area

A static site in English, Portuguese and Spanish, built for Netlify.

| URL | What it is |
|---|---|
| `/` | Sends visitors to `/en/`, `/pt/` or `/es/` based on their browser language |
| `/en/` `/pt/` `/es/` | Sales landing page, with pricing, FAQ and the newsletter signup |
| `/{lang}/thanks/` | Shown after someone subscribes to the newsletter |
| `/{lang}/login/` | Members login |
| `/members/{lang}/` | Members dashboard *(protected)* |
| `/members/course/…` | Full course lessons, rendered from `../course/*.md` *(protected)* |
| `/members/workbook/{lang}.html` | The designed workbook, readable online and printable *(protected)* |
| `/members/workbook/mise-en-place-workbook-{lang}.pdf` | Workbook PDFs *(protected)* |

## Where things live

- `site.config.mjs`: price, checkout links, refund line, contact email, newsletter provider
- `src/content/site.mjs`: all page copy in the three languages
- `src/content/workbook.{en,pt,es}.mjs`: workbook content
- `scripts/build.mjs`: generates `dist/`
- `scripts/workbook-template.mjs`: the workbook's A4 print design
- `netlify/edge-functions/`: members login, logout and the gate that protects `/members`

## Commands

```bash
npm install
npm run build             # builds dist/
npm run pdf               # re-renders the three workbook PDFs (needs Playwright + Chromium)
npm run build             # run again so the new PDFs are copied into dist/
npm run serve             # preview at http://localhost:8080 (the members gate is not active locally)
npm test                  # checks the session signing used by the gate
```

Run `npm run pdf` locally after any change to the workbook content. The PDFs are committed in `public/members/workbook/`.

## Going live: checklist

1. **Create the Netlify site.** Point it at this repository and set the base directory to `site`. The build command and publish directory come from `netlify.toml`.
2. **Set environment variables** in Netlify → Site configuration → Environment variables:
   - `MEMBERS_SECRET`: a long random string, for example from `openssl rand -hex 32`. It signs the login cookie.
   - `MEMBERS_ACCESS_CODES`: one or more access codes, comma-separated, for example `SETSTATION-2027`.
3. **Create the Stripe Payment Link** (one per currency or language if you like) and paste the URLs into `checkoutUrl` in `site.config.mjs`.
4. **Deliver access after payment.** In the Payment Link's settings, set a custom confirmation message, and have Stripe's receipt (or your email tool's automation) send the welcome email with the login link and the current access code.
5. **Newsletter.** Netlify Forms captures signups with no setup. Turn on form notifications, or connect Netlify to your email platform. To post directly to Mailchimp, ActiveCampaign, Brevo or similar instead, set `newsletter.provider` to `external` and fill in `action` and the field names.
6. **Set `siteUrl`, `contactEmail`, `price` and `guarantee`** in `site.config.mjs`. Only show the refund line if it matches your real policy.
7. **Add a privacy policy page** before collecting emails. This is required under the GDPR and Brazil's LGPD.

## How the members area works, and its limits

The `/members` paths are protected on the server by a Netlify edge function. A visitor without a valid signed cookie is redirected to the login page, so the files themselves are never served to them. Logging in requires an email address and a valid access code, and sets an HttpOnly cookie that lasts 30 days.

This is a **shared access code** model. It is simple and has no monthly cost, but:

- anyone who has the code can log in, so change it every so often (existing members stay logged in until their cookie expires);
- the email address isn't checked against your list of buyers.

When the course has more than a few hundred buyers, or you want per-person accounts, upgrade to a membership tool. Outseta, Memberstack, or Supabase Auth with a Stripe webhook can all replace the login function, and the rest of the site stays as it is.
