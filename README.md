# Lighthouse Compass 7.8.1 — Narrative & Golden Thread Hotfix

## Free-text cleanup
- Clinician-entered narrative is now lightly cleaned rather than rewritten
- Converts patient / pt language to client language
- Normalizes capitalization, spacing, and punctuation
- Does not prepend “The client describes,” “The client reports,” or other canned lead-ins
- Fixes duplications such as “The client describes The client indicated…”

## Golden Thread validator
- No longer depends on clicking Generate or on legacy generated-output property names
- Evaluates the current assessment data directly
- Checks each link separately:
  - assessment findings
  - functional impairment
  - diagnosis / clinical impression
  - diagnostic rationale
  - medical necessity
  - level of care
  - treatment direction
- Shows the exact missing link and corrective guidance
- Marks Golden Thread complete when all clinical links are established, even before generating the final documentation package

All generated content requires clinician review and individualization.
No server-side PHI storage is included.
