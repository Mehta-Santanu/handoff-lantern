import type {
  Handoff,
  HandoffFilters,
  HandoffSort,
  HandoffStatus,
  Urgency,
} from "../types";

const urgencyRank: Record<Urgency, number> = {
  critical: 0,
  attention: 1,
  routine: 2,
};

export const defaultFilters: HandoffFilters = {
  query: "",
  status: "all",
  urgency: "all",
  owner: "all",
};

export function filterHandoffs(
  handoffs: Handoff[],
  filters: HandoffFilters,
): Handoff[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return handoffs.filter((handoff) => {
    const searchable = [
      handoff.id,
      handoff.title,
      handoff.summary,
      handoff.owner,
      handoff.team,
      ...handoff.tags,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return (
      (!query || searchable.includes(query)) &&
      (filters.status === "all" || handoff.status === filters.status) &&
      (filters.urgency === "all" || handoff.urgency === filters.urgency) &&
      (filters.owner === "all" || handoff.owner === filters.owner)
    );
  });
}

export function sortHandoffs(
  handoffs: Handoff[],
  sort: HandoffSort,
): Handoff[] {
  return [...handoffs].sort((left, right) => {
    if (sort === "title") {
      return left.title.localeCompare(right.title);
    }

    if (sort === "urgency") {
      const urgencyDifference =
        urgencyRank[left.urgency] - urgencyRank[right.urgency];
      return urgencyDifference || left.dueAt.localeCompare(right.dueAt);
    }

    return left.dueAt.localeCompare(right.dueAt);
  });
}

export function getOwners(handoffs: Handoff[]): string[] {
  return [...new Set(handoffs.map((handoff) => handoff.owner))].sort();
}

export function countByStatus(
  handoffs: Handoff[],
): Record<HandoffStatus, number> {
  return handoffs.reduce<Record<HandoffStatus, number>>(
    (counts, handoff) => ({
      ...counts,
      [handoff.status]: counts[handoff.status] + 1,
    }),
    { unread: 0, reviewing: 0, accepted: 0 },
  );
}

export function checklistProgress(handoff: Handoff): string {
  const complete = handoff.checklist.filter((item) => item.complete).length;
  return `${complete}/${handoff.checklist.length}`;
}

export function formatDueTime(value: string): string {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
