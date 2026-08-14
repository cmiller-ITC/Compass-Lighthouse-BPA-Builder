const rooms = [
  {
    id: 'observation',
    icon: '🌊',
    title: 'Observation Room',
    description: 'Capture the story without judgment.',
  },
  {
    id: 'understanding',
    icon: '🌿',
    title: 'Understanding Room',
    description: 'See patterns, history, and connections.',
  },
  {
    id: 'navigation',
    icon: '🧭',
    title: 'Navigation Room',
    description: 'Decide what matters most right now.',
  },
  {
    id: 'growth',
    icon: '🌱',
    title: 'Growth Room',
    description: 'Plan small, meaningful steps forward.',
  },
  {
    id: 'reflection',
    icon: '📖',
    title: 'Reflection Room',
    description: 'Reflect, document, and prepare for what is next.',
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
            <span className="compass-room-icon">{room.icon}</span>

            <span className="compass-room-copy">
              <strong>{room.title}</strong>
              <small>{room.description}</small>
            </span>

            <span className="compass-room-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}