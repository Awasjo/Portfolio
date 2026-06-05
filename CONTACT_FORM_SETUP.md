# Contact Form — Private Email Delivery Setup

The contact form (`src/components/Contact.tsx`) is a **Netlify Form**.
Submissions are captured by Netlify automatically. To have each submission
**emailed privately to `awasjojo@hotmail.com`** (while the site keeps showing
the public `awasjomail@gmail.com` address), do the one-time dashboard step below.

> The destination inbox for a standard Netlify form is configured in the
> Netlify dashboard, NOT in this repo. This is by design — Netlify does not
> read the recipient from code.

## One-time setup (≈2 minutes)

1. Go to **app.netlify.com** → select this site.
2. **Site configuration → Forms** (or **Forms** in the top nav).
3. Confirm the **`contact`** form appears (it registers after the first deploy
   of this branch, since Netlify detects `data-netlify="true"` at build time).
4. Open **Form notifications → Add notification → Email notification**.
5. Set:
   - **Email to notify:** `awasjojo@hotmail.com`   ← private inbox
   - **Form:** `contact`
6. **Save.**

That's it. Every submission now lands privately in hotmail. The public site
still only displays the gmail address.

## Verifying

- Deploy the branch, open the live site, submit a test message.
- Check **Netlify → Forms → contact → submissions** (always stored), and
  confirm the email arrived at `awasjojo@hotmail.com` (check Junk the first time).

## Notes

- `netlify.toml` was hardened so the SPA redirect only catches **GET**
  navigations — form **POST**s reach Netlify's form handler correctly.
- A hidden `subject` field gives the notification a clear subject line.
- If you later want delivery fully controlled in code (no dashboard), the
  alternative is a Netlify Function + an email API (e.g. Resend). Not needed
  for the current setup.
