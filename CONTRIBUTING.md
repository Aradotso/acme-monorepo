# Contributing

Thanks for helping improve acme-monorepo. Keep changes focused, easy to review, and consistent with the existing dependency-free HTML/CSS sites.

## Setup

No install step is required. From the repository root, start a local server:

```bash
python3 -m http.server 4173
```

Open the site you changed at `http://127.0.0.1:4173/mono/`. Port `8080` is reserved by the sandbox; use another free port if `4173` is unavailable.

Before opening a PR, run:

```bash
test -s mono/index.html && test -s mono/styles.css
! rg -n 'https?://|<script|@import' mono
git diff --check
```

When changing the page, also check the affected route in a desktop and mobile browser width, verify navigation links and hover/reduced-motion behavior where relevant, and stop the local server when finished.

## Pull requests

- Use a short, imperative title that describes the change.
- Explain what changed and why; include the affected route or files when useful.
- Keep each PR limited to one coherent change and avoid unrelated formatting.
- Update the relevant HTML and CSS together when a visual change requires both.
- Include the validation commands you ran and note any browser checks.
- Keep commits reviewable and resolve obvious lint, whitespace, and broken-link issues before requesting review.

