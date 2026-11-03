# OpenSTEM Recruitment — Unified Public Website

A new responsive **single website, two distinct audiences** built by consolidating the user's `openstem-academic-pathways.zip` and `openstem-scholar.zip`.

**Created:** 3 November 2026  
**Owner-facing contact:** `shahriyarkarimsiam@gmail.com`  
**Brand:** OpenSTEM Recruitment  
**Technical stack:** static HTML, CSS and vanilla JavaScript. No npm, database, subscription or build pipeline required.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Unified main page with student / university split, shared principles and all five existing OpenSTEM websites. |
| `students.html` | Dedicated student pathway; 14 support topics with functional search/category filter and no-JS fallback. |
| `universities.html` | Prospective institutional recruiting and university partnership framework. |
| `contact.html` | Student and university enquiry tabs with separate forms. |
| `standards.html` | Ethical commitments, limitations and source-linked public reference materials. |
| `privacy.html` | Transparent explanation of how the email-draft enquiry flow works. |
| `404.html` | Branded not-found page. |
| `assets/styles.css` | Responsive visual system. |
| `assets/app.js`, `assets/services.js` | Mobile navigation, service filter and enquiry logic. |
| `assets/student-illustration.svg` | Carefully reused artwork from the provided OpenSTEM Scholar website. |
| `assets/favicon.svg`, `assets/social-cover.svg` | Original cohesive identity. |
| `_headers` | Security headers for Cloudflare Pages. |
| `_redirects` | Clean URL rewrites for Cloudflare Pages. |
| `wrangler.toml` | Cloudflare Pages configuration. |
| `firebase.json` | Google Firebase Hosting configuration. |
| `Dockerfile` | Container configuration for Google Cloud Run. |
| `sitemap.xml` | XML Sitemap for Google Search Console and search crawlers. |
| `robots.txt` | Allows search indexing and points to sitemap. |
| `.github/workflows/deploy.yml` | Automatic GitHub Pages continuous deployment workflow. |

## Deployment Options

### 1. Deploy to Cloudflare Pages (Recommended)

#### Option A: Direct Upload
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
2. Name your project (e.g. `openstem-recruitment`).
3. Upload this directory (or the packaged `OpenSTEM-Recruitment-Complete-Website.zip`).
4. Click **Deploy site**.

#### Option B: Connect with GitHub
1. In Cloudflare Pages, choose **Connect to Git** and select your GitHub repository (`karim8siam/openstem-recruitment`).
2. Build settings:
   - **Framework preset**: `None`
   - **Build command**: (leave empty)
   - **Build output directory**: `.`
3. Click **Save and Deploy**. Cloudflare will automatically build and deploy every commit pushed to `main`.

---

### 2. Deploy to GitHub & GitHub Pages

1. Create a repository on GitHub (e.g. `openstem-recruitment`).
2. Push your code:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit for OpenSTEM Recruitment"
   git remote add origin https://github.com/karim8siam/openstem-recruitment.git
   git push -u origin main
   ```
3. In your GitHub repository settings:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
   - The included workflow in `.github/workflows/deploy.yml` will automatically build and deploy the site upon push.

---

### 3. Deploy to Google Cloud

#### Option A: Google Firebase Hosting
1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```
   *(Select existing project, use `.` as the public directory, configure as clean URLs)*
3. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

#### Option B: Google Cloud Run (Containerized)
1. Deploy using Google Cloud SDK:
   ```bash
   gcloud run deploy openstem-recruitment --source . --platform managed --allow-unauthenticated
   ```

---

## Enquiry Forms & Gmail Connection

Both forms (Student Enquiry & University Enquiry) submit directly to **`shahriyarkarimsiam@gmail.com`**:
- **Direct Submission**: Submits via AJAX with live status updates. When you receive the email in Gmail, clicking "Reply" will address the student or institution contact directly.
- **Open in Gmail**: Opens a prefilled draft in the web browser at `mail.google.com`.
- **Copy Enquiry**: Copies the formatted text to the user's clipboard.

> **Note on First Submission:**
> On the very first form submission, FormSubmit sends an activation email to `shahriyarkarimsiam@gmail.com`. Click **"Activate Form"** once to enable seamless automated email forwarding to your inbox.

## What the website does NOT claim

- No named university is presented as an existing signed recruitment partner.
- No invented applicant counts, university approvals, commission rates, student placements, testimonials, or success metrics.
- No guaranteed admission, scholarship, supervisor reply or visa.
- No government licensing, British Council approval, ICEF certification, immigration advice authority or institutional endorsement.
- A student enquiry is not a university application; an institutional enquiry is not a signed partner agreement.
- Student assistance areas are **topics available for a conversation**, not misleading claims that all 14 are actively staffed or priced.

## External destinations referenced

- OpenSTEM Library — https://openstemlibrary.com/
- OpenSTEM Lab — https://openstemlab.org/
- OpenSTEM Field — https://openstemfield.org/
- OpenSTEM Tool — https://openstemtool.org/
- OpenSTEM Replicate — https://openstemreplicate.org/
- OpenSTEM Bridge — https://www.openstembridge.space/
- Community — https://discord.gg/tBBKtvFJzW
- Contact — mailto:shahriyarkarimsiam@gmail.com

The five OpenSTEM destinations and Discord invitation resolved during research on 3 November 2026. This does not guarantee continued uptime or invite availability.

## Research grounding

These are **standards / official guidance**, not endorsement or certification claims:

1. British Council, UK Agent Quality Framework: https://www.britishcouncil.org/education/agents-counsellors/uk-quality-agent-framework
2. Australian Skills Quality Authority, education agent obligations: https://www.asqa.gov.au/for-providers/provider-obligations/esos-requirements/education-agents
3. Bangladesh Personal Data Protection Act, 2026: https://bdlaws.minlaw.gov.bd/act-details-1692.html?lang=en
4. W3C, WCAG overview: https://www.w3.org/WAI/standards-guidelines/wcag/
5. W3C, accessible form patterns: https://www.w3.org/WAI/tutorials/forms/
6. Google Search Central, SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
7. ICEF Agency Status, public identity verification expectations: https://www.icef.com/quality-standards/icef-agency-status/

Legal and university-specific obligations require review for the actual services, users, markets and processing activities. This website is not a legal certification or registration substitute.

## Review framework (100 possible points, not a self-awarded rating)

| Criterion | Weight | Design implementation |
| --- | ---: | --- |
| Visual coherence and presentation | 20 | Shared editorial design, typography, restrained colors, original orbit diagrams and custom-branded visuals. |
| Clear separate audience journeys | 15 | Distinct student and university pages, audience-specific calls-to-action and contact forms. |
| Accuracy and transparency | 20 | No fake data, no represented endorsements, signed authority condition and clear official-source links. |
| Accessibility and mobile ergonomics | 15 | Labeled fields, keyboard-accessible tabs, native details/summary, focus styles and responsive layouts. |
| Technical simplicity and reliability | 10 | Static deploy, local assets, no JS dependencies, secure headers. |
| Search and content architecture | 10 | Distinct page titles, descriptions, semantic headings, crawlable links, sensible URLs. |
| Enquiry privacy and trust | 10 | Minimal required data, explicit mailing behavior, privacy/standards pages, no automatic sharing. |
| **Total potential** | **100** | **A perfect score is not claimed; real-user, accessibility and production-server audits remain necessary.** |

## Checks performed during construction

- HTML structure parsed and internal files/anchor references checked.
- JavaScript parsed with `node --check`.
- Chromium rendered desktop at 1440 px and mobile at 390 px using locally inlined assets, because direct file/localhost navigation is blocked by the test environment. There were no uncaught JS page errors in these rendering checks.
- Mobile pages at 390 px did not show horizontal document overflow.
- Student service filter: 14 items (all), 6 in “Prepare,” 1 matching “interview” after filtering.
- Student/university contact tabs and mobile navigation were interactive in the rendering checks.
- The actual hosted email handoff has not been tested with a real recipient or Gmail app; the browser client must complete/send drafts. No submission delivery guarantee is made.
- External URLs should be checked again before outreach campaigns, because other people's servers and Discord invitations can change.

## Before relying on it for formal university applications

You will still need to address required business documents, identity verification, applicable registration, agent training and institutional due diligence. A polished website or professional email is not a substitute for those requirements.


## Refined edition — 2026-11-03
- Audience-forward hero now says exactly whom the site serves and makes each route clickable.
- Improved readable type sizes, contrast-aware palette, keyboard focus states, and touch targets.
- Simplified student and institutional language.
- Site explicitly does **not** claim partners, accreditation, outcomes, student volume, or operating CRM.
- Contact forms compose a `mailto:` draft; they DO NOT send messages automatically.
- Review all pages as real users (students and university staff) before publishing.
- A custom domain and formal company credentials should only appear when actually established.
