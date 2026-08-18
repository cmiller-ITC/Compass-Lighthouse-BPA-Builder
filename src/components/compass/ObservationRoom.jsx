import { buildObservation } from '../../engines/clinicalCompass/ObservationEngine';

export default function ObservationRoom({
  data,
  clinicalConnections,
}) {

  const presenting = data?.presenting || {};

  const observation = buildObservation(data);

  const concerns = Array.isArray(presenting.concerns)
    ? presenting.concerns
    : [];

  const reasonSeekingCare = Array.isArray(presenting.reasonSeekingCare)
    ? presenting.reasonSeekingCare
    : [];

  const patientNarrative =
    typeof presenting.patientNarrative === 'string'
      ? presenting.patientNarrative.trim()
      : '';

  const themes = clinicalConnections?.themes || [];
  const strengths = clinicalConnections?.strengths || [];
  const assessmentGaps = clinicalConnections?.assessmentGaps || [];
  const clarificationNeeds = clinicalConnections?.clarificationNeeds || [];
  const missingInformation = clinicalConnections?.missingInformation || [];

  const informationNeeds = [
  ...new Set([
    ...assessmentGaps,
    ...missingInformation,
  ]),
];

  const hasPresentingData =
    concerns.length > 0 ||
    reasonSeekingCare.length > 0 ||
    patientNarrative.length > 0;

  return (
    <div className="compass-room-workspace observation-room">
      <div className="room-intro">
        <span className="room-intro-icon">🌊</span>

        <div>
          <div className="side-label">Observation Room</div>
          <h2>What are we seeing?</h2>
          <p>
            Stay close to the client's story. Notice what is emerging
            before deciding what it means.
          </p>
        </div>
      </div>

      {hasPresentingData && (
        <section className="room-section">
          <div className="room-section-heading">
            <span>👂</span>
            <div>
              <h3>What We've Heard So Far</h3>
              <p>
                Current information gathered from the presenting concerns.
              </p>
            </div>
          </div>

          {concerns.length > 0 && (
            <div className="room-theme-card">
              <strong>Current concerns</strong>
              <ul>
                {concerns.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {reasonSeekingCare.length > 0 && (
            <div className="room-theme-card">
              <strong>Why now?</strong>
              <ul>
                {reasonSeekingCare.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {patientNarrative && (
            <div className="room-theme-card">
              <strong>Client's own words</strong>
              <p>{patientNarrative}</p>
            </div>
          )}
        </section>
      )}

{observation.summary && (
  <section className="room-section">
    <div className="room-section-heading">
      <span>◌</span>
      <div>
        <h3>Emerging Clinical Picture</h3>
        <p>
          A provisional synthesis of what appears to be emerging from the
          information gathered so far.
        </p>
      </div>
    </div>

    <div className="room-theme-card">
      <p>{observation.summary}</p>
    </div>
  </section>
)}

      {strengths.length > 0 && (
        <section className="room-section">
          <div className="room-section-heading">
            <span>🌱</span>
            <div>
              <h3>Strengths & Resources</h3>
              <p>Capacity that is already present.</p>
            </div>
          </div>

          <ul className="room-simple-list">
            {strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </section>
      )}


      {clarificationNeeds.length > 0 && (
        <section className="room-section room-wondering">
          <div className="room-section-heading">
            <span>?</span>
            <div>
              <h3>Compass Is Wondering...</h3>
              <p>
                Questions that may help bring the clinical picture into better focus.
              </p>
            </div>
          </div>

          <ul className="room-simple-list">
            {clarificationNeeds.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

{informationNeeds.length > 0 && (
  <section className="room-section">
    <div className="room-section-heading">
      <span>🧩</span>
      <div>
        <h3>What We Still Need</h3>
        <p>
          Information that would help complete the current clinical picture.
        </p>
      </div>
    </div>

    <ul className="room-simple-list">
      {informationNeeds.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </section>
)}

    </div>
  );
}