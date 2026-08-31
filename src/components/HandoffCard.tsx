import { ArrowRight, CheckCircle2, Circle, Clock3 } from "lucide-react";
import type { Handoff } from "../types";
import { checklistProgress, formatDueTime } from "../utils/handoffs";

interface HandoffCardProps {
  handoff: Handoff;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function HandoffCard({ handoff, selected, onSelect }: HandoffCardProps) {
  return (
    <article className={`handoff-card${selected ? " handoff-card--selected" : ""}`}>
      <button
        type="button"
        className="card-hit-area"
        aria-pressed={selected}
        onClick={() => onSelect(handoff.id)}
      >
        <span className="card-topline">
          <span className={`urgency-chip urgency-chip--${handoff.urgency}`}>
            {handoff.urgency}
          </span>
          <span className="handoff-id">{handoff.id}</span>
        </span>

        <span className="card-title-row">
          <span className="card-title">{handoff.title}</span>
          <ArrowRight size={17} aria-hidden="true" />
        </span>

        <span className="card-summary">{handoff.summary}</span>

        <span className="tag-list" aria-label={`Tags: ${handoff.tags.join(", ")}`}>
          {handoff.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </span>

        <span className="card-meta">
          <span className="owner-avatar" aria-hidden="true">
            {handoff.owner.split(" ").map((part) => part[0]).join("")}
          </span>
          <span>{handoff.owner}</span>
          <span className="meta-divider" aria-hidden="true" />
          <Clock3 size={14} aria-hidden="true" />
          <span>Due {formatDueTime(handoff.dueAt)}</span>
          <span className="meta-spacer" />
          {handoff.checklist.every((item) => item.complete)
            ? <CheckCircle2 size={15} className="complete-icon" aria-hidden="true" />
            : <Circle size={15} aria-hidden="true" />}
          <span>{checklistProgress(handoff)}</span>
        </span>
      </button>
    </article>
  );
}
