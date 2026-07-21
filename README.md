# Lighthouse Compass 7.4.1 — Presenting Runtime Hotfix

This hotfix restores the clinical choice-group definitions and component used by the redesigned Presenting page.

The 7.4 blank-screen issue occurred because the Presenting page referenced:
- reasonSeekingCareGroups
- clientRequestGroups
- ClinicalChoiceGroups

but those definitions were accidentally removed during the lighthouse-scene replacement.

7.4.1 restores them and preserves:
- the redesigned Reason for Seeking Care experience
- the redesigned Client Goal experience
- the coastal lighthouse visual refresh
- all 7.3.1 clinical logic and narrative improvements

All generated content requires clinician review and individualization.
No server-side PHI storage is included.
