
export const initialCaseData = {
  presenting: {
    reasonSeekingCare: "",
    clientRequest: "",
    patientNarrative: "",
    concerns: [],
    symptoms: [],
    duration: "",
    frequency: "",
    severity: "",
    course: "",
    impairments: []
  },
  psychiatricHistory: {
    diagnoses: [],
    services: [],
    treatmentResponse: "",
    hospitalization: "",
    suicideAttempts: "",
    nssi: "",
    details: ""
  },
  familyHistory: {
    conditions: [],
    relationshipPattern: "",
    supportLevel: "",
    details: ""
  },
  medical: {
    conditions: [],
    sleep: "",
    pain: "",
    allergies: "",
    providerFollowUp: "",
    details: "",
    medications: [{ name: "", dose: "", frequency: "", indication: "" }]
  },
  substance: {
    alcohol: "",
    cannabis: "",
    nicotine: "",
    opioids: "",
    stimulants: "",
    sedatives: "",
    other: "",
    treatmentHistory: "",
    recoverySupports: "",
    details: ""
  },
  trauma: {
    experiences: [],
    symptoms: [],
    details: ""
  },
  social: {
    housing: "",
    employment: "",
    finances: "",
    transportation: "",
    relationships: "",
    legal: "",
    supports: "",
    needs: []
  },
  strengths: [],
  mse: {
    appearance: "",
    behavior: "",
    orientation: "",
    speech: "",
    mood: "",
    affect: "",
    thoughtProcess: "",
    thoughtContent: "",
    perception: "",
    cognition: "",
    insight: "",
    judgment: "",
    additional: ""
  },
  risk: {
    suicideScreen: "",
    ideation: "",
    intent: "",
    plan: "",
    behavior: "",
    protectiveFactors: [],
    overallRisk: "",
    safetyResponse: ""
  },
  measures: [
    { name: "PHQ-9", score: "", interpretation: "" },
    { name: "GAD-7", score: "", interpretation: "" },
    { name: "C-SSRS", score: "", interpretation: "" }
  ],
  diagnosis: {
    primary: "",
    secondary: "",
    ruleOut: "",
    levelOfCare: ""
  },
  generated: {}
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return setPath(state, action.path, action.value);
    case "TOGGLE": {
      const current = getPath(state, action.path) || [];
      const next = current.includes(action.value)
        ? current.filter((item) => item !== action.value)
        : [...current, action.value];
      return setPath(state, action.path, next);
    }
    case "SET_MEDICATION":
      return {
        ...state,
        medical: {
          ...state.medical,
          medications: state.medical.medications.map((med, i) =>
            i === action.index ? { ...med, [action.field]: action.value } : med
          )
        }
      };
    case "ADD_MEDICATION":
      return {
        ...state,
        medical: {
          ...state.medical,
          medications: [
            ...state.medical.medications,
            { name: "", dose: "", frequency: "", indication: "" }
          ]
        }
      };
    case "REMOVE_MEDICATION":
      return {
        ...state,
        medical: {
          ...state.medical,
          medications: state.medical.medications.filter((_, i) => i !== action.index)
        }
      };
    case "SET_MEASURE":
      return {
        ...state,
        measures: state.measures.map((m, i) =>
          i === action.index ? { ...m, [action.field]: action.value } : m
        )
      };
    case "GENERATE":
      return { ...state, generated: buildAllNarratives(state) };
    case "RESET":
      return structuredClone(initialCaseData);
    default:
      return state;
  }
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  const clone = structuredClone(obj);
  let cursor = clone;
  for (let i = 0; i < keys.length - 1; i += 1) cursor = cursor[keys[i]];
  cursor[keys.at(-1)] = value;
  return clone;
}

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function listText(items = []) {
  const clean = items.filter(Boolean);
  if (!clean.length) return "";
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, and ${clean.at(-1)}`;
}

function sentence(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export function buildAllNarratives(data) {
  return {
    chiefComplaint: buildChiefComplaint(data),
    hpi: buildHPI(data),
    psychiatricHistory: buildPsychHistory(data),
    familyHistory: buildFamilyHistory(data),
    medicalHistory: buildMedical(data),
    medications: buildMedications(data),
    substanceUse: buildSubstance(data),
    traumaHistory: buildTrauma(data),
    socialHistory: buildSocial(data),
    strengths: buildStrengths(data),
    mse: buildMSE(data),
    risk: buildRisk(data),
    measures: buildMeasures(data),
    diagnosticSummary: buildDiagnosticSummary(data)
  };
}

function buildChiefComplaint(data) {
  const p = data.presenting;
  const parts = [];
  if (p.reasonSeekingCare) parts.push(`The client is seeking care due to ${p.reasonSeekingCare.toLowerCase()}.`);
  if (p.clientRequest) parts.push(`The client is requesting ${p.clientRequest.toLowerCase()}.`);
  if (p.patientNarrative) parts.push(sentence(p.patientNarrative));
  return parts.join(" ") || "Chief complaint information has not yet been entered.";
}

function buildHPI(data) {
  const p = data.presenting;
  const parts = [];
  if (p.concerns.length) parts.push(`The client presents with concerns related to ${listText(p.concerns)}.`);
  if (p.symptoms.length) parts.push(`Reported symptoms include ${listText(p.symptoms)}.`);
  const q = [];
  if (p.duration) q.push(`duration described as ${p.duration.toLowerCase()}`);
  if (p.frequency) q.push(`frequency described as ${p.frequency.toLowerCase()}`);
  if (p.severity) q.push(`severity described as ${p.severity.toLowerCase()}`);
  if (p.course) q.push(`course described as ${p.course.toLowerCase()}`);
  if (q.length) parts.push(`The symptom pattern is characterized by ${listText(q)}.`);
  if (p.impairments.length) parts.push(`Symptoms interfere with ${listText(p.impairments)}.`);
  if (p.patientNarrative) parts.push(sentence(p.patientNarrative));
  return parts.join(" ") || "History of present illness information has not yet been entered.";
}

function buildPsychHistory(data) {
  const h = data.psychiatricHistory;
  const parts = [];
  if (h.diagnoses.length) parts.push(`Psychiatric history is significant for ${listText(h.diagnoses)}.`);
  if (h.services.length) parts.push(`Previous behavioral-health services include ${listText(h.services)}.`);
  if (h.hospitalization) parts.push(`Psychiatric hospitalization history is described as ${h.hospitalization.toLowerCase()}.`);
  if (h.suicideAttempts) parts.push(`Suicide-attempt history is described as ${h.suicideAttempts.toLowerCase()}.`);
  if (h.nssi) parts.push(`Nonsuicidal self-injury history is described as ${h.nssi.toLowerCase()}.`);
  if (h.treatmentResponse) parts.push(`Prior treatment response is described as ${h.treatmentResponse.toLowerCase()}.`);
  if (h.details) parts.push(sentence(h.details));
  return parts.join(" ") || "Psychiatric history was not fully documented during this evaluation.";
}

function buildFamilyHistory(data) {
  const f = data.familyHistory;
  const parts = [];
  if (f.conditions.length) parts.push(`Family psychiatric and behavioral-health history is significant for ${listText(f.conditions)}.`);
  if (f.relationshipPattern) parts.push(`Family relationships are described as ${f.relationshipPattern.toLowerCase()}.`);
  if (f.supportLevel) parts.push(`Family support is described as ${f.supportLevel.toLowerCase()}.`);
  if (f.details) parts.push(sentence(f.details));
  return parts.join(" ") || "Family psychiatric history was not fully documented during this evaluation.";
}

function buildMedical(data) {
  const m = data.medical;
  const parts = [];
  if (m.conditions.length) parts.push(`Medical history is significant for ${listText(m.conditions)}.`);
  if (m.sleep) parts.push(`Sleep is described as ${m.sleep.toLowerCase()}.`);
  if (m.pain) parts.push(`Pain concerns are described as ${m.pain.toLowerCase()}.`);
  if (m.allergies) parts.push(`Allergy information: ${m.allergies}.`);
  if (m.providerFollowUp) parts.push(`Current medical follow-up is described as ${m.providerFollowUp.toLowerCase()}.`);
  if (m.details) parts.push(sentence(m.details));
  return parts.join(" ") || "Medical and biological history was not fully documented during this evaluation.";
}

function buildMedications(data) {
  const meds = data.medical.medications.filter((m) => m.name.trim());
  if (!meds.length) return "No current medications were entered.";
  return meds.map((m) => {
    const details = [m.dose, m.frequency, m.indication].filter(Boolean).join(", ");
    return details ? `${m.name} (${details})` : m.name;
  }).join("; ") + ".";
}

function buildSubstance(data) {
  const s = data.substance;
  const rows = [
    ["Alcohol", s.alcohol],
    ["Cannabis", s.cannabis],
    ["Nicotine/tobacco/vaping", s.nicotine],
    ["Opioids", s.opioids],
    ["Stimulants", s.stimulants],
    ["Sedatives/benzodiazepines", s.sedatives],
    ["Other substances", s.other]
  ].filter(([, value]) => value);
  const parts = [];
  if (rows.length) parts.push(`Substance-use history includes ${rows.map(([name, value]) => `${name}: ${value}`).join("; ")}.`);
  if (s.treatmentHistory) parts.push(`Substance-use treatment history is described as ${s.treatmentHistory.toLowerCase()}.`);
  if (s.recoverySupports) parts.push(`Recovery supports include ${s.recoverySupports}.`);
  if (s.details) parts.push(sentence(s.details));
  return parts.join(" ") || "Substance-use history was not fully documented during this evaluation.";
}

function buildTrauma(data) {
  const t = data.trauma;
  const parts = [];
  if (t.experiences.length) parts.push(`The client reports trauma or adverse experiences including ${listText(t.experiences)}.`);
  if (t.symptoms.length) parts.push(`Current trauma-related symptoms include ${listText(t.symptoms)}.`);
  if (t.details) parts.push(sentence(t.details));
  return parts.join(" ") || "Trauma history was not fully documented during this evaluation.";
}

function buildSocial(data) {
  const s = data.social;
  const parts = [];
  if (s.housing) parts.push(`Housing status is ${s.housing.toLowerCase()}.`);
  if (s.employment) parts.push(`Employment status is ${s.employment.toLowerCase()}.`);
  if (s.finances) parts.push(`Financial stress is described as ${s.finances.toLowerCase()}.`);
  if (s.transportation) parts.push(`Transportation is described as ${s.transportation.toLowerCase()}.`);
  if (s.relationships) parts.push(`Relationship context is described as ${s.relationships.toLowerCase()}.`);
  if (s.legal) parts.push(`Legal stressors are described as ${s.legal.toLowerCase()}.`);
  if (s.supports) parts.push(`The support system is described as ${s.supports.toLowerCase()}.`);
  if (s.needs.length) parts.push(`Current practical needs include ${listText(s.needs)}.`);
  return parts.join(" ") || "Social and environmental history was not fully documented during this evaluation.";
}

function buildStrengths(data) {
  return data.strengths.length
    ? `The client demonstrates strengths and protective factors including ${listText(data.strengths)}.`
    : "Specific strengths and protective factors were not fully documented during this evaluation.";
}

function buildMSE(data) {
  const m = data.mse;
  const parts = [];
  if (m.appearance) parts.push(`Appearance was ${m.appearance.toLowerCase()}.`);
  if (m.behavior) parts.push(`Behavior was ${m.behavior.toLowerCase()}.`);
  if (m.orientation) parts.push(`${m.orientation}.`);
  if (m.speech) parts.push(`Speech was ${m.speech.toLowerCase()}.`);
  if (m.mood) parts.push(`Mood was described as ${m.mood.toLowerCase()}.`);
  if (m.affect) parts.push(`Affect was ${m.affect.toLowerCase()}.`);
  if (m.thoughtProcess) parts.push(`Thought process was ${m.thoughtProcess.toLowerCase()}.`);
  if (m.thoughtContent) parts.push(`Thought content was notable for ${m.thoughtContent.toLowerCase()}.`);
  if (m.perception) parts.push(`Perception was documented as ${m.perception.toLowerCase()}.`);
  if (m.cognition) parts.push(`Cognition was ${m.cognition.toLowerCase()}.`);
  if (m.insight) parts.push(`Insight was ${m.insight.toLowerCase()}.`);
  if (m.judgment) parts.push(`Judgment was ${m.judgment.toLowerCase()}.`);
  if (m.additional) parts.push(sentence(m.additional));
  return parts.join(" ") || "Mental-status examination findings were not entered.";
}

function buildRisk(data) {
  const r = data.risk;
  const parts = [];
  if (r.suicideScreen) parts.push(`Suicide-risk screening result: ${r.suicideScreen}.`);
  if (r.ideation) parts.push(`Suicidal ideation is described as ${r.ideation.toLowerCase()}.`);
  if (r.intent) parts.push(`Intent is described as ${r.intent.toLowerCase()}.`);
  if (r.plan) parts.push(`Plan is described as ${r.plan.toLowerCase()}.`);
  if (r.behavior) parts.push(`Recent suicidal or self-harm behavior is described as ${r.behavior.toLowerCase()}.`);
  if (r.protectiveFactors.length) parts.push(`Risk-protective factors include ${listText(r.protectiveFactors)}.`);
  if (r.overallRisk) parts.push(`Overall clinical risk is assessed as ${r.overallRisk.toLowerCase()}.`);
  if (r.safetyResponse) parts.push(`Safety response: ${r.safetyResponse}.`);
  return parts.join(" ") || "Risk-assessment information was not fully entered.";
}

function buildMeasures(data) {
  const entered = data.measures.filter((m) => m.score || m.interpretation);
  if (!entered.length) return "No standardized measure results were entered.";
  return entered.map((m) => `${m.name}: score ${m.score || "not entered"}${m.interpretation ? ` (${m.interpretation})` : ""}`).join("; ") + ".";
}

function buildDiagnosticSummary(data) {
  const d = data.diagnosis;
  const parts = [];
  if (d.primary) parts.push(`Primary diagnosis: ${d.primary}.`);
  if (d.secondary) parts.push(`Secondary diagnosis: ${d.secondary}.`);
  if (d.ruleOut) parts.push(`Rule-out or continued-assessment considerations: ${d.ruleOut}.`);
  if (d.levelOfCare) parts.push(`Recommended level of care: ${d.levelOfCare}.`);
  return parts.join(" ") || "Diagnostic and level-of-care information has not yet been entered.";
}
