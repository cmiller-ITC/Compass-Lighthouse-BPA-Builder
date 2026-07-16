
import { useMemo, useReducer, useState } from "react";
import { initialCaseData, reducer } from "./caseState";
import "./styles.css";

const NAV = [
  ["home", "🏠", "Home"],
  ["presenting", "📝", "Presenting"],
  ["history", "📚", "History"],
  ["medical", "🩺", "Medical / Substance"],
  ["social", "🌿", "Trauma / Social / Strengths"],
  ["mse", "🧠", "MSE / Risk"],
  ["diagnosis", "🔎", "Measures / Diagnosis"],
  ["documentation", "📄", "Documentation"]
];

const concernOptions = ["Depression / low mood","Anxiety","Panic symptoms","OCD symptoms","ADHD / executive functioning","Trauma-related concerns","Grief / loss","Relationship stress","Work / school stress","Burnout","Chronic pain / health stress","Self-esteem / identity concerns"];
const symptomOptions = ["Depressed mood","Loss of interest / pleasure","Excessive worry","Difficulty controlling worry","Panic attacks","Restlessness","Fatigue / low energy","Sleep disturbance","Appetite / weight changes","Difficulty concentrating","Irritability","Avoidance","Intrusive thoughts","Compulsions / rituals","Hopelessness","Worthlessness / guilt","Emotional dysregulation","Social withdrawal"];
const impairmentOptions = ["Occupational functioning","Academic functioning","Family relationships","Intimate relationships","Social functioning","Financial functioning","Housing stability","Self-care / ADLs","Sleep / energy","Parenting / caregiving","Physical health"];
const psychDx = ["Major depressive disorder","Generalized anxiety disorder","Panic disorder","Bipolar disorder","ADHD","OCD","PTSD","Psychotic disorder","Eating disorder","Substance-use disorder","Personality disorder","Other / unspecified"];
const services = ["Outpatient therapy","Medication management","Psychiatric hospitalization","Partial hospitalization","Intensive outpatient","Crisis stabilization","Emergency behavioral-health evaluation","Substance-use treatment"];
const familyConditions = ["Depression","Anxiety","Bipolar disorder","ADHD / executive functioning","Trauma / adverse experiences","Substance-use disorder","Psychosis","Suicide attempt / death by suicide","Psychiatric hospitalization","Medical illness impacting mental health"];
const medicalConditions = ["Chronic pain","Fibromyalgia","Thyroid condition","Diabetes","Cardiovascular condition","Neurological condition","Sleep disorder","Autoimmune condition","PCOS / hormonal condition","Traumatic brain injury","Seizure disorder","Other chronic illness"];
const traumaExperiences = ["Childhood abuse or neglect","Domestic / intimate-partner violence","Sexual violence","Community violence","Medical trauma","Accident / injury","Traumatic loss","Discrimination / identity-based harm","Military trauma","Other adverse experience"];
const traumaSymptoms = ["Intrusive memories","Nightmares","Flashbacks","Avoidance","Hypervigilance","Exaggerated startle","Emotional numbing / detachment","Negative beliefs / self-blame","Irritability / anger","Sleep disturbance","Dissociation"];
const needs = ["Food insecurity","Housing instability","Transportation barriers","Financial strain","Legal support","Employment support","Educational support","Caregiving support","Medical care coordination"];
const strengths = ["Insight","Motivation for change","Treatment engagement","Future orientation","Coping skills","Help-seeking behavior","Family support","Peer support","Spirituality / values","Employment / education goals","Creativity","Resilience"];
const riskProtective = ["Future orientation","Reasons for living","Family support","Responsibility to children / dependents","Treatment engagement","Spiritual beliefs","Restricted access to lethal means","Willingness to use safety plan"];

function App() {
  const [data, dispatch] = useReducer(reducer, initialCaseData);
  const [module, setModule] = useState("home");
  const [status, setStatus] = useState("");

  const set = (path, value) => dispatch({ type: "SET", path, value });
  const toggle = (path, value) => dispatch({ type: "TOGGLE", path, value });
  const flash = (text) => { setStatus(text); setTimeout(() => setStatus(""), 2200); };

  const outputText = useMemo(() => Object.entries(data.generated)
    .filter(([, value]) => value)
    .map(([key, value]) => `${titleCase(key)}\n${value}`)
    .join("\n\n────────────────────────────────────────\n\n"), [data.generated]);

  const generate = () => {
    dispatch({ type: "GENERATE" });
    setModule("documentation");
    flash("✓ Assessment narratives generated.");
  };

  const clear = () => {
    dispatch({ type: "RESET" });
    setModule("home");
    flash("✓ Compass cleared.");
  };

  const copy = async (text = outputText) => {
    if (!text) return flash("Generate the assessment first.");
    try { await navigator.clipboard.writeText(text); }
    catch {
      const el = document.createElement("textarea");
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand("copy"); el.remove();
    }
    flash("✓ Copied.");
  };

  const print = () => {
    if (!outputText) return flash("Generate the assessment first.");
    const w = window.open("", "_blank", "width=920,height=700");
    if (!w) return flash("Please allow pop-ups to print.");
    const safe = outputText.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
    w.document.write(`<!doctype html><html><head><title>Lighthouse Compass Assessment</title><style>@page{size:letter;margin:.65in}body{font-family:Arial;color:#111}pre{white-space:pre-wrap;font-family:Arial;line-height:1.5}</style></head><body><h1>Lighthouse Compass Assessment</h1><pre>${safe}</pre></body></html>`);
    w.document.close(); setTimeout(() => w.print(), 250);
  };

  const content = {
    home: <Home data={data} setModule={setModule} />,
    presenting: <Presenting data={data} set={set} toggle={toggle} />,
    history: <History data={data} set={set} toggle={toggle} />,
    medical: <Medical data={data} set={set} toggle={toggle} dispatch={dispatch} />,
    social: <Social data={data} set={set} toggle={toggle} />,
    mse: <MseRisk data={data} set={set} toggle={toggle} />,
    diagnosis: <Diagnosis data={data} set={set} dispatch={dispatch} />,
    documentation: <Documentation outputs={data.generated} copy={copy} />
  }[module];

  return <div className="app">
    <aside>
      <div className="brand">🧭 Lighthouse Compass</div>
      <div className="version">6.1 Assessment Migration</div>
      <nav>{NAV.map(([id, icon, label]) =>
        <button key={id} className={module===id?"active":""} onClick={() => setModule(id)}>{icon} {label}</button>
      )}</nav>
      <div className="no-phi">No PHI storage<br/>Clinician-guided decision support</div>
    </aside>
    <main>
      <header>
        <div><small>Lighthouse Clinical Suite</small><strong>{NAV.find(x=>x[0]===module)?.[2]}</strong></div>
        <div className="actions">
          <button onClick={generate}>✨ Generate</button>
          <button className="light" onClick={() => copy()}>📄 Copy</button>
          <button className="light" onClick={print}>🖨 Print</button>
          <button className="light" onClick={clear}>↺ Clear</button>
        </div>
      </header>
      {status && <div className="status">{status}</div>}
      {content}
    </main>
  </div>;
}

function Home({ data, setModule }) {
  const p = data.presenting;
  return <Page>
    <section className="hero">
      <div className="eyebrow">Lighthouse Compass 6.1</div>
      <h1>Full Assessment Migration — Phase 1</h1>
      <p>This build moves the major intake domains into one state-driven clinical application. It does not store data.</p>
      <div className="stats">
        <Stat label="Concerns" value={p.concerns.length}/>
        <Stat label="Symptoms" value={p.symptoms.length}/>
        <Stat label="Impairments" value={p.impairments.length}/>
        <Stat label="Generated sections" value={Object.keys(data.generated).length}/>
      </div>
    </section>
    <div className="home-grid">
      {NAV.slice(1,7).map(([id,icon,label]) => <article className="card" key={id}><h3>{icon} {label}</h3><button onClick={()=>setModule(id)}>Open</button></article>)}
    </div>
  </Page>;
}

function Presenting({ data, set, toggle }) {
  const p=data.presenting;
  return <Page>
    <Card title="Presenting Problems & Symptoms">
      <Grid columns={2}>
        <Select label="Reason Seeking Care Now" value={p.reasonSeekingCare} onChange={v=>set("presenting.reasonSeekingCare",v)} options={["New onset symptoms","Worsening symptoms","Return to treatment","Life transition / adjustment stress","Relationship or family conflict","Work or school impairment","Diagnostic clarification"]}/>
        <Select label="Client Request" value={p.clientRequest} onChange={v=>set("presenting.clientRequest",v)} options={["Start individual therapy","Restart individual therapy","Diagnostic clarification","Coping skills and support","Treatment planning"]}/>
      </Grid>
      <TextArea label="Patient-Specific Narrative" value={p.patientNarrative} onChange={v=>set("presenting.patientNarrative",v)}/>
    </Card>
    <Card title="Primary Concerns"><Checks options={concernOptions} selected={p.concerns} onToggle={v=>toggle("presenting.concerns",v)}/></Card>
    <Card title="Symptom Checklist"><Checks options={symptomOptions} selected={p.symptoms} onToggle={v=>toggle("presenting.symptoms",v)}/></Card>
    <Card title="Clinical Qualifiers">
      <Grid columns={4}>
        <Select label="Duration" value={p.duration} onChange={v=>set("presenting.duration",v)} options={["Less than 1 month","1–6 months","More than 6 months","More than 1 year","Chronic / longstanding"]}/>
        <Select label="Frequency" value={p.frequency} onChange={v=>set("presenting.frequency",v)} options={["Occasional","Weekly","Most days","Daily","Nearly constant"]}/>
        <Select label="Severity" value={p.severity} onChange={v=>set("presenting.severity",v)} options={["Mild","Moderate","Moderately severe","Severe"]}/>
        <Select label="Course" value={p.course} onChange={v=>set("presenting.course",v)} options={["Improving","Stable","Fluctuating","Worsening"]}/>
      </Grid>
    </Card>
    <Card title="Functional Impairment"><Checks options={impairmentOptions} selected={p.impairments} onToggle={v=>toggle("presenting.impairments",v)}/></Card>
  </Page>;
}

function History({ data, set, toggle }) {
  const p=data.psychiatricHistory, f=data.familyHistory;
  return <Page>
    <Card title="Psychiatric History">
      <h3>Previous Diagnoses</h3><Checks options={psychDx} selected={p.diagnoses} onToggle={v=>toggle("psychiatricHistory.diagnoses",v)}/>
      <h3>Previous Services</h3><Checks options={services} selected={p.services} onToggle={v=>toggle("psychiatricHistory.services",v)}/>
      <Grid columns={4}>
        <Select label="Hospitalization" value={p.hospitalization} onChange={v=>set("psychiatricHistory.hospitalization",v)} options={["None reported","One prior admission","Multiple prior admissions","Unknown"]}/>
        <Select label="Suicide Attempts" value={p.suicideAttempts} onChange={v=>set("psychiatricHistory.suicideAttempts",v)} options={["None reported","One prior attempt","Multiple prior attempts","Unknown"]}/>
        <Select label="NSSI History" value={p.nssi} onChange={v=>set("psychiatricHistory.nssi",v)} options={["None reported","Historical","Current / recent","Unknown"]}/>
        <Select label="Treatment Response" value={p.treatmentResponse} onChange={v=>set("psychiatricHistory.treatmentResponse",v)} options={["Helpful","Partially helpful","Limited benefit","Adverse response","Unknown"]}/>
      </Grid>
      <TextArea label="Additional Psychiatric History Details" value={p.details} onChange={v=>set("psychiatricHistory.details",v)}/>
    </Card>
    <Card title="Family History">
      <Checks options={familyConditions} selected={f.conditions} onToggle={v=>toggle("familyHistory.conditions",v)}/>
      <Grid columns={2}>
        <Select label="Family Relationship Pattern" value={f.relationshipPattern} onChange={v=>set("familyHistory.relationshipPattern",v)} options={["Supportive","Generally stable","Conflictual","Estranged","Enmeshed","Limited contact","Mixed / complex"]}/>
        <Select label="Family Support Level" value={f.supportLevel} onChange={v=>set("familyHistory.supportLevel",v)} options={["Strong support","Some support","Limited support","No support","Mixed / inconsistent"]}/>
      </Grid>
      <TextArea label="Additional Family History Details" value={f.details} onChange={v=>set("familyHistory.details",v)}/>
    </Card>
  </Page>;
}

function Medical({ data, set, toggle, dispatch }) {
  const m=data.medical, s=data.substance;
  return <Page>
    <Card title="Medical & Biological Factors">
      <Checks options={medicalConditions} selected={m.conditions} onToggle={v=>toggle("medical.conditions",v)}/>
      <Grid columns={4}>
        <Select label="Sleep" value={m.sleep} onChange={v=>set("medical.sleep",v)} options={["No concerns","Mild disruption","Moderate disruption","Severe disruption","Insomnia","Hypersomnia"]}/>
        <Select label="Pain" value={m.pain} onChange={v=>set("medical.pain",v)} options={["None reported","Intermittent","Chronic mild","Chronic moderate","Chronic severe"]}/>
        <Input label="Allergies" value={m.allergies} onChange={v=>set("medical.allergies",v)}/>
        <Select label="Medical Follow-Up" value={m.providerFollowUp} onChange={v=>set("medical.providerFollowUp",v)} options={["Established PCP","Specialty care","Needs PCP","Inconsistent follow-up","Unknown"]}/>
      </Grid>
      <TextArea label="Additional Medical Details" value={m.details} onChange={v=>set("medical.details",v)}/>
    </Card>
    <Card title="Current Medications">
      {m.medications.map((med,i)=><div className="med-row" key={i}>
        <Input label="Medication" value={med.name} onChange={v=>dispatch({type:"SET_MEDICATION",index:i,field:"name",value:v})}/>
        <Input label="Dose" value={med.dose} onChange={v=>dispatch({type:"SET_MEDICATION",index:i,field:"dose",value:v})}/>
        <Input label="Frequency" value={med.frequency} onChange={v=>dispatch({type:"SET_MEDICATION",index:i,field:"frequency",value:v})}/>
        <Input label="Indication" value={med.indication} onChange={v=>dispatch({type:"SET_MEDICATION",index:i,field:"indication",value:v})}/>
        {m.medications.length>1 && <button className="danger small" onClick={()=>dispatch({type:"REMOVE_MEDICATION",index:i})}>Remove</button>}
      </div>)}
      <button onClick={()=>dispatch({type:"ADD_MEDICATION"})}>+ Add Medication</button>
    </Card>
    <Card title="Substance-Use Snapshot">
      <Grid columns={3}>
        {["alcohol","cannabis","nicotine","opioids","stimulants","sedatives","other"].map(key=><Select key={key} label={titleCase(key)} value={s[key]} onChange={v=>set(`substance.${key}`,v)} options={["Denied","Rare / social","Occasional","Weekly","Daily","In remission","Medical use","Unknown"]}/>)}
      </Grid>
      <Grid columns={2}>
        <Select label="Treatment History" value={s.treatmentHistory} onChange={v=>set("substance.treatmentHistory",v)} options={["None reported","Outpatient","IOP","Residential","Detoxification","Mutual-help / peer recovery","Multiple services"]}/>
        <Input label="Recovery Supports" value={s.recoverySupports} onChange={v=>set("substance.recoverySupports",v)}/>
      </Grid>
      <TextArea label="Additional Substance-Use Details" value={s.details} onChange={v=>set("substance.details",v)}/>
    </Card>
  </Page>;
}

function Social({ data, set, toggle }) {
  const t=data.trauma, s=data.social;
  return <Page>
    <Card title="Trauma-Informed History">
      <h3>Experiences</h3><Checks options={traumaExperiences} selected={t.experiences} onToggle={v=>toggle("trauma.experiences",v)}/>
      <h3>Current Trauma Symptoms</h3><Checks options={traumaSymptoms} selected={t.symptoms} onToggle={v=>toggle("trauma.symptoms",v)}/>
      <TextArea label="Additional Trauma Details" value={t.details} onChange={v=>set("trauma.details",v)}/>
    </Card>
    <Card title="Social & Environmental History">
      <Grid columns={3}>
        <Select label="Housing" value={s.housing} onChange={v=>set("social.housing",v)} options={["Stable","Temporary","At risk","Homeless / unhoused","Residential program","Unknown"]}/>
        <Select label="Employment" value={s.employment} onChange={v=>set("social.employment",v)} options={["Full-time","Part-time","Unemployed","Student","Disabled / unable to work","Retired","Caregiver"]}/>
        <Select label="Financial Stress" value={s.finances} onChange={v=>set("social.finances",v)} options={["None","Mild","Moderate","Severe","Crisis-level"]}/>
        <Select label="Transportation" value={s.transportation} onChange={v=>set("social.transportation",v)} options={["Reliable","Limited","Unreliable","No transportation"]}/>
        <Select label="Relationships" value={s.relationships} onChange={v=>set("social.relationships",v)} options={["Supportive","Generally stable","Conflictual","Isolated","Recent separation / loss","Mixed"]}/>
        <Select label="Legal Stress" value={s.legal} onChange={v=>set("social.legal",v)} options={["None","Current legal matter","Probation / parole","Custody matter","Protective-order concern","Historical only"]}/>
      </Grid>
      <Input label="Support System Description" value={s.supports} onChange={v=>set("social.supports",v)}/>
      <h3>Current Practical Needs</h3><Checks options={needs} selected={s.needs} onToggle={v=>toggle("social.needs",v)}/>
    </Card>
    <Card title="Strengths & Protective Factors"><Checks options={strengths} selected={data.strengths} onToggle={v=>toggle("strengths",v)}/></Card>
  </Page>;
}

function MseRisk({ data, set, toggle }) {
  const m=data.mse, r=data.risk;
  return <Page>
    <Card title="Mental Status Examination">
      <Grid columns={4}>
        <Select label="Appearance" value={m.appearance} onChange={v=>set("mse.appearance",v)} options={["Appropriate / well-groomed","Casual","Disheveled","Unkempt","Bizarre / unusual"]}/>
        <Select label="Behavior" value={m.behavior} onChange={v=>set("mse.behavior",v)} options={["Cooperative","Engaged","Guarded","Restless","Agitated","Withdrawn","Tearful"]}/>
        <Select label="Orientation" value={m.orientation} onChange={v=>set("mse.orientation",v)} options={["Alert and oriented ×4","Oriented to person and place","Partially oriented","Disoriented"]}/>
        <Select label="Speech" value={m.speech} onChange={v=>set("mse.speech",v)} options={["Normal rate, rhythm, and volume","Rapid","Pressured","Slow","Soft","Loud","Minimal"]}/>
        <Select label="Mood" value={m.mood} onChange={v=>set("mse.mood",v)} options={["Euthymic","Anxious","Depressed","Irritable","Angry","Sad","Elevated","Labile"]}/>
        <Select label="Affect" value={m.affect} onChange={v=>set("mse.affect",v)} options={["Full range","Appropriate / congruent","Constricted","Blunted","Flat","Labile","Incongruent"]}/>
        <Select label="Thought Process" value={m.thoughtProcess} onChange={v=>set("mse.thoughtProcess",v)} options={["Linear and goal-directed","Logical","Circumstantial","Tangential","Disorganized","Racing","Thought blocking"]}/>
        <Select label="Thought Content" value={m.thoughtContent} onChange={v=>set("mse.thoughtContent",v)} options={["Unremarkable","Preoccupation","Obsessions","Delusions","Paranoia","Hopelessness","Worthlessness","Suicidal content"]}/>
        <Select label="Perception" value={m.perception} onChange={v=>set("mse.perception",v)} options={["No perceptual disturbance","Auditory hallucinations","Visual hallucinations","Other perceptual disturbance"]}/>
        <Select label="Cognition" value={m.cognition} onChange={v=>set("mse.cognition",v)} options={["Grossly intact","Mildly impaired","Moderately impaired","Severely impaired"]}/>
        <Select label="Insight" value={m.insight} onChange={v=>set("mse.insight",v)} options={["Good","Fair","Limited","Poor"]}/>
        <Select label="Judgment" value={m.judgment} onChange={v=>set("mse.judgment",v)} options={["Good","Fair","Limited","Poor"]}/>
      </Grid>
      <TextArea label="Additional MSE Observations" value={m.additional} onChange={v=>set("mse.additional",v)}/>
    </Card>
    <Card title="Risk & Safety">
      <Grid columns={4}>
        <Select label="Suicide Screen" value={r.suicideScreen} onChange={v=>set("risk.suicideScreen",v)} options={["Negative","Positive for passive ideation","Positive for active ideation","Positive for recent behavior","Not completed"]}/>
        <Select label="Ideation" value={r.ideation} onChange={v=>set("risk.ideation",v)} options={["Denied","Passive","Active without plan","Active with plan","Unknown"]}/>
        <Select label="Intent" value={r.intent} onChange={v=>set("risk.intent",v)} options={["Denied","No current intent","Ambivalent","Intent present","Unknown"]}/>
        <Select label="Plan" value={r.plan} onChange={v=>set("risk.plan",v)} options={["Denied","No specific plan","Vague plan","Specific plan","Unknown"]}/>
        <Select label="Recent Behavior" value={r.behavior} onChange={v=>set("risk.behavior",v)} options={["Denied","Preparatory behavior","Aborted attempt","Interrupted attempt","Recent attempt","NSSI"]}/>
        <Select label="Overall Risk" value={r.overallRisk} onChange={v=>set("risk.overallRisk",v)} options={["Low","Low to moderate","Moderate","High","Imminent"]}/>
        <Select label="Safety Response" value={r.safetyResponse} onChange={v=>set("risk.safetyResponse",v)} options={["No additional action indicated","Safety plan completed","Crisis resources reviewed","Higher level of care recommended","Emergency evaluation initiated"]}/>
      </Grid>
      <h3>Protective Factors</h3><Checks options={riskProtective} selected={r.protectiveFactors} onToggle={v=>toggle("risk.protectiveFactors",v)}/>
    </Card>
  </Page>;
}

function Diagnosis({ data, set, dispatch }) {
  return <Page>
    <Card title="Standardized Measures">
      {data.measures.map((m,i)=><div className="measure-row" key={i}>
        <Input label="Measure" value={m.name} onChange={v=>dispatch({type:"SET_MEASURE",index:i,field:"name",value:v})}/>
        <Input label="Score" value={m.score} onChange={v=>dispatch({type:"SET_MEASURE",index:i,field:"score",value:v})}/>
        <Input label="Interpretation" value={m.interpretation} onChange={v=>dispatch({type:"SET_MEASURE",index:i,field:"interpretation",value:v})}/>
      </div>)}
    </Card>
    <Card title="Diagnosis & Level of Care">
      <Grid columns={2}>
        <Input label="Primary Diagnosis" value={data.diagnosis.primary} onChange={v=>set("diagnosis.primary",v)}/>
        <Input label="Secondary Diagnosis" value={data.diagnosis.secondary} onChange={v=>set("diagnosis.secondary",v)}/>
        <Input label="Rule-Out / Continue to Assess" value={data.diagnosis.ruleOut} onChange={v=>set("diagnosis.ruleOut",v)}/>
        <Select label="Recommended Level of Care" value={data.diagnosis.levelOfCare} onChange={v=>set("diagnosis.levelOfCare",v)} options={["Routine outpatient psychotherapy","Outpatient psychotherapy + medication management","Intensive outpatient","Partial hospitalization","Residential treatment","Inpatient psychiatric care","Substance-use level of care","Other"]}/>
      </Grid>
    </Card>
  </Page>;
}

function Documentation({ outputs, copy }) {
  const entries=Object.entries(outputs);
  return <Page><Card title="Generated Documentation Studio">
    {!entries.length && <div className="info">Complete the assessment and click Generate.</div>}
    {entries.map(([key,value])=><article className="output-card" key={key}>
      <div className="output-head"><h3>{titleCase(key)}</h3><button className="light small" onClick={()=>copy(value)}>Copy</button></div>
      <textarea readOnly value={value}/>
    </article>)}
  </Card></Page>;
}

function Page({children}){return <div className="page">{children}</div>}
function Card({title,children}){return <section className="card"><h2>{title}</h2>{children}</section>}
function Grid({columns=2,children}){return <div className={`grid cols-${columns}`}>{children}</div>}
function Input({label,value,onChange}){return <label className="field"><span>{label}</span><input value={value} onChange={e=>onChange(e.target.value)}/></label>}
function TextArea({label,value,onChange}){return <label className="field"><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)}/></label>}
function Select({label,value,onChange,options}){return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}><option value="">Select...</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>}
function Checks({options,selected,onToggle}){return <div className="checks">{options.map(o=><label key={o}><input type="checkbox" checked={selected.includes(o)} onChange={()=>onToggle(o)}/><span>{o}</span></label>)}</div>}
function Stat({label,value}){return <div><small>{label}</small><strong>{value}</strong></div>}
function titleCase(value){return value.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}

export default App;
