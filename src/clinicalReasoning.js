const EMPTY_VALUES = new Set([
  "", "None reported", "Not applicable", "None identified", "None identified yet",
  "None reported / no current behavioral-health concern",
  "Unknown / records unavailable", "Unknown / family history unavailable",
  "Unknown / not yet assessed", "No trauma disclosed", "Trauma history deferred",
  "Not applicable / no current trauma symptoms"
]);

const DOMAIN_LABELS = {
  mood: "depressive symptoms",
  anxiety: "anxiety symptoms",
  panic: "panic symptoms",
  bipolar: "bipolar-spectrum features",
  adhd: "attention and executive-functioning concerns",
  ocd: "obsessive-compulsive symptoms",
  trauma: "trauma-related symptoms",
  psychosis: "psychotic-spectrum symptoms",
  eating: "eating- and body-image-related concerns",
  substance: "substance-related concerns",
  adjustment: "adjustment-related symptoms",
  painHealth: "pain- and health-related concerns"
};

const REASON_GROUPS = {
  deterioration: new Set([
    "Symptoms have recently worsened","New symptoms have developed",
    "Symptoms are interfering with daily functioning","Difficulty coping independently",
    "Symptoms are no longer manageable","Returning to treatment after a break"
  ]),
  psychosocial: new Set([
    "Major life transition or adjustment","Relationship conflict or separation",
    "Grief, loss, or bereavement","Work or school stress",
    "Job loss or employment instability","Financial stress",
    "Caregiver or parenting stress","Medical diagnosis, chronic illness, or pain",
    "Pregnancy, postpartum, or reproductive transition",
    "Housing instability or relocation","Legal or court-related stress"
  ]),
  referral: new Set([
    "Diagnostic clarification","Medication-related evaluation or coordination",
    "Referral from another provider","School, employer, or EAP referral",
    "Court or probation referral","Family encouragement or concern",
    "Step-down or aftercare following higher level of care"
  ]),
  growth: new Set([
    "Desire for healthier coping skills","Desire to better understand symptoms or patterns",
    "Trauma recovery or processing past experiences","Improve emotional regulation",
    "Improve relationships or communication","Personal growth or relapse prevention"
  ])
};

function asArray(value){
  return Array.isArray(value) ? value : value === undefined || value === null || value === "" ? [] : [value];
}
function meaningful(values){
  return asArray(values).filter(value => !EMPTY_VALUES.has(String(value)));
}
function unique(values){
  return [...new Set(values.filter(Boolean))];
}
function lower(value){
  return String(value || "").trim().toLowerCase();
}
function naturalList(values){
  const items = unique(values.filter(Boolean));
  if(!items.length) return "";
  if(items.length === 1) return items[0];
  if(items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0,-1).join(", ")}, and ${items[items.length-1]}`;
}
function evidence(source,label,value){
  return {source,label,value:String(value || "")};
}
function allDomainEntries(data){
  return Object.entries(data?.presenting?.domains || {});
}
function activeDomainEntries(data){
  return allDomainEntries(data).filter(([,domain]) =>
    meaningful(domain?.symptoms).length ||
    meaningful(domain?.impairment).length ||
    String(domain?.context || "").trim() ||
    String(domain?.notes || "").trim()
  );
}
function textCorpus(data){
  const values = [
    data?.presenting?.patientNarrative,
    data?.psychiatricHistory?.details,
    data?.familyHistory?.details,
    data?.medical?.details,
    data?.trauma?.details,
    data?.social?.housing,
    data?.social?.employment,
    data?.social?.finances,
    data?.social?.relationships,
    data?.social?.supports,
    ...activeDomainEntries(data).flatMap(([,domain]) => [domain.context,domain.notes])
  ];
  return values.filter(Boolean).join(" ").toLowerCase();
}
function confidenceFor(evidenceItems){
  const count = unique(evidenceItems.map(item => `${item.source}:${item.value}`)).length;
  if(count >= 3) return "high";
  if(count === 2) return "moderate";
  return "emerging";
}
function makeFactor(id,label,evidenceItems,clinicalMeaning){
  const clean = unique(evidenceItems.map(item => JSON.stringify(item))).map(item => JSON.parse(item));
  if(!clean.length) return null;
  return {id,label,confidence:confidenceFor(clean),evidence:clean,clinicalMeaning};
}

export function collectPresentation(data){
  const p = data.presenting || {};
  const domains = activeDomainEntries(data).map(([key,domain]) => ({
    id:key,
    label:DOMAIN_LABELS[key] || key,
    symptoms:meaningful(domain.symptoms),
    impairment:meaningful(domain.impairment),
    duration:domain.duration || "",
    frequency:domain.frequency || "",
    severity:domain.severity || "",
    context:String(domain.context || "").trim(),
    notes:String(domain.notes || "").trim()
  }));
  const impairment = unique([
    ...meaningful(p.impairments),
    ...domains.flatMap(domain => domain.impairment)
  ]);
  return {
    concerns:meaningful(p.concerns),
    domains,
    severity:p.severity || "",
    duration:p.duration || "",
    frequency:p.frequency || "",
    course:p.course || "",
    impairment,
    patientNarrative:String(p.patientNarrative || "").trim(),
    reasons:meaningful(p.reasonSeekingCare),
    goals:meaningful(p.clientRequest)
  };
}

export function collectContributors(data){
  const reasons = meaningful(data?.presenting?.reasonSeekingCare);
  const groupedReasons = {
    deterioration:reasons.filter(value => REASON_GROUPS.deterioration.has(value)),
    psychosocial:reasons.filter(value => REASON_GROUPS.psychosocial.has(value)),
    referral:reasons.filter(value => REASON_GROUPS.referral.has(value)),
    growth:reasons.filter(value => REASON_GROUPS.growth.has(value))
  };
  return {
    currentStressors:groupedReasons.psychosocial.map(value => evidence("presenting.reasonSeekingCare","Current stressor",value)),
    currentChange:groupedReasons.deterioration.map(value => evidence("presenting.reasonSeekingCare","Reason for seeking care",value)),
    referralContext:groupedReasons.referral.map(value => evidence("presenting.reasonSeekingCare","Referral context",value)),
    growthContext:groupedReasons.growth.map(value => evidence("presenting.reasonSeekingCare","Growth or recovery context",value)),
    trauma:meaningful(data?.trauma?.experiences).map(value => evidence("trauma.experiences","Trauma history",value)),
    psychiatric:meaningful(data?.psychiatricHistory?.diagnoses).map(value => evidence("psychiatricHistory.diagnoses","Psychiatric history",value)),
    family:meaningful(data?.familyHistory?.conditions).map(value => evidence("familyHistory.conditions","Family history",value)),
    medical:meaningful(data?.medical?.conditions).map(value => evidence("medical.conditions","Medical history",value)),
    social:[
      data?.social?.housing && evidence("social.housing","Housing",data.social.housing),
      data?.social?.employment && evidence("social.employment","Employment",data.social.employment),
      data?.social?.finances && evidence("social.finances","Financial context",data.social.finances),
      data?.social?.relationships && evidence("social.relationships","Relationship context",data.social.relationships),
      data?.social?.supports && evidence("social.supports","Support system",data.social.supports)
    ].filter(Boolean)
  };
}

export function collectMaintainingFactors(data){
  const domains = activeDomainEntries(data);
  const corpus = textCorpus(data);
  const symptomEvidence = (matcher,label) => domains.flatMap(([key,domain]) =>
    meaningful(domain.symptoms)
      .filter(value => matcher.test(lower(value)))
      .map(value => evidence(`presenting.domains.${key}.symptoms`,label,value))
  );
  const textEvidence = (matcher,label) => {
    if(!matcher.test(corpus)) return [];
    const matching = [
      data?.presenting?.patientNarrative,
      ...domains.flatMap(([,domain]) => [domain.context,domain.notes]),
      data?.social?.relationships,
      data?.social?.supports
    ].filter(value => value && matcher.test(lower(value)));
    return matching.slice(0,3).map(value => evidence("freeText",label,value));
  };

  const factors = [
    makeFactor(
      "avoidance",
      "avoidance or behavioral withdrawal",
      [
        ...symptomEvidence(/avoidance|social withdrawal/,"Avoidance evidence"),
        ...textEvidence(/\bavoid|stays? home|withdraw|cancel|isolat|doesn'?t leave|not leaving\b/,"Behavioral example")
      ],
      "Avoidance may reduce distress in the short term while limiting corrective experiences and daily engagement."
    ),
    makeFactor(
      "rumination",
      "persistent worry or rumination",
      [
        ...symptomEvidence(/excessive worry|worry across|racing thoughts|rumination/,"Worry or rumination evidence"),
        ...textEvidence(/\bruminat|overthink|think(?:ing)? about .*over and over|can'?t stop thinking|racing thoughts\b/,"Patient-specific example")
      ],
      "Repetitive thinking may prolong distress and interfere with flexible problem solving."
    ),
    makeFactor(
      "reassurance",
      "reassurance seeking",
      [
        ...symptomEvidence(/reassurance seeking/,"Reassurance-seeking evidence"),
        ...textEvidence(/\breassurance|asks? .* repeatedly|checking with others\b/,"Patient-specific example")
      ],
      "Repeated reassurance may provide short-term relief while reinforcing uncertainty or fear."
    ),
    makeFactor(
      "compulsions",
      "compulsive or safety behaviors",
      [
        ...symptomEvidence(/checking ritual|cleaning|washing ritual|mental ritual|counting|repeating|compulsion|ritual/,"Compulsion evidence"),
        ...textEvidence(/\bcheck(?:ing)? repeatedly|wash(?:ing)? repeatedly|ritual|compulsion|safety behavior\b/,"Patient-specific example")
      ],
      "Ritualized or safety behaviors may temporarily reduce distress while maintaining the feared association."
    ),
    makeFactor(
      "threatMonitoring",
      "heightened threat monitoring",
      [
        ...symptomEvidence(/hypervigilance|exaggerated startle|fear of dying|fear of losing control/,"Threat-monitoring evidence"),
        ...textEvidence(/\bhypervigil|on guard|watching for danger|scanning|startle\b/,"Patient-specific example")
      ],
      "Ongoing threat monitoring may sustain physiological arousal and reinforce a reduced sense of safety."
    ),
    makeFactor(
      "sleep",
      "sleep disruption",
      [
        ...symptomEvidence(/sleep disturbance|decreased need for sleep/,"Sleep symptom"),
        ...meaningful(data?.presenting?.impairments).filter(value => /sleep|energy/i.test(value)).map(value => evidence("presenting.impairments","Functional impact",value)),
        ...textEvidence(/\binsomnia|not sleeping|poor sleep|wakes? up|hours of sleep|sleep disruption\b/,"Patient-specific example")
      ],
      "Disrupted sleep may worsen mood, concentration, emotional regulation, and physiological stress."
    ),
    makeFactor(
      "ongoingStress",
      "ongoing psychosocial stress",
      collectContributors(data).currentStressors,
      "Active environmental stressors may continue to increase emotional demand and reduce recovery opportunities."
    ),
    makeFactor(
      "limitedSupport",
      "limited or inconsistent support",
      [
        ...(data?.social?.supports && /limited|inconsistent|poor|none|isolated/i.test(data.social.supports)
          ? [evidence("social.supports","Support limitation",data.social.supports)] : []),
        ...textEvidence(/\bno support|limited support|isolated|alone|no one to talk to\b/,"Patient-specific example")
      ],
      "Limited support may reduce access to emotional, practical, or crisis-related resources."
    )
  ].filter(Boolean);

  return factors;
}

export function collectStrengths(data){
  const items = [
    ...meaningful(data?.strengths).map(value => evidence("strengths","Strength",value)),
    ...meaningful(data?.risk?.protectiveFactors).map(value => evidence("risk.protectiveFactors","Protective factor",value))
  ];
  return unique(items.map(item => JSON.stringify(item))).map(item => JSON.parse(item));
}

export function collectTreatmentTargets(data,maintainingFactors=collectMaintainingFactors(data)){
  const factorIds = new Set(maintainingFactors.map(factor => factor.id));
  const presentation = collectPresentation(data);
  const targets = [];
  if(factorIds.has("avoidance")) targets.push({id:"engagement",label:"reduce avoidance and increase adaptive engagement",source:"maintainingFactors.avoidance"});
  if(factorIds.has("rumination")) targets.push({id:"cognitiveFlexibility",label:"reduce rumination and strengthen cognitive flexibility",source:"maintainingFactors.rumination"});
  if(factorIds.has("reassurance")) targets.push({id:"uncertainty",label:"increase tolerance of uncertainty and reduce reassurance seeking",source:"maintainingFactors.reassurance"});
  if(factorIds.has("compulsions")) targets.push({id:"erp",label:"reduce compulsive and safety behaviors using exposure-based intervention when appropriate",source:"maintainingFactors.compulsions"});
  if(factorIds.has("threatMonitoring")) targets.push({id:"regulation",label:"strengthen stabilization, grounding, and nervous-system regulation",source:"maintainingFactors.threatMonitoring"});
  if(factorIds.has("sleep")) targets.push({id:"sleep",label:"improve sleep stability and restorative routines",source:"maintainingFactors.sleep"});
  if(factorIds.has("ongoingStress")) targets.push({id:"stressCoping",label:"strengthen coping and problem solving around current stressors",source:"maintainingFactors.ongoingStress"});
  if(factorIds.has("limitedSupport")) targets.push({id:"support",label:"increase access to supportive relationships and practical resources",source:"maintainingFactors.limitedSupport"});
  presentation.goals.slice(0,4).forEach((goal,index) => targets.push({id:`clientGoal${index}`,label:lower(goal),source:"presenting.clientRequest"}));
  return unique(targets.map(item => JSON.stringify(item))).map(item => JSON.parse(item));
}

export function buildClinicalReasoning(data){
  const presentation = collectPresentation(data);
  const contributors = collectContributors(data);
  const maintainingFactors = collectMaintainingFactors(data);
  const strengths = collectStrengths(data);
  const treatmentTargets = collectTreatmentTargets(data,maintainingFactors);
  return {presentation,contributors,maintainingFactors,strengths,treatmentTargets};
}

function contributorSummary(contributors){
  const current = contributors.currentStressors.map(item => lower(item.value));
  const history = unique([
    ...contributors.trauma.map(() => "relevant trauma-related experiences"),
    ...contributors.psychiatric.map(() => "prior behavioral-health concerns"),
    ...contributors.family.map(() => "family psychiatric vulnerability"),
    ...contributors.medical.map(() => "relevant medical or biological factors")
  ]);
  return {current:unique(current),history};
}

export function buildEvidenceBasedConceptualization(data){
  const reasoning = buildClinicalReasoning(data);
  const {presentation,contributors,maintainingFactors,strengths} = reasoning;
  const domainLabels = presentation.domains.map(domain => domain.label);
  const currentItems = domainLabels.length ? domainLabels : presentation.concerns.map(lower);
  const context = contributorSummary(contributors);
  const sentences = [];

  if(currentItems.length){
    const impairment = presentation.impairment.length
      ? ` with associated impairment in ${naturalList(presentation.impairment.slice(0,5).map(lower))}`
      : "";
    sentences.push(`The client is currently presenting with ${naturalList(currentItems.slice(0,5))}${impairment}.`);
  }

  if(context.current.length){
    sentences.push(`Current difficulties are occurring in the context of ${naturalList(context.current.slice(0,5))}.`);
  }

  if(context.history.length){
    sentences.push(`Background factors that may be relevant to the present-day presentation include ${naturalList(context.history)}.`);
  }

  if(maintainingFactors.length){
    const supported = maintainingFactors.slice(0,4).map(factor => factor.label);
    const qualifier = maintainingFactors.some(factor => factor.confidence === "emerging")
      ? "may be influenced by"
      : "appear to be maintained in part by";
    sentences.push(`Current distress ${qualifier} ${naturalList(supported)}.`);
  }else if(currentItems.length){
    sentences.push("Maintaining factors require further clarification before a more specific formulation can be made.");
  }

  if(strengths.length){
    sentences.push(`${naturalList(strengths.slice(0,5).map(item => lower(item.value)))} represent meaningful strengths and treatment assets.`);
  }

  return sentences.join(" ") || "Clinical conceptualization requires additional assessment information.";
}
