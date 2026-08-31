export type HandoffStatus = "unread" | "reviewing" | "accepted";

export type Urgency = "critical" | "attention" | "routine";

export type Shift = "morning" | "evening" | "overnight";

export interface ChecklistItem {
  id: string;
  label: string;
  complete: boolean;
}

export interface TimelineEntry {
  id: string;
  actor: string;
  action: string;
  time: string;
}

export interface Handoff {
  id: string;
  title: string;
  summary: string;
  owner: string;
  team: string;
  status: HandoffStatus;
  urgency: Urgency;
  shift: Shift;
  dueAt: string;
  tags: string[];
  checklist: ChecklistItem[];
  timeline: TimelineEntry[];
}

export interface HandoffFilters {
  query: string;
  status: "all" | HandoffStatus;
  urgency: "all" | Urgency;
  owner: "all" | string;
}

export type HandoffSort = "due" | "urgency" | "title";
