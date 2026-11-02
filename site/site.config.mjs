// Business settings. Change these before going live.
export default {
  brand: 'Mise en Place',
  siteUrl: 'https://example.com', // your final domain, used for canonical links
  // Stripe Payment Link (or any checkout URL). One per language if you want localised checkout.
  checkoutUrl: {
    en: 'https://buy.stripe.com/REPLACE_ME',
    pt: 'https://buy.stripe.com/REPLACE_ME',
    es: 'https://buy.stripe.com/REPLACE_ME',
  },
  price: {
    en: '€49',
    pt: '€49',
    es: '49 €',
  },
  // Shown under the price. Set to '' to hide. Make sure it matches your real refund policy.
  guarantee: {
    en: '14-day refund, no questions asked.',
    pt: 'Reembolso em até 14 dias, sem perguntas.',
    es: 'Reembolso en 14 días, sin preguntas.',
  },
  contactEmail: 'hello@example.com',
  // Newsletter: 'netlify' uses Netlify Forms (no setup). Or set an external form endpoint
  // (Mailchimp, ActiveCampaign, ConvertKit, Brevo…) and its field names.
  newsletter: {
    provider: 'netlify',
    action: '', // e.g. 'https://xyz.us21.list-manage.com/subscribe/post?u=…&id=…' when provider is 'external'
    fields: { name: 'name', email: 'email' },
  },
};
