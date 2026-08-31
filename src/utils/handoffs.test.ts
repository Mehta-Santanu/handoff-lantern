import { describe, expect, it } from "vitest";
import { initialHandoffs } from "../data/handoffs";
import {
  checklistProgress,
  countByStatus,
  defaultFilters,
  filterHandoffs,
  getOwners,
  sortHandoffs,
} from "./handoffs";

describe("handoff helpers", () => {
  it("searches across identifying and descriptive fields", () => {
    expect(
      filterHandoffs(initialHandoffs, {
        ...defaultFilters,
        query: "authentication",
      }).map((handoff) => handoff.id),
    ).toEqual(["HND-226"]);
  });

  it("combines status, urgency, and owner filters", () => {
    const result = filterHandoffs(initialHandoffs, {
      query: "",
      status: "unread",
      urgency: "critical",
      owner: "Maya Chen",
    });

    expect(result.map((handoff) => handoff.id)).toEqual(["HND-226"]);
  });

  it("sorts critical handoffs before routine work", () => {
    const result = sortHandoffs(initialHandoffs, "urgency");

    expect(result.slice(0, 2).map((handoff) => handoff.urgency)).toEqual([
      "critical",
      "critical",
    ]);
    expect(result.at(-1)?.urgency).toBe("routine");
  });

  it("derives owners, status totals, and checklist progress", () => {
    expect(getOwners(initialHandoffs)).toEqual([
      "Aisha Patel",
      "Leo Martin",
      "Maya Chen",
      "Noah Williams",
    ]);
    expect(countByStatus(initialHandoffs)).toEqual({
      unread: 2,
      reviewing: 2,
      accepted: 2,
    });
    expect(checklistProgress(initialHandoffs[0])).toBe("2/3");
  });
});
