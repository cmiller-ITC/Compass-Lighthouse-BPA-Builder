
export const symptomDomainDefinitions = {
  mood: {
    label: "Mood / Depressive Symptoms",
    icon: "🌧️",
    symptoms: [
      "Depressed mood", "Loss of interest / pleasure", "Hopelessness",
      "Worthlessness / excessive guilt", "Fatigue / low energy",
      "Sleep disturbance", "Appetite / weight changes",
      "Psychomotor agitation / slowing", "Difficulty concentrating",
      "Social withdrawal", "Suicidal ideation"
    ],
    questions: [
      ["distinctEpisode", "Distinct episode?", ["Yes", "No", "Unclear"]],
      ["twoWeekCluster", "Symptoms during the same 2-week period?", ["Yes", "No", "Unclear"]],
      ["coreSymptom", "Depressed mood or anhedonia present?", ["Yes", "No", "Unclear"]],
      ["recurrent", "Prior depressive episodes?", ["None", "One prior episode", "Multiple prior episodes", "Unclear"]]
    ]
  },
  anxiety: {
    label: "Anxiety / Generalized Worry",
    icon: "🌪️",
    symptoms: [
      "Excessive worry", "Difficulty controlling worry", "Restlessness",
      "Feeling keyed up / on edge", "Fatigue", "Difficulty concentrating due to anxiety",
      "Irritability", "Muscle tension", "Sleep disturbance due to anxiety",
      "Worry across multiple domains", "Reassurance seeking", "Avoidance"
    ],
    questions: [
      ["sixMonths", "Worry present more days than not for 6+ months?", ["Yes", "No", "Unclear"]],
      ["control", "Worry experienced as difficult to control?", ["Yes", "No", "Unclear"]],
      ["medicalRuleOut", "Medical / substance contributors assessed?", ["Yes", "No", "Unclear"]]
    ]
  },
  panic: {
    label: "Panic Symptoms",
    icon: "⚡",
    symptoms: [
      "Abrupt surge of fear", "Heart pounding / rapid heart rate", "Sweating",
      "Trembling / shaking", "Shortness of breath", "Chest discomfort",
      "Nausea / abdominal distress", "Dizziness / lightheadedness",
      "Chills / heat sensations", "Numbness / tingling", "Derealization / depersonalization",
      "Fear of losing control", "Fear of dying", "Avoidance due to panic"
    ],
    questions: [
      ["unexpected", "Attacks unexpected?", ["Yes", "No", "Sometimes", "Unclear"]],
      ["persistentConcern", "Persistent concern or behavior change for 1+ month?", ["Yes", "No", "Unclear"]],
      ["situational", "Primarily situational / cue-bound?", ["Yes", "No", "Unclear"]]
    ]
  },
  bipolar: {
    label: "Bipolar-Spectrum Symptoms",
    icon: "🌗",
    symptoms: [
      "Elevated / expansive mood", "Persistently irritable mood",
      "Increased energy / activity", "Decreased need for sleep", "Grandiosity",
      "Pressured speech", "Racing thoughts / flight of ideas", "Distractibility",
      "Increased goal-directed activity", "Risk-taking / impulsivity",
      "Marked change from baseline", "Psychotic symptoms during mood episode"
    ],
    questions: [
      ["distinctEpisode", "Distinct period of mood / energy change?", ["Yes", "No", "Unclear"]],
      ["duration", "Longest episode duration", ["Less than 4 days", "At least 4 days", "At least 1 week", "Unclear"]],
      ["impairment", "Marked impairment, hospitalization, or psychosis?", ["Yes", "No", "Unclear"]],
      ["decreasedNeed", "Decreased need for sleep rather than insomnia?", ["Yes", "No", "Unclear"]]
    ]
  },
  adhd: {
    label: "ADHD / Executive Functioning",
    icon: "🧭",
    symptoms: [
      "Sustained attention difficulty", "Careless mistakes", "Not listening / losing track",
      "Task follow-through difficulty", "Disorganization", "Task initiation difficulty",
      "Avoids sustained mental effort", "Loses items", "Easily distracted",
      "Forgetfulness", "Time blindness", "Working-memory difficulty",
      "Fidgeting / restlessness", "Interrupting / impulsivity", "Emotional impulsivity"
    ],
    questions: [
      ["childhood", "Several symptoms present before age 12?", ["Yes", "No", "Unclear"]],
      ["settings", "Symptoms across 2+ settings?", ["Yes", "No", "Unclear"]],
      ["lifelong", "Longstanding rather than episode-specific?", ["Yes", "No", "Unclear"]],
      ["ruleOut", "Mood, anxiety, trauma, sleep, substance, and medical overlap assessed?", ["Yes", "No", "Unclear"]]
    ]
  },
  ocd: {
    label: "Obsessive-Compulsive Symptoms",
    icon: "🔁",
    symptoms: [
      "Intrusive unwanted thoughts / images / urges", "Contamination concerns",
      "Checking rituals", "Cleaning / washing rituals", "Mental rituals",
      "Symmetry / order concerns", "Reassurance seeking", "Counting / repeating",
      "Avoidance related to obsessions", "Compulsions / rituals",
      "Poor insight into OCD symptoms", "Family accommodation"
    ],
    questions: [
      ["neutralize", "Attempts to suppress, neutralize, or ritualize?", ["Yes", "No", "Unclear"]],
      ["time", "Symptoms consume 1+ hour daily or cause impairment?", ["Yes", "No", "Unclear"]],
      ["insight", "Insight level", ["Good / fair", "Poor", "Absent / delusional", "Unclear"]],
      ["erp", "ERP appropriateness assessed?", ["Yes", "No", "Unclear"]]
    ]
  },
  trauma: {
    label: "Trauma / PTSD Symptoms",
    icon: "🛡️",
    symptoms: [
      "Intrusive memories", "Nightmares", "Flashbacks",
      "Psychological distress at reminders", "Physiological reactivity to reminders",
      "Avoidance of trauma memories", "Avoidance of external reminders",
      "Negative beliefs / self-blame", "Persistent negative emotional state",
      "Emotional numbing / detachment", "Hypervigilance", "Exaggerated startle",
      "Irritability / anger", "Sleep disturbance related to trauma",
      "Dissociation / depersonalization / derealization"
    ],
    questions: [
      ["criterionA", "Qualifying trauma exposure documented?", ["Yes", "No", "Unclear", "Deferred"]],
      ["duration", "Symptoms present longer than 1 month?", ["Yes", "No", "Unclear"]],
      ["clusters", "Required symptom clusters represented?", ["Yes", "No", "Unclear"]],
      ["stabilization", "Safety / stabilization needs assessed?", ["Yes", "No", "Unclear"]]
    ]
  },
  psychosis: {
    label: "Psychosis / Thought-Perception Symptoms",
    icon: "🔮",
    symptoms: [
      "Auditory hallucinations", "Visual hallucinations", "Other hallucinations",
      "Delusions", "Paranoia / suspiciousness", "Disorganized speech",
      "Disorganized behavior", "Catatonic features", "Negative symptoms",
      "Ideas of reference", "Impaired reality testing"
    ],
    questions: [
      ["moodRelationship", "Relationship to mood episodes", ["Only during mood episodes", "Outside mood episodes", "No clear relationship", "Unclear"]],
      ["substance", "Substance / medication contributors assessed?", ["Yes", "No", "Unclear"]],
      ["medical", "Medical / neurological contributors assessed?", ["Yes", "No", "Unclear"]],
      ["safety", "Command content or safety concerns assessed?", ["Yes", "No", "Not applicable", "Unclear"]]
    ]
  },
  eating: {
    label: "Eating / Body-Image Symptoms",
    icon: "🍽️",
    symptoms: [
      "Restrictive intake", "Binge eating", "Loss of control eating",
      "Self-induced vomiting", "Laxative / diuretic misuse", "Compensatory exercise",
      "Fear of weight gain", "Body-image disturbance", "Weight / shape overvaluation",
      "Avoidance of eating with others", "Medical consequences", "Sensory / aversive food restriction"
    ],
    questions: [
      ["frequency", "Behavior frequency / pattern established?", ["Yes", "No", "Unclear"]],
      ["medical", "Medical stability / nutritional risk assessed?", ["Yes", "No", "Unclear"]],
      ["weightInfluence", "Weight / shape strongly influences self-evaluation?", ["Yes", "No", "Unclear"]]
    ]
  },
  substance: {
    label: "Substance-Related Symptoms",
    icon: "🧪",
    symptoms: [
      "Using more than intended", "Unsuccessful efforts to cut down", "Craving",
      "Time spent obtaining / using / recovering", "Role impairment",
      "Continued use despite relationship problems", "Reduced activities",
      "Hazardous use", "Continued use despite health effects", "Tolerance",
      "Withdrawal", "Use to cope with emotions / sleep"
    ],
    questions: [
      ["current", "Current pattern versus sustained remission", ["Current", "Early remission", "Sustained remission", "Unclear"]],
      ["withdrawalRisk", "Withdrawal / detoxification risk assessed?", ["Yes", "No", "Not applicable", "Unclear"]],
      ["overdose", "Overdose history / naloxone needs assessed?", ["Yes", "No", "Not applicable", "Unclear"]]
    ]
  },
  adjustment: {
    label: "Adjustment / Acute Stress",
    icon: "🌱",
    symptoms: [
      "Emotional distress linked to identifiable stressor", "Anxiety after stressor",
      "Depressed mood after stressor", "Mixed anxiety and depressed mood",
      "Conduct disturbance", "Acute stress response", "Grief-related distress",
      "Functional decline after life transition", "Symptoms exceed expected response"
    ],
    questions: [
      ["stressor", "Identifiable stressor and timing documented?", ["Yes", "No", "Unclear"]],
      ["threeMonths", "Onset within 3 months of stressor?", ["Yes", "No", "Unclear"]],
      ["otherDisorder", "Another disorder better explains symptoms?", ["Yes", "No", "Unclear"]]
    ]
  },
  painHealth: {
    label: "Chronic Pain / Health Stress",
    icon: "🌊",
    symptoms: [
      "Chronic pain", "Health anxiety", "Fear of bodily sensations",
      "Activity avoidance", "Pain catastrophizing", "Frequent reassurance seeking",
      "Functional limitations", "Medical trauma", "Sleep disruption due to symptoms",
      "Mood changes related to health", "Identity loss related to illness"
    ],
    questions: [
      ["medicalCare", "Medical evaluation / care is established?", ["Yes", "No", "Unclear"]],
      ["fearAvoidance", "Fear-avoidance pattern present?", ["Yes", "No", "Unclear"]],
      ["functional", "Specific functional limitations documented?", ["Yes", "No", "Unclear"]]
    ]
  }
};

const blankDomain = () => ({
  symptoms: [],
  duration: "",
  frequency: "",
  severity: "",
  impairment: [],
  context: "",
  notes: "",
  answers: {}
});

export const initialCaseData = {
  presenting: {
    reasonSeekingCare: "",
    clientRequest: "",
    patientNarrative: "",
    concerns: [],
    duration: "",
    frequency: "",
    severity: "",
    course: "",
    impairments: [],
    domains: Object.fromEntries(Object.keys(symptomDomainDefinitions).map((key) => [key, blankDomain()]))
  },
  psychiatricHistory: {
    diagnoses: [], services: [], treatmentResponse: "", hospitalization: "",
    suicideAttempts: "", nssi: "", details: ""
  },
  familyHistory: { conditions: [], relationshipPattern: "", supportLevel: "", details: "" },
  medical: {
    conditions: [], sleep: "", pain: "", allergies: "", providerFollowUp: "",
    details: "", medications: [{ name: "", dose: "", frequency: "", indication: "" }]
  },
  substance: {
    alcohol: "", cannabis: "", nicotine: "", opioids: "", stimulants: "",
    sedatives: "", other: "", treatmentHistory: "", recoverySupports: "", details: ""
  },
  trauma: { experiences: [], symptoms: [], details: "" },
  social: {
    housing: "", employment: "", finances: "", transportation: "", relationships: "",
    legal: "", supports: "", needs: [], culturalFactors: "", spiritualFactors: "",
    identityFactors: "", education: "", military: "", parenting: ""
  },
  strengths: [],
  mse: {
    appearance: "", behavior: "", orientation: "", speech: "", mood: "", affect: "",
    thoughtProcess: "", thoughtContent: "", perception: "", cognition: "",
    insight: "", judgment: "", attention: "", memory: "", impulseControl: "", additional: ""
  },
  risk: {
    suicideScreen: "", ideation: "", intent: "", plan: "", behavior: "",
    homicidalIdeation: "", accessToMeans: "", protectiveFactors: [], overallRisk: "",
    safetyResponse: "", safetyPlanNeeded: "", warningSigns: "", internalCoping: "",
    peoplePlaces: "", supportContacts: "", professionalContacts: "", meansSafety: ""
  },
  measures: [
    { name: "PHQ-9", score: "", interpretation: "", notes: "" },
    { name: "GAD-7", score: "", interpretation: "", notes: "" },
    { name: "C-SSRS", score: "", interpretation: "", notes: "" }
  ],
  diagnosis: {
    primary: "", secondary: "", ruleOut: "", levelOfCare: "",
    diagnosticRationale: "", medicalNecessity: "", locRationale: ""
  },
  generated: {}
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET": return setPath(state, action.path, action.value);
    case "TOGGLE": {
      const current = getPath(state, action.path) || [];
      const next = current.includes(action.value)
        ? current.filter((item) => item !== action.value)
        : [...current, action.value];
      return setPath(state, action.path, next);
    }
    case "SET_DOMAIN_ANSWER": {
      const path = `presenting.domains.${action.domain}.answers.${action.question}`;
      return setPath(state, path, action.value);
    }
    case "SET_MEDICATION":
      return {...state, medical:{...state.medical, medications:state.medical.medications.map((m,i)=>i===action.index?{...m,[action.field]:action.value}:m)}};
    case "ADD_MEDICATION":
      return {...state, medical:{...state.medical, medications:[...state.medical.medications,{name:"",dose:"",frequency:"",indication:""}]}};
    case "REMOVE_MEDICATION":
      return {...state, medical:{...state.medical, medications:state.medical.medications.filter((_,i)=>i!==action.index)}};
    case "SET_MEASURE":
      return {...state, measures:state.measures.map((m,i)=>i===action.index?{...m,[action.field]:action.value}:m)};
    case "ADD_MEASURE":
      return {...state, measures:[...state.measures,{name:"",score:"",interpretation:"",notes:""}]};
    case "REMOVE_MEASURE":
      return {...state, measures:state.measures.filter((_,i)=>i!==action.index)};
    case "GENERATE": return {...state, generated:buildAllNarratives(state)};
    case "RESET": return structuredClone(initialCaseData);
    default: return state;
  }
}

function setPath(obj,path,value){
  const keys=path.split('.'); const clone=structuredClone(obj); let cursor=clone;
  for(let i=0;i<keys.length-1;i+=1){ if(cursor[keys[i]]===undefined) cursor[keys[i]]={}; cursor=cursor[keys[i]]; }
  cursor[keys.at(-1)]=value; return clone;
}
function getPath(obj,path){return path.split('.').reduce((acc,key)=>acc?.[key],obj)}
export function listText(items=[]){const c=items.filter(Boolean);if(!c.length)return'';if(c.length===1)return c[0];if(c.length===2)return`${c[0]} and ${c[1]}`;return`${c.slice(0,-1).join(', ')}, and ${c.at(-1)}`}
function sentence(v){const t=String(v||'').trim();return !t?'':/[.!?]$/.test(t)?t:`${t}.`}

export function buildAllNarratives(data){
 return {
  chiefComplaint:buildChiefComplaint(data), hpi:buildHPI(data), symptomDomains:buildSymptomDomainNarrative(data),
  psychiatricHistory:buildPsychHistory(data), familyHistory:buildFamilyHistory(data), medicalHistory:buildMedical(data),
  medications:buildMedications(data), substanceUse:buildSubstance(data), traumaHistory:buildTrauma(data),
  socialHistory:buildSocial(data), strengths:buildStrengths(data), mse:buildMSE(data), risk:buildRisk(data),
  safetyPlan:buildSafetyPlan(data), measures:buildMeasures(data), diagnosticSummary:buildDiagnosticSummary(data),
  diagnosticRationale:buildDiagnosticRationale(data), medicalNecessity:buildMedicalNecessity(data),
  levelOfCare:buildLevelOfCare(data)
 };
}

function buildChiefComplaint(data){const p=data.presenting;const parts=[];if(p.reasonSeekingCare)parts.push(`The client is seeking care due to ${p.reasonSeekingCare.toLowerCase()}.`);if(p.clientRequest)parts.push(`The client is requesting ${p.clientRequest.toLowerCase()}.`);if(p.patientNarrative)parts.push(sentence(p.patientNarrative));return parts.join(' ')||'Chief complaint information has not yet been entered.'}

function activeDomains(data){return Object.entries(data.presenting.domains).filter(([,d])=>d.symptoms.length||d.duration||d.frequency||d.severity||d.context||d.notes||Object.values(d.answers||{}).some(Boolean))}

function buildHPI(data){
 const p=data.presenting, parts=[];
 if(p.concerns.length)parts.push(`The client presents with concerns related to ${listText(p.concerns)}.`);
 const domains=activeDomains(data);
 if(domains.length)parts.push(`Symptom domains endorsed include ${listText(domains.map(([key])=>symptomDomainDefinitions[key].label.toLowerCase()))}.`);
 const q=[];if(p.duration)q.push(`overall duration ${p.duration.toLowerCase()}`);if(p.frequency)q.push(`overall frequency ${p.frequency.toLowerCase()}`);if(p.severity)q.push(`overall severity ${p.severity.toLowerCase()}`);if(p.course)q.push(`course ${p.course.toLowerCase()}`);if(q.length)parts.push(`The broader presentation is characterized by ${listText(q)}.`);
 if(p.impairments.length)parts.push(`Symptoms interfere with ${listText(p.impairments)}.`);
 if(p.patientNarrative)parts.push(sentence(p.patientNarrative));
 return parts.join(' ')||'History of present illness information has not yet been entered.';
}

function buildSymptomDomainNarrative(data){
 const paragraphs=activeDomains(data).map(([key,d])=>{
  const def=symptomDomainDefinitions[key], parts=[];
  if(d.symptoms.length)parts.push(`${def.label}: reported features include ${listText(d.symptoms)}.`);
  const qualifiers=[];if(d.duration)qualifiers.push(`duration ${d.duration.toLowerCase()}`);if(d.frequency)qualifiers.push(`frequency ${d.frequency.toLowerCase()}`);if(d.severity)qualifiers.push(`severity ${d.severity.toLowerCase()}`);if(qualifiers.length)parts.push(`This domain is characterized by ${listText(qualifiers)}.`);
  if(d.impairment.length)parts.push(`Associated impairment includes ${listText(d.impairment)}.`);
  const answers=Object.entries(d.answers||{}).filter(([,v])=>v).map(([q,v])=>`${q.replace(/([A-Z])/g,' $1').toLowerCase()}: ${v.toLowerCase()}`);
  if(answers.length)parts.push(`Diagnostic qualifiers include ${listText(answers)}.`);
  if(d.context)parts.push(sentence(d.context)); if(d.notes)parts.push(sentence(d.notes));
  return parts.join(' ');
 });
 return paragraphs.join('\n\n')||'No symptom-domain details were entered.';
}

function buildPsychHistory(data){const h=data.psychiatricHistory,parts=[];if(h.diagnoses.length)parts.push(`Psychiatric history is significant for ${listText(h.diagnoses)}.`);if(h.services.length)parts.push(`Previous behavioral-health services include ${listText(h.services)}.`);if(h.hospitalization)parts.push(`Psychiatric hospitalization history is described as ${h.hospitalization.toLowerCase()}.`);if(h.suicideAttempts)parts.push(`Suicide-attempt history is described as ${h.suicideAttempts.toLowerCase()}.`);if(h.nssi)parts.push(`Nonsuicidal self-injury history is described as ${h.nssi.toLowerCase()}.`);if(h.treatmentResponse)parts.push(`Prior treatment response is described as ${h.treatmentResponse.toLowerCase()}.`);if(h.details)parts.push(sentence(h.details));return parts.join(' ')||'Psychiatric history was not fully documented during this evaluation.'}
function buildFamilyHistory(data){const f=data.familyHistory,parts=[];if(f.conditions.length)parts.push(`Family psychiatric and behavioral-health history is significant for ${listText(f.conditions)}.`);if(f.relationshipPattern)parts.push(`Family relationships are described as ${f.relationshipPattern.toLowerCase()}.`);if(f.supportLevel)parts.push(`Family support is described as ${f.supportLevel.toLowerCase()}.`);if(f.details)parts.push(sentence(f.details));return parts.join(' ')||'Family psychiatric history was not fully documented during this evaluation.'}
function buildMedical(data){const m=data.medical,parts=[];if(m.conditions.length)parts.push(`Medical history is significant for ${listText(m.conditions)}.`);if(m.sleep)parts.push(`Sleep is described as ${m.sleep.toLowerCase()}.`);if(m.pain)parts.push(`Pain concerns are described as ${m.pain.toLowerCase()}.`);if(m.allergies)parts.push(`Allergy information: ${m.allergies}.`);if(m.providerFollowUp)parts.push(`Current medical follow-up is described as ${m.providerFollowUp.toLowerCase()}.`);if(m.details)parts.push(sentence(m.details));return parts.join(' ')||'Medical and biological history was not fully documented during this evaluation.'}
function buildMedications(data){const meds=data.medical.medications.filter(m=>m.name.trim());return meds.length?meds.map(m=>{const d=[m.dose,m.frequency,m.indication].filter(Boolean).join(', ');return d?`${m.name} (${d})`:m.name}).join('; ')+'.':'No current medications were entered.'}
function buildSubstance(data){const s=data.substance,rows=[['Alcohol',s.alcohol],['Cannabis',s.cannabis],['Nicotine/tobacco/vaping',s.nicotine],['Opioids',s.opioids],['Stimulants',s.stimulants],['Sedatives/benzodiazepines',s.sedatives],['Other substances',s.other]].filter(([,v])=>v),parts=[];if(rows.length)parts.push(`Substance-use history includes ${rows.map(([n,v])=>`${n}: ${v}`).join('; ')}.`);if(s.treatmentHistory)parts.push(`Substance-use treatment history is described as ${s.treatmentHistory.toLowerCase()}.`);if(s.recoverySupports)parts.push(`Recovery supports include ${s.recoverySupports}.`);if(s.details)parts.push(sentence(s.details));return parts.join(' ')||'Substance-use history was not fully documented during this evaluation.'}
function buildTrauma(data){const t=data.trauma,parts=[];if(t.experiences.length)parts.push(`The client reports trauma or adverse experiences including ${listText(t.experiences)}.`);if(t.symptoms.length)parts.push(`Current trauma-related symptoms include ${listText(t.symptoms)}.`);if(t.details)parts.push(sentence(t.details));return parts.join(' ')||'Trauma history was not fully documented during this evaluation.'}
function buildSocial(data){const s=data.social,parts=[];if(s.housing)parts.push(`Housing status is ${s.housing.toLowerCase()}.`);if(s.employment)parts.push(`Employment status is ${s.employment.toLowerCase()}.`);if(s.finances)parts.push(`Financial stress is described as ${s.finances.toLowerCase()}.`);if(s.transportation)parts.push(`Transportation is described as ${s.transportation.toLowerCase()}.`);if(s.relationships)parts.push(`Relationship context is described as ${s.relationships.toLowerCase()}.`);if(s.legal)parts.push(`Legal stressors are described as ${s.legal.toLowerCase()}.`);if(s.supports)parts.push(`The support system is described as ${s.supports.toLowerCase()}.`);if(s.needs.length)parts.push(`Current practical needs include ${listText(s.needs)}.`);if(s.education)parts.push(`Educational history/status: ${s.education}.`);if(s.parenting)parts.push(`Parenting/caregiving context: ${s.parenting}.`);if(s.culturalFactors)parts.push(`Cultural factors identified include ${s.culturalFactors}.`);if(s.spiritualFactors)parts.push(`Spiritual or values-based factors include ${s.spiritualFactors}.`);if(s.identityFactors)parts.push(`Identity-related factors include ${s.identityFactors}.`);return parts.join(' ')||'Social and environmental history was not fully documented during this evaluation.'}
function buildStrengths(data){return data.strengths.length?`The client demonstrates strengths and protective factors including ${listText(data.strengths)}.`:'Specific strengths and protective factors were not fully documented during this evaluation.'}
function buildMSE(data){const m=data.mse,parts=[];if(m.appearance)parts.push(`Appearance was ${m.appearance.toLowerCase()}.`);if(m.behavior)parts.push(`Behavior was ${m.behavior.toLowerCase()}.`);if(m.orientation)parts.push(`${m.orientation}.`);if(m.speech)parts.push(`Speech was ${m.speech.toLowerCase()}.`);if(m.mood)parts.push(`Mood was described as ${m.mood.toLowerCase()}.`);if(m.affect)parts.push(`Affect was ${m.affect.toLowerCase()}.`);if(m.thoughtProcess)parts.push(`Thought process was ${m.thoughtProcess.toLowerCase()}.`);if(m.thoughtContent)parts.push(`Thought content was notable for ${m.thoughtContent.toLowerCase()}.`);if(m.perception)parts.push(`Perception was documented as ${m.perception.toLowerCase()}.`);if(m.cognition)parts.push(`Cognition was ${m.cognition.toLowerCase()}.`);if(m.attention)parts.push(`Attention was ${m.attention.toLowerCase()}.`);if(m.memory)parts.push(`Memory was ${m.memory.toLowerCase()}.`);if(m.insight)parts.push(`Insight was ${m.insight.toLowerCase()}.`);if(m.judgment)parts.push(`Judgment was ${m.judgment.toLowerCase()}.`);if(m.impulseControl)parts.push(`Impulse control was ${m.impulseControl.toLowerCase()}.`);if(m.additional)parts.push(sentence(m.additional));return parts.join(' ')||'Mental-status examination findings were not entered.'}
function buildRisk(data){const r=data.risk,parts=[];if(r.suicideScreen)parts.push(`Suicide-risk screening result: ${r.suicideScreen}.`);if(r.ideation)parts.push(`Suicidal ideation is described as ${r.ideation.toLowerCase()}.`);if(r.intent)parts.push(`Intent is described as ${r.intent.toLowerCase()}.`);if(r.plan)parts.push(`Plan is described as ${r.plan.toLowerCase()}.`);if(r.behavior)parts.push(`Recent suicidal or self-harm behavior is described as ${r.behavior.toLowerCase()}.`);if(r.homicidalIdeation)parts.push(`Homicidal ideation is described as ${r.homicidalIdeation.toLowerCase()}.`);if(r.accessToMeans)parts.push(`Access to potentially lethal means is described as ${r.accessToMeans.toLowerCase()}.`);if(r.protectiveFactors.length)parts.push(`Risk-protective factors include ${listText(r.protectiveFactors)}.`);if(r.overallRisk)parts.push(`Overall clinical risk is assessed as ${r.overallRisk.toLowerCase()}.`);if(r.safetyResponse)parts.push(`Safety response: ${r.safetyResponse}.`);return parts.join(' ')||'Risk-assessment information was not fully entered.'}
function buildSafetyPlan(data){const r=data.risk;if(r.safetyPlanNeeded!=='Yes')return'No safety plan was generated.';const parts=['Stanley-Brown-style safety plan:'];if(r.warningSigns)parts.push(`1. Warning signs: ${r.warningSigns}.`);if(r.internalCoping)parts.push(`2. Internal coping strategies: ${r.internalCoping}.`);if(r.peoplePlaces)parts.push(`3. People and places for distraction: ${r.peoplePlaces}.`);if(r.supportContacts)parts.push(`4. People to ask for help: ${r.supportContacts}.`);if(r.professionalContacts)parts.push(`5. Professionals and crisis resources: ${r.professionalContacts}.`);if(r.meansSafety)parts.push(`6. Means-safety steps: ${r.meansSafety}.`);return parts.join('\n')}
function buildMeasures(data){const entered=data.measures.filter(m=>m.score||m.interpretation||m.notes);return entered.length?entered.map(m=>`${m.name||'Measure'}: score ${m.score||'not entered'}${m.interpretation?` (${m.interpretation})`:''}${m.notes?`; ${m.notes}`:''}`).join('; ')+'.':'No standardized measure results were entered.'}
function buildDiagnosticSummary(data){const d=data.diagnosis,parts=[];if(d.primary)parts.push(`Primary diagnosis: ${d.primary}.`);if(d.secondary)parts.push(`Secondary diagnosis: ${d.secondary}.`);if(d.ruleOut)parts.push(`Rule-out or continued-assessment considerations: ${d.ruleOut}.`);if(d.levelOfCare)parts.push(`Recommended level of care: ${d.levelOfCare}.`);return parts.join(' ')||'Diagnostic and level-of-care information has not yet been entered.'}
function buildDiagnosticRationale(data){return sentence(data.diagnosis.diagnosticRationale)||'Diagnostic rationale has not yet been entered.'}
function buildMedicalNecessity(data){if(data.diagnosis.medicalNecessity)return sentence(data.diagnosis.medicalNecessity);const p=data.presenting;const parts=[];if(p.severity)parts.push(`Symptoms are described as ${p.severity.toLowerCase()}`);if(p.impairments.length)parts.push(`and impair ${listText(p.impairments)}`);return parts.length?`Behavioral-health treatment is medically necessary because ${parts.join(' ')}.`:'Medical-necessity rationale has not yet been entered.'}
function buildLevelOfCare(data){const d=data.diagnosis,parts=[];if(d.levelOfCare)parts.push(`The recommended level of care is ${d.levelOfCare.toLowerCase()}.`);if(d.locRationale)parts.push(sentence(d.locRationale));return parts.join(' ')||'Level-of-care rationale has not yet been entered.'}
