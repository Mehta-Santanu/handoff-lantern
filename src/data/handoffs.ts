import type { Handoff } from "../types";

export const initialHandoffs: Handoff[] = [
  {
    id: "HND-241",
    title: "Payment retries above baseline",
    summary:
      "Retry volume rose after the gateway routing change. The fallback route is stable, but the primary needs another sample before rollback is ruled out.",
    owner: "Maya Chen",
    team: "Payments",
    status: "reviewing",
    urgency: "critical",
    shift: "overnight",
    dueAt: "2026-09-01T03:30:00+05:30",
    tags: ["gateway", "revenue"],
    checklist: [
      { id: "241-a", label: "Confirm fallback capacity", complete: true },
      { id: "241-b", label: "Compare retry cohorts", complete: true },
      { id: "241-c", label: "Choose rollback or observe", complete: false },
    ],
    timeline: [
      { id: "241-t1", actor: "Maya", action: "Added gateway cohort notes", time: "12 min ago" },
      { id: "241-t2", actor: "Dev", action: "Confirmed fallback headroom", time: "28 min ago" },
    ],
  },
  {
    id: "HND-238",
    title: "Warehouse sync awaiting replay",
    summary:
      "Three delayed inventory batches are isolated. Replay can begin after the morning owner confirms downstream consumers are caught up.",
    owner: "Noah Williams",
    team: "Fulfillment",
    status: "unread",
    urgency: "attention",
    shift: "morning",
    dueAt: "2026-09-01T05:15:00+05:30",
    tags: ["inventory", "batch"],
    checklist: [
      { id: "238-a", label: "Identify delayed batches", complete: true },
      { id: "238-b", label: "Confirm consumers are current", complete: false },
      { id: "238-c", label: "Start replay", complete: false },
    ],
    timeline: [
      { id: "238-t1", actor: "Noah", action: "Isolated three batch IDs", time: "19 min ago" },
      { id: "238-t2", actor: "System", action: "Lag returned below alert threshold", time: "41 min ago" },
    ],
  },
  {
    id: "HND-233",
    title: "Support queue coverage for launch",
    summary:
      "Launch-day macros and escalation contacts are ready. Regional coverage still needs one owner for the final two-hour window.",
    owner: "Aisha Patel",
    team: "Customer care",
    status: "reviewing",
    urgency: "attention",
    shift: "evening",
    dueAt: "2026-09-01T07:00:00+05:30",
    tags: ["launch", "staffing"],
    checklist: [
      { id: "233-a", label: "Publish response macros", complete: true },
      { id: "233-b", label: "Verify escalation contacts", complete: true },
      { id: "233-c", label: "Fill regional coverage gap", complete: false },
    ],
    timeline: [
      { id: "233-t1", actor: "Aisha", action: "Published the macro pack", time: "34 min ago" },
      { id: "233-t2", actor: "Rina", action: "Verified escalation contacts", time: "1 hr ago" },
    ],
  },
  {
    id: "HND-229",
    title: "Analytics export backfill complete",
    summary:
      "The missing partitions were restored and row counts match the source. A final stakeholder confirmation is the only remaining action.",
    owner: "Leo Martin",
    team: "Data platform",
    status: "accepted",
    urgency: "routine",
    shift: "morning",
    dueAt: "2026-09-01T09:30:00+05:30",
    tags: ["analytics", "backfill"],
    checklist: [
      { id: "229-a", label: "Restore missing partitions", complete: true },
      { id: "229-b", label: "Reconcile source counts", complete: true },
      { id: "229-c", label: "Notify stakeholders", complete: true },
    ],
    timeline: [
      { id: "229-t1", actor: "Leo", action: "Marked reconciliation complete", time: "2 hrs ago" },
      { id: "229-t2", actor: "Priya", action: "Confirmed dashboard freshness", time: "2 hrs ago" },
    ],
  },
  {
    id: "HND-226",
    title: "Identity provider certificate rotation",
    summary:
      "The new signing certificate is deployed to staging. Production rotation is scheduled after enterprise login monitoring is staffed.",
    owner: "Maya Chen",
    team: "Identity",
    status: "unread",
    urgency: "critical",
    shift: "overnight",
    dueAt: "2026-09-01T04:10:00+05:30",
    tags: ["security", "authentication"],
    checklist: [
      { id: "226-a", label: "Validate staging certificate", complete: true },
      { id: "226-b", label: "Staff login monitoring", complete: false },
      { id: "226-c", label: "Rotate production certificate", complete: false },
    ],
    timeline: [
      { id: "226-t1", actor: "System", action: "Staging validation passed", time: "9 min ago" },
      { id: "226-t2", actor: "Maya", action: "Requested monitoring coverage", time: "46 min ago" },
    ],
  },
  {
    id: "HND-219",
    title: "Search index quality review",
    summary:
      "Relevance metrics improved after the synonym refresh. Long-tail queries need a daytime review before the experiment can graduate.",
    owner: "Noah Williams",
    team: "Discovery",
    status: "accepted",
    urgency: "routine",
    shift: "morning",
    dueAt: "2026-09-01T11:00:00+05:30",
    tags: ["search", "quality"],
    checklist: [
      { id: "219-a", label: "Refresh synonyms", complete: true },
      { id: "219-b", label: "Review head queries", complete: true },
      { id: "219-c", label: "Review long-tail sample", complete: false },
    ],
    timeline: [
      { id: "219-t1", actor: "Noah", action: "Attached relevance snapshot", time: "3 hrs ago" },
      { id: "219-t2", actor: "Inez", action: "Approved head-query results", time: "4 hrs ago" },
    ],
  },
];
