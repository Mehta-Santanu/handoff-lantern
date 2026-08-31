import { useMemo, useState } from "react";
import { initialHandoffs } from "../data/handoffs";
import type { HandoffFilters, HandoffSort, HandoffStatus } from "../types";
import {
  countByStatus,
  defaultFilters,
  filterHandoffs,
  getOwners,
  sortHandoffs,
} from "../utils/handoffs";

export function useHandoffDesk() {
  const [handoffs, setHandoffs] = useState(initialHandoffs);
  const [filters, setFilters] = useState<HandoffFilters>(defaultFilters);
  const [sort, setSort] = useState<HandoffSort>("due");
  const [selectedId, setSelectedId] = useState<string | null>(initialHandoffs[0].id);
  const [announcement, setAnnouncement] = useState("");

  const visibleHandoffs = useMemo(
    () => sortHandoffs(filterHandoffs(handoffs, filters), sort),
    [filters, handoffs, sort],
  );
  const selectedHandoff = handoffs.find((handoff) => handoff.id === selectedId) ?? null;
  const owners = useMemo(() => getOwners(handoffs), [handoffs]);
  const statusCounts = useMemo(() => countByStatus(handoffs), [handoffs]);
  const criticalCount = handoffs.filter((handoff) => handoff.urgency === "critical").length;

  const changeStatus = (id: string, status: HandoffStatus) => {
    setHandoffs((current) => current.map((handoff) =>
      handoff.id === id ? { ...handoff, status } : handoff,
    ));
    setAnnouncement(`Handoff status changed to ${status}.`);
  };

  const toggleChecklistItem = (handoffId: string, itemId: string) => {
    setHandoffs((current) => current.map((handoff) =>
      handoff.id === handoffId
        ? {
            ...handoff,
            checklist: handoff.checklist.map((item) =>
              item.id === itemId ? { ...item, complete: !item.complete } : item,
            ),
          }
        : handoff,
    ));
  };

  return {
    filters,
    setFilters,
    sort,
    setSort,
    selectedId,
    setSelectedId,
    selectedHandoff,
    visibleHandoffs,
    owners,
    statusCounts,
    criticalCount,
    announcement,
    changeStatus,
    toggleChecklistItem,
    resetFilters: () => setFilters(defaultFilters),
    closeDetails: () => setSelectedId(null),
  };
}
