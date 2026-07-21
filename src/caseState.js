
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
      ["sixMonths", "Has the client experienced excessive worry more days than not for at least 6 months?", ["Yes", "No", "Unclear"]],
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
    confidence: "", status: "", diagnosticRationale: "", medicalNecessity: "",
    locRationale: "", treatmentFocus: ""
  },
  generated: {}
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET": return setPath(state, action.path, action.value);
    case "TOGGLE": {
      const current = getPath(state, action.path) || [];
      const exclusive = ["None reported","Not applicable","None identified","None identified yet",
        "None reported / no current behavioral-health concern","Unknown / records unavailable",
        "Unknown / family history unavailable","Unknown / not yet assessed",
        "Not applicable / no current trauma symptoms"];
      let next;
      if(current.includes(action.value)){
        next=current.filter((item)=>item!==action.value);
      }else if(exclusive.includes(action.value)){
        next=[action.value];
      }else{
        next=[...current.filter((item)=>!exclusive.includes(item)),action.value];
      }
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
    case "GENERATE": {
      const enriched=applyDiagnosticIntelligence(state);
      return {...enriched, generated:buildAllNarratives(enriched)};
    }
    case "GENERATE_DIAGNOSTIC_INTELLIGENCE": return regenerateDiagnosticIntelligence(state);
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

function cleanChartOutput(value){
 return String(value||'')
  .replace(/\s*a patient-specific example would further strengthen[^.]*\./gi,'')
  .replace(/\s*consider documenting[^.]*\./gi,'')
  .replace(/\s*consider adding[^.]*\./gi,'')
  .replace(/\s*this would strengthen[^.]*\./gi,'')
  .replace(/\s*documentation should[^.]*\./gi,'')
  .replace(/[ \t]+/g,' ')
  .replace(/ \n/g,'\n')
  .trim();
}

export function buildAllNarratives(data){
 const outputs={
  chiefComplaint:buildChiefComplaint(data), hpi:buildHPI(data), symptomDomains:buildSymptomDomainNarrative(data),
  psychiatricHistory:buildPsychHistory(data), familyHistory:buildFamilyHistory(data), medicalHistory:buildMedical(data),
  medications:buildMedications(data), substanceUse:buildSubstance(data), traumaHistory:buildTrauma(data),
  socialHistory:buildSocial(data), strengths:buildStrengths(data), mse:buildMSE(data), risk:buildRisk(data),
  safetyPlan:buildSafetyPlan(data), measures:buildMeasures(data), diagnosticSummary:buildDiagnosticSummary(data),
  diagnosticRationale:buildDiagnosticRationale(data), medicalNecessity:buildMedicalNecessity(data),
  levelOfCare:buildLevelOfCare(data), clinicalFormulation:buildClinicalFormulation(data),
  treatmentFocus:buildTreatmentFocus(data), goldenThread:buildGoldenThread(data)
 };
 return Object.fromEntries(Object.entries(outputs).map(([key,value])=>[key,cleanChartOutput(value)]));
}

function buildChiefComplaint(data){
 const p=data.presenting;if(p.patientNarrative.trim())return sentence(p.patientNarrative);
 const reason=p.reasonSeekingCare?reasonToClinicalPhrase(p.reasonSeekingCare):'behavioral-health concerns';
 const request=p.clientRequest?` The client is seeking ${p.clientRequest.toLowerCase()}.`:'';
 return p.reasonSeekingCare||p.clientRequest?`The client presents in response to ${reason}.${request}`:'Chief complaint information has not yet been entered.';
}
function activeDomains(data){return Object.entries(data.presenting.domains).filter(([,d])=>d.symptoms.length||d.duration||d.frequency||d.severity||d.context||d.notes||Object.values(d.answers||{}).some(Boolean))}
function reasonToClinicalPhrase(reason){const map={'New onset symptoms':'newly emerging symptoms','Worsening symptoms':'a recent worsening of symptoms','Return to treatment':'a return to behavioral-health treatment','Life transition / adjustment stress':'distress associated with a major life transition','Relationship or family conflict':'relationship or family-related distress','Work or school impairment':'work or school-related impairment','Diagnostic clarification':'a need for diagnostic clarification'};return map[reason]||reason.toLowerCase()}
function durationPhrase(value){const map={'Less than 1 month':'present for less than one month','1–6 months':'present for approximately one to six months','More than 6 months':'present for more than six months','More than 1 year':'present for more than one year','Chronic / longstanding':'longstanding','Less than 2 weeks':'present for less than two weeks','2 weeks–1 month':'present for approximately two weeks to one month','6–12 months':'present for approximately six to twelve months','Episodic':'episodic','Unclear':'of unclear duration'};return map[value]||`present for ${String(value).toLowerCase()}`}
function frequencyPhrase(value){const map={'Occasional':'occurring occasionally','Weekly':'occurring weekly','Several days per week':'occurring several days per week','Most days':'occurring most days','Daily':'occurring daily','Nearly constant':'nearly constant','Episodic':'episodic','Unclear':'of unclear frequency'};return map[value]||`occurring ${String(value).toLowerCase()}`}
function clinicalDomainLabel(key){const map={mood:'depressive symptoms',anxiety:'anxiety symptoms',panic:'panic symptoms',bipolar:'bipolar-spectrum features',adhd:'attention and executive-functioning concerns',ocd:'obsessive-compulsive symptoms',trauma:'trauma-related symptoms',psychosis:'thought and perception-related symptoms',eating:'eating and body-image concerns',substance:'substance-related concerns',adjustment:'adjustment-related distress',painHealth:'pain and health-related distress'};return map[key]||symptomDomainDefinitions[key].label.toLowerCase()}
function buildHPI(data){
 const p=data.presenting;const domains=activeDomains(data).filter(([,d])=>d.symptoms.length||d.context||d.notes);const paragraphs=[];
 if(p.patientNarrative.trim())paragraphs.push(sentence(p.patientNarrative));
 const concerns=p.concerns.filter(v=>!v.startsWith('None'));
 if(concerns.length){const course=[];if(p.duration)course.push(durationPhrase(p.duration));if(p.frequency)course.push(frequencyPhrase(p.frequency));if(p.severity)course.push(`${p.severity.toLowerCase()} in severity`);if(p.course)course.push(`currently ${p.course.toLowerCase()}`);paragraphs.push(`The client presents with ${listText(concerns.map(v=>v.toLowerCase()))}${course.length?`, with symptoms ${listText(course)}`:''}.`)}
 if(domains.length){const sentences=domains.map(([key,d])=>{const pieces=[];if(d.symptoms.length)pieces.push(`${clinicalDomainLabel(key).replace(/^./,c=>c.toUpperCase())} include ${listText(d.symptoms.slice(0,7).map(v=>v.toLowerCase()))}`);if(d.context)pieces.push(`Relevant context, triggers, or patterns include ${d.context}`);if(d.notes)pieces.push(`The client describes ${d.notes}`);return pieces.length?`${pieces.join('. ')}.`:''}).filter(Boolean);if(sentences.length)paragraphs.push(sentences.join(' '))}
 const impacts=[...new Set([...p.impairments.filter(v=>!['None reported','Not applicable'].includes(v)),...domains.flatMap(([,d])=>d.impairment.filter(v=>!['None reported','Not applicable'].includes(v)))])];
 if(impacts.length)paragraphs.push(`Symptoms are interfering with ${listText(impacts.map(v=>v.toLowerCase()))}.`);
 if(p.clientRequest)paragraphs.push(`The client is seeking ${p.clientRequest.toLowerCase()} to address the reported symptoms and associated impairment.`);
 return paragraphs.join('\n\n')||'History of present illness information has not yet been entered.';
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

function buildPsychHistory(data){
 const h=data.psychiatricHistory,parts=[];
 if(h.diagnoses.includes('None reported'))parts.push('The client reports no prior psychiatric diagnoses.');
 else if(h.diagnoses.some(v=>v.startsWith('Unknown')))parts.push('Prior psychiatric history is currently unknown or unavailable.');
 else{const diagnoses=h.diagnoses.filter(v=>!v.startsWith('None')&&!v.startsWith('Unknown'));if(diagnoses.length)parts.push(`Prior psychiatric diagnoses include ${listText(diagnoses.map(v=>v.toLowerCase()))}.`)}
 if(h.services.includes('None reported'))parts.push('The client reports no prior behavioral-health treatment.');
 else if(h.services.some(v=>v.startsWith('Unknown')))parts.push('Prior treatment history is currently unknown or unavailable.');
 else{const services=h.services.filter(v=>!v.startsWith('None')&&!v.startsWith('Unknown'));if(services.length)parts.push(`Previous behavioral-health services include ${listText(services.map(v=>v.toLowerCase()))}.`)}
 if(h.hospitalization)parts.push(`Psychiatric hospitalization history: ${h.hospitalization}.`);if(h.suicideAttempts)parts.push(`Suicide-attempt history: ${h.suicideAttempts}.`);if(h.nssi)parts.push(`Nonsuicidal self-injury history: ${h.nssi}.`);if(h.treatmentResponse)parts.push(`Prior treatment response is described as ${h.treatmentResponse.toLowerCase()}.`);if(h.details)parts.push(sentence(h.details));return parts.join(' ')||'Psychiatric history has not yet been documented.';
}
function buildFamilyHistory(data){
 const f=data.familyHistory,parts=[];
 if(f.conditions.includes('None reported'))parts.push('The client reports no known family psychiatric, substance-use, suicide, or psychiatric-hospitalization history.');
 else if(f.conditions.some(v=>v.startsWith('Unknown')))parts.push('Family psychiatric history is currently unknown or unavailable.');
 else{const conditions=f.conditions.filter(v=>!v.startsWith('None')&&!v.startsWith('Unknown'));if(conditions.length)parts.push(`Family psychiatric history is notable for ${listText(conditions.map(v=>v.toLowerCase()))}.`)}
 if(f.relationshipPattern)parts.push(`Family relationships are described as ${f.relationshipPattern.toLowerCase()}.`);if(f.supportLevel)parts.push(`Family support is described as ${f.supportLevel.toLowerCase()}.`);if(f.details)parts.push(sentence(f.details));return parts.join(' ')||'Family psychiatric history has not yet been documented.';
}
function buildMedical(data){
 const m=data.medical,parts=[];
 if(m.conditions.includes('None reported'))parts.push('The client reports no significant medical conditions.');
 else if(m.conditions.some(v=>v.startsWith('Unknown')))parts.push('Medical history is currently unknown or has not yet been fully assessed.');
 else{const conditions=m.conditions.filter(v=>!v.startsWith('None')&&!v.startsWith('Unknown'));if(conditions.length)parts.push(`Medical history includes ${listText(conditions.map(v=>v.toLowerCase()))}.`)}
 if(m.sleep)parts.push(`Sleep is described as ${m.sleep.toLowerCase()}.`);if(m.pain)parts.push(`Pain is described as ${m.pain.toLowerCase()}.`);if(m.allergies)parts.push(`Allergy information: ${m.allergies}.`);if(m.providerFollowUp)parts.push(`Medical follow-up is ${m.providerFollowUp.toLowerCase()}.`);if(m.details)parts.push(sentence(m.details));return parts.join(' ')||'Medical history has not yet been documented.';
}
function buildMedications(data){const meds=data.medical.medications.filter(m=>m.name.trim());return meds.length?meds.map(m=>{const d=[m.dose,m.frequency,m.indication].filter(Boolean).join(', ');return d?`${m.name} (${d})`:m.name}).join('; ')+'.':'No current medications were entered.'}
function buildSubstance(data){const s=data.substance,rows=[['Alcohol',s.alcohol],['Cannabis',s.cannabis],['Nicotine/tobacco/vaping',s.nicotine],['Opioids',s.opioids],['Stimulants',s.stimulants],['Sedatives/benzodiazepines',s.sedatives],['Other substances',s.other]].filter(([,v])=>v),parts=[];if(rows.length)parts.push(`Substance-use history includes ${rows.map(([n,v])=>`${n}: ${v}`).join('; ')}.`);if(s.treatmentHistory)parts.push(`Substance-use treatment history is described as ${s.treatmentHistory.toLowerCase()}.`);if(s.recoverySupports)parts.push(`Recovery supports include ${s.recoverySupports}.`);if(s.details)parts.push(sentence(s.details));return parts.join(' ')||'Substance-use history was not fully documented during this evaluation.'}
function buildTrauma(data){const t=data.trauma,parts=[];if(t.experiences.length)parts.push(`The client reports trauma or adverse experiences including ${listText(t.experiences)}.`);if(t.symptoms.length)parts.push(`Current trauma-related symptoms include ${listText(t.symptoms)}.`);if(t.details)parts.push(sentence(t.details));return parts.join(' ')||'Trauma history was not fully documented during this evaluation.'}
function buildSocial(data){const s=data.social,parts=[];if(s.housing)parts.push(`Housing status is ${s.housing.toLowerCase()}.`);if(s.employment)parts.push(`Employment status is ${s.employment.toLowerCase()}.`);if(s.finances)parts.push(`Financial stress is described as ${s.finances.toLowerCase()}.`);if(s.transportation)parts.push(`Transportation is described as ${s.transportation.toLowerCase()}.`);if(s.relationships)parts.push(`Relationship context is described as ${s.relationships.toLowerCase()}.`);if(s.legal)parts.push(`Legal stressors are described as ${s.legal.toLowerCase()}.`);if(s.supports)parts.push(`The support system is described as ${s.supports.toLowerCase()}.`);if(s.needs.length)parts.push(`Current practical needs include ${listText(s.needs)}.`);if(s.education)parts.push(`Educational history/status: ${s.education}.`);if(s.parenting)parts.push(`Parenting/caregiving context: ${s.parenting}.`);if(s.culturalFactors)parts.push(`Cultural factors identified include ${s.culturalFactors}.`);if(s.spiritualFactors)parts.push(`Spiritual or values-based factors include ${s.spiritualFactors}.`);if(s.identityFactors)parts.push(`Identity-related factors include ${s.identityFactors}.`);return parts.join(' ')||'Social and environmental history was not fully documented during this evaluation.'}
function buildStrengths(data){return data.strengths.length?`The client demonstrates strengths and protective factors including ${listText(data.strengths)}.`:'Specific strengths and protective factors were not fully documented during this evaluation.'}
function buildMSE(data){const m=data.mse,parts=[];if(m.appearance)parts.push(`Appearance was ${m.appearance.toLowerCase()}.`);if(m.behavior)parts.push(`Behavior was ${m.behavior.toLowerCase()}.`);if(m.orientation)parts.push(`${m.orientation}.`);if(m.speech)parts.push(`Speech was ${m.speech.toLowerCase()}.`);if(m.mood)parts.push(`Mood was described as ${m.mood.toLowerCase()}.`);if(m.affect)parts.push(`Affect was ${m.affect.toLowerCase()}.`);if(m.thoughtProcess)parts.push(`Thought process was ${m.thoughtProcess.toLowerCase()}.`);if(m.thoughtContent)parts.push(`Thought content was notable for ${m.thoughtContent.toLowerCase()}.`);if(m.perception)parts.push(`Perception was documented as ${m.perception.toLowerCase()}.`);if(m.cognition)parts.push(`Cognition was ${m.cognition.toLowerCase()}.`);if(m.attention)parts.push(`Attention was ${m.attention.toLowerCase()}.`);if(m.memory)parts.push(`Memory was ${m.memory.toLowerCase()}.`);if(m.insight)parts.push(`Insight was ${m.insight.toLowerCase()}.`);if(m.judgment)parts.push(`Judgment was ${m.judgment.toLowerCase()}.`);if(m.impulseControl)parts.push(`Impulse control was ${m.impulseControl.toLowerCase()}.`);if(m.additional)parts.push(sentence(m.additional));return parts.join(' ')||'Mental-status examination findings were not entered.'}
function buildRisk(data){const r=data.risk,parts=[];if(r.suicideScreen)parts.push(`Suicide-risk screening result: ${r.suicideScreen}.`);if(r.ideation)parts.push(`Suicidal ideation is described as ${r.ideation.toLowerCase()}.`);if(r.intent)parts.push(`Intent is described as ${r.intent.toLowerCase()}.`);if(r.plan)parts.push(`Plan is described as ${r.plan.toLowerCase()}.`);if(r.behavior)parts.push(`Recent suicidal or self-harm behavior is described as ${r.behavior.toLowerCase()}.`);if(r.homicidalIdeation)parts.push(`Homicidal ideation is described as ${r.homicidalIdeation.toLowerCase()}.`);if(r.accessToMeans)parts.push(`Access to potentially lethal means is described as ${r.accessToMeans.toLowerCase()}.`);if(r.protectiveFactors.length)parts.push(`Risk-protective factors include ${listText(r.protectiveFactors)}.`);if(r.overallRisk)parts.push(`Overall clinical risk is assessed as ${r.overallRisk.toLowerCase()}.`);if(r.safetyResponse)parts.push(`Safety response: ${r.safetyResponse}.`);return parts.join(' ')||'Risk-assessment information was not fully entered.'}
function buildSafetyPlan(data){const r=data.risk;if(r.safetyPlanNeeded!=='Yes')return'No safety plan was generated.';const parts=['Stanley-Brown-style safety plan:'];if(r.warningSigns)parts.push(`1. Warning signs: ${r.warningSigns}.`);if(r.internalCoping)parts.push(`2. Internal coping strategies: ${r.internalCoping}.`);if(r.peoplePlaces)parts.push(`3. People and places for distraction: ${r.peoplePlaces}.`);if(r.supportContacts)parts.push(`4. People to ask for help: ${r.supportContacts}.`);if(r.professionalContacts)parts.push(`5. Professionals and crisis resources: ${r.professionalContacts}.`);if(r.meansSafety)parts.push(`6. Means-safety steps: ${r.meansSafety}.`);return parts.join('\n')}
function buildMeasures(data){const entered=data.measures.filter(m=>m.score||m.interpretation||m.notes);return entered.length?entered.map(m=>`${m.name||'Measure'}: score ${m.score||'not entered'}${m.interpretation?` (${m.interpretation})`:''}${m.notes?`; ${m.notes}`:''}`).join('; ')+'.':'No standardized measure results were entered.'}
function selectedSymptomDomains(data){
 return Object.entries(data.presenting.domains).filter(([,domain])=>domain.symptoms.length);
}

function patientSpecificDetails(data){
 const p=data.presenting;
 return [
  p.patientNarrative,
  ...selectedSymptomDomains(data).flatMap(([,domain])=>[domain.context,domain.notes]),
  data.psychiatricHistory.details,
  data.trauma.details
 ].map(v=>String(v||'').trim()).filter(Boolean);
}

function applyDiagnosticIntelligence(data){
 const next=structuredClone(data);
 if(!next.diagnosis.diagnosticRationale.trim())next.diagnosis.diagnosticRationale=generateDiagnosticRationale(next);
 if(!next.diagnosis.medicalNecessity.trim())next.diagnosis.medicalNecessity=generateMedicalNecessity(next);
 if(!next.diagnosis.locRationale.trim())next.diagnosis.locRationale=generateLevelOfCareRationale(next);
 if(!next.diagnosis.treatmentFocus.trim())next.diagnosis.treatmentFocus=generateTreatmentFocus(next);
 return next;
}

function regenerateDiagnosticIntelligence(data){
 const next=structuredClone(data);
 next.diagnosis.diagnosticRationale=generateDiagnosticRationale(next);
 next.diagnosis.medicalNecessity=generateMedicalNecessity(next);
 next.diagnosis.locRationale=generateLevelOfCareRationale(next);
 next.diagnosis.treatmentFocus=generateTreatmentFocus(next);
 return next;
}

function buildDiagnosticSummary(data){
 const d=data.diagnosis,parts=[];
 if(d.primary)parts.push(`Primary diagnosis: ${d.primary}.`);
 if(d.secondary)parts.push(`Secondary diagnosis: ${d.secondary}.`);
 if(d.status)parts.push(`Diagnostic status: ${d.status.toLowerCase()}.`);
 if(d.confidence)parts.push(`Diagnostic confidence is ${d.confidence.toLowerCase()}.`);
 if(d.ruleOut)parts.push(`Rule-out or continued-assessment considerations include ${d.ruleOut}.`);
 if(d.levelOfCare)parts.push(`Recommended level of care: ${d.levelOfCare}.`);
 return parts.join(' ')||'Diagnostic and level-of-care information has not yet been entered.';
}

function generateDiagnosticRationale(data){
 const d=data.diagnosis,p=data.presenting,domains=selectedSymptomDomains(data);
 if(!d.primary)return 'A primary or provisional diagnosis must be entered before a diagnosis-specific justification can be finalized.';
 const evidence=[];
 if(domains.length){
  const domainEvidence=domains.slice(0,5).map(([key,domain])=>{
   const label=clinicalDomainLabel(key);
   const symptoms=listText(domain.symptoms.slice(0,6).map(v=>v.toLowerCase()));
   return `${label} characterized by ${symptoms}`;
  });
  evidence.push(listText(domainEvidence));
 }
 const course=[];
 if(p.duration)course.push(durationPhrase(p.duration));
 if(p.frequency)course.push(frequencyPhrase(p.frequency));
 if(p.severity)course.push(`${p.severity.toLowerCase()} in severity`);
 if(p.course)course.push(`currently ${p.course.toLowerCase()}`);
 const impairment=p.impairments.length?` Symptoms are associated with clinically significant impairment in ${listText(p.impairments.map(v=>v.toLowerCase()))}.`:'';
 const details=patientSpecificDetails(data);
 const context=details.length?` Patient-specific context includes ${sentence(details[0])}`:'';
 const scoredMeasures=data.measures.filter(m=>m.name&&m.score).map(m=>`${m.name} score ${m.score}${m.interpretation?` (${m.interpretation.toLowerCase()})`:''}`);
 const measures=scoredMeasures.length?` Standardized assessment findings include ${listText(scoredMeasures)}.`:'';
 const history=data.psychiatricHistory.diagnoses.filter(v=>!v.startsWith('None')&&!v.startsWith('Unknown'));
 const historyLink=history.length?` The diagnostic history includes ${listText(history.map(v=>v.toLowerCase()))}.`:'';
 const ruleOut=d.ruleOut?` Continued assessment should consider ${d.ruleOut}, including whether another mental disorder, a medical condition, substance effects, or a normative stress response better explains the presentation.`:'';
 const confidence=d.confidence?` Diagnostic confidence is currently ${d.confidence.toLowerCase()}.`:'';
 return `The diagnosis of ${d.primary} is supported by ${evidence.length?evidence.join('; '):'the reported clinical presentation'}${course.length?`, with symptoms ${listText(course)}`:''}.${impairment}${context}${measures}${historyLink}${confidence}${ruleOut}`.replace(/\.\./g,'.');
}

function generateMedicalNecessity(data){
 const p=data.presenting,domains=selectedSymptomDomains(data);
 const symptomPhrase=domains.length
  ?listText(domains.slice(0,5).map(([key])=>clinicalDomainLabel(key)))
  :p.concerns.length?listText(p.concerns.map(v=>v.toLowerCase())):'behavioral-health symptoms';
 const impairment=p.impairments.length?listText(p.impairments.map(v=>v.toLowerCase())):'daily functioning';
 const severity=p.severity?`${p.severity.toLowerCase()} `:'';
 const frequency=p.frequency?` occurring ${p.frequency.toLowerCase()}`:'';
 const course=p.course?` and ${p.course.toLowerCase()}`:'';
 const request=p.clientRequest?` The client is seeking ${p.clientRequest.toLowerCase()} to reduce symptom burden and improve functioning.`:'';
 return `Behavioral-health treatment is medically necessary due to ${severity}${symptomPhrase}${frequency}${course}, resulting in clinically meaningful impairment in ${impairment}. Without appropriate intervention, the current symptom pattern may contribute to continued functional decline, worsening distress, and increased difficulty meeting daily responsibilities.${request}`;
}

function generateLevelOfCareRationale(data){
 const d=data.diagnosis,r=data.risk,p=data.presenting;
 const loc=d.levelOfCare||'routine outpatient psychotherapy';
 const risk=r.overallRisk?`${r.overallRisk.toLowerCase()} current risk`:'no documented indication of imminent risk';
 const functioning=p.impairments.length?`impairment in ${listText(p.impairments.map(v=>v.toLowerCase()))}`:'functional impairment requiring treatment';
 const stability=[];
 if(data.social.housing)stability.push(`${data.social.housing.toLowerCase()} housing`);
 if(data.social.supports)stability.push(`${data.social.supports.toLowerCase()} supports`);
 if(data.strengths.length)stability.push(`protective factors including ${listText(data.strengths.slice(0,4).map(v=>v.toLowerCase()))}`);
 const support=stability.length?` The client also demonstrates ${listText(stability)}, which informs the feasibility of this recommendation.`:'';
 return `${loc} is recommended based on ${risk}, ${functioning}, the current symptom severity, and the need for structured clinical intervention.${support} The level of care should be revised if risk, functioning, psychiatric stability, or the ability to participate safely in treatment changes.`;
}

function generateTreatmentFocus(data){
 const p=data.presenting,domains=selectedSymptomDomains(data);
 const targets=[];
 const keys=domains.map(([key])=>key);
 if(keys.includes('mood'))targets.push('reduce depressive symptoms and increase behavioral activation');
 if(keys.includes('anxiety')||keys.includes('panic'))targets.push('improve anxiety management and nervous-system regulation');
 if(keys.includes('trauma'))targets.push('strengthen stabilization and trauma-informed coping');
 if(keys.includes('ocd'))targets.push('address obsessive-compulsive patterns using exposure-based and response-prevention strategies when clinically appropriate');
 if(keys.includes('adhd'))targets.push('improve executive-functioning supports and daily organization');
 if(keys.includes('adjustment'))targets.push('process adjustment-related stressors and strengthen adaptive coping');
 if(keys.includes('painHealth'))targets.push('address the interaction among pain, stress, avoidance, and functioning');
 if(keys.includes('substance'))targets.push('support harm reduction, recovery goals, and relapse-prevention planning');
 if(!targets.length&&p.concerns.length)targets.push(`address ${listText(p.concerns.slice(0,5).map(v=>v.toLowerCase()))}`);
 if(p.impairments.length)targets.push(`improve functioning in ${listText(p.impairments.slice(0,5).map(v=>v.toLowerCase()))}`);
 return `Initial treatment should focus on ${listText(targets)}. Treatment planning should incorporate the client’s stated goals, strengths, cultural context, treatment preferences, risk needs, and response to prior services.`;
}

function buildDiagnosticRationale(data){
 return sentence(data.diagnosis.diagnosticRationale)||generateDiagnosticRationale(data);
}

function buildMedicalNecessity(data){
 return sentence(data.diagnosis.medicalNecessity)||generateMedicalNecessity(data);
}

function buildLevelOfCare(data){
 const d=data.diagnosis;
 const rationale=sentence(d.locRationale)||generateLevelOfCareRationale(data);
 return d.levelOfCare?`Recommended level of care: ${d.levelOfCare}.\n\n${rationale}`:rationale;
}

function buildClinicalFormulation(data){
 const p=data.presenting;
 const domains=selectedSymptomDomains(data);
 const details=patientSpecificDetails(data);
 const predisposing=[];
 if(data.psychiatricHistory.diagnoses.length)predisposing.push(`prior behavioral-health diagnoses including ${listText(data.psychiatricHistory.diagnoses.map(v=>v.toLowerCase()))}`);
 if(data.familyHistory.conditions.length)predisposing.push(`family psychiatric history including ${listText(data.familyHistory.conditions.map(v=>v.toLowerCase()))}`);
 if(data.trauma.experiences.length)predisposing.push(`a history of ${listText(data.trauma.experiences.map(v=>v.toLowerCase()))}`);
 if(data.medical.conditions.length)predisposing.push(`medical factors including ${listText(data.medical.conditions.map(v=>v.toLowerCase()))}`);

 const presenting=domains.length
  ?`${listText(domains.map(([key])=>clinicalDomainLabel(key)))} with associated impairment in ${p.impairments.length?listText(p.impairments.map(v=>v.toLowerCase())):'daily functioning'}`
  :p.concerns.length?listText(p.concerns.map(v=>v.toLowerCase())):'the current behavioral-health concerns';

 const precipitating=details.length?sentence(details[0]):p.reasonSeekingCare?`The immediate reason for seeking care is ${reasonToClinicalPhrase(p.reasonSeekingCare)}.`:'Specific precipitating factors require further clarification.';

 const perpetuating=[];
 if(domains.some(([key])=>['anxiety','panic','ocd','trauma','painHealth'].includes(key)))perpetuating.push('avoidance, threat monitoring, or safety behaviors');
 if(p.impairments.includes('Sleep / energy'))perpetuating.push('sleep and energy disruption');
 if(p.impairments.includes('Social functioning')||p.impairments.includes('Intimate relationships'))perpetuating.push('interpersonal stress or social withdrawal');
 if(data.social.finances)perpetuating.push(`${data.social.finances.toLowerCase()} financial stress`);
 if(data.social.supports&&/limited|no support|inconsistent/i.test(data.social.supports))perpetuating.push('limited or inconsistent support');

 const protective=[...data.strengths,...data.risk.protectiveFactors].filter(Boolean);
 return `PRESENTING FACTORS\nThe client currently presents with ${presenting}.\n\nPREDISPOSING FACTORS\n${predisposing.length?`Relevant vulnerability factors include ${listText(predisposing)}.`:'Predisposing factors require continued assessment.'}\n\nPRECIPITATING FACTORS\n${precipitating}\n\nPERPETUATING FACTORS\n${perpetuating.length?`Factors that may maintain or intensify the presentation include ${listText(perpetuating)}.`:'Perpetuating factors require continued clarification.'}\n\nPROTECTIVE FACTORS\n${protective.length?`Protective factors and treatment assets include ${listText([...new Set(protective)].map(v=>v.toLowerCase()))}.`:'Protective factors should be further identified with the client.'}`;
}

function buildGoldenThread(data){
 const p=data.presenting,d=data.diagnosis;
 const domains=selectedSymptomDomains(data);
 const findings=domains.length?listText(domains.slice(0,5).map(([key])=>clinicalDomainLabel(key))):p.concerns.length?listText(p.concerns.map(v=>v.toLowerCase())):'assessment findings not yet fully documented';
 const impairment=p.impairments.filter(v=>!['None reported','Not applicable'].includes(v));
 const diagnosis=d.primary||'diagnosis not yet entered';
 const treatment=d.treatmentFocus||generateTreatmentFocus(data);
 const measure=data.measures.filter(m=>m.name&&m.score).map(m=>`${m.name} (${m.score})`);
 return `ASSESSMENT FINDINGS\n${findings}.\n\nDIAGNOSIS / CLINICAL IMPRESSION\n${diagnosis}.\n\nFUNCTIONAL IMPAIRMENT\n${impairment.length?listText(impairment.map(v=>v.toLowerCase())):'Functional impairment requires further clarification'}.\n\nINITIAL TREATMENT LINKAGE\n${sentence(treatment)}\n\nOUTCOME TRACKING\n${measure.length?`Baseline measures include ${listText(measure)}.`:'Select baseline measures and planned reassessment intervals to complete the outcome-tracking link.'}`;
}

function buildTreatmentFocus(data){
 return sentence(data.diagnosis.treatmentFocus)||generateTreatmentFocus(data);
}
