# Handoff Lantern

Handoff Lantern is a focused React workspace for operational shift changes. It helps an incoming operator scan urgency, find a specific handoff, inspect context, work through acceptance checks, and record that responsibility has moved.

## Product behavior

- Search across handoff IDs, titles, summaries, owners, teams, and tags.
- Combine status, urgency, and owner filters without losing the active detail.
- Sort the queue by due time, urgency, or title.
- Update acceptance checklists and advance handoff status from the detail panel.
- Hear status changes through an assistive-technology announcement.
- Use the workspace across desktop and mobile layouts with visible keyboard focus.

## Requirements

- Node.js 20.x
- npm 10 or later

## Commands

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
```

The repository intentionally uses one application root and one `package-lock.json`. Tests run in jsdom through Vitest and React Testing Library.
