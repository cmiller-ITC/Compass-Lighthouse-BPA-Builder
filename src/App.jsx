
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { initialCaseData, reducer, symptomDomainDefinitions } from "./caseState";
import "./styles.css";

const NAV=[['home','🏠','Home'],['presenting','📝','Presenting'],['symptoms','🧩','Symptom Domains'],['history','📚','History'],['medical','🩺','Medical / Substance'],['social','🌿','Trauma / Social / Strengths'],['mse','🧠','MSE / Risk'],['diagnosis','🔎','Measures / Diagnosis'],['documentation','📄','Documentation']];
const concernOptions=[
'None reported / no current behavioral-health concern',
'Depression / low mood','Anxiety','Panic symptoms','Bipolar / mood instability',
'Trauma-related concerns','OCD symptoms','ADHD / executive functioning',
'Psychosis / perceptual concerns','Eating / body-image concerns','Substance-use concerns',
'Grief / loss','Adjustment / life transition','Relationship stress',
'Work / school stress','Burnout','Chronic pain / health stress','Self-esteem / identity concerns'
];
const impairmentOptions=[
'None reported','Not applicable',
'Self-care / ADLs','Daily routines','Sleep / energy','Decision-making','Physical health',
'Occupational functioning','Academic functioning','Financial functioning','Housing stability',
'Family relationships','Intimate relationships','Social functioning','Parenting / caregiving'
];
const psychDx=['None reported','Unknown / records unavailable','Major depressive disorder','Generalized anxiety disorder','Panic disorder','Bipolar disorder','ADHD','OCD','PTSD','Psychotic disorder','Eating disorder','Substance-use disorder','Personality disorder','Adjustment disorder','Other / unspecified'];
const services=['None reported','Unknown / records unavailable','Outpatient therapy','Medication management','Psychiatric hospitalization','Partial hospitalization','Intensive outpatient','Crisis stabilization','Emergency behavioral-health evaluation','Substance-use treatment','Residential treatment'];
const familyConditions=['None reported','Unknown / family history unavailable','Depression','Anxiety','Bipolar disorder','ADHD / executive functioning','Trauma / adverse experiences','Substance-use disorder','Psychosis','Suicide attempt / death by suicide','Psychiatric hospitalization','Medical illness impacting mental health'];
const medicalConditions=['None reported','Unknown / not yet assessed','Chronic pain','Fibromyalgia','Thyroid condition','Diabetes','Cardiovascular condition','Neurological condition','Sleep disorder','Autoimmune condition','PCOS / hormonal condition','Traumatic brain injury','Seizure disorder','Other chronic illness'];
const traumaExperiences=['Childhood abuse or neglect','Domestic / intimate-partner violence','Sexual violence','Community violence','Medical trauma','Accident / injury','Traumatic loss','Discrimination / identity-based harm','Military trauma','Other adverse experience','Trauma history deferred','No trauma disclosed'];
const traumaSymptoms=['None reported','Not applicable / no current trauma symptoms','Intrusive memories','Nightmares','Flashbacks','Avoidance','Hypervigilance','Exaggerated startle','Emotional numbing / detachment','Negative beliefs / self-blame','Irritability / anger','Sleep disturbance','Dissociation'];
const needs=['None reported','Not applicable','Food insecurity','Housing instability','Transportation barriers','Financial strain','Legal support','Employment support','Educational support','Caregiving support','Medical care coordination','Childcare needs','Safety concerns'];
const strengths=['None identified yet','Insight','Motivation for change','Treatment engagement','Future orientation','Coping skills','Help-seeking behavior','Family support','Peer support','Spirituality / values','Employment / education goals','Creativity','Resilience','Problem-solving ability','Sense of humor','Community connection'];
const riskProtective=['None identified','Future orientation','Reasons for living','Family support','Responsibility to children / dependents','Treatment engagement','Spiritual beliefs','Restricted access to lethal means','Willingness to use safety plan','Employment / education goals','Pets / caregiving responsibilities'];

function App(){
 const [data,dispatch]=useReducer(reducer,initialCaseData);const [module,setModule]=useState('home');const [status,setStatus]=useState('');
 const set=(path,value)=>dispatch({type:'SET',path,value});const toggle=(path,value)=>dispatch({type:'TOGGLE',path,value});const flash=t=>{setStatus(t);setTimeout(()=>setStatus(''),2200)};
 const outputText=useMemo(()=>Object.entries(data.generated).filter(([,v])=>v).map(([k,v])=>`${titleCase(k)}\n${v}`).join('\n\n────────────────────────────────────────\n\n'),[data.generated]);
 const generate=()=>{dispatch({type:'GENERATE'});setModule('documentation');flash('✓ Assessment narratives generated.')};
 const clear=()=>{dispatch({type:'RESET'});setModule('home');flash('✓ Compass cleared.')};
 const copy=async(text=outputText)=>{if(!text)return flash('Generate the assessment first.');try{await navigator.clipboard.writeText(text)}catch{const e=document.createElement('textarea');e.value=text;document.body.appendChild(e);e.select();document.execCommand('copy');e.remove()}flash('✓ Copied.')};
 const print=()=>{if(!outputText)return flash('Generate the assessment first.');const w=window.open('','_blank','width=920,height=700');if(!w)return flash('Please allow pop-ups to print.');const safe=outputText.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');w.document.write(`<!doctype html><html><head><title>Lighthouse Compass Assessment</title><style>@page{size:letter;margin:.65in}body{font-family:Arial;color:#111}pre{white-space:pre-wrap;font-family:Arial;line-height:1.5}</style></head><body><h1>Lighthouse Compass Assessment</h1><pre>${safe}</pre></body></html>`);w.document.close();setTimeout(()=>w.print(),250)};
 const content={home:<Home data={data} setModule={setModule}/>,presenting:<Presenting data={data} set={set} toggle={toggle}/>,symptoms:<SymptomDomains data={data} set={set} toggle={toggle} dispatch={dispatch}/>,history:<History data={data} set={set} toggle={toggle}/>,medical:<Medical data={data} set={set} toggle={toggle} dispatch={dispatch}/>,social:<Social data={data} set={set} toggle={toggle}/>,mse:<MseRisk data={data} set={set} toggle={toggle}/>,diagnosis:<Diagnosis data={data} set={set} dispatch={dispatch}/>,documentation:<Documentation data={data} outputs={data.generated} copy={copy} dispatch={dispatch}/>}[module];
 return <div className="app"><aside><div className="brand">🧭 Lighthouse Compass</div><div className="version">7.4.3 Multi-Select Runtime Hotfix</div><nav>{NAV.map(([id,icon,label])=><button key={id} className={module===id?'active':''} onClick={()=>setModule(id)}>{icon} {label}</button>)}</nav><div className="no-phi">No PHI storage<br/>Clinician-guided decision support</div></aside><main><header><div><small>Lighthouse Clinical Suite</small><strong>{NAV.find(x=>x[0]===module)?.[2]}</strong></div><div className="actions"><button onClick={generate}>✨ Generate</button><button className="light" onClick={()=>copy()}>📄 Copy</button><button className="light" onClick={print}>🖨 Print</button><button className="light" onClick={clear}>↺ Clear</button></div></header>{status&&<div className="status">{status}</div>}{content}</main></div>;
}

function Home({data,setModule}){
 const journey=buildAssessmentJourney(data,'home');
 const p=data.presenting;
 const active=Object.values(p.domains).filter(d=>d.symptoms.length||d.notes||d.context).length;
 return <Page>
  <section className="lighthouse-hero">
   <LighthouseScene progress={journey.overallProgress}/>
   <div className="lighthouse-hero-copy">
    <div className="eyebrow">Lighthouse Compass 7.4.3</div>
    <h1>Helping clinicians illuminate the path forward.</h1>
    <p>A calm, guided clinical workspace that carries one client story from first concern through formulation, diagnosis, and treatment direction.</p>
    <div className="hero-actions">
     <button onClick={()=>setModule(journey.completedCount===0?'presenting':(journey.nextStep?.id||'documentation'))}>🧭 {journey.completedCount?'Continue Assessment':'Begin Assessment'}</button>
     <span>{journey.overallProgress}% of the assessment journey established</span>
    </div>
   </div>
  </section>
  <section className="journey-overview-card">
   <div className="journey-overview-head">
    <div><div className="section-kicker">Assessment Journey</div><h2>Build understanding one meaningful step at a time.</h2></div>
    <div className="journey-overall-score">{journey.overallProgress}%</div>
   </div>
   <div className="journey-line">{journey.steps.map((step,index)=><button key={step.id} className={`journey-stop ${step.status}`} onClick={()=>setModule(step.id)}>
    <span className="journey-dot">{step.status==='complete'?'✓':index+1}</span>
    <strong>{step.shortLabel}</strong>
    <small>{step.status==='complete'?'Complete':step.status==='current'?'Next up':'Upcoming'}</small>
   </button>)}</div>
  </section>
  <div className="stats"><Stat label="Concerns" value={meaningful(p.concerns).length}/><Stat label="Active symptom domains" value={active}/><Stat label="Impairments" value={meaningful(p.impairments).length}/><Stat label="Generated sections" value={Object.keys(data.generated).length}/></div>
  <div className="home-grid">{NAV.slice(1,9).map(([id,icon,label])=><article className="card module-card" key={id}><div className="module-card-icon">{icon}</div><h3>{label}</h3><p>{journey.steps.find(step=>step.id===id)?.why||'Continue the client’s clinical story.'}</p><button onClick={()=>setModule(id)}>Open</button></article>)}</div>
 </Page>
}

function LighthouseScene({progress=0}){
 const beamOpacity=progress>=85?.92:progress>=55?.62:.3;
 return <div className="lighthouse-scene coastal-photo-scene" aria-hidden="true">
  <svg viewBox="0 0 1000 600" role="img">
   <defs>
    <linearGradient id="photoSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2f3151"/><stop offset="35%" stopColor="#736287"/><stop offset="68%" stopColor="#d99b8f"/><stop offset="100%" stopColor="#f4cf9b"/></linearGradient>
    <linearGradient id="photoSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#617f8d"/><stop offset="55%" stopColor="#31596c"/><stop offset="100%" stopColor="#173847"/></linearGradient>
    <linearGradient id="cliffLight" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6a655f"/><stop offset="100%" stopColor="#1d2b31"/></linearGradient>
    <linearGradient id="towerShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#cfc6ba"/><stop offset="45%" stopColor="#fff8ec"/><stop offset="100%" stopColor="#b7ada2"/></linearGradient>
    <linearGradient id="photoBeam" x1="0" y1=".5" x2="1" y2=".5"><stop offset="0%" stopColor="#fff8ca" stopOpacity=".95"/><stop offset="55%" stopColor="#fff0b0" stopOpacity=".35"/><stop offset="100%" stopColor="#fff0b0" stopOpacity="0"/></linearGradient>
    <filter id="mist"><feGaussianBlur stdDeviation="15"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="9"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .08"/></feComponentTransfer></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="10"/></filter>
   </defs>
   <rect width="1000" height="355" fill="url(#photoSky)"/>
   <ellipse cx="735" cy="185" rx="170" ry="74" fill="#f4bd91" opacity=".18" filter="url(#mist)"/>
   <circle cx="755" cy="178" r="48" fill="#ffd6a0" opacity=".78"/>
   <circle cx="755" cy="178" r="92" fill="#ffd7a2" opacity=".16" filter="url(#glow)"/>
   <path d="M0 335 C155 315 280 352 420 329 C600 299 755 350 1000 312 L1000 600 L0 600Z" fill="url(#photoSea)"/>
   <g fill="none" strokeLinecap="round">
    <path d="M-10 392 C145 360 278 410 445 376 C640 337 790 410 1010 361" stroke="#dcebed" strokeOpacity=".25" strokeWidth="7"/>
    <path d="M-20 455 C170 420 315 478 510 433 C705 389 842 467 1020 423" stroke="#f1d7bb" strokeOpacity=".16" strokeWidth="5"/>
    <path d="M60 515 C205 484 360 530 525 502 C704 470 822 522 980 489" stroke="#d8ecec" strokeOpacity=".12" strokeWidth="4"/>
   </g>
   <path d="M0 600 L0 486 C86 442 168 419 242 432 C325 447 368 502 452 528 C500 543 548 558 615 600Z" fill="url(#cliffLight)"/>
   <path d="M0 600 L0 535 C85 493 165 481 252 505 C319 524 380 571 438 600Z" fill="#26363b"/>
   <g transform="translate(238 190)">
    <path d="M55 300 L83 70 L151 70 L181 300Z" fill="url(#towerShade)"/>
    <path d="M84 70 L98 300" stroke="#8b8179" strokeOpacity=".45" strokeWidth="3"/>
    <path d="M152 70 L136 300" stroke="#746e69" strokeOpacity=".35" strokeWidth="3"/>
    <rect x="73" y="47" width="88" height="31" rx="5" fill="#202d35"/>
    <rect x="91" y="13" width="52" height="41" rx="4" fill="#f6c66f"/>
    <rect x="96" y="18" width="42" height="30" rx="3" fill="#fff1a9" opacity=".92"/>
    <path d="M84 13 L117 -8 L151 13Z" fill="#26343b"/>
    <rect x="104" y="104" width="22" height="34" rx="10" fill="#4a4656"/>
    <rect x="103" y="170" width="23" height="34" rx="10" fill="#4b4655"/>
    <rect x="101" y="244" width="28" height="56" rx="12" fill="#403947"/>
    <path d="M44 300 H194 L213 324 H23Z" fill="#17262c"/>
    <path d="M159 30 L790 -22 L790 118 L159 52Z" fill="url(#photoBeam)" opacity={beamOpacity}/>
    <circle cx="117" cy="34" r="23" fill="#fff6bd" opacity={Math.min(.98,beamOpacity+.08)} filter="url(#glow)"/>
   </g>
   <g opacity=".28" filter="url(#mist)"><ellipse cx="260" cy="360" rx="240" ry="38" fill="#f1edf0"/><ellipse cx="710" cy="344" rx="300" ry="42" fill="#e8eef0"/></g>
   <rect width="1000" height="600" filter="url(#grain)" opacity=".55"/>
  </svg>
  <div className="scene-caption"><span>Compass · Dawn</span><strong>{progress>=85?'The path is illuminated':progress>=55?'Clarity is taking shape':'Understanding begins here'}</strong></div>
 </div>
}

const reasonSeekingCareGroups=[
 {label:'Change in Symptoms or Functioning',icon:'↗',options:[
  'Symptoms have recently worsened','New symptoms have developed','Symptoms are interfering with daily functioning',
  'Difficulty coping independently','Symptoms are no longer manageable','Returning to treatment after a break'
 ]},
 {label:'Life Event or Current Stressor',icon:'◌',options:[
  'Major life transition or adjustment','Relationship conflict or separation','Grief, loss, or bereavement',
  'Work or school stress','Job loss or employment instability','Financial stress','Caregiver or parenting stress',
  'Medical diagnosis, chronic illness, or pain','Pregnancy, postpartum, or reproductive transition',
  'Housing instability or relocation','Legal or court-related stress'
 ]},
 {label:'Clarification, Referral, or Continued Care',icon:'◇',options:[
  'Diagnostic clarification','Medication-related evaluation or coordination','Referral from another provider',
  'School, employer, or EAP referral','Court or probation referral','Family encouragement or concern',
  'Step-down or aftercare following higher level of care'
 ]},
 {label:'Growth, Recovery, or Prevention',icon:'✦',options:[
  'Desire for healthier coping skills','Desire to better understand symptoms or patterns',
  'Trauma recovery or processing past experiences','Improve emotional regulation','Improve relationships or communication',
  'Personal growth or relapse prevention'
 ]}
];

const clientRequestGroups=[
 {label:'Symptom Relief & Stabilization',icon:'☀',options:[
  'Reduce anxiety or excessive worry','Improve mood and motivation','Reduce panic symptoms',
  'Reduce obsessive thoughts and compulsive behaviors','Improve emotional regulation','Improve sleep',
  'Manage trauma-related symptoms','Manage chronic pain or health-related distress','Reduce substance-related concerns'
 ]},
 {label:'Coping, Insight & Daily Functioning',icon:'🧭',options:[
  'Develop healthier coping skills','Better understand emotions, symptoms, or patterns','Increase distress tolerance',
  'Improve concentration and executive functioning','Improve work or school functioning',
  'Increase confidence and self-esteem','Improve daily routines and self-care','Improve overall quality of life'
 ]},
 {label:'Relationships, Boundaries & Communication',icon:'∞',options:[
  'Improve communication','Build healthier boundaries','Improve intimate or family relationships',
  'Reduce people pleasing or fear of conflict','Strengthen social support','Navigate separation, divorce, or relationship change'
 ]},
 {label:'Healing, Growth & Treatment Direction',icon:'✦',options:[
  'Process trauma or painful experiences','Heal from grief or loss','Clarify diagnosis and treatment needs',
  'Begin or resume individual therapy','Explore medication evaluation or coordination',
  'Determine whether a higher level of care is needed','Create a treatment plan with clear goals'
 ]}
];

function ClinicalChoiceGroups({label,helper,values,onToggle,groups,priorityLabel}){
 const selected=Array.isArray(values)?values:[];
 const count=selected.length;
 return <section className="clinical-choice-field">
  <div className="choice-heading">
   <div><span>{label}</span><small>{helper}</small></div>
   <div className="choice-count">{count} selected</div>
  </div>
  <div className="choice-guidance">
   <strong>Main themes</strong>
   <span>Select every umbrella area that applies, then choose the specific items underneath.</span>
  </div>
  <div className="choice-group-stack">{groups.map((group,index)=>{
   const groupCount=group.options.filter(option=>selected.includes(option)).length;
   return <details className={`choice-group theme-${index%4}`} key={group.label} open>
    <summary>
     <span className="choice-group-icon">{group.icon}</span>
     <span className="choice-group-title"><strong>{group.label}</strong><small>Main theme · select all that apply</small></span>
     <span className="choice-group-count">{groupCount?`${groupCount} selected`:'Open'}</span>
    </summary>
    <div className="choice-options">{group.options.map(option=>{
     const isSelected=selected.includes(option);
     return <button type="button" key={option} className={`choice-option ${isSelected?'selected':''}`} onClick={()=>onToggle(option)}>
      <span className="choice-radio">{isSelected?'✓':''}</span><span>{option}</span>
     </button>
    })}</div>
   </details>
  })}</div>
  <div className="priority-reminder"><span>⭐</span><div><strong>{priorityLabel}</strong><p>After selecting all relevant items, ask the client which one or two are having the greatest impact right now.</p></div></div>
 </section>
}

function Presenting({data,set,toggle}){const p=data.presenting;
 const reasonSelections=Array.isArray(p.reasonSeekingCare)?p.reasonSeekingCare:(p.reasonSeekingCare?[p.reasonSeekingCare]:[]);
 const requestSelections=Array.isArray(p.clientRequest)?p.clientRequest:(p.clientRequest?[p.clientRequest]:[]);
 return <Page><div className="workspace-grid"><div>
 <Card title="What Brought the Client In Today?">
  <div className="section-kicker">Identify the major themes contributing to the decision to seek care now</div>
  <div className="presenting-intro-grid">
   <div className="presenting-guide-card"><span>1</span><div><strong>Select the themes</strong><p>More than one reason may be contributing to the client’s decision to seek care.</p></div></div>
   <div className="presenting-guide-card"><span>2</span><div><strong>Clarify what matters most</strong><p>Ask which one or two concerns feel most urgent, disruptive, or important today.</p></div></div>
  </div>
  <div className="presenting-choice-grid">
   <ClinicalChoiceGroups
    label="Why Now?"
    helper="What changed, intensified, or became difficult enough that the client sought help?"
    values={reasonSelections}
    onToggle={v=>toggle('presenting.reasonSeekingCare',v)}
    groups={reasonSeekingCareGroups}
    priorityLabel="Primary reasons for seeking care"
   />
   <ClinicalChoiceGroups
    label="What Would the Client Like to Be Different?"
    helper="Which broad outcomes does the client hope treatment will support?"
    values={requestSelections}
    onToggle={v=>toggle('presenting.clientRequest',v)}
    groups={clientRequestGroups}
    priorityLabel="Most important treatment outcomes"
   />
  </div>
  <TextArea label="Client’s Own Words / Patient-Specific Presenting Narrative" value={p.patientNarrative} onChange={v=>set('presenting.patientNarrative',v)}/>
  <div className="presenting-prompt-strip"><span>💬</span><div><strong>Suggested language</strong><p>“Several things may be contributing to your decision to seek help. Which of these are affecting you right now?” Then ask, “Of everything you selected, which one or two would make the biggest difference if they improved?”</p></div></div>
 </Card>
 <Card title="Primary Areas of Concern"><Checks options={concernOptions} selected={p.concerns} onToggle={v=>toggle('presenting.concerns',v)}/></Card>
 <Card title="Overall Clinical Qualifiers"><Grid columns={4}><Select label="Duration" value={p.duration} onChange={v=>set('presenting.duration',v)} options={['Less than 1 month','1–6 months','More than 6 months','More than 1 year','Chronic / longstanding']}/><Select label="Frequency" value={p.frequency} onChange={v=>set('presenting.frequency',v)} options={['Occasional','Weekly','Most days','Daily','Nearly constant']}/><Select label="Severity" value={p.severity} onChange={v=>set('presenting.severity',v)} options={['Mild','Moderate','Moderately severe','Severe']}/><Select label="Course" value={p.course} onChange={v=>set('presenting.course',v)} options={['Improving','Stable','Fluctuating','Worsening']}/></Grid></Card>
 <Card title="Functional Impairment"><div className="section-kicker">Connect symptoms to daily life and medical necessity</div><Checks options={impairmentOptions} selected={p.impairments} onToggle={v=>toggle('presenting.impairments',v)}/></Card>
 </div><ClinicalSidePanel data={data} section="presenting"/></div></Page>}

const symptomGroupLibrary={
mood:[['Mood & Self-Perception',['Depressed mood','Hopelessness','Worthlessness / excessive guilt']],['Interest & Motivation',['Loss of interest / pleasure','Social withdrawal']],['Energy & Cognition',['Fatigue / low energy','Difficulty concentrating']],['Biological / Behavioral',['Sleep disturbance','Appetite / weight changes','Psychomotor agitation / slowing']],['Safety',['Suicidal ideation']]],
anxiety:[['Core Worry',['Excessive worry','Difficulty controlling worry','Worry across multiple domains']],['Cognitive / Emotional',['Feeling keyed up / on edge','Irritability','Difficulty concentrating due to anxiety']],['Physical',['Restlessness','Fatigue','Muscle tension','Sleep disturbance due to anxiety']],['Behavioral Responses',['Reassurance seeking','Avoidance']]],
panic:[['Panic Experience',['Abrupt surge of fear','Fear of losing control','Fear of dying']],['Cardiorespiratory',['Heart pounding / rapid heart rate','Shortness of breath','Chest discomfort']],['Autonomic / Physical',['Sweating','Trembling / shaking','Nausea / abdominal distress','Dizziness / lightheadedness','Chills / heat sensations','Numbness / tingling']],['Dissociative / Behavioral',['Derealization / depersonalization','Avoidance due to panic']]],
bipolar:[['Mood & Energy Change',['Elevated / expansive mood','Persistently irritable mood','Increased energy / activity','Marked change from baseline']],['Sleep / Speech / Thought',['Decreased need for sleep','Pressured speech','Racing thoughts / flight of ideas','Distractibility']],['Behavior & Functioning',['Grandiosity','Increased goal-directed activity','Risk-taking / impulsivity','Psychotic symptoms during mood episode']]],
adhd:[['Attention',['Sustained attention difficulty','Careless mistakes','Not listening / losing track','Easily distracted']],['Organization & Follow-Through',['Task follow-through difficulty','Disorganization','Task initiation difficulty','Avoids sustained mental effort']],['Memory & Time',['Loses items','Forgetfulness','Time blindness','Working-memory difficulty']],['Hyperactivity / Impulsivity',['Fidgeting / restlessness','Interrupting / impulsivity','Emotional impulsivity']]],
ocd:[['Obsessions / Themes',['Intrusive unwanted thoughts / images / urges','Contamination concerns','Symmetry / order concerns']],['Compulsions / Rituals',['Checking rituals','Cleaning / washing rituals','Mental rituals','Counting / repeating','Compulsions / rituals']],['Avoidance / Accommodation',['Avoidance related to obsessions','Reassurance seeking','Family accommodation']],['Insight',['Poor insight into OCD symptoms']]],
trauma:[['Intrusion',['Intrusive memories','Nightmares','Flashbacks','Psychological distress at reminders','Physiological reactivity to reminders']],['Avoidance',['Avoidance of trauma memories','Avoidance of external reminders']],['Mood / Beliefs / Connection',['Negative beliefs / self-blame','Persistent negative emotional state','Emotional numbing / detachment']],['Arousal / Reactivity',['Hypervigilance','Exaggerated startle','Irritability / anger','Sleep disturbance related to trauma']],['Dissociation',['Dissociation / depersonalization / derealization']]],
psychosis:[['Perceptual Experiences',['Auditory hallucinations','Visual hallucinations','Other hallucinations']],['Beliefs / Reality Testing',['Delusions','Paranoia / suspiciousness','Ideas of reference','Impaired reality testing']],['Organization / Negative Symptoms',['Disorganized speech','Disorganized behavior','Catatonic features','Negative symptoms']]],
eating:[['Restriction / Avoidance',['Restrictive intake','Avoidance of eating with others','Sensory / aversive food restriction']],['Binge / Loss of Control',['Binge eating','Loss of control eating']],['Compensatory Behaviors',['Self-induced vomiting','Laxative / diuretic misuse','Compensatory exercise']],['Body Image / Medical Impact',['Fear of weight gain','Body-image disturbance','Weight / shape overvaluation','Medical consequences']]],
substance:[['Control / Craving',['Using more than intended','Unsuccessful efforts to cut down','Craving','Time spent obtaining / using / recovering']],['Functional Consequences',['Role impairment','Continued use despite relationship problems','Reduced activities','Hazardous use']],['Physical / Emotional Pattern',['Continued use despite health effects','Tolerance','Withdrawal','Use to cope with emotions / sleep']]],
adjustment:[['Stressor Link',['Emotional distress linked to identifiable stressor','Functional decline after life transition','Symptoms exceed expected response']],['Emotional Response',['Anxiety after stressor','Depressed mood after stressor','Mixed anxiety and depressed mood','Grief-related distress']],['Behavioral / Acute Response',['Conduct disturbance','Acute stress response']]],
painHealth:[['Pain / Health Experience',['Chronic pain','Health anxiety','Fear of bodily sensations','Medical trauma']],['Fear / Avoidance Cycle',['Activity avoidance','Pain catastrophizing','Frequent reassurance seeking']],['Functional / Emotional Impact',['Functional limitations','Sleep disruption due to symptoms','Mood changes related to health','Identity loss related to illness']]]
};
function GroupedSymptomChecks({domainKey,options,selected,onToggle}){
 const configured=symptomGroupLibrary[domainKey]||[['Symptoms / Features',options]];
 const used=new Set(configured.flatMap(([,items])=>items));
 const remainder=options.filter(item=>!used.has(item));
 const groups=remainder.length?[...configured,['Other Relevant Features',remainder]]:configured;
 return <div className="symptom-group-grid">{groups.map(([label,items])=><section className={`symptom-group tone-${Math.abs(label.length)%5}`} key={label}><h4>{label}</h4><Checks options={items} selected={selected} onToggle={onToggle}/></section>)}</div>;
}
function SymptomDomains({data,set,toggle,dispatch}){const readiness=getPresentingReadiness(data);return <Page><div className="workspace-grid"><div><Card title="Collapsible Symptom Domains"><div className="info">Open only the categories relevant to the client. Each domain combines symptoms, qualifiers, DSM-oriented clarifiers, functional impact, and patient-specific examples.</div><div className="accordion-stack">{Object.entries(symptomDomainDefinitions).map(([key,def])=>{const d=data.presenting.domains[key];const count=d.symptoms.length;const complete=count>0&&d.duration&&d.frequency&&d.severity&&d.impairment.length>0;return <details className="accordion" key={key}><summary><span className="summary-title">{def.icon} {def.label}</span><span className={`badge ${complete?'complete':count?'has-data':''}`}>{complete?'Domain established':count?`${count} selected`:'Not assessed'}</span></summary><div className="accordion-body"><h3>Symptoms / Features</h3><GroupedSymptomChecks domainKey={key} options={def.symptoms} selected={d.symptoms} onToggle={v=>toggle(`presenting.domains.${key}.symptoms`,v)}/><h3>Domain Qualifiers</h3><Grid columns={3}><Select label="Duration" value={d.duration} onChange={v=>set(`presenting.domains.${key}.duration`,v)} options={['Less than 2 weeks','2 weeks–1 month','1–6 months','6–12 months','More than 1 year','Chronic / longstanding','Episodic','Unclear']}/><Select label="Frequency" value={d.frequency} onChange={v=>set(`presenting.domains.${key}.frequency`,v)} options={['Occasional','Weekly','Several days per week','Most days','Daily','Nearly constant','Episodic','Unclear']}/><Select label="Severity" value={d.severity} onChange={v=>set(`presenting.domains.${key}.severity`,v)} options={['Mild','Moderate','Moderately severe','Severe','Variable','Unclear']}/></Grid><h3>Diagnostic Clarifiers</h3><Grid columns={2}>{def.questions.map(([qid,label,options])=><Select key={qid} label={label} value={d.answers[qid]||''} onChange={v=>dispatch({type:'SET_DOMAIN_ANSWER',domain:key,question:qid,value:v})} options={options}/>)}</Grid><h3>Domain-Specific Functional Impact</h3><Checks options={impairmentOptions} selected={d.impairment} onToggle={v=>toggle(`presenting.domains.${key}.impairment`,v)}/><Grid columns={2}><TextArea label="Context / Triggers / Pattern" value={d.context} onChange={v=>set(`presenting.domains.${key}.context`,v)}/><TextArea label="Patient-Specific Details / Examples" value={d.notes} onChange={v=>set(`presenting.domains.${key}.notes`,v)}/></Grid><DomainCoach domainKey={key} domain={d}/></div></details>})}</div></Card></div><ClinicalSidePanel data={data} section="symptoms"/></div></Page>}

function ClinicalSidePanel({data,section='presenting'}){
 const [activeTab,setActiveTab]=useState('narrative');
 const [collapsed,setCollapsed]=useState(false);
 const [focusMode,setFocusMode]=useState(false);
 const scrollRef=useRef(null);
 const intelligence=buildSectionIntelligence(data,section);
 const masterStory=buildMasterClinicalStory(data);
 const journey=buildAssessmentJourney(data,section);
 const finalReview=buildFinalComarReview(data);
 const headerScore=activeTab==='journey'?journey.overallProgress:activeTab==='final'?finalReview.score:intelligence.quality.score;
 const tabs=[
  ['narrative','📝','Story'],
  ['coach','💡','Coach'],
  ['journey','🧭','Journey'],
  ['quality','⭐','Quality'],
  ['final','📋','Final']
 ];
 useEffect(()=>{
  scrollRef.current?.scrollTo({top:0,behavior:'smooth'});
 },[activeTab,section]);
 const chooseTab=id=>{setActiveTab(id);if(collapsed)setCollapsed(false)};
 return <>
  {focusMode&&<button type="button" className="panel-backdrop" aria-label="Close focus view" onClick={()=>setFocusMode(false)}/>}
  <aside className={`clinical-side-panel ${collapsed?'collapsed':''} ${focusMode?'focus-mode':''}`} aria-label="Lighthouse Intelligence">
   {collapsed
    ?<button type="button" className="panel-reopen" onClick={()=>setCollapsed(false)} aria-label="Open Lighthouse Intelligence">
      <span>💡</span><strong>Open Intelligence</strong>
     </button>
    :<section className="intelligence-shell">
      <div className="intelligence-header">
       <div className="intelligence-title">
        <div className="side-label">Lighthouse Intelligence</div>
        <h3>{activeTab==='journey'?'Assessment Journey':activeTab==='final'?'Final COMAR Review':intelligence.title}</h3>
       </div>
       <div className="intelligence-header-actions">
        <div className={`mini-score ${headerScore>=85?'good':headerScore>=55?'warn':'needs'}`}>{headerScore}%</div>
        <button type="button" className="panel-icon-button" onClick={()=>setFocusMode(!focusMode)} title={focusMode?'Return to workspace':'Open focus view'} aria-label={focusMode?'Return to workspace':'Open focus view'}>{focusMode?'↙':'⛶'}</button>
        <button type="button" className="panel-icon-button" onClick={()=>setCollapsed(true)} title="Hide panel" aria-label="Hide panel">−</button>
       </div>
      </div>
      <div className="intelligence-tabs five-tabs" role="tablist">
       {tabs.map(([id,icon,label])=><button key={id} type="button" className={activeTab===id?'active':''} onClick={()=>chooseTab(id)} role="tab" aria-selected={activeTab===id}><span>{icon}</span><em>{label}</em></button>)}
      </div>
      <div className="intelligence-tab-content" ref={scrollRef}>
       {activeTab==='narrative'&&<SectionNarrative intelligence={intelligence} masterStory={masterStory}/>}
       {activeTab==='coach'&&<SectionCoach intelligence={intelligence}/>}
       {activeTab==='journey'&&<AssessmentJourney journey={journey}/>}
       {activeTab==='quality'&&<SectionQuality intelligence={intelligence}/>}
       {activeTab==='final'&&<FinalComarReview review={finalReview} section={section}/>}
      </div>
      <div className="panel-footer">
       <span>Scroll inside this panel independently</span>
       <button type="button" className="panel-top-button" onClick={()=>scrollRef.current?.scrollTo({top:0,behavior:'smooth'})}>↑ Top</button>
      </div>
     </section>}
  </aside>
 </>;
}

function SectionNarrative({intelligence,masterStory}){
 const hasMaster=masterStory.some(item=>item.text||item.domains?.length);
 return hasMaster?<div className="document-preview">
  <div className="master-story-label">Current Clinical Story</div>
  {masterStory.map(item=><NarrativeStorySection key={item.title} item={item}/>)}
  {intelligence.narratives.some(item=>item.text)&&<details className="section-contribution"><summary><span>Section contribution</span><small>Show the evidence gathered on this page</small></summary><div>{intelligence.narratives.map(item=><PreviewSection key={`section-${item.title}`} title={item.title} text={item.text}/>)}</div></details>}
 </div>:<div className="empty-intelligence"><strong>Your clinical story will appear here.</strong><span>As the interview develops, Lighthouse will organize the client’s information into a concise, chart-ready story.</span></div>;
}
function NarrativeStorySection({item}){
 if(item.domains?.length)return <section className="preview-section symptom-story-section"><h4>{item.title}</h4><div className="domain-story-stack">{item.domains.map(domain=><article className="domain-story-card" key={domain.title}><h5>{domain.icon} {domain.title}</h5>{domain.paragraphs.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article>)}</div></section>;
 return <PreviewSection title={item.title} text={item.text}/>;
}
function PreviewSection({title,text}){if(!text)return null;return <section className="preview-section"><h4>{title}</h4><p>{text}</p></section>}

function SectionCoach({intelligence}){
 return <div className="coach-library">
  {intelligence.strengths.map((item,i)=><div className="coach-strength" key={`strength-${i}`}><strong>✓ What is working</strong><span>{item}</span></div>)}
  <GuidanceBlock icon="💬" title="Suggested Questions" items={intelligence.questions}/>
  <GuidanceBlock icon="🗣️" title="Clinician Scripting" items={intelligence.scripts}/>
  <GuidanceBlock icon="💡" title="Clinical Pearl" items={intelligence.pearls}/>
  <GuidanceBlock icon="📝" title="Documentation Tip" items={intelligence.documentationTips}/>
  {intelligence.prompts.map((item,i)=><div className={`coach-item ${item.priority||'standard'}`} key={`prompt-${i}`}><strong>{item.priority==='high'?'Important to explore':'Clinical Coach'}</strong><span>{item.text}</span></div>)}
 </div>
}
function GuidanceBlock({icon,title,items}){if(!items?.length)return null;return <details className="guidance-block" open><summary>{icon} {title}</summary><div>{items.map((item,i)=><p key={i}>{item}</p>)}</div></details>}

function AssessmentJourney({journey}){
 return <div className="assessment-journey">
  <div className="journey-hero-mini">
   <div className="side-label">Overall journey</div>
   <div className="journey-score-row"><strong>{journey.overallProgress}%</strong><span>{journey.completedCount} of {journey.steps.length} steps established</span></div>
   <div className="progress-track journey-track"><span style={{width:`${journey.overallProgress}%`}}/></div>
  </div>
  {journey.currentStep&&<section className="current-stop-card">
   <div className="journey-status-label">{journey.currentStep.status==='complete'?'Current step established':'You are here'}</div>
   <h4>{journey.currentStep.icon} {journey.currentStep.label}</h4>
   <p>{journey.currentStep.why}</p>
   <div className="current-stop-checks">{journey.currentStep.goals.map((goal,i)=><span key={i}>• {goal}</span>)}</div>
  </section>}
  {journey.nextStep&&<section className="next-stop-card">
   <div className="journey-status-label">Next up</div>
   <h4>{journey.nextStep.icon} {journey.nextStep.label}</h4>
   <p>{journey.nextStep.why}</p>
   <small>Nothing is wrong or overdue—this information is collected in the next part of the interview.</small>
  </section>}
  <div className="journey-step-list">{journey.steps.map(step=><div className={`journey-step-row ${step.status}`} key={step.id}>
   <span className="step-status-icon">{step.status==='complete'?'✓':step.status==='current'?'→':'○'}</span>
   <div><strong>{step.label}</strong><small>{step.status==='complete'?'Established':step.status==='current'?'Current focus':'Upcoming'}</small></div>
  </div>)}</div>
 </div>
}

function SectionQuality({intelligence}){
 return <div className="quality-review">
  <div className="score-hero"><div className="side-label">Documentation quality</div><div className="quality-score">{intelligence.quality.score}%</div><div className={`quality-label ${intelligence.quality.score>=85?'good':intelligence.quality.score>=65?'warn':'needs'}`}>{intelligence.quality.label}</div></div>
  <div className="quality-bars">{intelligence.quality.metrics.map(metric=><div className="quality-metric" key={metric.label}><div><span>{metric.label}</span><strong>{metric.score}%</strong></div><div className="metric-track"><span style={{width:`${metric.score}%`}}/></div></div>)}</div>
  <div className="golden-thread-card"><strong>Golden Thread</strong><p>{intelligence.goldenThread}</p></div>
  {intelligence.quality.suggestion&&<div className="quality-suggestion"><strong>Opportunity to strengthen</strong><p>{intelligence.quality.suggestion}</p></div>}
 </div>
}

function FinalComarReview({review,section}){
 const early=!['diagnosis','documentation'].includes(section);
 return <div className="final-review">
  {early&&<div className="final-review-notice"><strong>Final review comes later</strong><p>This tab previews the whole-assessment requirements. Items from future sections are shown as <em>upcoming</em>, not as errors.</p></div>}
  <div className="score-hero compact"><div className="side-label">Whole-assessment readiness</div><div className="readiness-score">{review.score}%</div><div className="progress-track"><span style={{width:`${review.score}%`}}/></div></div>
  <div className="requirements-list">{review.items.map(item=><div className={`requirement-row ${item.status}`} key={item.label}>
   <span className="requirement-icon">{item.status==='met'?'✓':item.status==='upcoming'?'→':'!'}</span>
   <div><strong>{item.label}</strong><small>{item.detail}</small></div>
  </div>)}</div>
  <div className="comar-note">Use this as decision support before signing. It does not replace clinical judgment, supervisory review, organizational policy, or the official record.</div>
 </div>
}

function hasMeaningfulSelection(values=[]){return values.some(value=>!['None reported','Not applicable','None identified','None identified yet','None reported / no current behavioral-health concern','Unknown / records unavailable','Unknown / family history unavailable','Unknown / not yet assessed','Not applicable / no current trauma symptoms'].includes(value))}
function selectionStatus(values=[]){if(values.includes('None reported')||values.includes('None reported / no current behavioral-health concern'))return'None reported';if(values.some(v=>v.startsWith('Unknown')))return'Unknown';if(values.some(v=>v.startsWith('Not applicable')))return'Not applicable';return hasMeaningfulSelection(values)?naturalList(values.filter(v=>!v.startsWith('None')&&!v.startsWith('Not applicable')).map(v=>v.toLowerCase())):''}
function pct(items){return Math.round(items.filter(Boolean).length/Math.max(items.length,1)*100)}
function safeText(value){return String(value||'').trim()}
const JOURNEY_STEPS=[
 {id:'presenting',icon:'📝',label:'Presenting Concerns',shortLabel:'Presenting',why:'Establish why the client is seeking care and how life is being affected.',goals:['Reason for seeking care','Client priorities','Overall course and impairment']},
 {id:'symptoms',icon:'🧩',label:'Symptom Evidence',shortLabel:'Symptoms',why:'Describe the symptom patterns that support clinical understanding and diagnosis.',goals:['Relevant symptom clusters','Duration, frequency, and severity','Patient-specific examples']},
 {id:'history',icon:'📚',label:'Psychiatric & Family History',shortLabel:'History',why:'Identify prior episodes, treatment response, vulnerability, and family context.',goals:['Prior diagnoses and services','Treatment response and risk history','Family psychiatric history']},
 {id:'medical',icon:'🩺',label:'Medical & Substance Context',shortLabel:'Medical',why:'Consider biological contributors, medications, sleep, pain, and substance factors.',goals:['Medical conditions and follow-up','Medication reconciliation','Substance-use screening']},
 {id:'social',icon:'🌿',label:'Trauma, Social Context & Strengths',shortLabel:'Social',why:'Understand the client’s environment, supports, barriers, identity, and resilience.',goals:['Trauma disposition and impact','Housing, work, relationships, and practical needs','Strengths and supports']},
 {id:'mse',icon:'🧠',label:'Mental Status, Risk & Safety',shortLabel:'Risk',why:'Describe current clinical status and match safety planning to assessed risk.',goals:['Mental status examination','Acute and chronic risk','Protective factors and safety response']},
 {id:'diagnosis',icon:'🔎',label:'Measures, Diagnosis & Formulation',shortLabel:'Diagnosis',why:'Integrate evidence into diagnosis, medical necessity, level of care, and treatment direction.',goals:['Baseline measures','Diagnostic rationale and rule-outs','Medical necessity and level of care']},
 {id:'documentation',icon:'📄',label:'Documentation & Final Review',shortLabel:'Review',why:'Confirm the Golden Thread and prepare the clinician-reviewed documentation package.',goals:['Integrated clinical package','Golden Thread consistency','Final COMAR and quality review']}
];

function sectionEstablished(data,id){
 const p=data.presenting;
 const active=Object.values(p.domains).filter(d=>d.symptoms.length||d.context.trim()||d.notes.trim());
 const meaningfulNeeds=data.social.needs.length>0;
 const meaningfulStrengths=data.strengths.length>0;
 const mseCore=[data.mse.appearance,data.mse.behavior,data.mse.orientation,data.mse.speech,data.mse.mood,data.mse.affect,data.mse.thoughtProcess,data.mse.thoughtContent,data.mse.perception,data.mse.insight,data.mse.judgment];
 const checks={
  presenting:Boolean(hasSelections(p.reasonSeekingCare)||p.patientNarrative.trim())&&p.concerns.length>0&&Boolean(p.duration||p.frequency||p.severity||p.course),
  symptoms:active.length>0&&active.some(d=>d.symptoms.length)&&active.some(d=>d.duration||d.frequency||d.severity),
  history:data.psychiatricHistory.diagnoses.length>0&&data.psychiatricHistory.services.length>0&&data.familyHistory.conditions.length>0,
  medical:data.medical.conditions.length>0&&Boolean(data.medical.sleep||data.medical.pain||data.medical.providerFollowUp),
  social:data.trauma.experiences.length>0&&Boolean(data.social.housing||data.social.employment||data.social.supports)&&meaningfulNeeds&&meaningfulStrengths,
  mse:mseCore.filter(Boolean).length>=8&&Boolean(data.risk.suicideScreen||data.risk.ideation)&&Boolean(data.risk.overallRisk),
  diagnosis:Boolean(data.diagnosis.primary)&&Boolean(data.diagnosis.levelOfCare)&&Boolean(data.diagnosis.diagnosticRationale||data.diagnosis.medicalNecessity),
  documentation:Object.keys(data.generated).length>0
 };
 return Boolean(checks[id]);
}
function buildAssessmentJourney(data,currentSection='home'){
 const raw=JOURNEY_STEPS.map(step=>({...step,complete:sectionEstablished(data,step.id)}));
 const firstIncomplete=raw.findIndex(step=>!step.complete);
 const currentIndex=currentSection==='home'?(firstIncomplete===-1?raw.length-1:firstIncomplete):Math.max(0,raw.findIndex(step=>step.id===currentSection));
 const steps=raw.map((step,index)=>({...step,status:step.complete?'complete':index===currentIndex?'current':'upcoming'}));
 const completedCount=raw.filter(step=>step.complete).length;
 const overallProgress=Math.round(completedCount/raw.length*100);
 const currentStep=steps.find(step=>step.id===currentSection)||(steps.find(step=>step.status==='current'));
 const nextStep=steps.find((step,index)=>index>currentIndex&&!step.complete)||(!currentStep?.complete?currentStep:null);
 return {steps,completedCount,overallProgress,currentStep,nextStep};
}
function buildFinalComarReview(data){
 const p=data.presenting;
 const active=Object.values(p.domains).filter(d=>d.symptoms.length||d.context.trim()||d.notes.trim());
 const reached=id=>{
  const order=JOURNEY_STEPS.map(step=>step.id);
  const firstIncomplete=order.findIndex(step=>!sectionEstablished(data,step));
  const index=order.indexOf(id);
  return firstIncomplete===-1||index<=firstIncomplete;
 };
 const specs=[
  ['Presenting problem and reason for care','presenting',Boolean(hasSelections(p.reasonSeekingCare)||p.patientNarrative.trim()),'Clarify why services are being sought now.'],
  ['Symptom evidence and course','symptoms',active.length>0&&Boolean(p.duration||active.some(d=>d.duration)), 'Document the relevant symptom pattern, duration, frequency, severity, and course.'],
  ['Functional impairment','symptoms',meaningful(p.impairments).length>0||active.some(d=>meaningful(d.impairment).length>0),'Connect symptoms to daily functioning.'],
  ['Psychiatric and family history','history',data.psychiatricHistory.diagnoses.length>0&&data.familyHistory.conditions.length>0,'Document findings, none reported, or unavailable history.'],
  ['Medical and substance context','medical',data.medical.conditions.length>0&&Boolean(data.substance.alcohol&&data.substance.cannabis),'Assess relevant biological and substance contributors.'],
  ['Trauma, social context, and strengths','social',data.trauma.experiences.length>0&&data.social.needs.length>0&&data.strengths.length>0,'Identify environmental factors, barriers, supports, and strengths.'],
  ['MSE, risk formulation, and response','mse',Boolean(data.risk.overallRisk)&&Boolean(data.risk.safetyResponse),'Match risk findings to the documented safety response.'],
  ['Diagnosis and clinical rationale','diagnosis',Boolean(data.diagnosis.primary&&data.diagnosis.diagnosticRationale),'Connect diagnosis to symptoms, duration, impairment, and rule-outs.'],
  ['Medical necessity and level of care','diagnosis',Boolean(data.diagnosis.medicalNecessity&&data.diagnosis.levelOfCare&&data.diagnosis.locRationale),'Explain why treatment and the selected level of care are appropriate now.'],
  ['Golden Thread and final package','documentation',Boolean(data.generated.goldenThread&&data.generated.clinicalFormulation),'Confirm that assessment findings connect to diagnosis, impairment, and treatment direction.']
 ];
 const items=specs.map(([label,step,met,missingDetail])=>{
  if(met)return{label,status:'met',detail:'Established in the current assessment.'};
  if(!reached(step))return{label,status:'upcoming',detail:`Collected later during ${JOURNEY_STEPS.find(s=>s.id===step)?.label}.`};
  return{label,status:'missing',detail:missingDetail};
 });
 const score=Math.round(items.filter(item=>item.status==='met').length/items.length*100);
 return {items,score};
}

function buildEvidenceMap(data){
 const activeDomains=Object.entries(data.presenting.domains).filter(([,d])=>d.symptoms.length);
 const measures=data.measures.filter(m=>m.name&&m.score);
 const medical=selectionStatus(data.medical.conditions);
 const family=selectionStatus(data.familyHistory.conditions);
 const trauma=selectionStatus(data.trauma.experiences);
 const needsList=selectionStatus(data.social.needs);
 const strengthsList=selectionStatus(data.strengths);
 return {
  activeDomains,
  symptomEvidence:activeDomains.flatMap(([key,d])=>d.symptoms.map(symptom=>({domain:key,symptom}))),
  course:[data.presenting.duration,data.presenting.frequency,data.presenting.severity,data.presenting.course].filter(Boolean),
  impairments:data.presenting.impairments.filter(v=>!['None reported','Not applicable'].includes(v)),
  presentingContext:[data.presenting.patientNarrative,...activeDomains.flatMap(([,d])=>[d.context,d.notes])].filter(Boolean),
  psychiatricHistory:selectionStatus(data.psychiatricHistory.diagnoses),
  treatmentHistory:selectionStatus(data.psychiatricHistory.services),
  familyHistory:family,
  medicalContributors:medical,
  traumaHistory:trauma,
  socialStressors:[
   data.social.housing&&`housing: ${data.social.housing}`,
   data.social.employment&&`employment: ${data.social.employment}`,
   data.social.finances&&`financial stress: ${data.social.finances}`,
   data.social.relationships&&`relationships: ${data.social.relationships}`,
   needsList&&`practical needs: ${needsList}`
  ].filter(Boolean),
  supports:[data.social.supports,data.familyHistory.supportLevel].filter(Boolean),
  strengths:data.strengths.filter(v=>!v.startsWith('None')),
  riskProtective:data.risk.protectiveFactors.filter(v=>v!=='None identified'),
  risk:data.risk.overallRisk,
  measures,
  diagnosis:data.diagnosis.primary,
  levelOfCare:data.diagnosis.levelOfCare,
  treatmentFocus:data.diagnosis.treatmentFocus
 };
}

function chartSentence(value){
 const text=String(value||'').trim().replace(/\s+/g,' ');
 if(!text)return'';
 return /[.!?]$/.test(text)?text:`${text}.`;
}
function normalizeClinicalFreeText(value,{fragmentLead='The client describes',context=false}={}){
 let text=String(value||'').trim().replace(/\s+/g,' ');
 if(!text)return'';

 text=text
  .replace(/^patient\s+/i,'The client ')
  .replace(/^the patient\s+/i,'The client ')
  .replace(/^client\s+/i,'The client ');

 if(/^the client\s+(endorses|reports|states|describes|notes|experiences|indicates|shares)\b/i.test(text)){
  return chartSentence(text.replace(/^the client\s+endorses\b/i,'The client reports'));
 }
 if(/^(he|she|they)\s+(reports?|states?|describes?|notes?|experiences?|indicates?|shares?)\b/i.test(text)){
  return chartSentence(text.charAt(0).toUpperCase()+text.slice(1));
 }
 if(/^(symptoms?|anxiety|depression|panic|worry|mood|sleep|functioning|trauma|obsessions?|compulsions?)\b/i.test(text)){
  return chartSentence(text.charAt(0).toUpperCase()+text.slice(1));
 }
 if(context){
  if(/^(following|after|since|during|when|in response to|in the context of)\b/i.test(text)){
   return chartSentence(`Symptoms intensified ${text}`);
  }
  return chartSentence(`Relevant context, triggers, or patterns include ${text}`);
 }
 return chartSentence(`${fragmentLead} ${text}`);
}
function uniqueClinicalSentences(values=[]){
 const seen=new Set();
 return values.filter(Boolean).filter(value=>{
  const key=String(value).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  if(!key||seen.has(key))return false;
  seen.add(key);
  return true;
 });
}
function meaningful(values=[]){
 const excluded=['None reported','Not applicable','None identified','None identified yet',
  'None reported / no current behavioral-health concern','Unknown / records unavailable',
  'Unknown / family history unavailable','Unknown / not yet assessed',
  'Not applicable / no current trauma symptoms','No trauma disclosed','Trauma history deferred'];
 return values.filter(v=>!excluded.includes(v));
}
function naturalDisposition(values,{none,unknown,notApplicable,deferred,present}){
 if(values.includes('None reported')||values.includes('None reported / no current behavioral-health concern'))return none||'No concerns were reported.';
 if(values.some(v=>String(v).startsWith('Unknown')))return unknown||'This information is currently unknown or unavailable.';
 if(values.some(v=>String(v).startsWith('Not applicable')))return notApplicable||'This area is not applicable.';
 if(values.includes('Trauma history deferred'))return deferred||'Assessment of this area was deferred.';
 const items=meaningful(values);
 return items.length?present(items):'';
}
function joinSentences(parts){return parts.map(v=>String(v||'').trim()).filter(Boolean).map(chartSentence).join(' ')}
function liveDomainEvidence(data){
 const domains=Object.entries(data.presenting.domains)
  .filter(([,d])=>d.symptoms.length||d.context.trim()||d.notes.trim())
  .map(([key,d])=>({key,label:clinicalDomainLabel(key),symptoms:d.symptoms,context:d.context.trim(),notes:d.notes.trim(),impairment:d.impairment.filter(v=>!['None reported','Not applicable'].includes(v)),duration:d.duration,frequency:d.frequency,severity:d.severity}));
 const traumaSymptoms=(data.trauma?.symptoms||[]).filter(v=>!['None reported','Not applicable / no current trauma symptoms'].includes(v));
 const alreadyHasTrauma=domains.some(domain=>domain.key==='trauma');
 if(!alreadyHasTrauma&&(traumaSymptoms.length||String(data.trauma?.details||'').trim())){
  domains.push({
   key:'trauma',
   label:'Trauma-Related Symptoms',
   symptoms:traumaSymptoms,
   context:'',
   notes:String(data.trauma?.details||'').trim(),
   impairment:[],
   duration:'',
   frequency:'',
   severity:''
  });
 }
 return domains;
}
function buildLiveHPI(data){
 const p=data.presenting,domains=liveDomainEvidence(data),parts=[];
 if(p.patientNarrative.trim())parts.push(chartSentence(p.patientNarrative));
 else if(hasSelections(p.reasonSeekingCare))parts.push(`The client is seeking care in response to ${naturalList(selectionList(p.reasonSeekingCare).map(reasonToClinicalPhrase))}.`);
 const concerns=meaningful(p.concerns),qualifiers=[];
 if(p.duration)qualifiers.push(durationPhrase(p.duration));if(p.frequency)qualifiers.push(frequencyPhrase(p.frequency));if(p.severity)qualifiers.push(`${p.severity.toLowerCase()} in severity`);if(p.course)qualifiers.push(`currently ${p.course.toLowerCase()}`);
 if(concerns.length)parts.push(`Primary concerns include ${naturalList(concerns.map(v=>v.toLowerCase()))}${qualifiers.length?`, with symptoms ${naturalList(qualifiers)}`:''}.`);
 const domainText=domains.map(domain=>{const dp=[];if(domain.symptoms.length)dp.push(`${domain.label} include ${naturalList(domain.symptoms.slice(0,7).map(v=>v.toLowerCase()))}`);if(domain.context)dp.push(`Relevant context, triggers, or patterns include ${domain.context}`);if(domain.notes)dp.push(`The client describes ${domain.notes}`);return dp.length?`${dp.join('. ')}.`:''}).filter(Boolean);
 if(domainText.length)parts.push(domainText.join(' '));
 const impacts=[...new Set([...meaningful(p.impairments),...domains.flatMap(d=>d.impairment)])];
 if(impacts.length)parts.push(`Symptoms are interfering with ${naturalList(impacts.map(v=>v.toLowerCase()))}.`);
 return parts.join('\n\n');
}
function buildDomainNarrative(domain){
 const symptoms=domain.symptoms.map(value=>value.toLowerCase());
 const qualifiers=[];
 if(domain.duration)qualifiers.push(durationPhrase(domain.duration));
 if(domain.frequency)qualifiers.push(frequencyPhrase(domain.frequency));
 if(domain.severity)qualifiers.push(`${domain.severity.toLowerCase()} in severity`);
 const qualifierText=qualifiers.length?`, with symptoms ${naturalList(qualifiers)}`:'';
 const symptomSentence=(()=>{
  if(!symptoms.length)return'';
  switch(domain.key){
   case 'trauma': return `The client describes trauma-related symptoms characterized by ${naturalList(symptoms)}${qualifierText}.`;
   case 'ocd': return `Obsessive-compulsive symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   case 'adhd': return `Executive-functioning and attention difficulties include ${naturalList(symptoms)}${qualifierText}.`;
   case 'panic': return `Panic symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   case 'bipolar': return `Mood-episode features include ${naturalList(symptoms)}${qualifierText}.`;
   case 'psychosis': return `Psychotic-spectrum symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   case 'painHealth': return `Pain- and health-related concerns include ${naturalList(symptoms)}${qualifierText}.`;
   case 'adjustment': return `Adjustment-related symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   case 'substance': return `Substance-related concerns include ${naturalList(symptoms)}${qualifierText}.`;
   case 'eating': return `Eating- and body-image-related symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   case 'mood': return `Depressive symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   case 'anxiety': return `Anxiety symptoms include ${naturalList(symptoms)}${qualifierText}.`;
   default: return `${domain.label} include ${naturalList(symptoms)}${qualifierText}.`;
  }
 })();
 return uniqueClinicalSentences([
  symptomSentence,
  domain.context?normalizeClinicalFreeText(domain.context,{context:true}):'',
  domain.notes?normalizeClinicalFreeText(domain.notes,{fragmentLead:'The client describes'}):''
 ]);
}

function buildMasterClinicalStory(data){
 const p=data.presenting,d=data.diagnosis,domains=liveDomainEvidence(data);
 const domainStories=domains.map(domain=>({
  title:domain.label,
  icon:symptomDomainDefinitions[domain.key]?.icon||'•',
  paragraphs:buildDomainNarrative(domain)
 })).filter(domain=>domain.paragraphs.length);

 const impacts=[...new Set([...meaningful(p.impairments),...domains.flatMap(domain=>domain.impairment)])];
 const functionalImpact=impacts.length?`Symptoms are interfering with ${naturalList(impacts.map(value=>value.toLowerCase()))}.`:'';

 const psychiatric=naturalDisposition(data.psychiatricHistory.diagnoses,{none:'The client reports no prior psychiatric diagnoses.',unknown:'Prior psychiatric history is currently unknown or unavailable.',present:items=>`Prior psychiatric history includes ${naturalList(items.map(value=>value.toLowerCase()))}.`});
 const services=naturalDisposition(data.psychiatricHistory.services,{none:'The client reports no prior behavioral-health treatment.',unknown:'Prior treatment history is currently unknown or unavailable.',present:items=>`Previous behavioral-health services include ${naturalList(items.map(value=>value.toLowerCase()))}.`});
 const family=naturalDisposition(data.familyHistory.conditions,{none:'The client reports no known family psychiatric, substance-use, suicide, or psychiatric-hospitalization history.',unknown:'Family psychiatric history is currently unknown or unavailable.',present:items=>`Family psychiatric history is notable for ${naturalList(items.map(value=>value.toLowerCase()))}.`});
 const medical=naturalDisposition(data.medical.conditions,{none:'The client reports no significant medical conditions.',unknown:'Medical history is currently unknown or has not yet been fully assessed.',present:items=>`Medical history includes ${naturalList(items.map(value=>value.toLowerCase()))}.`});
 const trauma=data.trauma.experiences.includes('No trauma disclosed')?'No trauma history was disclosed during the current assessment.':data.trauma.experiences.includes('Trauma history deferred')?'Trauma-history assessment was deferred and may be revisited as clinically appropriate.':meaningful(data.trauma.experiences).length?`Trauma history includes ${naturalList(meaningful(data.trauma.experiences).map(value=>value.toLowerCase()))}.`:'';

 const psychosocial=joinSentences([
  psychiatric,services,
  data.psychiatricHistory.treatmentResponse&&`Prior treatment response is described as ${data.psychiatricHistory.treatmentResponse.toLowerCase()}.`,
  data.psychiatricHistory.details,family,data.familyHistory.details,medical,data.medical.details,
  trauma,data.trauma.details,
  data.social.housing&&`Housing is described as ${data.social.housing.toLowerCase()}.`,
  data.social.employment&&`Employment status is described as ${data.social.employment.toLowerCase()}.`,
  data.social.finances&&`Financial stress is described as ${data.social.finances.toLowerCase()}.`,
  data.social.relationships&&`Relationship context is described as ${data.social.relationships.toLowerCase()}.`,
  data.social.supports&&`The support system is described as ${data.social.supports.toLowerCase()}.`
 ]);

 const protective=[...new Set([...meaningful(data.strengths),...meaningful(data.risk.protectiveFactors)])];

 const currentThemes=[];
 if(domains.length)currentThemes.push(naturalList(domains.map(domain=>domain.label.toLowerCase())));
 if(impacts.length)currentThemes.push(`meaningful disruption in ${naturalList(impacts.map(value=>value.toLowerCase()))}`);

 const relevantHistory=[];
 if(meaningful(data.trauma.experiences).length)relevantHistory.push('trauma-related experiences');
 if(meaningful(data.familyHistory.conditions).length)relevantHistory.push('family psychiatric vulnerability');
 if(meaningful(data.psychiatricHistory.diagnoses).length)relevantHistory.push('prior behavioral-health concerns');
 if(meaningful(data.medical.conditions).length)relevantHistory.push('relevant medical or biological factors');

 const presentContext=[];
 if(Array.isArray(p.reasonSeekingCare)?p.reasonSeekingCare.length:p.reasonSeekingCare){const reasons=Array.isArray(p.reasonSeekingCare)?p.reasonSeekingCare:[p.reasonSeekingCare];presentContext.push(...reasons.map(reasonToClinicalPhrase));}
 if(data.social.employment)presentContext.push(`${data.social.employment.toLowerCase()} employment context`);
 if(data.social.finances)presentContext.push(`${data.social.finances.toLowerCase()} financial stress`);
 if(data.social.relationships)presentContext.push(`${data.social.relationships.toLowerCase()} relationship context`);

 const maintaining=[];
 const selectedSymptoms=domains.flatMap(domain=>domain.symptoms.map(value=>value.toLowerCase()));
 if(selectedSymptoms.some(value=>/avoidance|withdrawal/.test(value)))maintaining.push('avoidance or withdrawal');
 if(selectedSymptoms.some(value=>/reassurance/.test(value)))maintaining.push('reassurance seeking');
 if(selectedSymptoms.some(value=>/checking|ritual|compulsion/.test(value)))maintaining.push('compulsive or safety behaviors');
 if(selectedSymptoms.some(value=>/worry|rumination|racing thoughts/.test(value)))maintaining.push('persistent worry or rumination');
 if(selectedSymptoms.some(value=>/hypervigilance|threat|startle/.test(value)))maintaining.push('heightened threat monitoring');
 if(impacts.includes('Sleep / energy'))maintaining.push('sleep and energy disruption');
 if(data.social.supports&&/limited|inconsistent|poor|none/i.test(data.social.supports))maintaining.push('limited or inconsistent support');

 const formulation=currentThemes.length
  ?[
    `The client is currently presenting with ${naturalList(currentThemes)}.`,
    presentContext.length?`These difficulties are occurring in the present-day context of ${naturalList(presentContext)}.`:'',
    relevantHistory.length?`Earlier experiences and background factors that may help explain the current presentation include ${naturalList(relevantHistory)}.`:'',
    maintaining.length?`The current pattern may be reinforced by ${naturalList([...new Set(maintaining)])}.`:'',
    protective.length?`At the same time, ${naturalList(protective.map(value=>value.toLowerCase()))} represent meaningful strengths that may support treatment engagement and recovery.`:''
   ].filter(Boolean).join(' ')
  :'';
 const concerns=meaningful(p.concerns),course=[];
 if(p.duration)course.push(durationPhrase(p.duration));
 if(p.frequency)course.push(frequencyPhrase(p.frequency));
 if(p.severity)course.push(`${p.severity.toLowerCase()} in severity`);
 if(p.course)course.push(`currently ${p.course.toLowerCase()}`);

 return [
  {title:'Chief Complaint',text:p.patientNarrative.trim()?normalizeClinicalFreeText(p.patientNarrative,{fragmentLead:'The client reports'}):(Array.isArray(p.reasonSeekingCare)?p.reasonSeekingCare.length:p.reasonSeekingCare?true:false)?`The client is seeking care in response to ${naturalList((Array.isArray(p.reasonSeekingCare)?p.reasonSeekingCare:[p.reasonSeekingCare]).map(reasonToClinicalPhrase))}.`:''},
  {title:'History of Present Illness',text:concerns.length?`The primary concerns include ${naturalList(concerns.map(value=>value.toLowerCase()))}${course.length?`, with symptoms ${naturalList(course)}`:''}.`:''},
  {title:'Clinical Symptom Picture',domains:domainStories},
  {title:'Functional Impact',text:functionalImpact},
  {title:'Psychosocial & Clinical Context',text:psychosocial},
  {title:'Clinical Conceptualization',text:formulation},
  {title:'Diagnostic Support',text:d.primary?joinSentences([`The current clinical impression is ${d.primary}${d.confidence?`, with ${d.confidence.toLowerCase()} confidence`:''}.`,d.diagnosticRationale]):''},
  {title:'Medical Necessity',text:d.medicalNecessity},
  {title:'Treatment Direction',text:joinSentences([d.treatmentFocus,!d.treatmentFocus&&(Array.isArray(p.clientRequest)?p.clientRequest.length:p.clientRequest)?`The client hopes to ${naturalList((Array.isArray(p.clientRequest)?p.clientRequest:[p.clientRequest]).map(value=>value.toLowerCase()))}.`:''])}
 ].filter(item=>item.text||item.domains?.length);
}

function buildSectionIntelligence(data,section){
 const e=buildEvidenceMap(data);
 const builders={
  presenting:()=>presentingIntelligence(data,e),
  symptoms:()=>symptomIntelligence(data,e),
  history:()=>historyIntelligence(data,e),
  medical:()=>medicalIntelligence(data,e),
  social:()=>socialIntelligence(data,e),
  mse:()=>riskIntelligence(data,e),
  diagnosis:()=>diagnosisIntelligence(data,e),
  documentation:()=>documentationIntelligence(data,e)
 };
 const result=(builders[section]||builders.presenting)();
 return enrichWithDynamicCoach(result,data,e,section);
}
function enrichWithDynamicCoach(result,data,e,section){
 const keys=e.activeDomains.map(([key])=>key);
 const addQuestion=(text)=>{if(!result.questions.includes(text))result.questions.push(text)};
 const addPrompt=(text,priority='standard')=>{if(!result.prompts.some(p=>p.text===text))result.prompts.push({text,priority})};

 if(keys.includes('mood')){
  addQuestion('Has the client experienced previous episodes of depression, and were there periods of elevated mood or decreased need for sleep?');
  if(!data.risk.ideation)addPrompt('Depressive symptoms are active. Complete direct assessment of suicidal ideation and protective factors.','high');
 }
 if(keys.includes('anxiety')){
  addQuestion('Is the worry difficult to control and present across multiple areas of life?');
 }
 if(keys.includes('panic')){
  addQuestion('Are panic attacks expected or unexpected, and has the client changed behavior because of fear of another attack?');
 }
 if(keys.includes('ocd')){
  addQuestion('What feared outcome drives the obsession, and what overt or mental rituals temporarily reduce distress?');
  result.pearls.push('Compulsions reduce distress in the short term while reinforcing the obsessive-compulsive cycle over time.');
 }
 if(keys.includes('trauma')){
  addQuestion('Which current symptoms reflect intrusion, avoidance, changes in mood or beliefs, and hyperarousal?');
  result.pearls.push('During assessment, focus on current impact and safety rather than collecting unnecessary traumatic detail.');
 }
 if(keys.includes('adhd')&&keys.includes('trauma')){
  addPrompt('ADHD and trauma-related symptoms overlap. Clarify childhood onset, cross-setting impairment, and whether executive difficulties predated trauma exposure.');
 }
 if(keys.includes('painHealth')&&data.medical.conditions.length){
  addPrompt('Pain and medical factors are present. Clarify how physical symptoms, fear, avoidance, sleep, and mood interact.');
 }
 if(data.familyHistory.conditions.includes('Bipolar disorder')&&keys.includes('mood')){
  addPrompt('Family history includes bipolar disorder. Clarify lifetime manic or hypomanic symptoms before finalizing a depressive diagnosis.','high');
 }
 if(data.medical.conditions.includes('Thyroid condition')&&(keys.includes('mood')||keys.includes('anxiety'))){
  addPrompt('A thyroid condition may contribute to mood, energy, sleep, or anxiety symptoms. Clarify current treatment and recent medical follow-up.');
 }
 if(section==='diagnosis'&&!data.diagnosis.ruleOut){
  addPrompt('Document important differential or rule-out considerations when clinically relevant.');
 }

 const pushUnique=(collection,text)=>{if(text&&!collection.includes(text))collection.push(text)};
 if(keys.includes('ocd')){
  pushUnique(result.scripts,'“When the intrusive thought appears, what do you feel compelled to do so you can feel safe or certain?”');
  pushUnique(result.documentationTips,'Document the obsession, feared outcome, compulsion, temporary relief, and functional cost as separate parts of the OCD cycle.');
 }
 if(keys.includes('trauma')){
  pushUnique(result.scripts,'“You do not need to describe every detail. I am most interested in how the experience continues to affect safety and daily life.”');
  pushUnique(result.documentationTips,'Document current trauma impact without collecting unnecessary graphic detail.');
 }
 if(keys.includes('adhd')){
  pushUnique(result.scripts,'“What happens when you know what you need to do, but your brain still will not let you begin?”');
  pushUnique(result.documentationTips,'Clarify childhood onset, cross-setting impairment, and overlap with anxiety, depression, trauma, sleep, or medical concerns.');
 }
 if(keys.includes('painHealth')){
  pushUnique(result.scripts,'“What activities has pain taught you to fear or avoid?”');
  pushUnique(result.documentationTips,'Describe the interaction among symptoms, fear, avoidance, attention, sleep, and functional limitations.');
 }
 if(keys.includes('bipolar')){
  pushUnique(result.scripts,'“Have there been periods when you needed much less sleep and still felt unusually energized or activated?”');
  pushUnique(result.documentationTips,'Differentiate decreased need for sleep from insomnia and establish a distinct change from baseline.');
 }

 return result;
}
function intelligenceBase(title,requirements,options={}){
 const score=pct(requirements.map(r=>r.met));
 const completeness=score;
 const specificity=options.specificity??score;
 const integration=options.integration??Math.round((score+specificity)/2);
 const qualityScore=Math.round((completeness+specificity+integration)/3);
 return {
  title,score,requirements,
  narratives:options.narratives||[],
  strengths:options.strengths||[],
  prompts:options.prompts||[],
  questions:options.questions||[],
  scripts:options.scripts||[],
  pearls:options.pearls||[],
  documentationTips:options.documentationTips||[],
  comarFocus:options.comarFocus||'Document enough patient-specific information to explain the clinical need, functional impact, and relationship to treatment planning.',
  goldenThread:options.goldenThread||'The Golden Thread will strengthen as assessment findings are connected to diagnosis, impairment, and treatment priorities.',
  quality:{
   score:qualityScore,
   label:qualityScore>=90?'Excellent foundation':qualityScore>=80?'Strong documentation':qualityScore>=65?'Developing well':'Needs clinical detail',
   metrics:[
    {label:'Completeness',score:completeness},
    {label:'Patient specificity',score:specificity},
    {label:'Clinical integration',score:integration}
   ],
   suggestion:options.suggestion||requirements.find(r=>!r.met)?.detail||''
  }
 };
}

function presentingIntelligence(data,e){
 const p=data.presenting;
 const hasDomain=e.activeDomains.length>0;
 const patientSpecific=Boolean(safeText(p.patientNarrative)||e.presentingContext.some(Boolean));
 const requirements=[
  {label:'Reason for seeking care',met:Boolean(p.reasonSeekingCare||patientSpecific),detail:'Clarify why treatment is being sought now and what changed.'},
  {label:'Presenting concerns',met:hasMeaningfulSelection(p.concerns),detail:'Identify the primary concerns in the client’s own clinical context.'},
  {label:'Symptom evidence',met:hasDomain,detail:'Support the concern with at least one symptom domain.'},
  {label:'Course and severity',met:Boolean(p.duration&&p.frequency&&p.severity&&p.course),detail:'Document duration, frequency, severity, and course.'},
  {label:'Functional impairment',met:e.impairments.length>0,detail:'Connect symptoms to at least one area of daily functioning.'},
  {label:'Patient-specific example',met:patientSpecific,detail:'Add a concrete life event, trigger, pattern, or example.'}
 ];
 const story=buildLiveClinicalStory(data);
 const prompts=[];
 if(!requirements[0].met)prompts.push({priority:'high',text:'Ask what prompted the client to seek care at this particular time.'});
 if(!requirements[4].met)prompts.push({priority:'high',text:'Ask what the client is no longer able to do, or what has become harder because of the symptoms.'});
 return intelligenceBase('Presenting & HPI',requirements,{
  narratives:[
   {title:'Chief Complaint',text:story.chiefComplaint},
   {title:'History of Present Illness',text:story.hpi},
   {title:'Current Clinical Picture',text:story.clinicalPicture},
   {title:'Functional Impairment',text:story.functionalImpairment}
  ],
  strengths:requirements.filter(r=>r.met).slice(0,3).map(r=>r.label+' is documented.'),
  prompts,
  questions:['What brought you in now rather than three months ago?','What has become most difficult in your daily life?','What would you most want to be different after treatment?'],
  scripts:['“Help me understand what changed that made now feel like the right time to seek support.”','“Walk me through a recent day when these symptoms were especially noticeable.”'],
  pearls:['A symptom list becomes clinically meaningful when it is connected to course, context, and functional impact.'],
  documentationTips:['Lead with why the client is seeking care, then describe the symptom pattern and its effect on functioning.'],
  comarFocus:'The presenting problem and HPI should establish why services are needed now, the course of symptoms, and the resulting impairment.',
  goldenThread:e.diagnosis?`Current presenting evidence should directly support ${e.diagnosis} and the eventual treatment priorities.`:'The presenting evidence is developing; a diagnosis has not yet been connected.'
 });
}
function symptomIntelligence(data,e){
 const qualified=e.activeDomains.filter(([,d])=>d.duration&&d.frequency&&d.severity);
 const impacted=e.activeDomains.filter(([,d])=>d.impairment.some(v=>!['None reported','Not applicable'].includes(v)));
 const requirements=[
  {label:'Relevant symptom domains',met:e.activeDomains.length>0,detail:'Select the symptom domains supported by the interview.'},
  {label:'Domain qualifiers',met:qualified.length>0,detail:'Add duration, frequency, and severity to the strongest symptom cluster.'},
  {label:'Diagnostic clarifiers',met:e.activeDomains.some(([,d])=>Object.values(d.answers).some(Boolean)),detail:'Complete the clarifying questions that affect diagnostic reasoning.'},
  {label:'Domain impairment',met:impacted.length>0,detail:'Link at least one symptom cluster to functional impairment.'},
  {label:'Patient examples',met:e.activeDomains.some(([,d])=>safeText(d.notes)||safeText(d.context)),detail:'Add a patient-specific pattern, trigger, or daily-life example.'}
 ];
 const domainSummary=e.activeDomains.map(([key,d])=>`${symptomDomainDefinitions[key].label}: ${naturalList(d.symptoms.slice(0,5).map(v=>v.toLowerCase()))}`).join('\n');
 return intelligenceBase('Symptom Evidence',requirements,{
  narratives:[{title:'Active Symptom Domains',text:domainSummary}],
  questions:['When are these symptoms most noticeable?','What happens immediately before and after the symptom?','What does the client do to reduce discomfort or prevent a feared outcome?'],
  scripts:['“What does this look like on a difficult day?”','“How often is this happening, and how long does it usually last?”'],
  pearls:['Diagnostic confidence increases when symptoms are documented as patterns—not isolated checkmarks.'],
  documentationTips:['Describe the most clinically relevant symptoms; avoid copying every selected checkbox into the final narrative.'],
  comarFocus:'Symptom documentation should support diagnostic reasoning and explain functional impairment without becoming a checklist dump.',
  goldenThread:e.diagnosis?`${e.activeDomains.length} symptom domain(s) currently feed the evidence supporting ${e.diagnosis}.`:'Symptom evidence is present but has not yet been linked to a primary diagnosis.'
 });
}
function historyIntelligence(data,e){
 const p=data.psychiatricHistory,f=data.familyHistory;
 const requirements=[
  {label:'Prior diagnoses',met:p.diagnoses.length>0,detail:'Select prior diagnoses, none reported, or unknown.'},
  {label:'Prior services',met:p.services.length>0,detail:'Document prior treatment settings, none reported, or unknown.'},
  {label:'Hospitalization / suicide history',met:Boolean(p.hospitalization&&p.suicideAttempts&&p.nssi),detail:'Clarify prior admissions, attempts, and NSSI history.'},
  {label:'Treatment response',met:Boolean(p.treatmentResponse),detail:'Document what helped, what did not, and any adverse response.'},
  {label:'Family psychiatric history',met:f.conditions.length>0,detail:'Document known family history, none reported, or unavailable history.'},
  {label:'Patient-specific history detail',met:Boolean(safeText(p.details)||safeText(f.details)),detail:'Add chronology or clinically relevant context.'}
 ];
 const psychText=e.psychiatricHistory?`Prior diagnostic history: ${e.psychiatricHistory}.`:'';
 const treatmentText=e.treatmentHistory?`Prior services include ${e.treatmentHistory}; response is ${p.treatmentResponse||'not yet documented'}.`:'';
 const familyText=e.familyHistory?`Family psychiatric history: ${e.familyHistory}.`:'';
 return intelligenceBase('History & Predisposing Factors',requirements,{
  narratives:[{title:'Psychiatric History',text:[psychText,treatmentText].filter(Boolean).join(' ')},{title:'Family / Predisposing Context',text:familyText}],
  questions:['What treatment was most helpful, and what specifically made it helpful?','Have there been previous episodes that looked similar to the current presentation?','What mental-health or substance-use patterns are known in the family?'],
  scripts:['“I’d like to understand what you have already tried so we do not repeat approaches that were not useful.”','“Are there parts of your family history that may help us understand vulnerability or resilience?”'],
  pearls:['Treatment response history should shape current recommendations, not simply document that treatment occurred.'],
  documentationTips:['Include chronology, level of care, reason for treatment, response, and relevant risk history.'],
  comarFocus:'Historical information should support diagnosis, risk formulation, formulation, and the rationale for current treatment.',
  goldenThread:`Psychiatric and family history currently contribute ${e.psychiatricHistory||e.familyHistory?'documented':'limited'} predisposing evidence to the 5 Ps formulation.`
 });
}
function medicalIntelligence(data,e){
 const m=data.medical,s=data.substance;
 const medicationCount=m.medications.filter(med=>med.name).length;
 const substanceAssessed=['alcohol','cannabis','nicotine','opioids','stimulants','sedatives','other'].every(key=>Boolean(s[key]));
 const requirements=[
  {label:'Medical conditions',met:m.conditions.length>0,detail:'Select known conditions, none reported, or not yet assessed.'},
  {label:'Sleep / pain / follow-up',met:Boolean(m.sleep&&m.pain&&m.providerFollowUp),detail:'Clarify key biological contributors and medical follow-up.'},
  {label:'Medication reconciliation',met:medicationCount>0||m.medications.every(med=>!med.name&&!med.dose),detail:'Enter current medications or clearly indicate none.'},
  {label:'Substance domains',met:substanceAssessed,detail:'Assess each major substance domain, including denied or unknown.'},
  {label:'Substance treatment / supports',met:Boolean(s.treatmentHistory||s.recoverySupports||safeText(s.details)),detail:'Document treatment history, recovery supports, or none reported.'}
 ];
 return intelligenceBase('Medical & Rule-Out Factors',requirements,{
  narratives:[
   {title:'Medical Contributors',text:e.medicalContributors?`Medical history includes ${e.medicalContributors}. Sleep is ${m.sleep||'not yet described'}, pain is ${m.pain||'not yet described'}, and medical follow-up is ${m.providerFollowUp||'not yet described'}.`:''},
   {title:'Substance / Medication Context',text:`${medicationCount} medication${medicationCount===1?' is':'s are'} documented. Substance-use domains are ${substanceAssessed?'fully screened':'not yet fully screened'}.`}
  ],
  questions:['Could any medical condition, medication change, sleep problem, or substance use be contributing to the symptoms?','Are medications being taken as prescribed, and are there side effects or barriers?','Has substance use changed as emotional distress increased?'],
  scripts:['“I ask everyone about medical and substance factors because they can affect mood, sleep, concentration, and safety.”'],
  pearls:['Medical and substance factors may contribute to symptoms without fully explaining the behavioral-health presentation.'],
  documentationTips:['Distinguish confirmed diagnoses, client-reported conditions, current medications, and possible contributors.'],
  comarFocus:'Medical, medication, sleep, pain, and substance information should inform differential diagnosis, care coordination, and medical necessity.',
  goldenThread:e.medicalContributors?`Medical contributors are available to inform diagnostic rule-outs and treatment planning.`:'Medical contributors have not yet been clearly linked.'
 });
}
function socialIntelligence(data,e){
 const s=data.social,t=data.trauma;
 const traumaDisposition=t.experiences.length>0;
 const requirements=[
  {label:'Trauma disposition',met:traumaDisposition,detail:'Document experiences, no trauma disclosed, or deferred assessment.'},
  {label:'Current trauma impact',met:t.symptoms.length>0||t.experiences.includes('No trauma disclosed')||t.experiences.includes('Trauma history deferred'),detail:'Document symptoms, none reported, or deferred assessment.'},
  {label:'Housing / employment / finances',met:Boolean(s.housing&&s.employment&&s.finances),detail:'Clarify major social determinants and stability.'},
  {label:'Relationships / supports',met:Boolean(s.relationships&&safeText(s.supports)),detail:'Describe both the availability and quality of support.'},
  {label:'Education / caregiving / identity context',met:Boolean(s.education||s.parenting||s.culturalFactors||s.spiritualFactors||s.identityFactors),detail:'Document the relevant developmental, cultural, identity, or caregiving context.'},
  {label:'Practical needs',met:s.needs.length>0,detail:'Select current needs, none reported, or not applicable.'},
  {label:'Strengths',met:data.strengths.length>0,detail:'Identify strengths or document that strengths are still being explored.'}
 ];
 return intelligenceBase('Social Context & Protective Factors',requirements,{
  narratives:[
   {title:'Social / Environmental Context',text:e.socialStressors.length?`Relevant social context includes ${naturalList(e.socialStressors.map(v=>v.toLowerCase()))}.`:''},
   {title:'Supports & Strengths',text:[e.supports.length?`Identified supports include ${naturalList(e.supports.map(v=>v.toLowerCase()))}.`:'',e.strengths.length?`Strengths include ${naturalList(e.strengths.map(v=>v.toLowerCase()))}.`:''].filter(Boolean).join(' ')},
   {title:'Trauma Context',text:e.traumaHistory?`Trauma history is documented as ${e.traumaHistory}.`:''}
  ],
  questions:['Who can the client rely on emotionally and practically?','How do housing, finances, transportation, work, or caregiving affect treatment access?','Are there cultural, spiritual, identity, or community factors that should shape care?'],
  scripts:['“Who are the people you can actually turn to when things are difficult?”','“Are there parts of your identity, culture, or values that you want reflected in treatment?”'],
  pearls:['A support system is protective only when it is accessible, emotionally safe, and experienced as helpful.'],
  documentationTips:['Document quality and reliability of support—not only the names or number of supports.'],
  comarFocus:'Social history should identify barriers, resources, strengths, supports, and environmental factors relevant to treatment.',
  goldenThread:e.socialStressors.length||e.strengths.length?'Social stressors and protective factors are available to inform formulation, level of care, and treatment priorities.':'Social context is not yet sufficiently connected.'
 });
}
function riskIntelligence(data,e){
 const m=data.mse,r=data.risk;
 const mseCore=[m.appearance,m.behavior,m.orientation,m.speech,m.mood,m.affect,m.thoughtProcess,m.thoughtContent,m.perception,m.insight,m.judgment];
 const riskCore=[r.suicideScreen,r.ideation,r.intent,r.plan,r.behavior,r.homicidalIdeation,r.accessToMeans,r.overallRisk,r.safetyResponse];
 const requirements=[
  {label:'Core MSE',met:mseCore.filter(Boolean).length>=9,detail:'Complete the major MSE domains and patient-specific observations when relevant.'},
  {label:'Suicide / self-harm assessment',met:Boolean(r.suicideScreen&&r.ideation&&r.intent&&r.plan&&r.behavior),detail:'Document screen result, ideation, intent, plan, and behavior.'},
  {label:'Violence / means assessment',met:Boolean(r.homicidalIdeation&&r.accessToMeans),detail:'Document homicidal ideation and access to means.'},
  {label:'Clinical risk formulation',met:Boolean(r.overallRisk),detail:'State an overall acute clinical risk level.'},
  {label:'Protective factors',met:r.protectiveFactors.length>0,detail:'Identify protective factors or document none identified.'},
  {label:'Risk response match',met:Boolean(r.safetyResponse)&&(!(r.safetyPlanNeeded==='Yes')||Boolean(r.warningSigns&&r.internalCoping&&r.professionalContacts)),detail:'Match the safety response to the risk findings and complete safety-plan inputs when indicated.'}
 ];
 const riskNarrative=r.overallRisk?`Current risk is assessed as ${r.overallRisk.toLowerCase()}. Suicide screen: ${r.suicideScreen||'not documented'}; ideation: ${r.ideation||'not documented'}; intent: ${r.intent||'not documented'}; plan: ${r.plan||'not documented'}.`:''; 
 return intelligenceBase('MSE, Risk & Safety',requirements,{
  narratives:[{title:'Risk Formulation Preview',text:riskNarrative},{title:'Protective Factors',text:e.riskProtective.length?naturalList(e.riskProtective.map(v=>v.toLowerCase())):''}],
  questions:['What has kept the client safe during previous periods of distress?','Has access to lethal means been assessed directly?','Does the safety response match both acute and chronic risk?'],
  scripts:['“I ask these questions directly because safety is important, and asking does not put the idea in someone’s mind.”'],
  pearls:['Risk level is a clinical formulation—not merely the result of a screening instrument.'],
  documentationTips:['Document the evidence supporting the risk level and the action taken in response.'],
  comarFocus:'Risk documentation should include findings, clinical formulation, protective factors, access to means, and the corresponding safety response.',
  goldenThread:e.risk?`The ${e.risk.toLowerCase()} risk formulation should inform level of care, treatment frequency, and safety planning.`:'Risk has not yet been integrated with level-of-care reasoning.'
 });
}
function diagnosisIntelligence(data,e){
 const d=data.diagnosis;
 const requirements=[
  {label:'Primary diagnosis',met:Boolean(d.primary),detail:'Enter a tentative, established, or deferred primary diagnosis.'},
  {label:'Diagnostic status / confidence',met:Boolean(d.status&&d.confidence),detail:'Clarify whether the diagnosis is provisional or established and the current confidence.'},
  {label:'Evidence linkage',met:e.activeDomains.length>0&&e.impairments.length>0,detail:'Link diagnosis to symptoms, course, and functional impairment.'},
  {label:'Measures',met:e.measures.length>0,detail:'Document baseline measures when available.'},
  {label:'Risk integrated',met:Boolean(e.risk),detail:'Include risk findings in level-of-care reasoning.'},
  {label:'Level of care',met:Boolean(d.levelOfCare),detail:'Select the recommended level of care.'},
  {label:'Diagnostic narratives',met:Boolean(safeText(d.diagnosticRationale)&&safeText(d.medicalNecessity)&&safeText(d.locRationale)),detail:'Generate and review the rationale, medical necessity, and level-of-care narratives.'}
 ];
 const support=e.diagnosis?`The current evidence map links ${e.activeDomains.length} symptom domain(s), ${e.impairments.length} impairment area(s), ${e.measures.length} scored measure(s), and ${e.risk||'an incomplete risk formulation'} to ${e.diagnosis}.`:'';
 return intelligenceBase('Diagnosis & Clinical Reasoning',requirements,{
  narratives:[{title:'Evidence Map',text:support},{title:'Diagnostic Rationale',text:d.diagnosticRationale},{title:'Medical Necessity',text:d.medicalNecessity},{title:'Level of Care',text:d.locRationale}],
  questions:['What evidence most strongly supports this diagnosis?','What plausible alternatives have been considered?','Could medical, substance, trauma, grief, or developmental factors better explain the symptoms?'],
  scripts:['“My current impression is provisional and may change as we gather more information.”'],
  pearls:['Diagnostic confidence should reflect both supporting evidence and the quality of information available.'],
  documentationTips:['State the diagnosis, cite the symptom cluster and duration, describe impairment, and explain important rule-outs.'],
  comarFocus:'Diagnosis should be supported by the evaluation, accompanied by clinical rationale, and connected to medical necessity and level of care.',
  goldenThread:e.diagnosis?`${e.diagnosis} is currently connected to ${e.impairments.length} impairment area(s) and ${e.levelOfCare||'an unselected level of care'}.`:'The Golden Thread cannot be completed until a diagnosis is entered.'
 });
}
function documentationIntelligence(data,e){
 const generated=Object.keys(data.generated).length;
 const requirements=[
  {label:'Assessment narratives generated',met:generated>0,detail:'Generate the clinical package after completing the assessment.'},
  {label:'Diagnosis supported',met:Boolean(e.diagnosis&&data.diagnosis.diagnosticRationale),detail:'Ensure diagnosis is connected to symptoms, course, and impairment.'},
  {label:'Medical necessity',met:Boolean(data.diagnosis.medicalNecessity),detail:'Explain why treatment is needed now.'},
  {label:'5 Ps formulation',met:Boolean(data.generated.clinicalFormulation),detail:'Generate and review the integrated formulation.'},
  {label:'Treatment focus',met:Boolean(data.diagnosis.treatmentFocus),detail:'Connect assessment findings to initial treatment priorities.'},
  {label:'Golden Thread',met:Boolean(e.diagnosis&&e.impairments.length&&e.treatmentFocus),detail:'Link findings → diagnosis → impairment → treatment focus.'}
 ];
 return intelligenceBase('Documentation & Golden Thread',requirements,{
  narratives:[
   {title:'Diagnostic Summary',text:data.generated.diagnosticSummary},
   {title:'Clinical Formulation',text:data.generated.clinicalFormulation},
   {title:'Treatment Focus',text:data.generated.treatmentFocus}
  ],
  questions:['Does every major diagnosis have supporting assessment evidence?','Does every major impairment appear in the treatment focus?','Would another clinician understand why this level of care is appropriate?'],
  scripts:['“Before I finalize, I am checking that the story remains consistent from assessment through treatment recommendations.”'],
  pearls:['A strong Golden Thread is not repetitive; it is consistent. Each document should advance the same clinical story.'],
  documentationTips:['Review for contradictions, unsupported diagnoses, unaddressed impairments, and generic treatment recommendations.'],
  comarFocus:'Final documentation should be complete, internally consistent, person-centered, strengths-based, and medically necessary.',
  goldenThread:requirements.at(-1).met?'Assessment evidence, diagnosis, impairment, and treatment focus are connected.':'At least one Golden Thread link is still missing.'
 });
}

function DomainCoach({domainKey,domain}){const tips=[];if(domain.symptoms.length&&!domain.duration)tips.push('Clarify duration.');if(domain.symptoms.length&&!domain.impairment.length)tips.push('Add a patient-specific functional impact.');if(domain.symptoms.length&&!domain.notes&&!domain.context)tips.push('Capture one example from the client’s life.');const special={mood:'Explore episode pattern, grief context, bipolar history, and safety when clinically indicated.',anxiety:'Clarify whether worry is difficult to control and spans multiple areas of life.',panic:'Clarify whether attacks are unexpected and whether fear or avoidance persists.',bipolar:'Distinguish decreased need for sleep from insomnia and confirm a distinct change from baseline.',adhd:'Clarify childhood onset and impairment across settings.',ocd:'Differentiate intrusive ego-dystonic thoughts from worry and assess time spent in rituals.',trauma:'Document qualifying exposure, symptom clusters, duration, and stabilization needs.',psychosis:'Assess reality testing, mood relationship, medical/substance contributors, and safety.',eating:'Assess frequency, medical stability, and nutritional risk.',substance:'Clarify pattern, consequences, withdrawal risk, and recovery supports.',adjustment:'Connect symptom onset clearly to the identifiable stressor and timing.',painHealth:'Describe the interaction among pain, fear, avoidance, mood, and functioning.'};return <div className="domain-coach"><strong>💡 Clinical Curiosity</strong><p>{special[domainKey]}</p>{tips.map((t,i)=><span key={i}>{t}</span>)}</div>}

function getPresentingReadiness(data){
 const p=data.presenting;
 const active=Object.entries(p.domains).filter(([,d])=>d.symptoms.length||d.notes.trim()||d.context.trim());
 const hasDomainImpact=active.some(([,d])=>d.impairment.length>0);
 const hasSpecificExample=Boolean(p.patientNarrative.trim())||active.some(([,d])=>d.notes.trim()||d.context.trim());
 const requirements=[
  {label:'Reason for seeking care',met:Boolean(hasSelections(p.reasonSeekingCare)||p.patientNarrative.trim()),detail:'Why the client is presenting now is clear.'},
  {label:'Presenting concerns',met:p.concerns.length>0,detail:'Primary clinical concerns are identified.'},
  {label:'Symptom description',met:active.length>0,detail:'At least one relevant symptom domain is documented.'},
  {label:'Course and severity',met:Boolean(p.duration&&p.frequency&&p.severity&&p.course),detail:'Duration, frequency, severity, and course are established.'},
  {label:'Functional impairment',met:p.impairments.length>0&&hasDomainImpact,detail:'Symptoms are connected to daily functioning.'},
  {label:'Patient-specific context',met:hasSpecificExample,detail:'The narrative includes an individualized example, trigger, or life circumstance.'}
 ];
 const score=Math.round(requirements.filter(item=>item.met).length/requirements.length*100);
 const prompts=[];const strengths=[];
 if(p.concerns.length&&active.length)strengths.push('Presenting concerns are supported by symptom-level detail.');
 if(p.duration&&p.frequency&&p.severity&&p.course)strengths.push('The symptom course is documented with strong clinical qualifiers.');
 if(p.impairments.length&&hasDomainImpact)strengths.push('Functional impairment is linked at both the overall and symptom-domain levels.');
 if(hasSpecificExample)strengths.push('Patient-specific context strengthens the clinical story.');
 if(!p.reasonSeekingCare&&!p.patientNarrative.trim())prompts.push({priority:'high',text:'Clarify why the client is seeking treatment now and what changed or prompted the return to care.'});
 if(!active.length)prompts.push({priority:'high',text:'Document at least one relevant symptom domain so the presenting concern is supported by clinical features.'});
 if(active.length&&!hasDomainImpact)prompts.push({priority:'high',text:'Connect a selected symptom domain to at least one specific area of functional impairment.'});
 if(!p.impairments.length)prompts.push({priority:'high',text:'Identify how the overall presentation affects work, relationships, self-care, sleep, decision-making, or daily routines.'});
 if(!p.duration||!p.frequency||!p.severity||!p.course)prompts.push({priority:'standard',text:'Complete duration, frequency, severity, and course to strengthen the HPI and diagnostic support.'});
 if(!hasSpecificExample)prompts.push({priority:'standard',text:'Add one concrete patient-specific example, recent stressor, trigger, or pattern to keep the narrative individualized.'});
 return {score,prompts,strengths,requirements};
}
function cleanSentence(value){const text=String(value||'').trim().replace(/\s+/g,' ');if(!text)return'';return /[.!?]$/.test(text)?text:`${text}.`}
function buildLiveClinicalStory(data){
 const p=data.presenting;const active=Object.entries(p.domains).filter(([,d])=>d.symptoms.length);
 const hasData=Boolean(hasSelections(p.reasonSeekingCare)||hasSelections(p.clientRequest)||p.patientNarrative.trim()||p.concerns.length||active.length);
 let chiefComplaint='';
 if(p.patientNarrative.trim())chiefComplaint=cleanSentence(p.patientNarrative);
 else if(hasSelections(p.reasonSeekingCare)||hasSelections(p.clientRequest)){const reasons=selectionList(p.reasonSeekingCare);const requests=selectionList(p.clientRequest);const reason=reasons.length?naturalList(reasons.map(reasonToClinicalPhrase)):'behavioral-health concerns';const request=requests.length?` and hopes to ${naturalList(requests.map(value=>value.toLowerCase()))}`:'';chiefComplaint=`The client presents in response to ${reason}${request}.`}
 const concernPhrase=p.concerns.length?naturalList(p.concerns.slice(0,6).map(item=>item.toLowerCase())):active.length?naturalList(active.slice(0,4).map(([key])=>symptomDomainDefinitions[key].label.toLowerCase())):'';
 const courseParts=[];if(p.duration)courseParts.push(durationPhrase(p.duration));if(p.frequency)courseParts.push(frequencyPhrase(p.frequency));if(p.severity)courseParts.push(`${p.severity.toLowerCase()} in severity`);if(p.course)courseParts.push(`currently ${p.course.toLowerCase()}`);
 let hpi='';if(concernPhrase){hpi=`The client presents with ${concernPhrase}`;if(courseParts.length)hpi+=`, with symptoms ${naturalList(courseParts)}`;hpi+='.'}else if(courseParts.length)hpi=`The reported concerns are ${naturalList(courseParts)}.`;
 const clinicalPicture=active.slice(0,5).map(([key,domain])=>{const label=clinicalDomainLabel(key);const features=naturalList(domain.symptoms.slice(0,6).map(item=>item.toLowerCase()));const qualifiers=[domain.duration&&durationPhrase(domain.duration),domain.frequency&&frequencyPhrase(domain.frequency),domain.severity&&`${domain.severity.toLowerCase()} in severity`].filter(Boolean);let sentence=`${label} are characterized by ${features}`;if(qualifiers.length)sentence+=` and are ${naturalList(qualifiers)}`;return `${sentence}.`}).join(' ');
 let functionalImpairment='';if(p.impairments.length){functionalImpairment=`The current presentation is interfering with ${naturalList(p.impairments.map(item=>item.toLowerCase()))}`;const examples=active.flatMap(([,d])=>[d.notes,d.context]).filter(Boolean);functionalImpairment+=examples.length?`. ${cleanSentence(examples[0])}`:'.'}
 let clinicalContext='';const contextual=active.flatMap(([,d])=>[d.context,d.notes]).filter(Boolean);if(contextual.length)clinicalContext=`Relevant clinical context includes ${cleanSentence(contextual.slice(0,2).join(' '))}`;else if(p.patientNarrative.trim())clinicalContext=cleanSentence(p.patientNarrative);
 if((p.impairments.length||p.severity)&&hasSelections(p.clientRequest)){const treatmentNeed=`The combination of ${p.severity?`${p.severity.toLowerCase()} symptoms`:'the reported symptoms'}${p.impairments.length?' and associated functional impairment':''} supports the need for ${naturalList(selectionList(p.clientRequest).map(value=>value.toLowerCase()))}.`;clinicalContext=[clinicalContext,treatmentNeed].filter(Boolean).join(' ')}
 return {hasData,chiefComplaint,hpi,clinicalPicture,functionalImpairment,clinicalContext};
}
function asArray(value){return Array.isArray(value)?value:(value===undefined||value===null||value===''?[]:[value])}
function hasSelections(value){return asArray(value).length>0}
function selectionList(value){return asArray(value).map(item=>String(item||'')).filter(Boolean)}

function reasonToClinicalPhrase(reason){const map={'Symptoms have recently worsened':'a recent worsening of symptoms','New symptoms have developed':'the emergence of new symptoms','Symptoms are interfering with daily functioning':'increasing interference with daily functioning','Difficulty coping independently':'difficulty managing current concerns independently','Symptoms are no longer manageable':'symptoms that no longer feel manageable','Returning to treatment after a break':'a return to treatment after a period without services','Major life transition or adjustment':'distress associated with a major life transition','Relationship conflict or separation':'relationship conflict or separation','Grief, loss, or bereavement':'grief, loss, or bereavement','Work or school stress':'work- or school-related stress','Job loss or employment instability':'job loss or employment instability','Financial stress':'financial stress','Caregiver or parenting stress':'caregiver or parenting stress','Medical diagnosis, chronic illness, or pain':'a medical diagnosis, chronic illness, or pain-related stress','Pregnancy, postpartum, or reproductive transition':'a pregnancy, postpartum, or reproductive transition','Housing instability or relocation':'housing instability or relocation','Legal or court-related stress':'legal or court-related stress','Diagnostic clarification':'a need for diagnostic clarification','Medication-related evaluation or coordination':'a need for medication-related evaluation or coordination','Referral from another provider':'referral from another provider','School, employer, or EAP referral':'a school, employer, or EAP referral','Court or probation referral':'a court or probation referral','Family encouragement or concern':'encouragement or concern from family','Step-down or aftercare following higher level of care':'continued care following a higher level of treatment','Desire for healthier coping skills':'a desire to develop healthier coping skills','Desire to better understand symptoms or patterns':'a desire to better understand symptoms or patterns','Trauma recovery or processing past experiences':'a desire to recover from trauma or process past experiences','Improve emotional regulation':'a desire to improve emotional regulation','Improve relationships or communication':'a desire to improve relationships or communication','Personal growth or relapse prevention':'personal growth or relapse-prevention goals'};return map[reason]||reason.toLowerCase()}
function durationPhrase(value){const map={'Less than 1 month':'present for less than one month','1–6 months':'present for approximately one to six months','More than 6 months':'present for more than six months','More than 1 year':'present for more than one year','Chronic / longstanding':'longstanding or chronic','Less than 2 weeks':'present for less than two weeks','2 weeks–1 month':'present for approximately two weeks to one month','6–12 months':'present for approximately six to twelve months','Episodic':'episodic','Unclear':'of unclear duration'};return map[value]||`present for ${String(value).toLowerCase()}`}
function frequencyPhrase(value){const map={'Occasional':'occurring occasionally','Weekly':'occurring weekly','Several days per week':'occurring several days per week','Most days':'occurring most days','Daily':'occurring daily','Nearly constant':'nearly constant','Episodic':'episodic','Unclear':'of unclear frequency'};return map[value]||`occurring ${String(value).toLowerCase()}`}
function clinicalDomainLabel(key){const map={mood:'Depressive symptoms',anxiety:'Anxiety symptoms',panic:'Panic symptoms',bipolar:'Bipolar-spectrum features',adhd:'Attention and executive-functioning concerns',ocd:'Obsessive-compulsive symptoms',trauma:'Trauma-related symptoms',psychosis:'Thought and perception-related symptoms',eating:'Eating and body-image concerns',substance:'Substance-related concerns',adjustment:'Adjustment-related distress',painHealth:'Pain and health-related distress'};return map[key]||symptomDomainDefinitions[key].label}
function getDocumentationQuality(data,readiness){
 const p=data.presenting;const active=Object.entries(p.domains).filter(([,d])=>d.symptoms.length);
 const specificity=Math.min(100,(p.patientNarrative.trim()?45:0)+(active.some(([,d])=>d.notes.trim()||d.context.trim())?35:0)+(p.impairments.length?20:0));
 const clinicalDetail=Math.min(100,(active.length?30:0)+(active.some(([,d])=>d.duration&&d.frequency&&d.severity)?35:0)+(p.duration&&p.frequency&&p.severity&&p.course?35:0));
 const impairment=Math.min(100,(p.impairments.length?45:0)+(active.some(([,d])=>d.impairment.length)?40:0)+(active.some(([,d])=>d.notes.trim())?15:0));
 const narrativeFlow=Math.min(100,(hasSelections(p.reasonSeekingCare)||p.patientNarrative.trim()?30:0)+(active.length?30:0)+(p.impairments.length?25:0)+(hasSelections(p.clientRequest)?15:0));
 const score=Math.round((specificity+clinicalDetail+impairment+narrativeFlow+readiness.score)/5);const label=score>=90?'Excellent foundation':score>=80?'Strong documentation':score>=65?'Developing well':'Needs clinical detail';
 let suggestion='';if(specificity<70)suggestion='Add one concrete, patient-specific example or recent precipitating event.';else if(impairment<75)suggestion='Describe how one selected symptom directly interferes with the client’s daily functioning.';else if(clinicalDetail<80)suggestion='Complete domain-level duration, frequency, and severity for the strongest symptom cluster.';else if(narrativeFlow<85)suggestion='Clarify why treatment is being sought now and what the client hopes to address.';
 return {score,label,suggestion,metrics:[{label:'Patient specificity',score:specificity},{label:'Clinical detail',score:clinicalDetail},{label:'Functional impairment',score:impairment},{label:'Narrative flow',score:narrativeFlow},{label:'COMAR readiness',score:readiness.score}]};
}
function naturalList(items){const c=items.filter(Boolean);if(!c.length)return'';if(c.length===1)return c[0];if(c.length===2)return`${c[0]} and ${c[1]}`;return`${c.slice(0,-1).join(', ')}, and ${c.at(-1)}`}

function History({data,set,toggle}){const p=data.psychiatricHistory,f=data.familyHistory;return <Page><div className="workspace-grid"><div><Card title="Psychiatric History"><h3>Previous Diagnoses</h3><Checks options={psychDx} selected={p.diagnoses} onToggle={v=>toggle('psychiatricHistory.diagnoses',v)}/><h3>Previous Services / Higher Levels of Care</h3><Checks options={services} selected={p.services} onToggle={v=>toggle('psychiatricHistory.services',v)}/><Grid columns={4}><Select label="Hospitalization" value={p.hospitalization} onChange={v=>set('psychiatricHistory.hospitalization',v)} options={['None reported','One prior admission','Multiple prior admissions','Unknown']}/><Select label="Suicide Attempts" value={p.suicideAttempts} onChange={v=>set('psychiatricHistory.suicideAttempts',v)} options={['None reported','One prior attempt','Multiple prior attempts','Unknown']}/><Select label="NSSI History" value={p.nssi} onChange={v=>set('psychiatricHistory.nssi',v)} options={['None reported','Historical','Current / recent','Unknown']}/><Select label="Treatment Response" value={p.treatmentResponse} onChange={v=>set('psychiatricHistory.treatmentResponse',v)} options={['Helpful','Partially helpful','Limited benefit','Adverse response','Unknown']}/></Grid><TextArea label="Additional Psychiatric History Details" value={p.details} onChange={v=>set('psychiatricHistory.details',v)}/></Card><Card title="Family History"><Checks options={familyConditions} selected={f.conditions} onToggle={v=>toggle('familyHistory.conditions',v)}/><Grid columns={2}><Select label="Family Relationship Pattern" value={f.relationshipPattern} onChange={v=>set('familyHistory.relationshipPattern',v)} options={['Supportive','Generally stable','Conflictual','Estranged','Enmeshed','Limited contact','Mixed / complex']}/><Select label="Family Support Level" value={f.supportLevel} onChange={v=>set('familyHistory.supportLevel',v)} options={['Strong support','Some support','Limited support','No support','Mixed / inconsistent']}/></Grid><TextArea label="Additional Family History Details" value={f.details} onChange={v=>set('familyHistory.details',v)}/></Card></div><ClinicalSidePanel data={data} section="history"/></div></Page>}

function Medical({data,set,toggle,dispatch}){const m=data.medical,s=data.substance;return <Page><div className="workspace-grid"><div><Card title="Medical & Biological Factors"><Checks options={medicalConditions} selected={m.conditions} onToggle={v=>toggle('medical.conditions',v)}/><Grid columns={4}><Select label="Sleep" value={m.sleep} onChange={v=>set('medical.sleep',v)} options={['No concerns','Mild disruption','Moderate disruption','Severe disruption','Insomnia','Hypersomnia']}/><Select label="Pain" value={m.pain} onChange={v=>set('medical.pain',v)} options={['None reported','Intermittent','Chronic mild','Chronic moderate','Chronic severe']}/><Input label="Allergies" value={m.allergies} onChange={v=>set('medical.allergies',v)}/><Select label="Medical Follow-Up" value={m.providerFollowUp} onChange={v=>set('medical.providerFollowUp',v)} options={['Established PCP','Specialty care','Needs PCP','Inconsistent follow-up','Unknown']}/></Grid><TextArea label="Additional Medical Details" value={m.details} onChange={v=>set('medical.details',v)}/></Card><Card title="Current Medications">{m.medications.map((med,i)=><div className="med-row" key={i}><Input label="Medication" value={med.name} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'name',value:v})}/><Input label="Dose" value={med.dose} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'dose',value:v})}/><Input label="Frequency" value={med.frequency} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'frequency',value:v})}/><Input label="Indication" value={med.indication} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'indication',value:v})}/>{m.medications.length>1&&<button className="danger small" onClick={()=>dispatch({type:'REMOVE_MEDICATION',index:i})}>Remove</button>}</div>)}<button onClick={()=>dispatch({type:'ADD_MEDICATION'})}>+ Add Medication</button></Card><Card title="Substance-Use Snapshot"><Grid columns={3}>{['alcohol','cannabis','nicotine','opioids','stimulants','sedatives','other'].map(key=><Select key={key} label={titleCase(key)} value={s[key]} onChange={v=>set(`substance.${key}`,v)} options={['Denied','Rare / social','Occasional','Weekly','Daily','In remission','Medical use','Unknown']}/>)}</Grid><Grid columns={2}><Select label="Treatment History" value={s.treatmentHistory} onChange={v=>set('substance.treatmentHistory',v)} options={['None reported','Outpatient','IOP','Residential','Detoxification','Mutual-help / peer recovery','Multiple services']}/><Input label="Recovery Supports" value={s.recoverySupports} onChange={v=>set('substance.recoverySupports',v)}/></Grid><TextArea label="Additional Substance-Use Details" value={s.details} onChange={v=>set('substance.details',v)}/></Card></div><ClinicalSidePanel data={data} section="medical"/></div></Page>}

function Social({data,set,toggle}){const t=data.trauma,s=data.social;return <Page><div className="workspace-grid"><div><Card title="Trauma-Informed History"><h3>Experiences</h3><Checks options={traumaExperiences} selected={t.experiences} onToggle={v=>toggle('trauma.experiences',v)}/><h3>Current Trauma Symptoms</h3><Checks options={traumaSymptoms} selected={t.symptoms} onToggle={v=>toggle('trauma.symptoms',v)}/><TextArea label="Additional Trauma Details" value={t.details} onChange={v=>set('trauma.details',v)}/></Card><Card title="Social & Environmental History"><Grid columns={3}><Select label="Housing" value={s.housing} onChange={v=>set('social.housing',v)} options={['Stable','Temporary','At risk','Homeless / unhoused','Residential program','Unknown']}/><Select label="Employment" value={s.employment} onChange={v=>set('social.employment',v)} options={['Full-time','Part-time','Unemployed','Student','Disabled / unable to work','Retired','Caregiver']}/><Select label="Financial Stress" value={s.finances} onChange={v=>set('social.finances',v)} options={['None','Mild','Moderate','Severe','Crisis-level']}/><Select label="Transportation" value={s.transportation} onChange={v=>set('social.transportation',v)} options={['Reliable','Limited','Unreliable','No transportation']}/><Select label="Relationships" value={s.relationships} onChange={v=>set('social.relationships',v)} options={['Supportive','Generally stable','Conflictual','Isolated','Recent separation / loss','Mixed']}/><Select label="Legal Stress" value={s.legal} onChange={v=>set('social.legal',v)} options={['None','Current legal matter','Probation / parole','Custody matter','Protective-order concern','Historical only']}/></Grid><Input label="Support System — who is available, how reliable, and how helpful?" placeholder="Example: sister and close friend; emotionally supportive but client has difficulty asking for help" value={s.supports} onChange={v=>set('social.supports',v)}/><Grid columns={2}><Input label="Education / Learning Context" placeholder="Highest level, current enrollment, learning needs, academic barriers, or goals" value={s.education} onChange={v=>set('social.education',v)}/><Input label="Parenting / Caregiving Context" placeholder="Children/dependents, caregiving duties, stressors, strengths, custody context" value={s.parenting} onChange={v=>set('social.parenting',v)}/><Input label="Cultural Factors" placeholder="Values, traditions, language, community, or cultural considerations relevant to care" value={s.culturalFactors} onChange={v=>set('social.culturalFactors',v)}/><Input label="Spiritual / Values Factors" placeholder="Beliefs, meaning, faith community, values, or preferences affecting care" value={s.spiritualFactors} onChange={v=>set('social.spiritualFactors',v)}/><Input label="Identity-Related Factors" placeholder="Identity strengths, stressors, discrimination, belonging, or treatment preferences" value={s.identityFactors} onChange={v=>set('social.identityFactors',v)}/><Input label="Military History" placeholder="Service, deployment, combat, discharge, VA connection, MST, or not applicable" value={s.military} onChange={v=>set('social.military',v)}/></Grid><h3>Current Practical Needs</h3><Checks options={needs} selected={s.needs} onToggle={v=>toggle('social.needs',v)}/></Card><Card title="Strengths & Protective Factors"><Checks options={strengths} selected={data.strengths} onToggle={v=>toggle('strengths',v)}/></Card></div><ClinicalSidePanel data={data} section="social"/></div></Page>}

function MseRisk({data,set,toggle}){const m=data.mse,r=data.risk;return <Page><div className="workspace-grid"><div><Card title="Mental Status Examination"><Grid columns={4}><Select label="Appearance" value={m.appearance} onChange={v=>set('mse.appearance',v)} options={['Appropriate / well-groomed','Casual','Disheveled','Unkempt','Bizarre / unusual']}/><Select label="Behavior" value={m.behavior} onChange={v=>set('mse.behavior',v)} options={['Cooperative','Engaged','Guarded','Restless','Agitated','Withdrawn','Tearful']}/><Select label="Orientation" value={m.orientation} onChange={v=>set('mse.orientation',v)} options={['Alert and oriented ×4','Oriented to person and place','Partially oriented','Disoriented']}/><Select label="Speech" value={m.speech} onChange={v=>set('mse.speech',v)} options={['Normal rate, rhythm, and volume','Rapid','Pressured','Slow','Soft','Loud','Minimal']}/><Select label="Mood" value={m.mood} onChange={v=>set('mse.mood',v)} options={['Euthymic','Anxious','Depressed','Irritable','Angry','Sad','Elevated','Labile']}/><Select label="Affect" value={m.affect} onChange={v=>set('mse.affect',v)} options={['Full range','Appropriate / congruent','Constricted','Blunted','Flat','Labile','Incongruent']}/><Select label="Thought Process" value={m.thoughtProcess} onChange={v=>set('mse.thoughtProcess',v)} options={['Linear and goal-directed','Logical','Circumstantial','Tangential','Disorganized','Racing','Thought blocking']}/><Select label="Thought Content" value={m.thoughtContent} onChange={v=>set('mse.thoughtContent',v)} options={['Unremarkable','Preoccupation','Obsessions','Delusions','Paranoia','Hopelessness','Worthlessness','Suicidal content']}/><Select label="Perception" value={m.perception} onChange={v=>set('mse.perception',v)} options={['No perceptual disturbance','Auditory hallucinations','Visual hallucinations','Other perceptual disturbance']}/><Select label="Cognition" value={m.cognition} onChange={v=>set('mse.cognition',v)} options={['Grossly intact','Mildly impaired','Moderately impaired','Severely impaired']}/><Select label="Attention" value={m.attention} onChange={v=>set('mse.attention',v)} options={['Intact','Mildly impaired','Moderately impaired','Severely impaired']}/><Select label="Memory" value={m.memory} onChange={v=>set('mse.memory',v)} options={['Grossly intact','Recent-memory difficulty','Remote-memory difficulty','Impaired']}/><Select label="Insight" value={m.insight} onChange={v=>set('mse.insight',v)} options={['Good','Fair','Limited','Poor']}/><Select label="Judgment" value={m.judgment} onChange={v=>set('mse.judgment',v)} options={['Good','Fair','Limited','Poor']}/><Select label="Impulse Control" value={m.impulseControl} onChange={v=>set('mse.impulseControl',v)} options={['Good','Fair','Limited','Poor']}/></Grid><TextArea label="Additional MSE Observations" value={m.additional} onChange={v=>set('mse.additional',v)}/></Card><Card title="Risk & Safety"><Grid columns={4}><Select label="Suicide Screen" value={r.suicideScreen} onChange={v=>set('risk.suicideScreen',v)} options={['Negative','Positive for passive ideation','Positive for active ideation','Positive for recent behavior','Not completed']}/><Select label="Ideation" value={r.ideation} onChange={v=>set('risk.ideation',v)} options={['Denied','Passive','Active without plan','Active with plan','Unknown']}/><Select label="Intent" value={r.intent} onChange={v=>set('risk.intent',v)} options={['Denied','No current intent','Ambivalent','Intent present','Unknown']}/><Select label="Plan" value={r.plan} onChange={v=>set('risk.plan',v)} options={['Denied','No specific plan','Vague plan','Specific plan','Unknown']}/><Select label="Recent Behavior" value={r.behavior} onChange={v=>set('risk.behavior',v)} options={['Denied','Preparatory behavior','Aborted attempt','Interrupted attempt','Recent attempt','NSSI']}/><Select label="Homicidal Ideation" value={r.homicidalIdeation} onChange={v=>set('risk.homicidalIdeation',v)} options={['Denied','Passive thoughts','Active thoughts without plan','Active thoughts with plan','Unknown']}/><Select label="Access to Means" value={r.accessToMeans} onChange={v=>set('risk.accessToMeans',v)} options={['Denied / no access','Restricted access','Access present','Unknown']}/><Select label="Overall Risk" value={r.overallRisk} onChange={v=>set('risk.overallRisk',v)} options={['Low','Low to moderate','Moderate','High','Imminent']}/><Select label="Safety Response" value={r.safetyResponse} onChange={v=>set('risk.safetyResponse',v)} options={['No additional action indicated','Safety plan completed','Crisis resources reviewed','Higher level of care recommended','Emergency evaluation initiated']}/><Select label="Generate Safety Plan" value={r.safetyPlanNeeded} onChange={v=>set('risk.safetyPlanNeeded',v)} options={['No','Yes']}/></Grid><h3>Protective Factors</h3><Checks options={riskProtective} selected={r.protectiveFactors} onToggle={v=>toggle('risk.protectiveFactors',v)}/>{r.safetyPlanNeeded==='Yes'&&<div className="safety-plan-fields"><h3>Stanley-Brown-Style Safety Plan Inputs</h3><Grid columns={2}><TextArea label="1. Warning Signs" value={r.warningSigns} onChange={v=>set('risk.warningSigns',v)}/><TextArea label="2. Internal Coping Strategies" value={r.internalCoping} onChange={v=>set('risk.internalCoping',v)}/><TextArea label="3. People / Places for Distraction" value={r.peoplePlaces} onChange={v=>set('risk.peoplePlaces',v)}/><TextArea label="4. Support Contacts" value={r.supportContacts} onChange={v=>set('risk.supportContacts',v)}/><TextArea label="5. Professional / Crisis Contacts" value={r.professionalContacts} onChange={v=>set('risk.professionalContacts',v)}/><TextArea label="6. Means-Safety Steps" value={r.meansSafety} onChange={v=>set('risk.meansSafety',v)}/></Grid></div>}</Card></div><ClinicalSidePanel data={data} section="mse"/></div></Page>}

function Diagnosis({data,set,dispatch}){
 const preview=buildDiagnosticIntelligencePreview(data);
 return <Page><div className="workspace-grid"><div>
  <Card title="Standardized Measures">
   {data.measures.map((m,i)=><div className="measure-row" key={i}>
    <Input label="Measure" value={m.name} onChange={v=>dispatch({type:'SET_MEASURE',index:i,field:'name',value:v})}/>
    <Input label="Score" value={m.score} onChange={v=>dispatch({type:'SET_MEASURE',index:i,field:'score',value:v})}/>
    <Input label="Interpretation" value={m.interpretation} onChange={v=>dispatch({type:'SET_MEASURE',index:i,field:'interpretation',value:v})}/>
    <Input label="Clinical Notes" value={m.notes} onChange={v=>dispatch({type:'SET_MEASURE',index:i,field:'notes',value:v})}/>
    {data.measures.length>1&&<button className="danger small" onClick={()=>dispatch({type:'REMOVE_MEASURE',index:i})}>Remove</button>}
   </div>)}
   <button onClick={()=>dispatch({type:'ADD_MEASURE'})}>+ Add Measure</button>
  </Card>

  <Card title="Diagnosis & Level of Care">
   <Grid columns={2}>
    <Input label="Primary Diagnosis (include ICD-10-CM code when known)" value={data.diagnosis.primary} onChange={v=>set('diagnosis.primary',v)}/>
    <Input label="Secondary Diagnosis" value={data.diagnosis.secondary} onChange={v=>set('diagnosis.secondary',v)}/>
    <Input label="Rule-Out / Continue to Assess" value={data.diagnosis.ruleOut} onChange={v=>set('diagnosis.ruleOut',v)}/>
    <Select label="Diagnostic Confidence" value={data.diagnosis.confidence} onChange={v=>set('diagnosis.confidence',v)} options={['High','Moderate','Provisional / emerging','Insufficient information']}/>
    <Select label="Recommended Level of Care" value={data.diagnosis.levelOfCare} onChange={v=>set('diagnosis.levelOfCare',v)} options={['Routine outpatient psychotherapy','Outpatient psychotherapy + medication management','Intensive outpatient','Partial hospitalization','Residential treatment','Inpatient psychiatric care','Substance-use level of care','Other']}/>
    <Select label="Clinical Status" value={data.diagnosis.status} onChange={v=>set('diagnosis.status',v)} options={['Initial / provisional diagnosis','Established diagnosis','Diagnostic clarification in progress','Deferred pending additional assessment']}/>
   </Grid>

   <div className="diagnostic-action-bar">
    <div>
     <strong>Diagnostic Intelligence</strong>
     <span>Generate chart-ready reasoning from the assessment, then revise it using your clinical judgment.</span>
    </div>
    <button type="button" onClick={()=>dispatch({type:'GENERATE_DIAGNOSTIC_INTELLIGENCE'})}>✨ Generate Diagnostic Narratives</button>
   </div>

   <TextArea label="Diagnostic Rationale / Justification" value={data.diagnosis.diagnosticRationale} onChange={v=>set('diagnosis.diagnosticRationale',v)}/>
   <TextArea label="Medical Necessity Narrative" value={data.diagnosis.medicalNecessity} onChange={v=>set('diagnosis.medicalNecessity',v)}/>
   <TextArea label="Level-of-Care Rationale" value={data.diagnosis.locRationale} onChange={v=>set('diagnosis.locRationale',v)}/>
   <TextArea label="Initial Treatment Focus / Recommendations" value={data.diagnosis.treatmentFocus} onChange={v=>set('diagnosis.treatmentFocus',v)}/>

   <div className="diagnostic-preview-grid">
    <MiniPreview title="Evidence Supporting Diagnosis" text={preview.evidence}/>
    <MiniPreview title="Information Still Needed" text={preview.missing}/>
   </div>
  </Card>
 </div><ClinicalSidePanel data={data} section="diagnosis"/></div></Page>
}

function MiniPreview({title,text}){return <section className="mini-preview"><h3>{title}</h3><p>{text}</p></section>}

function buildDiagnosticIntelligencePreview(data){
 const domains=Object.entries(data.presenting.domains).filter(([,d])=>d.symptoms.length);
 const evidence=[];
 if(data.presenting.duration)evidence.push(`duration documented as ${data.presenting.duration.toLowerCase()}`);
 if(data.presenting.frequency)evidence.push(`frequency documented as ${data.presenting.frequency.toLowerCase()}`);
 if(data.presenting.severity)evidence.push(`severity documented as ${data.presenting.severity.toLowerCase()}`);
 if(domains.length)evidence.push(`${domains.length} symptom domain${domains.length===1?'':'s'} supported by specific clinical features`);
 if(data.presenting.impairments.length)evidence.push(`functional impairment across ${naturalList(data.presenting.impairments.slice(0,5).map(v=>v.toLowerCase()))}`);
 const missing=[];
 if(!data.diagnosis.primary)missing.push('enter a tentative or established primary diagnosis');
 if(!data.presenting.duration)missing.push('clarify symptom duration');
 if(!data.presenting.impairments.length)missing.push('document functional impairment');
 if(!domains.length)missing.push('document symptom-level evidence');
 if(!data.risk.overallRisk)missing.push('complete overall risk formulation');
 return {
  evidence:evidence.length?`Current support includes ${naturalList(evidence)}.`:'Assessment evidence has not yet been sufficiently entered.',
  missing:missing.length?`Before finalizing, consider: ${naturalList(missing)}.`:'The major diagnostic-support elements are documented.'
 };
}

function Documentation({data,outputs,copy,dispatch}){
 const [filter,setFilter]=useState('clinicalPackage');
 const entries=Object.entries(outputs);
 const packages={
  clinicalPackage:['chiefComplaint','hpi','psychiatricHistory','familyHistory','medicalHistory','medications','substanceUse','traumaHistory','socialHistory','strengths','mse','risk','measures'],
  diagnosticPackage:['diagnosticSummary','diagnosticRationale','medicalNecessity','levelOfCare','clinicalFormulation','treatmentFocus'],
  safetyPackage:['risk','safetyPlan']
 };
 const visible=entries.filter(([key])=>filter==='all'||(packages[filter]||[]).includes(key));
 const copyPackage=()=>{
  const text=visible.map(([key,value])=>`${titleCase(key).toUpperCase()}\n${value}`).join('\n\n');
  copy(text);
 };
 return <Page><div className="workspace-grid"><div>
  <Card title="Generated Documentation Studio">
   <div className="documentation-toolbar">
    <div className="package-tabs">
     <button className={filter==='clinicalPackage'?'active':''} onClick={()=>setFilter('clinicalPackage')}>Assessment</button>
     <button className={filter==='diagnosticPackage'?'active':''} onClick={()=>setFilter('diagnosticPackage')}>Diagnosis & Formulation</button>
     <button className={filter==='safetyPackage'?'active':''} onClick={()=>setFilter('safetyPackage')}>Risk & Safety</button>
     <button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>All Outputs</button>
    </div>
    <div className="toolbar-actions">
     <button className="light" onClick={()=>dispatch({type:'GENERATE'})}>↻ Regenerate Package</button>
     <button onClick={copyPackage} disabled={!visible.length}>Copy This Package</button>
    </div>
   </div>
   {!entries.length&&<div className="info">Complete the assessment and click Generate. Diagnostic narratives will be synthesized from the clinical data and remain editable on the Diagnosis page.</div>}
   {visible.map(([key,value])=><article className={`output-card output-${key}`} key={key}>
    <div className="output-head"><h3>{titleCase(key)}</h3><button className="light small" onClick={()=>copy(value)}>Copy</button></div>
    <textarea readOnly value={value}/>
   </article>)}
  </Card>
 </div><ClinicalSidePanel data={data} section="documentation"/></div></Page>
}
function Page({children}){return <div className="page">{children}</div>}function Card({title,children}){return <section className="card"><h2>{title}</h2>{children}</section>}function Grid({columns=2,children}){return <div className={`grid cols-${columns}`}>{children}</div>}function Input({label,value,onChange,placeholder=''}){return <label className="field"><span>{label}</span><input value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></label>}function TextArea({label,value,onChange,placeholder=''}){return <label className="field"><span>{label}</span><textarea value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/></label>}function Select({label,value,onChange,options}){return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}><option value="">Select...</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>}function Checks({options,selected,onToggle}){return <div className="checks">{options.map(o=><label key={o}><input type="checkbox" checked={selected.includes(o)} onChange={()=>onToggle(o)}/><span>{o}</span></label>)}</div>}function Stat({label,value}){return <div><small>{label}</small><strong>{value}</strong></div>}function titleCase(value){return value.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}
export default App;
