function hasValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return String(value ?? "").trim() !== "";
}

function extractThemes(data = {}) {
  const themes = [];

  const presentingConcerns = data?.presenting?.concerns || [];
  const impairments = data?.presenting?.impairments || [];
  const psychiatricDiagnoses = data?.psychiatricHistory?.diagnoses || [];
  const medicalConditions = data?.medical?.conditions || [];
  const traumaExperiences = data?.trauma?.experiences || [];
  const traumaSymptoms = data?.trauma?.symptoms || [];
  const socialNeeds = data?.social?.needs || [];

  if (presentingConcerns.length > 0) {
    themes.push({
      source: "presenting.concerns",
      label: "Presenting concerns",
      findings: presentingConcerns
    });
  }

  if (impairments.length > 0) {
    themes.push({
      source: "presenting.impairments",
      label: "Functional impact",
      findings: impairments
    });
  }

  if (psychiatricDiagnoses.length > 0) {
    themes.push({
      source: "psychiatricHistory.diagnoses",
      label: "Psychiatric history",
      findings: psychiatricDiagnoses
    });
  }

  if (medicalConditions.length > 0) {
    themes.push({
      source: "medical.conditions",
      label: "Relevant medical factors",
      findings: medicalConditions
    });
  }

  if (traumaExperiences.length > 0 || traumaSymptoms.length > 0) {
    themes.push({
      source: "trauma",
      label: "Trauma-related factors",
      findings: [...traumaExperiences, ...traumaSymptoms]
    });
  }

  if (socialNeeds.length > 0) {
    themes.push({
      source: "social.needs",
      label: "Psychosocial needs",
      findings: socialNeeds
    });
  }

  return themes;
}

function extractStrengths(data = {}) {
  const strengths = [];

  const enteredStrengths = data?.strengths || [];
  const protectiveFactors = data?.risk?.protectiveFactors || [];

  strengths.push(...enteredStrengths);
  strengths.push(...protectiveFactors);

  return [...new Set(strengths)].filter(Boolean);
}

function detectMissingInformation(data = {}) {
  const missingInformation = [];

  const presentingConcerns = data?.presenting?.concerns || [];
  const impairments = data?.presenting?.impairments || [];
  const psychiatricDiagnoses =
    data?.psychiatricHistory?.diagnoses || [];
  const medicalConditions = data?.medical?.conditions || [];
  const traumaExperiences = data?.trauma?.experiences || [];
  const traumaSymptoms = data?.trauma?.symptoms || [];
  const socialNeeds = data?.social?.needs || [];

  // Core intake completeness
  if (!hasValue(data?.presenting?.clientRequest)) {
    missingInformation.push(
      "Client-identified goals or requested help"
    );
  }

  if (!hasValue(data?.presenting?.patientNarrative)) {
    missingInformation.push("Patient narrative");
  }

  if (!hasValue(data?.social?.supports)) {
    missingInformation.push("Current social supports");
  }

  if (
    psychiatricDiagnoses.length > 0 &&
    !hasValue(data?.psychiatricHistory?.treatmentResponse)
  ) {
    missingInformation.push(
      "Response to prior mental health treatment"
    );
  }

  // Clinical clarification checks
  if (
    presentingConcerns.length > 0 &&
    impairments.length === 0
  ) {
    missingInformation.push(
      "Functional impact of the presenting concerns"
    );
  }

  if (
    (traumaExperiences.length > 0 ||
      traumaSymptoms.length > 0) &&
    !hasValue(data?.presenting?.patientNarrative)
  ) {
    missingInformation.push(
      "Context for how trauma-related experiences or symptoms connect to the current presentation"
    );
  }

  if (
    socialNeeds.length > 0 &&
    !hasValue(data?.social?.supports)
  ) {
    missingInformation.push(
      "Available supports or protective relationships related to identified psychosocial needs"
    );
  }

  if (
    medicalConditions.length > 0 &&
    presentingConcerns.length > 0
  ) {
    missingInformation.push(
      "Whether medical conditions, pain, medications, or physical symptoms may be contributing to the current presentation"
    );
  }

  const measures = data?.measures || [];

  const completedMeasures = measures.filter(
    (measure) => hasValue(measure?.score)
  );

  if (completedMeasures.length === 0) {
    missingInformation.push("Baseline symptom measures");
  }

  return {
    missingInformation: [
      ...new Set(missingInformation)
    ],
    completedMeasures
  };
}

export function buildClinicalConnections(data = {}) {
  const themes = extractThemes(data);
  const strengths = extractStrengths(data);

  const {
    missingInformation,
    completedMeasures
  } = detectMissingInformation(data);

  const availableSignalCount =
    themes.length +
    strengths.length +
    completedMeasures.length;

  const confidence = Math.min(
    100,
    Math.round((availableSignalCount / 12) * 100)
  );

  return {
    connections: [],
    themes,
    strengths,
    risks: [],
    inconsistencies: [],
    missingInformation,
    diagnosticSignals: [],
    treatmentSignals: [],
    confidence,
    updatedAt: new Date()
  };
}