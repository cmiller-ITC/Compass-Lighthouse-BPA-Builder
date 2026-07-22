# Lighthouse Compass 7.7 — Clinical Reasoning Foundation

## New clinical reasoning layer
- Added a dedicated `clinicalReasoning.js` module
- Collects current presentation as structured facts
- Separates current contributors from historical context
- Identifies maintaining factors only when assessment evidence supports them
- Assigns high, moderate, or emerging support based on available evidence
- Collects strengths and protective factors with their source
- Builds initial treatment targets from supported mechanisms and client goals
- Replaces canned Clinical Conceptualization assumptions with evidence-based reasoning
- Adds an expandable “Why Compass reached this formulation” panel
- Displays the evidence supporting each maintaining factor
- States that maintaining factors require clarification when no evidence exists
- Removes numeric phrases such as “and 5 additional concerns”

## Important
The engine does not infer avoidance, rumination, reassurance seeking, compulsions, threat monitoring, sleep disruption, limited support, or other maintaining factors unless matching evidence appears in the assessment.

All generated content requires clinician review and individualization.
No server-side PHI storage is included.
