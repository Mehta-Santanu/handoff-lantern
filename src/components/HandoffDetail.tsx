import { Check, CheckCircle2, Clock3, X } from "lucide-react";
import type { Handoff, HandoffStatus } from "../types";
import { formatDueTime } from "../utils/handoffs";

interface HandoffDetailProps {
  handoff: Handoff;
  onClose: () => void;
  onStatusChange: (id: string, status: HandoffStatus) => void;
  onChecklistToggle: (handoffId: string, itemId: string) => void;
}

const statusLabel: Record<HandoffStatus, string> = {
  unread: "Unread",
  reviewing: "Reviewing",
  accepted: "Accepted",
};

export function HandoffDetail({
  handoff,
  onClose,
  onStatusChange,
  onChecklistToggle,
}: HandoffDetailProps) {
  const nextStatus: HandoffStatus =
    handoff.status === "unread" ? "reviewing" : "accepted";

  return (
    <aside className="detail-panel" aria-label={`${handoff.title} details`}>
      <div className="detail-header">
        <div>
          <span className={`urgency-chip urgency-chip--${handoff.urgency}`}>{handoff.urgency}</span>
          <span className="handoff-id">{handoff.id}</span>
        </div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>
      </div>

      <h2>{handoff.title}</h2>
      <p className="detail-summary">{handoff.summary}</p>

      <dl className="detail-facts">
        <div><dt>Owner</dt><dd>{handoff.owner}</dd></div>
        <div><dt>Team</dt><dd>{handoff.team}</dd></div>
        <div><dt>Shift</dt><dd>{handoff.shift}</dd></div>
        <div><dt>Due</dt><dd><Clock3 size={14} /> {formatDueTime(handoff.dueAt)}</dd></div>
      </dl>

      <section className="detail-section">
        <div className="section-heading">
          <h3>Acceptance checklist</h3>
          <span>{handoff.checklist.filter((item) => item.complete).length}/{handoff.checklist.length}</span>
        </div>
        <ul className="checklist">
          {handoff.checklist.map((item) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.complete}
                  onChange={() => onChecklistToggle(handoff.id, item.id)}
                />
                <span className="custom-check" aria-hidden="true"><Check size={13} /></span>
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h3>Recent activity</h3>
        <ol className="timeline">
          {handoff.timeline.map((entry) => (
            <li key={entry.id}>
              <span className="timeline-dot" aria-hidden="true" />
              <p><strong>{entry.actor}</strong> {entry.action}</p>
              <time>{entry.time}</time>
            </li>
          ))}
        </ol>
      </section>

      <div className="detail-actions">
        <span className={`status-pill status-pill--${handoff.status}`}>{statusLabel[handoff.status]}</span>
        {handoff.status !== "accepted" && (
          <button
            type="button"
            className="primary-button"
            onClick={() => onStatusChange(handoff.id, nextStatus)}
          >
            <CheckCircle2 size={16} />
            {nextStatus === "reviewing" ? "Start review" : "Accept handoff"}
          </button>
        )}
      </div>
    </aside>
  );
}
