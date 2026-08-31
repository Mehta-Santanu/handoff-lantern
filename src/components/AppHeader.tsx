import { BellRing, CircleUserRound, RadioTower } from "lucide-react";

interface AppHeaderProps {
  openCount: number;
}

export function AppHeader({ openCount }: AppHeaderProps) {
  return (
    <header className="app-header">
      <a className="brand" href="#main-content" aria-label="Handoff Lantern home">
        <span className="brand-mark" aria-hidden="true">
          <RadioTower size={18} />
        </span>
        <span>
          <strong>Handoff Lantern</strong>
          <small>Operations desk</small>
        </span>
      </a>

      <div className="header-shift" aria-label="Current shift">
        <span className="presence-dot" aria-hidden="true" />
        Overnight shift · Live
      </div>

      <div className="header-actions">
        <button className="icon-button notification-button" type="button" aria-label={`${openCount} open handoffs`}>
          <BellRing size={18} />
          <span>{openCount}</span>
        </button>
        <button className="profile-button" type="button" aria-label="Open profile menu">
          <CircleUserRound size={21} />
          <span>Sam</span>
        </button>
      </div>
    </header>
  );
}
