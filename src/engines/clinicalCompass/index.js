/**
 * Lighthouse Clinical Compass Engine
 * Version 8.1a.3
 *
 * This module organizes assessment information into the
 * Lighthouse Clinical Compass framework.
 */

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function meaningful(values) {
  const emptyValues = new Set([
    "",
    "None reported",
    "None identified",
    "Not applicable",
    "Unknown",
    "Unknown / not yet assessed",
  ]);

  return asArray(values).filter(
    (value) => !emptyValues.has(String(value).trim())
  );
}

function createCompassSection(id, title, question) {
  return {
    id,
    title,
    question,
    status: "developing",
    completeness: 0,
    evidence: [],
    interpretation: [],
    clinicalMeaning: [],
  };
}

function buildStory(caseData) {
  const presenting = caseData?.presenting ?? {};
  const trauma = caseData?.trauma ?? {};
  const medical = caseData?.medical ?? {};

  const reasonsForCare = meaningful(presenting.reasonSeekingCare);
  const currentConcerns = meaningful(presenting.concerns);
  const traumaExperiences = meaningful(trauma.experiences);
  const medicalConditions = meaningful(medical.conditions);

  const patientNarrative = String(
    presenting.patientNarrative ?? ""
  ).trim();

  const evidence = [
    ...reasonsForCare.map((value) => ({
      category: "Reason for seeking care",
      value,
      source: "presenting.reasonSeekingCare",
    })),

    ...currentConcerns.map((value) => ({
      category: "Current concern",
      value,
      source: "presenting.concerns",
    })),

    ...traumaExperiences.map((value) => ({
      category: "Relevant historical experience",
      value,
      source: "trauma.experiences",
    })),

    ...medicalConditions.map((value) => ({
      category: "Medical context",
      value,
      source: "medical.conditions",
    })),
  ];

  if (patientNarrative) {
    evidence.push({
      category: "Client narrative",
      value: patientNarrative,
      source: "presenting.patientNarrative",
    });
  }

  const completeness = Math.min(
    100,
    Math.round(
      [
        reasonsForCare.length > 0,
        currentConcerns.length > 0 || patientNarrative.length > 0,
        traumaExperiences.length > 0,
        medicalConditions.length > 0,
      ].filter(Boolean).length * 25
    )
  );

  return {
    id: "story",
    title: "What Happened?",
    question: "What experiences shaped this person’s current story?",
    status: evidence.length > 0 ? "developing" : "not-started",
    completeness,
    evidence,
    currentStressors: reasonsForCare,
    currentConcerns,
    traumaContext: traumaExperiences,
    medicalContext: medicalConditions,
    patientNarrative,
    interpretation:
      evidence.length > 0
        ? [
            "Compass has identified current and historical context that may help explain why the client is seeking care now.",
          ]
        : [],
    clinicalMeaning:
      evidence.length > 0
        ? [
            "These findings provide context for understanding the current presentation but should not be interpreted as causal without additional assessment.",
          ]
        : [],
  };
}

export function buildClinicalCompass(caseData = {}) {
  return {
    version: "8.1a.3",

    story: buildStory(caseData),

    adaptations: createCompassSection(
      "adaptations",
      "How Did They Adapt to Survive?",
      "How did their mind, body, and relationships respond?"
    ),

    survival: createCompassSection(
      "survival",
      "How Are They Surviving Today?",
      "What strategies are they currently using to manage distress?"
    ),

    maintaining: createCompassSection(
      "maintaining",
      "What Is Keeping the Cycle Going?",
      "What factors continue to maintain distress today?"
    ),

    hope: createCompassSection(
      "hope",
      "Where Is Hope?",
      "What strengths, values, supports, and protective resources are present?"
    ),

    treatment: createCompassSection(
      "treatment",
      "Where Do We Begin?",
      "What treatment targets should be prioritized first?"
    ),

    sourceDataAvailable:
      caseData !== null &&
      typeof caseData === "object" &&
      Object.keys(caseData).length > 0,
  };
}

export default buildClinicalCompass;