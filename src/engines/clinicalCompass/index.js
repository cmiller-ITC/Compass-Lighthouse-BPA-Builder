/**
 * Lighthouse Clinical Compass Engine
 * Foundation release: 8.1a.1
 *
 * This module will become the central source of structured
 * clinical reasoning for Compass, Replay, Atlas, Navigator,
 * Beacon, Harbor, and Horizon.
 */

function createCompassSection(id, title, question) {
  return {
    id,
    title,
    question,
    status: "foundation",
    completeness: 0,
    evidence: [],
    interpretation: [],
    clinicalMeaning: [],
  };
}

export function buildClinicalCompass(caseData = {}) {
  return {
    version: "8.1a.1",

    story: createCompassSection(
      "story",
      "What Happened?",
      "What experiences shaped this person’s story?"
    ),

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