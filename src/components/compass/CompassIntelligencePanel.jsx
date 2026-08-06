import { useEffect, useRef, useState } from 'react';
import CompassExecutiveSummaryCard from './CompassExecutiveSummaryCard';

export default function CompassIntelligencePanelView({
  data,
  section = 'presenting',
  builders,
  views,
}) {
  const [activeTab, setActiveTab] = useState('narrative');
  const [collapsed, setCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const scrollRef = useRef(null);

  const {
    buildSectionIntelligence,
    buildClinicalCompass,
    buildMasterClinicalStory,
    buildTebraDocumentationObject,
    buildAssessmentJourney,
    buildFinalComarReview,
  } = builders;

  const {
    SectionNarrative,
    SectionCoach,
    AssessmentJourney,
    SectionQuality,
    FinalComarReview,
  } = views;

  const intelligence = buildSectionIntelligence(data, section);
  const clinicalCompass = buildClinicalCompass(data);
  const masterStory = buildMasterClinicalStory(data);
  const executiveSummary =
  masterStory?.executiveSummary ||
  masterStory?.summary ||
  intelligence?.summary ||
  '';
  const tebraDocumentation = buildTebraDocumentationObject(data);
  const journey = buildAssessmentJourney(data, section);
  const finalReview = buildFinalComarReview(data);

  // Keep this available while the existing intelligence architecture evolves.
  void clinicalCompass;

  const headerScore =
    activeTab === 'journey'
      ? journey.overallProgress
      : activeTab === 'final'
        ? finalReview.score
        : intelligence.quality.score;

  const tabs = [
    ['narrative', '📝', 'Story'],
    ['coach', '💡', 'Coach'],
    ['journey', '🧭', 'Journey'],
    ['quality', '⭐', 'Quality'],
    ['final', '📋', 'Final'],
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeTab, section]);

  const chooseTab = (id) => {
    setActiveTab(id);

    if (collapsed) {
      setCollapsed(false);
    }
  };

  return (
    <>
      {focusMode && (
        <button
          type="button"
          className="panel-backdrop"
          aria-label="Close focus view"
          onClick={() => setFocusMode(false)}
        />
      )}

      <aside
        className={`clinical-side-panel ${collapsed ? 'collapsed' : ''} ${
          focusMode ? 'focus-mode' : ''
        }`}
        aria-label="Compass Intelligence Panel"
      >
        {collapsed ? (
          <button
            type="button"
            className="panel-reopen"
            onClick={() => setCollapsed(false)}
            aria-label="Open Compass Intelligence"
          >
            <span>💡</span>
            <strong>Open Compass</strong>
          </button>
        ) : (
          <section className="intelligence-shell">
            <div className="intelligence-header">
              <div className="intelligence-title">
                <div className="side-label">Compass Intelligence</div>

                <h3>
                  {activeTab === 'journey'
                    ? 'Assessment Journey'
                    : activeTab === 'final'
                      ? 'Final COMAR Review'
                      : intelligence.title}
                </h3>
              </div>

              <div className="intelligence-header-actions">
                <div
                  className={`mini-score ${
                    headerScore >= 85
                      ? 'good'
                      : headerScore >= 55
                        ? 'warn'
                        : 'needs'
                  }`}
                >
                  {headerScore}%
                </div>

                <button
                  type="button"
                  className="panel-icon-button"
                  onClick={() => setFocusMode(!focusMode)}
                  title={focusMode ? 'Return to workspace' : 'Open focus view'}
                  aria-label={
                    focusMode ? 'Return to workspace' : 'Open focus view'
                  }
                >
                  {focusMode ? '↙' : '⛶'}
                </button>

                <button
                  type="button"
                  className="panel-icon-button"
                  onClick={() => setCollapsed(true)}
                  title="Hide panel"
                  aria-label="Hide panel"
                >
                  −
                </button>
              </div>
            </div>

            <div
              className="intelligence-tabs five-tabs"
              role="tablist"
            >
              {tabs.map(([id, icon, label]) => (
                <button
                  key={id}
                  type="button"
                  className={activeTab === id ? 'active' : ''}
                  onClick={() => chooseTab(id)}
                  role="tab"
                  aria-selected={activeTab === id}
                >
                  <span>{icon}</span>
                  <em>{label}</em>
                </button>
              ))}
            </div>

            <div
              className="intelligence-tab-content"
              ref={scrollRef}
            >
            <CompassExecutiveSummaryCard summary={executiveSummary} />
            
              {activeTab === 'narrative' && (
                <SectionNarrative
                  intelligence={intelligence}
                  masterStory={masterStory}
                  tebraDocumentation={tebraDocumentation}
                />
              )}

              {activeTab === 'coach' && (
                <SectionCoach intelligence={intelligence} />
              )}

              {activeTab === 'journey' && (
                <AssessmentJourney journey={journey} />
              )}

              {activeTab === 'quality' && (
                <SectionQuality intelligence={intelligence} />
              )}

              {activeTab === 'final' && (
                <FinalComarReview
                  review={finalReview}
                  section={section}
                />
              )}
            </div>

            <div className="panel-footer">
              <span>Scroll inside this panel independently</span>

              <button
                type="button"
                className="panel-top-button"
                onClick={() =>
                  scrollRef.current?.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              >
                ↑ Top
              </button>
            </div>
          </section>
        )}
      </aside>
    </>
  );
}