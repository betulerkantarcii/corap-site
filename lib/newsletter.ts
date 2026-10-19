import { createHash } from "node:crypto";

/**
 * Newsletter providers (server only). Pick one with environment variables in
 * .env.local / Vercel — no code changes needed:
 *
 *   NEWSLETTER_PROVIDER=brevo      BREVO_API_KEY=…  BREVO_LIST_ID=…
 *   NEWSLETTER_PROVIDER=mailchimp  MAILCHIMP_API_KEY=…-us21  MAILCHIMP_LIST_ID=…
 *
 * With nothing set, the "stub" provider only logs (masked) sign-ups, so the
 * form works in development without sending anything anywhere.
 */
export type NewsletterProvider = {
  name: string;
  subscribe: (email: string, locale: string) => Promise<void>;
};

const mask = (email: string) => email.replace(/^(.).*(@.*)$/, "$1***$2");

const stub: NewsletterProvider = {
  name: "stub",
  async subscribe(email) {
    console.info(`[newsletter:stub] would subscribe ${mask(email)}`);
  },
};

function brevo(apiKey: string, listId: string): NewsletterProvider {
  return {
    name: "brevo",
    async subscribe(email, locale) {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email,
          listIds: [Number(listId)],
          updateEnabled: true, // re-joining is fine, not an error
          attributes: { LOCALE: locale },
        }),
      });
      if (!res.ok) throw new Error(`Brevo ${res.status}`);
    },
  };
}

function mailchimp(apiKey: string, listId: string): NewsletterProvider {
  const dc = apiKey.split("-").pop(); // keys end with the data-centre, e.g. "-us21"
  return {
    name: "mailchimp",
    async subscribe(email, locale) {
      const id = createHash("md5").update(email.toLowerCase()).digest("hex");
      const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Basic ${Buffer.from(`corap:${apiKey}`).toString("base64")}`,
          "content-type": "application/json",
        },
        // "pending" = Mailchimp sends a confirmation email (double opt-in)
        body: JSON.stringify({ email_address: email, status_if_new: "pending", language: locale }),
      });
      if (!res.ok) throw new Error(`Mailchimp ${res.status}`);
    },
  };
}

export function newsletterProvider(): NewsletterProvider {
  const env = process.env;
  if (env.NEWSLETTER_PROVIDER === "brevo" && env.BREVO_API_KEY && env.BREVO_LIST_ID) {
    return brevo(env.BREVO_API_KEY, env.BREVO_LIST_ID);
  }
  if (env.NEWSLETTER_PROVIDER === "mailchimp" && env.MAILCHIMP_API_KEY && env.MAILCHIMP_LIST_ID) {
    return mailchimp(env.MAILCHIMP_API_KEY, env.MAILCHIMP_LIST_ID);
  }
  return stub;
}

export const isValidEmail = (email: string) =>
  email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
