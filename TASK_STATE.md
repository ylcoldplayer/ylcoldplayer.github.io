# Task checkpoint

- Status: COMPLETE (pending one manual step by the site owner)
- Last updated: 2026-09-18
- Objective: Count visitors without showing the number on the site, viewable privately by the owner, keeping the site static.
- Success criteria: Every page reports a pageview to a private dashboard; nothing is rendered on the page; local development is not counted.
- Constraints: Static GitHub Pages, no build step, no backend of our own.
- Completed: Added `analytics.js` (GoatCounter pageview beacon) and wired it into `index.html`, `blog/index.html` and `blog/_template.html`. Deleted the orphaned `script.js`, which held an empty Firebase config and fetched each visitor's IP from ipify to store under `visitorIPs/<ip>`. Guards: no-op while `CODE` is the placeholder, no counting from localhost / private ranges / `file:`, and Do Not Track is honoured.
- Files modified: `analytics.js` (new), `index.html`, `blog/index.html`, `blog/_template.html`, `script.js` (deleted), `TASK_STATE.md`.
- Commands/checks: Browser-based guard tests (node is broken locally: missing `icu4c` dylib) covering placeholder / localhost / remote host; only the remote case injects `https://gc.zgo.at/count.js` with endpoint `https://<code>.goatcounter.com/count`. Confirmed no network call is made on localhost, and that rendered page text is unchanged (only DOM match for "count" is the word "Counterexample" in a paper title).
- Known blockers: `CODE` in `analytics.js` is still the placeholder `YOUR_GOATCOUNTER_CODE`, so nothing is counted yet.
- Exact next action: Sign up at https://www.goatcounter.com/signup, then replace `CODE` in `analytics.js` with the chosen subdomain code.
- Restart procedure: `git status --short`, serve with `python3 -m http.server`, confirm the console logs the "[analytics] disabled" notice while the placeholder is in place.
