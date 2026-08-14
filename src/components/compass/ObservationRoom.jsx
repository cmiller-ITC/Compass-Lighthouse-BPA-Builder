import CompassExecutiveSummaryCard from './CompassExecutiveSummaryCard';

export default function ObservationRoom({
  executiveSummary,
  clinicalConnections,
}) {
  const themes = clinicalConnections?.themes || [];
  const strengths = clinicalConnections?.strengths || [];
  const missingInformation =
    clinicalConnections?.missingInformation || [];

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

      <CompassExecutiveSummaryCard summary={executiveSummary} />

      {themes.length > 0 && (
        <section className="room-section">
          <div className="room-section-heading">
            <span>◌</span>
            <div>
              <h3>Current Picture</h3>
              <p>Patterns emerging from the information gathered so far.</p>
            </div>
          </div>

          <div className="room-theme-list">
            {themes.map((theme, index) => (
              <div className="room-theme-card" key={index}>
                <strong>{theme.label}</strong>

                <ul>
                  {(theme.findings || []).map((finding, findingIndex) => (
                    <li key={findingIndex}>{finding}</li>
                  ))}
                </ul>
              </div>
            ))}
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

      {missingInformation.length > 0 && (
        <section className="room-section room-wondering">
          <div className="room-section-heading">
            <span>?</span>
            <div>
              <h3>Compass Is Wondering...</h3>
              <p>
                Information that may help bring the picture into better focus.
              </p>
            </div>
          </div>

          <ul className="room-simple-list">
            {missingInformation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}