
import { useMemo, useReducer, useState } from "react";
import { initialCaseData, reducer, symptomDomainDefinitions } from "./caseState";
import "./styles.css";

const NAV=[['home','🏠','Home'],['presenting','📝','Presenting'],['symptoms','🧩','Symptom Domains'],['history','📚','History'],['medical','🩺','Medical / Substance'],['social','🌿','Trauma / Social / Strengths'],['mse','🧠','MSE / Risk'],['diagnosis','🔎','Measures / Diagnosis'],['documentation','📄','Documentation']];
const concernOptions=['Depression / low mood','Anxiety','Panic symptoms','Bipolar / mood instability','OCD symptoms','ADHD / executive functioning','Trauma-related concerns','Psychosis / perceptual concerns','Eating / body-image concerns','Substance-use concerns','Grief / loss','Relationship stress','Work / school stress','Adjustment / life transition','Burnout','Chronic pain / health stress','Self-esteem / identity concerns'];
const impairmentOptions=['Occupational functioning','Academic functioning','Family relationships','Intimate relationships','Social functioning','Financial functioning','Housing stability','Self-care / ADLs','Sleep / energy','Parenting / caregiving','Physical health','Decision-making','Daily routines'];
const psychDx=['Major depressive disorder','Generalized anxiety disorder','Panic disorder','Bipolar disorder','ADHD','OCD','PTSD','Psychotic disorder','Eating disorder','Substance-use disorder','Personality disorder','Adjustment disorder','Other / unspecified'];
const services=['Outpatient therapy','Medication management','Psychiatric hospitalization','Partial hospitalization','Intensive outpatient','Crisis stabilization','Emergency behavioral-health evaluation','Substance-use treatment','Residential treatment'];
const familyConditions=['Depression','Anxiety','Bipolar disorder','ADHD / executive functioning','Trauma / adverse experiences','Substance-use disorder','Psychosis','Suicide attempt / death by suicide','Psychiatric hospitalization','Medical illness impacting mental health'];
const medicalConditions=['Chronic pain','Fibromyalgia','Thyroid condition','Diabetes','Cardiovascular condition','Neurological condition','Sleep disorder','Autoimmune condition','PCOS / hormonal condition','Traumatic brain injury','Seizure disorder','Other chronic illness'];
const traumaExperiences=['Childhood abuse or neglect','Domestic / intimate-partner violence','Sexual violence','Community violence','Medical trauma','Accident / injury','Traumatic loss','Discrimination / identity-based harm','Military trauma','Other adverse experience','Trauma history deferred','No trauma disclosed'];
const traumaSymptoms=['Intrusive memories','Nightmares','Flashbacks','Avoidance','Hypervigilance','Exaggerated startle','Emotional numbing / detachment','Negative beliefs / self-blame','Irritability / anger','Sleep disturbance','Dissociation'];
const needs=['Food insecurity','Housing instability','Transportation barriers','Financial strain','Legal support','Employment support','Educational support','Caregiving support','Medical care coordination','Childcare needs','Safety concerns'];
const strengths=['Insight','Motivation for change','Treatment engagement','Future orientation','Coping skills','Help-seeking behavior','Family support','Peer support','Spirituality / values','Employment / education goals','Creativity','Resilience','Problem-solving ability','Sense of humor','Community connection'];
const riskProtective=['Future orientation','Reasons for living','Family support','Responsibility to children / dependents','Treatment engagement','Spiritual beliefs','Restricted access to lethal means','Willingness to use safety plan','Employment / education goals','Pets / caregiving responsibilities'];

function App(){
 const [data,dispatch]=useReducer(reducer,initialCaseData);const [module,setModule]=useState('home');const [status,setStatus]=useState('');
 const set=(path,value)=>dispatch({type:'SET',path,value});const toggle=(path,value)=>dispatch({type:'TOGGLE',path,value});const flash=t=>{setStatus(t);setTimeout(()=>setStatus(''),2200)};
 const outputText=useMemo(()=>Object.entries(data.generated).filter(([,v])=>v).map(([k,v])=>`${titleCase(k)}\n${v}`).join('\n\n────────────────────────────────────────\n\n'),[data.generated]);
 const generate=()=>{dispatch({type:'GENERATE'});setModule('documentation');flash('✓ Assessment narratives generated.')};
 const clear=()=>{dispatch({type:'RESET'});setModule('home');flash('✓ Compass cleared.')};
 const copy=async(text=outputText)=>{if(!text)return flash('Generate the assessment first.');try{await navigator.clipboard.writeText(text)}catch{const e=document.createElement('textarea');e.value=text;document.body.appendChild(e);e.select();document.execCommand('copy');e.remove()}flash('✓ Copied.')};
 const print=()=>{if(!outputText)return flash('Generate the assessment first.');const w=window.open('','_blank','width=920,height=700');if(!w)return flash('Please allow pop-ups to print.');const safe=outputText.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');w.document.write(`<!doctype html><html><head><title>Lighthouse Compass Assessment</title><style>@page{size:letter;margin:.65in}body{font-family:Arial;color:#111}pre{white-space:pre-wrap;font-family:Arial;line-height:1.5}</style></head><body><h1>Lighthouse Compass Assessment</h1><pre>${safe}</pre></body></html>`);w.document.close();setTimeout(()=>w.print(),250)};
 const content={home:<Home data={data} setModule={setModule}/>,presenting:<Presenting data={data} set={set} toggle={toggle}/>,symptoms:<SymptomDomains data={data} set={set} toggle={toggle} dispatch={dispatch}/>,history:<History data={data} set={set} toggle={toggle}/>,medical:<Medical data={data} set={set} toggle={toggle} dispatch={dispatch}/>,social:<Social data={data} set={set} toggle={toggle}/>,mse:<MseRisk data={data} set={set} toggle={toggle}/>,diagnosis:<Diagnosis data={data} set={set} dispatch={dispatch}/>,documentation:<Documentation data={data} outputs={data.generated} copy={copy} dispatch={dispatch}/>}[module];
 return <div className="app"><aside><div className="brand">🧭 Lighthouse Compass</div><div className="version">6.5 Diagnostic Intelligence</div><nav>{NAV.map(([id,icon,label])=><button key={id} className={module===id?'active':''} onClick={()=>setModule(id)}>{icon} {label}</button>)}</nav><div className="no-phi">No PHI storage<br/>Clinician-guided decision support</div></aside><main><header><div><small>Lighthouse Clinical Suite</small><strong>{NAV.find(x=>x[0]===module)?.[2]}</strong></div><div className="actions"><button onClick={generate}>✨ Generate</button><button className="light" onClick={()=>copy()}>📄 Copy</button><button className="light" onClick={print}>🖨 Print</button><button className="light" onClick={clear}>↺ Clear</button></div></header>{status&&<div className="status">{status}</div>}{content}</main></div>;
}

function Home({data,setModule}){const p=data.presenting;const active=Object.values(p.domains).filter(d=>d.symptoms.length||d.notes||d.context).length;return <Page><section className="hero"><div className="eyebrow">Lighthouse Compass 6.4</div><h1>Diagnostic & Documentation Intelligence</h1><p>A clinician-guided workspace with integrated narrative synthesis, responsive coaching, COMAR readiness, and documentation-quality review.</p><div className="stats"><Stat label="Concerns" value={p.concerns.length}/><Stat label="Active symptom domains" value={active}/><Stat label="Impairments" value={p.impairments.length}/><Stat label="Generated sections" value={Object.keys(data.generated).length}/></div></section><div className="home-grid">{NAV.slice(1,8).map(([id,icon,label])=><article className="card" key={id}><h3>{icon} {label}</h3><button onClick={()=>setModule(id)}>Open</button></article>)}</div></Page>}

function Presenting({data,set,toggle}){const p=data.presenting;const readiness=getPresentingReadiness(data);return <Page><div className="workspace-grid"><div><Card title="Presenting Problems & Areas of Concern"><div className="section-kicker">Start with the client’s story</div><Grid columns={2}><Select label="Reason Seeking Care Now" value={p.reasonSeekingCare} onChange={v=>set('presenting.reasonSeekingCare',v)} options={['New onset symptoms','Worsening symptoms','Return to treatment','Life transition / adjustment stress','Relationship or family conflict','Work or school impairment','Diagnostic clarification']}/><Select label="Client Request" value={p.clientRequest} onChange={v=>set('presenting.clientRequest',v)} options={['Start individual therapy','Restart individual therapy','Diagnostic clarification','Coping skills and support','Treatment planning','Medication evaluation','Higher level of care assessment']}/></Grid><TextArea label="Client’s Own Words / Patient-Specific Presenting Narrative" value={p.patientNarrative} onChange={v=>set('presenting.patientNarrative',v)}/></Card><Card title="Primary Areas of Concern"><Checks options={concernOptions} selected={p.concerns} onToggle={v=>toggle('presenting.concerns',v)}/></Card><Card title="Overall Clinical Qualifiers"><Grid columns={4}><Select label="Duration" value={p.duration} onChange={v=>set('presenting.duration',v)} options={['Less than 1 month','1–6 months','More than 6 months','More than 1 year','Chronic / longstanding']}/><Select label="Frequency" value={p.frequency} onChange={v=>set('presenting.frequency',v)} options={['Occasional','Weekly','Most days','Daily','Nearly constant']}/><Select label="Severity" value={p.severity} onChange={v=>set('presenting.severity',v)} options={['Mild','Moderate','Moderately severe','Severe']}/><Select label="Course" value={p.course} onChange={v=>set('presenting.course',v)} options={['Improving','Stable','Fluctuating','Worsening']}/></Grid></Card><Card title="Functional Impairment"><div className="section-kicker">Connect symptoms to daily life and medical necessity</div><Checks options={impairmentOptions} selected={p.impairments} onToggle={v=>toggle('presenting.impairments',v)}/></Card></div><ClinicalSidePanel data={data} readiness={readiness}/></div></Page>}

function SymptomDomains({data,set,toggle,dispatch}){const readiness=getPresentingReadiness(data);return <Page><div className="workspace-grid"><div><Card title="Collapsible Symptom Domains"><div className="info">Open only the categories relevant to the client. Each domain combines symptoms, qualifiers, DSM-oriented clarifiers, functional impact, and patient-specific examples.</div><div className="accordion-stack">{Object.entries(symptomDomainDefinitions).map(([key,def])=>{const d=data.presenting.domains[key];const count=d.symptoms.length;const complete=count>0&&d.duration&&d.frequency&&d.severity&&d.impairment.length>0;return <details className="accordion" key={key}><summary><span className="summary-title">{def.icon} {def.label}</span><span className={`badge ${complete?'complete':count?'has-data':''}`}>{complete?'COMAR Ready':count?`${count} selected`:'Not assessed'}</span></summary><div className="accordion-body"><h3>Symptoms / Features</h3><Checks options={def.symptoms} selected={d.symptoms} onToggle={v=>toggle(`presenting.domains.${key}.symptoms`,v)}/><h3>Domain Qualifiers</h3><Grid columns={3}><Select label="Duration" value={d.duration} onChange={v=>set(`presenting.domains.${key}.duration`,v)} options={['Less than 2 weeks','2 weeks–1 month','1–6 months','6–12 months','More than 1 year','Chronic / longstanding','Episodic','Unclear']}/><Select label="Frequency" value={d.frequency} onChange={v=>set(`presenting.domains.${key}.frequency`,v)} options={['Occasional','Weekly','Several days per week','Most days','Daily','Nearly constant','Episodic','Unclear']}/><Select label="Severity" value={d.severity} onChange={v=>set(`presenting.domains.${key}.severity`,v)} options={['Mild','Moderate','Moderately severe','Severe','Variable','Unclear']}/></Grid><h3>Diagnostic Clarifiers</h3><Grid columns={2}>{def.questions.map(([qid,label,options])=><Select key={qid} label={label} value={d.answers[qid]||''} onChange={v=>dispatch({type:'SET_DOMAIN_ANSWER',domain:key,question:qid,value:v})} options={options}/>)}</Grid><h3>Domain-Specific Functional Impact</h3><Checks options={impairmentOptions} selected={d.impairment} onToggle={v=>toggle(`presenting.domains.${key}.impairment`,v)}/><Grid columns={2}><TextArea label="Context / Triggers / Pattern" value={d.context} onChange={v=>set(`presenting.domains.${key}.context`,v)}/><TextArea label="Patient-Specific Details / Examples" value={d.notes} onChange={v=>set(`presenting.domains.${key}.notes`,v)}/></Grid><DomainCoach domainKey={key} domain={d}/></div></details>})}</div></Card></div><ClinicalSidePanel data={data} readiness={readiness}/></div></Page>}

function ClinicalSidePanel({data,readiness}){
 const [activeTab,setActiveTab]=useState('narrative');
 const story=buildLiveClinicalStory(data);
 const quality=getDocumentationQuality(data,readiness);
 const tabs=[['narrative','📝','Narrative'],['coach','🧠','Coach'],['comar','🟢','COMAR'],['quality','⭐','Quality']];
 return <aside className="clinical-side-panel" aria-label="Lighthouse Intelligence">
  <section className="intelligence-shell">
   <div className="intelligence-header">
    <div><div className="side-label">Lighthouse Intelligence</div><h3>Clinical workspace</h3></div>
    <div className={`mini-score ${readiness.score>=85?'good':readiness.score>=55?'warn':'needs'}`}>{readiness.score}%</div>
   </div>
   <div className="intelligence-tabs" role="tablist" aria-label="Clinical intelligence views">
    {tabs.map(([id,icon,label])=><button key={id} type="button" className={activeTab===id?'active':''} onClick={()=>setActiveTab(id)} role="tab" aria-selected={activeTab===id}><span>{icon}</span>{label}</button>)}
   </div>
   <div className="intelligence-tab-content">
    {activeTab==='narrative'&&<NarrativeTab story={story}/>}
    {activeTab==='coach'&&<CoachTab readiness={readiness}/>}
    {activeTab==='comar'&&<ComarTab readiness={readiness}/>}
    {activeTab==='quality'&&<QualityTab quality={quality}/>}
   </div>
  </section>
 </aside>
}

function NarrativeTab({story}){
 if(!story.hasData)return <div className="empty-intelligence">Begin entering the client’s presenting concerns to see the clinical story develop.</div>;
 return <div className="document-preview">
  <PreviewSection title="Chief Complaint" text={story.chiefComplaint}/>
  <PreviewSection title="History of Present Illness" text={story.hpi}/>
  <PreviewSection title="Current Clinical Picture" text={story.clinicalPicture}/>
  <PreviewSection title="Functional Impairment" text={story.functionalImpairment}/>
  <PreviewSection title="Clinical Context & Treatment Need" text={story.clinicalContext}/>
 </div>
}
function PreviewSection({title,text}){if(!text)return null;return <section className="preview-section"><h4>{title}</h4><p>{text}</p></section>}
function CoachTab({readiness}){return <div className="coach-stack">
 {readiness.strengths.map((item,i)=><div className="coach-strength" key={`s-${i}`}><strong>✓ Strength</strong><span>{item}</span></div>)}
 {readiness.prompts.length?readiness.prompts.map((item,i)=><div className={`coach-item ${item.priority||'standard'}`} key={`p-${i}`}><strong>{item.priority==='high'?'Priority':'Clinical Coach'}</strong><span>{item.text}</span></div>):<div className="coach-success">✓ The presenting section is clinically specific and well supported.</div>}
 </div>}
function ComarTab({readiness}){return <div className="comar-review">
 <div className="score-hero compact"><div className="side-label">Assessment readiness</div><div className="readiness-score">{readiness.score}%</div><div className="progress-track"><span style={{width:`${readiness.score}%`}}/></div></div>
 <div className="requirements-list">{readiness.requirements.map(item=><div className={`requirement-row ${item.met?'met':'missing'}`} key={item.label}><span className="requirement-icon">{item.met?'✓':'!'}</span><div><strong>{item.label}</strong><small>{item.detail}</small></div></div>)}</div>
 <div className="comar-note">This live review supports the presenting-problem, HPI, symptom-course, functional-impairment, and medical-necessity expectations reflected in the Lighthouse Clinical Excellence framework.</div>
 </div>}
function QualityTab({quality}){return <div className="quality-review">
 <div className="score-hero"><div className="side-label">Documentation quality</div><div className="quality-score">{quality.score}%</div><div className={`quality-label ${quality.score>=85?'good':quality.score>=65?'warn':'needs'}`}>{quality.label}</div></div>
 <div className="quality-bars">{quality.metrics.map(metric=><div className="quality-metric" key={metric.label}><div><span>{metric.label}</span><strong>{metric.score}%</strong></div><div className="metric-track"><span style={{width:`${metric.score}%`}}/></div></div>)}</div>
 {quality.suggestion&&<div className="quality-suggestion"><strong>Highest-value improvement</strong><p>{quality.suggestion}</p></div>}
 </div>}
function DomainCoach({domainKey,domain}){const tips=[];if(domain.symptoms.length&&!domain.duration)tips.push('Clarify duration.');if(domain.symptoms.length&&!domain.impairment.length)tips.push('Add a patient-specific functional impact.');if(domain.symptoms.length&&!domain.notes&&!domain.context)tips.push('Capture one example from the client’s life.');const special={mood:'Explore episode pattern, grief context, bipolar history, and safety when clinically indicated.',anxiety:'Clarify whether worry is difficult to control and spans multiple areas of life.',panic:'Clarify whether attacks are unexpected and whether fear or avoidance persists.',bipolar:'Distinguish decreased need for sleep from insomnia and confirm a distinct change from baseline.',adhd:'Clarify childhood onset and impairment across settings.',ocd:'Differentiate intrusive ego-dystonic thoughts from worry and assess time spent in rituals.',trauma:'Document qualifying exposure, symptom clusters, duration, and stabilization needs.',psychosis:'Assess reality testing, mood relationship, medical/substance contributors, and safety.',eating:'Assess frequency, medical stability, and nutritional risk.',substance:'Clarify pattern, consequences, withdrawal risk, and recovery supports.',adjustment:'Connect symptom onset clearly to the identifiable stressor and timing.',painHealth:'Describe the interaction among pain, fear, avoidance, mood, and functioning.'};return <div className="domain-coach"><strong>💡 Clinical Curiosity</strong><p>{special[domainKey]}</p>{tips.map((t,i)=><span key={i}>{t}</span>)}</div>}

function getPresentingReadiness(data){
 const p=data.presenting;
 const active=Object.entries(p.domains).filter(([,d])=>d.symptoms.length||d.notes.trim()||d.context.trim());
 const hasDomainImpact=active.some(([,d])=>d.impairment.length>0);
 const hasSpecificExample=Boolean(p.patientNarrative.trim())||active.some(([,d])=>d.notes.trim()||d.context.trim());
 const requirements=[
  {label:'Reason for seeking care',met:Boolean(p.reasonSeekingCare||p.patientNarrative.trim()),detail:'Why the client is presenting now is clear.'},
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
 const hasData=Boolean(p.reasonSeekingCare||p.clientRequest||p.patientNarrative.trim()||p.concerns.length||active.length);
 let chiefComplaint='';
 if(p.patientNarrative.trim())chiefComplaint=cleanSentence(p.patientNarrative);
 else if(p.reasonSeekingCare||p.clientRequest){const reason=p.reasonSeekingCare?reasonToClinicalPhrase(p.reasonSeekingCare):'behavioral-health concerns';const request=p.clientRequest?` and is seeking ${p.clientRequest.toLowerCase()}`:'';chiefComplaint=`The client presents in response to ${reason}${request}.`}
 const concernPhrase=p.concerns.length?naturalList(p.concerns.slice(0,6).map(item=>item.toLowerCase())):active.length?naturalList(active.slice(0,4).map(([key])=>symptomDomainDefinitions[key].label.toLowerCase())):'';
 const courseParts=[];if(p.duration)courseParts.push(durationPhrase(p.duration));if(p.frequency)courseParts.push(frequencyPhrase(p.frequency));if(p.severity)courseParts.push(`${p.severity.toLowerCase()} in severity`);if(p.course)courseParts.push(`currently ${p.course.toLowerCase()}`);
 let hpi='';if(concernPhrase){hpi=`The client presents with ${concernPhrase}`;if(courseParts.length)hpi+=`, with symptoms ${naturalList(courseParts)}`;hpi+='.'}else if(courseParts.length)hpi=`The reported concerns are ${naturalList(courseParts)}.`;
 const clinicalPicture=active.slice(0,5).map(([key,domain])=>{const label=clinicalDomainLabel(key);const features=naturalList(domain.symptoms.slice(0,6).map(item=>item.toLowerCase()));const qualifiers=[domain.duration&&durationPhrase(domain.duration),domain.frequency&&frequencyPhrase(domain.frequency),domain.severity&&`${domain.severity.toLowerCase()} in severity`].filter(Boolean);let sentence=`${label} are characterized by ${features}`;if(qualifiers.length)sentence+=` and are ${naturalList(qualifiers)}`;return `${sentence}.`}).join(' ');
 let functionalImpairment='';if(p.impairments.length){functionalImpairment=`The current presentation is interfering with ${naturalList(p.impairments.map(item=>item.toLowerCase()))}`;const examples=active.flatMap(([,d])=>[d.notes,d.context]).filter(Boolean);functionalImpairment+=examples.length?`. ${cleanSentence(examples[0])}`:'; a patient-specific example would further strengthen the medical-necessity narrative.'}
 let clinicalContext='';const contextual=active.flatMap(([,d])=>[d.context,d.notes]).filter(Boolean);if(contextual.length)clinicalContext=`Relevant clinical context includes ${cleanSentence(contextual.slice(0,2).join(' '))}`;else if(p.patientNarrative.trim())clinicalContext=cleanSentence(p.patientNarrative);
 if((p.impairments.length||p.severity)&&p.clientRequest){const treatmentNeed=`The combination of ${p.severity?`${p.severity.toLowerCase()} symptoms`:'the reported symptoms'}${p.impairments.length?' and associated functional impairment':''} supports the need for ${p.clientRequest.toLowerCase()}.`;clinicalContext=[clinicalContext,treatmentNeed].filter(Boolean).join(' ')}
 return {hasData,chiefComplaint,hpi,clinicalPicture,functionalImpairment,clinicalContext};
}
function reasonToClinicalPhrase(reason){const map={'New onset symptoms':'newly emerging symptoms','Worsening symptoms':'a recent worsening of symptoms','Return to treatment':'a return to behavioral-health treatment','Life transition / adjustment stress':'distress associated with a major life transition','Relationship or family conflict':'relationship or family-related distress','Work or school impairment':'work or school-related impairment','Diagnostic clarification':'a need for diagnostic clarification'};return map[reason]||reason.toLowerCase()}
function durationPhrase(value){const map={'Less than 1 month':'present for less than one month','1–6 months':'present for approximately one to six months','More than 6 months':'present for more than six months','More than 1 year':'present for more than one year','Chronic / longstanding':'longstanding or chronic','Less than 2 weeks':'present for less than two weeks','2 weeks–1 month':'present for approximately two weeks to one month','6–12 months':'present for approximately six to twelve months','Episodic':'episodic','Unclear':'of unclear duration'};return map[value]||`present for ${String(value).toLowerCase()}`}
function frequencyPhrase(value){const map={'Occasional':'occurring occasionally','Weekly':'occurring weekly','Several days per week':'occurring several days per week','Most days':'occurring most days','Daily':'occurring daily','Nearly constant':'nearly constant','Episodic':'episodic','Unclear':'of unclear frequency'};return map[value]||`occurring ${String(value).toLowerCase()}`}
function clinicalDomainLabel(key){const map={mood:'Depressive symptoms',anxiety:'Anxiety symptoms',panic:'Panic symptoms',bipolar:'Bipolar-spectrum features',adhd:'Attention and executive-functioning concerns',ocd:'Obsessive-compulsive symptoms',trauma:'Trauma-related symptoms',psychosis:'Thought and perception-related symptoms',eating:'Eating and body-image concerns',substance:'Substance-related concerns',adjustment:'Adjustment-related distress',painHealth:'Pain and health-related distress'};return map[key]||symptomDomainDefinitions[key].label}
function getDocumentationQuality(data,readiness){
 const p=data.presenting;const active=Object.entries(p.domains).filter(([,d])=>d.symptoms.length);
 const specificity=Math.min(100,(p.patientNarrative.trim()?45:0)+(active.some(([,d])=>d.notes.trim()||d.context.trim())?35:0)+(p.impairments.length?20:0));
 const clinicalDetail=Math.min(100,(active.length?30:0)+(active.some(([,d])=>d.duration&&d.frequency&&d.severity)?35:0)+(p.duration&&p.frequency&&p.severity&&p.course?35:0));
 const impairment=Math.min(100,(p.impairments.length?45:0)+(active.some(([,d])=>d.impairment.length)?40:0)+(active.some(([,d])=>d.notes.trim())?15:0));
 const narrativeFlow=Math.min(100,(p.reasonSeekingCare||p.patientNarrative.trim()?30:0)+(active.length?30:0)+(p.impairments.length?25:0)+(p.clientRequest?15:0));
 const score=Math.round((specificity+clinicalDetail+impairment+narrativeFlow+readiness.score)/5);const label=score>=90?'Excellent foundation':score>=80?'Strong documentation':score>=65?'Developing well':'Needs clinical detail';
 let suggestion='';if(specificity<70)suggestion='Add one concrete, patient-specific example or recent precipitating event.';else if(impairment<75)suggestion='Describe how one selected symptom directly interferes with the client’s daily functioning.';else if(clinicalDetail<80)suggestion='Complete domain-level duration, frequency, and severity for the strongest symptom cluster.';else if(narrativeFlow<85)suggestion='Clarify why treatment is being sought now and what the client hopes to address.';
 return {score,label,suggestion,metrics:[{label:'Patient specificity',score:specificity},{label:'Clinical detail',score:clinicalDetail},{label:'Functional impairment',score:impairment},{label:'Narrative flow',score:narrativeFlow},{label:'COMAR readiness',score:readiness.score}]};
}
function naturalList(items){const c=items.filter(Boolean);if(!c.length)return'';if(c.length===1)return c[0];if(c.length===2)return`${c[0]} and ${c[1]}`;return`${c.slice(0,-1).join(', ')}, and ${c.at(-1)}`}

function History({data,set,toggle}){const p=data.psychiatricHistory,f=data.familyHistory;return <Page><Card title="Psychiatric History"><h3>Previous Diagnoses</h3><Checks options={psychDx} selected={p.diagnoses} onToggle={v=>toggle('psychiatricHistory.diagnoses',v)}/><h3>Previous Services / Higher Levels of Care</h3><Checks options={services} selected={p.services} onToggle={v=>toggle('psychiatricHistory.services',v)}/><Grid columns={4}><Select label="Hospitalization" value={p.hospitalization} onChange={v=>set('psychiatricHistory.hospitalization',v)} options={['None reported','One prior admission','Multiple prior admissions','Unknown']}/><Select label="Suicide Attempts" value={p.suicideAttempts} onChange={v=>set('psychiatricHistory.suicideAttempts',v)} options={['None reported','One prior attempt','Multiple prior attempts','Unknown']}/><Select label="NSSI History" value={p.nssi} onChange={v=>set('psychiatricHistory.nssi',v)} options={['None reported','Historical','Current / recent','Unknown']}/><Select label="Treatment Response" value={p.treatmentResponse} onChange={v=>set('psychiatricHistory.treatmentResponse',v)} options={['Helpful','Partially helpful','Limited benefit','Adverse response','Unknown']}/></Grid><TextArea label="Additional Psychiatric History Details" value={p.details} onChange={v=>set('psychiatricHistory.details',v)}/></Card><Card title="Family History"><Checks options={familyConditions} selected={f.conditions} onToggle={v=>toggle('familyHistory.conditions',v)}/><Grid columns={2}><Select label="Family Relationship Pattern" value={f.relationshipPattern} onChange={v=>set('familyHistory.relationshipPattern',v)} options={['Supportive','Generally stable','Conflictual','Estranged','Enmeshed','Limited contact','Mixed / complex']}/><Select label="Family Support Level" value={f.supportLevel} onChange={v=>set('familyHistory.supportLevel',v)} options={['Strong support','Some support','Limited support','No support','Mixed / inconsistent']}/></Grid><TextArea label="Additional Family History Details" value={f.details} onChange={v=>set('familyHistory.details',v)}/></Card></Page>}

function Medical({data,set,toggle,dispatch}){const m=data.medical,s=data.substance;return <Page><Card title="Medical & Biological Factors"><Checks options={medicalConditions} selected={m.conditions} onToggle={v=>toggle('medical.conditions',v)}/><Grid columns={4}><Select label="Sleep" value={m.sleep} onChange={v=>set('medical.sleep',v)} options={['No concerns','Mild disruption','Moderate disruption','Severe disruption','Insomnia','Hypersomnia']}/><Select label="Pain" value={m.pain} onChange={v=>set('medical.pain',v)} options={['None reported','Intermittent','Chronic mild','Chronic moderate','Chronic severe']}/><Input label="Allergies" value={m.allergies} onChange={v=>set('medical.allergies',v)}/><Select label="Medical Follow-Up" value={m.providerFollowUp} onChange={v=>set('medical.providerFollowUp',v)} options={['Established PCP','Specialty care','Needs PCP','Inconsistent follow-up','Unknown']}/></Grid><TextArea label="Additional Medical Details" value={m.details} onChange={v=>set('medical.details',v)}/></Card><Card title="Current Medications">{m.medications.map((med,i)=><div className="med-row" key={i}><Input label="Medication" value={med.name} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'name',value:v})}/><Input label="Dose" value={med.dose} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'dose',value:v})}/><Input label="Frequency" value={med.frequency} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'frequency',value:v})}/><Input label="Indication" value={med.indication} onChange={v=>dispatch({type:'SET_MEDICATION',index:i,field:'indication',value:v})}/>{m.medications.length>1&&<button className="danger small" onClick={()=>dispatch({type:'REMOVE_MEDICATION',index:i})}>Remove</button>}</div>)}<button onClick={()=>dispatch({type:'ADD_MEDICATION'})}>+ Add Medication</button></Card><Card title="Substance-Use Snapshot"><Grid columns={3}>{['alcohol','cannabis','nicotine','opioids','stimulants','sedatives','other'].map(key=><Select key={key} label={titleCase(key)} value={s[key]} onChange={v=>set(`substance.${key}`,v)} options={['Denied','Rare / social','Occasional','Weekly','Daily','In remission','Medical use','Unknown']}/>)}</Grid><Grid columns={2}><Select label="Treatment History" value={s.treatmentHistory} onChange={v=>set('substance.treatmentHistory',v)} options={['None reported','Outpatient','IOP','Residential','Detoxification','Mutual-help / peer recovery','Multiple services']}/><Input label="Recovery Supports" value={s.recoverySupports} onChange={v=>set('substance.recoverySupports',v)}/></Grid><TextArea label="Additional Substance-Use Details" value={s.details} onChange={v=>set('substance.details',v)}/></Card></Page>}

function Social({data,set,toggle}){const t=data.trauma,s=data.social;return <Page><Card title="Trauma-Informed History"><h3>Experiences</h3><Checks options={traumaExperiences} selected={t.experiences} onToggle={v=>toggle('trauma.experiences',v)}/><h3>Current Trauma Symptoms</h3><Checks options={traumaSymptoms} selected={t.symptoms} onToggle={v=>toggle('trauma.symptoms',v)}/><TextArea label="Additional Trauma Details" value={t.details} onChange={v=>set('trauma.details',v)}/></Card><Card title="Social & Environmental History"><Grid columns={3}><Select label="Housing" value={s.housing} onChange={v=>set('social.housing',v)} options={['Stable','Temporary','At risk','Homeless / unhoused','Residential program','Unknown']}/><Select label="Employment" value={s.employment} onChange={v=>set('social.employment',v)} options={['Full-time','Part-time','Unemployed','Student','Disabled / unable to work','Retired','Caregiver']}/><Select label="Financial Stress" value={s.finances} onChange={v=>set('social.finances',v)} options={['None','Mild','Moderate','Severe','Crisis-level']}/><Select label="Transportation" value={s.transportation} onChange={v=>set('social.transportation',v)} options={['Reliable','Limited','Unreliable','No transportation']}/><Select label="Relationships" value={s.relationships} onChange={v=>set('social.relationships',v)} options={['Supportive','Generally stable','Conflictual','Isolated','Recent separation / loss','Mixed']}/><Select label="Legal Stress" value={s.legal} onChange={v=>set('social.legal',v)} options={['None','Current legal matter','Probation / parole','Custody matter','Protective-order concern','Historical only']}/></Grid><Input label="Support System Description" value={s.supports} onChange={v=>set('social.supports',v)}/><Grid columns={2}><Input label="Education / Learning Context" value={s.education} onChange={v=>set('social.education',v)}/><Input label="Parenting / Caregiving Context" value={s.parenting} onChange={v=>set('social.parenting',v)}/><Input label="Cultural Factors" value={s.culturalFactors} onChange={v=>set('social.culturalFactors',v)}/><Input label="Spiritual / Values Factors" value={s.spiritualFactors} onChange={v=>set('social.spiritualFactors',v)}/><Input label="Identity-Related Factors" value={s.identityFactors} onChange={v=>set('social.identityFactors',v)}/><Input label="Military History" value={s.military} onChange={v=>set('social.military',v)}/></Grid><h3>Current Practical Needs</h3><Checks options={needs} selected={s.needs} onToggle={v=>toggle('social.needs',v)}/></Card><Card title="Strengths & Protective Factors"><Checks options={strengths} selected={data.strengths} onToggle={v=>toggle('strengths',v)}/></Card></Page>}

function MseRisk({data,set,toggle}){const m=data.mse,r=data.risk;return <Page><Card title="Mental Status Examination"><Grid columns={4}><Select label="Appearance" value={m.appearance} onChange={v=>set('mse.appearance',v)} options={['Appropriate / well-groomed','Casual','Disheveled','Unkempt','Bizarre / unusual']}/><Select label="Behavior" value={m.behavior} onChange={v=>set('mse.behavior',v)} options={['Cooperative','Engaged','Guarded','Restless','Agitated','Withdrawn','Tearful']}/><Select label="Orientation" value={m.orientation} onChange={v=>set('mse.orientation',v)} options={['Alert and oriented ×4','Oriented to person and place','Partially oriented','Disoriented']}/><Select label="Speech" value={m.speech} onChange={v=>set('mse.speech',v)} options={['Normal rate, rhythm, and volume','Rapid','Pressured','Slow','Soft','Loud','Minimal']}/><Select label="Mood" value={m.mood} onChange={v=>set('mse.mood',v)} options={['Euthymic','Anxious','Depressed','Irritable','Angry','Sad','Elevated','Labile']}/><Select label="Affect" value={m.affect} onChange={v=>set('mse.affect',v)} options={['Full range','Appropriate / congruent','Constricted','Blunted','Flat','Labile','Incongruent']}/><Select label="Thought Process" value={m.thoughtProcess} onChange={v=>set('mse.thoughtProcess',v)} options={['Linear and goal-directed','Logical','Circumstantial','Tangential','Disorganized','Racing','Thought blocking']}/><Select label="Thought Content" value={m.thoughtContent} onChange={v=>set('mse.thoughtContent',v)} options={['Unremarkable','Preoccupation','Obsessions','Delusions','Paranoia','Hopelessness','Worthlessness','Suicidal content']}/><Select label="Perception" value={m.perception} onChange={v=>set('mse.perception',v)} options={['No perceptual disturbance','Auditory hallucinations','Visual hallucinations','Other perceptual disturbance']}/><Select label="Cognition" value={m.cognition} onChange={v=>set('mse.cognition',v)} options={['Grossly intact','Mildly impaired','Moderately impaired','Severely impaired']}/><Select label="Attention" value={m.attention} onChange={v=>set('mse.attention',v)} options={['Intact','Mildly impaired','Moderately impaired','Severely impaired']}/><Select label="Memory" value={m.memory} onChange={v=>set('mse.memory',v)} options={['Grossly intact','Recent-memory difficulty','Remote-memory difficulty','Impaired']}/><Select label="Insight" value={m.insight} onChange={v=>set('mse.insight',v)} options={['Good','Fair','Limited','Poor']}/><Select label="Judgment" value={m.judgment} onChange={v=>set('mse.judgment',v)} options={['Good','Fair','Limited','Poor']}/><Select label="Impulse Control" value={m.impulseControl} onChange={v=>set('mse.impulseControl',v)} options={['Good','Fair','Limited','Poor']}/></Grid><TextArea label="Additional MSE Observations" value={m.additional} onChange={v=>set('mse.additional',v)}/></Card><Card title="Risk & Safety"><Grid columns={4}><Select label="Suicide Screen" value={r.suicideScreen} onChange={v=>set('risk.suicideScreen',v)} options={['Negative','Positive for passive ideation','Positive for active ideation','Positive for recent behavior','Not completed']}/><Select label="Ideation" value={r.ideation} onChange={v=>set('risk.ideation',v)} options={['Denied','Passive','Active without plan','Active with plan','Unknown']}/><Select label="Intent" value={r.intent} onChange={v=>set('risk.intent',v)} options={['Denied','No current intent','Ambivalent','Intent present','Unknown']}/><Select label="Plan" value={r.plan} onChange={v=>set('risk.plan',v)} options={['Denied','No specific plan','Vague plan','Specific plan','Unknown']}/><Select label="Recent Behavior" value={r.behavior} onChange={v=>set('risk.behavior',v)} options={['Denied','Preparatory behavior','Aborted attempt','Interrupted attempt','Recent attempt','NSSI']}/><Select label="Homicidal Ideation" value={r.homicidalIdeation} onChange={v=>set('risk.homicidalIdeation',v)} options={['Denied','Passive thoughts','Active thoughts without plan','Active thoughts with plan','Unknown']}/><Select label="Access to Means" value={r.accessToMeans} onChange={v=>set('risk.accessToMeans',v)} options={['Denied / no access','Restricted access','Access present','Unknown']}/><Select label="Overall Risk" value={r.overallRisk} onChange={v=>set('risk.overallRisk',v)} options={['Low','Low to moderate','Moderate','High','Imminent']}/><Select label="Safety Response" value={r.safetyResponse} onChange={v=>set('risk.safetyResponse',v)} options={['No additional action indicated','Safety plan completed','Crisis resources reviewed','Higher level of care recommended','Emergency evaluation initiated']}/><Select label="Generate Safety Plan" value={r.safetyPlanNeeded} onChange={v=>set('risk.safetyPlanNeeded',v)} options={['No','Yes']}/></Grid><h3>Protective Factors</h3><Checks options={riskProtective} selected={r.protectiveFactors} onToggle={v=>toggle('risk.protectiveFactors',v)}/>{r.safetyPlanNeeded==='Yes'&&<div className="safety-plan-fields"><h3>Stanley-Brown-Style Safety Plan Inputs</h3><Grid columns={2}><TextArea label="1. Warning Signs" value={r.warningSigns} onChange={v=>set('risk.warningSigns',v)}/><TextArea label="2. Internal Coping Strategies" value={r.internalCoping} onChange={v=>set('risk.internalCoping',v)}/><TextArea label="3. People / Places for Distraction" value={r.peoplePlaces} onChange={v=>set('risk.peoplePlaces',v)}/><TextArea label="4. Support Contacts" value={r.supportContacts} onChange={v=>set('risk.supportContacts',v)}/><TextArea label="5. Professional / Crisis Contacts" value={r.professionalContacts} onChange={v=>set('risk.professionalContacts',v)}/><TextArea label="6. Means-Safety Steps" value={r.meansSafety} onChange={v=>set('risk.meansSafety',v)}/></Grid></div>}</Card></Page>}

function Diagnosis({data,set,dispatch}){
 const preview=buildDiagnosticIntelligencePreview(data);
 return <Page>
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
 </Page>
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
 return <Page>
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
 </Page>
}
function Page({children}){return <div className="page">{children}</div>}function Card({title,children}){return <section className="card"><h2>{title}</h2>{children}</section>}function Grid({columns=2,children}){return <div className={`grid cols-${columns}`}>{children}</div>}function Input({label,value,onChange}){return <label className="field"><span>{label}</span><input value={value} onChange={e=>onChange(e.target.value)}/></label>}function TextArea({label,value,onChange}){return <label className="field"><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)}/></label>}function Select({label,value,onChange,options}){return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}><option value="">Select...</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>}function Checks({options,selected,onToggle}){return <div className="checks">{options.map(o=><label key={o}><input type="checkbox" checked={selected.includes(o)} onChange={()=>onToggle(o)}/><span>{o}</span></label>)}</div>}function Stat({label,value}){return <div><small>{label}</small><strong>{value}</strong></div>}function titleCase(value){return value.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}
export default App;
