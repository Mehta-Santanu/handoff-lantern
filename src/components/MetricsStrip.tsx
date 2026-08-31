import { AlertTriangle, CheckCircle2, Eye } from "lucide-react";
import type { HandoffStatus } from "../types";

interface MetricsStripProps {
  statusCounts: Record<HandoffStatus, number>;
  criticalCount: number;
}

export function MetricsStrip({ statusCounts, criticalCount }: MetricsStripProps) {
  return (
    <section className="metrics-strip" aria-label="Handoff summary">
      <div className="metric">
        <span className="metric-icon metric-icon--amber"><AlertTriangle size={17} /></span>
        <span><strong>{criticalCount}</strong><small>Critical</small></span>
      </div>
      <div className="metric">
        <span className="metric-icon metric-icon--blue"><Eye size={17} /></span>
        <span><strong>{statusCounts.reviewing}</strong><small>In review</small></span>
      </div>
      <div className="metric">
        <span className="metric-icon metric-icon--green"><CheckCircle2 size={17} /></span>
        <span><strong>{statusCounts.accepted}</strong><small>Accepted</small></span>
      </div>
      <p className="metrics-note">Shift closes at <strong>07:00</strong></p>
    </section>
  );
}
