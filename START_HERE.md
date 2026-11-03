# OpenSTEM Recruitment — How to deploy

This is the complete static website. `index.html` and the `assets/` folder are at the ZIP root.

## Deploy to Cloudflare Pages

1. Sign in to Cloudflare, create a Pages project, and choose Direct Upload.
2. Upload this ZIP as a static site (or extract the ZIP and upload the contents of the extracted folder).
3. Confirm that the published address shows the OpenSTEM Recruitment home page.
4. Check `students.html`, `universities.html`, `contact.html`, and mobile navigation.
5. When you have a confirmed custom domain, add it to Pages and configure the site's final canonical URLs, social preview links and sitemap.

No Node.js build command, npm install, paid mail hosting or database is needed for the **existing static functionality**.

## Important limitation: enquiries

The enquiry forms **do not send messages automatically**. They open a prefilled draft in the visitor's mail app; a copy-to-clipboard alternative is provided. The visitor must press Send in their email provider. The recipient configured in `assets/app.js` is `shahriyarkarimsiam@gmail.com`. This limitation is also clearly explained on the site. Automatic form submission would require an operational form service/backend and privacy/security setup.

## Honest claims

The website does not claim named institutional partnerships, recruitment commissions, placements, registration, accreditation, or guaranteed results. The five connected OpenSTEM sites are linked in the homepage/footer. Review business/legal requirements separately before formally representing universities.

See `README.md` for full design and technical notes.
