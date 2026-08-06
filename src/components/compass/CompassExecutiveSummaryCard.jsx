export default function CompassExecutiveSummaryCard({
  title = 'Executive Summary',
  summary,
  emptyMessage = 'Compass is still gathering enough information to form an executive summary.',
}) {
  const hasSummary =
    typeof summary === 'string' && summary.trim().length > 0;

  return (
    <section className="compass-card executive-summary-card">
      <div className="compass-card-header">
        <div>
          <div className="compass-card-label">Live Clinical Overview</div>
          <h4>{title}</h4>
        </div>

        <span
          className={`compass-card-status ${
            hasSummary ? 'ready' : 'waiting'
          }`}
        >
          {hasSummary ? 'Updated' : 'Building'}
        </span>
      </div>

      <div className="compass-card-body">
        {hasSummary ? (
          <p className="executive-summary-text">{summary}</p>
        ) : (
          <p className="compass-card-empty">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}