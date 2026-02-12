# Squarespace Migration Checklist (ETI)

## 1. Content Inventory
- List every existing page URL and target destination.
- Capture all long-form copy in a structured doc.
- Identify and resolve conflicting claims (especially AP status wording).

## 2. Testimonials Preservation
- Export all testimonial text into a single source file (`content/testimonials.json` in next pass).
- Track attribution metadata:
  - Student/parent
  - Grade/program
  - Optional year
- Confirm permission status before publishing.

## 3. Media Preservation
- Download every production image from current site pages.
- Name files by section intent, not generic names.
- Create alt text per image during migration.

## 4. IA and Redirects
- Map old slug -> new slug.
- Add redirect rules before DNS cutover.
- Validate internal links and canonical URLs.

## 5. QA
- Mobile/desktop checks on key breakpoints.
- Accessibility sweep (contrast, heading order, alt text).
- Performance baseline (image compression + lazy loading).

## 6. Launch
- Connect domain to hosting platform.
- Verify analytics and form/mail integrations.
- Monitor 404s and indexing for two weeks post-launch.
