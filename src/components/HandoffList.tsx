import { Inbox } from "lucide-react";
import type { Handoff } from "../types";
import { HandoffCard } from "./HandoffCard";

interface HandoffListProps {
  handoffs: Handoff[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReset: () => void;
}

export function HandoffList({ handoffs, selectedId, onSelect, onReset }: HandoffListProps) {
  if (handoffs.length === 0) {
    return (
      <section className="empty-state" aria-live="polite">
        <span className="empty-icon"><Inbox size={25} /></span>
        <h2>No handoffs match</h2>
        <p>Try clearing the active controls to return to the full shift queue.</p>
        <button type="button" className="secondary-button" onClick={onReset}>Reset controls</button>
      </section>
    );
  }

  return (
    <section className="handoff-list" aria-label="Handoff queue">
      {handoffs.map((handoff) => (
        <HandoffCard
          key={handoff.id}
          handoff={handoff}
          selected={selectedId === handoff.id}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}
