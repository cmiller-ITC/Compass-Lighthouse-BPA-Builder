const rooms = [
  {
    id: 'observation',
    number: '01',
    icon: '🌊',
    title: 'Observation Room',
    purpose: 'What do we know?',
    description: 'Capture the story without judgment.',
  },
  {
    id: 'understanding',
    number: '02',
    icon: '🌿',
    title: 'Understanding Room',
    purpose: 'What connects?',
    description: 'See patterns, history, and clinical relationships.',
  },
  {
    id: 'navigation',
    number: '03',
    icon: '🧭',
    title: 'Navigation Room',
    purpose: 'What matters now?',
    description: 'Prioritize what deserves attention next.',
  },
  {
    id: 'growth',
    number: '04',
    icon: '🌱',
    title: 'Growth Room',
    purpose: 'Where do we go next?',
    description: 'Plan meaningful treatment steps and goals.',
  },
  {
    id: 'reflection',
    number: '05',
    icon: '📖',
    title: 'Reflection Room',
    purpose: 'What are we ready to conclude?',
    description: 'Synthesize, document, and prepare for what comes next.',
  },
];

export default function CompassRooms({
  activeRoom = 'observation',
  onRoomChange,
}) {
  return (
    <div className="compass-rooms">
      <div className="compass-rooms-header">
        <div className="side-label">Compass Rooms</div>
        <p>Your clinical thinking journey</p>
      </div>

      <div className="compass-room-list">
        {rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            className={`compass-room-card ${
              activeRoom === room.id ? 'active' : ''
            }`}
            onClick={() => onRoomChange?.(room.id)}
          >
            <span className="compass-room-number">{room.number}</span>

            <span className="compass-room-icon">{room.icon}</span>

            <span className="compass-room-copy">
              <span className="compass-room-purpose">
                {room.purpose}
              </span>

              <strong>{room.title}</strong>

              <small>{room.description}</small>
            </span>

            <span className="compass-room-enter">
              Enter
              <span className="compass-room-arrow">›</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}