import { Search, SlidersHorizontal, X } from "lucide-react";
import type { HandoffFilters, HandoffSort } from "../types";
import { defaultFilters } from "../utils/handoffs";

interface FilterToolbarProps {
  filters: HandoffFilters;
  sort: HandoffSort;
  owners: string[];
  resultCount: number;
  onFiltersChange: (filters: HandoffFilters) => void;
  onSortChange: (sort: HandoffSort) => void;
}

export function FilterToolbar({
  filters,
  sort,
  owners,
  resultCount,
  onFiltersChange,
  onSortChange,
}: FilterToolbarProps) {
  const hasFilters = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <section className="filter-panel" aria-label="Handoff controls">
      <div className="search-control">
        <Search size={17} aria-hidden="true" />
        <label className="sr-only" htmlFor="handoff-search">Search handoffs</label>
        <input
          id="handoff-search"
          type="search"
          value={filters.query}
          onChange={(event) => onFiltersChange({ ...filters, query: event.target.value })}
          placeholder="Search title, owner, team, or tag"
        />
      </div>

      <div className="filter-selects">
        <SlidersHorizontal size={16} aria-hidden="true" />
        <label>
          <span className="sr-only">Status</span>
          <select
            value={filters.status}
            onChange={(event) => onFiltersChange({
              ...filters,
              status: event.target.value as HandoffFilters["status"],
            })}
          >
            <option value="all">All statuses</option>
            <option value="unread">Unread</option>
            <option value="reviewing">Reviewing</option>
            <option value="accepted">Accepted</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Urgency</span>
          <select
            value={filters.urgency}
            onChange={(event) => onFiltersChange({
              ...filters,
              urgency: event.target.value as HandoffFilters["urgency"],
            })}
          >
            <option value="all">All urgency</option>
            <option value="critical">Critical</option>
            <option value="attention">Attention</option>
            <option value="routine">Routine</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Owner</span>
          <select
            value={filters.owner}
            onChange={(event) => onFiltersChange({ ...filters, owner: event.target.value })}
          >
            <option value="all">All owners</option>
            {owners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Sort handoffs</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as HandoffSort)}
          >
            <option value="due">Due soon</option>
            <option value="urgency">Urgency</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      <div className="filter-footer">
        <p role="status">Showing <strong>{resultCount}</strong> handoffs</p>
        {hasFilters && (
          <button className="text-button" type="button" onClick={() => onFiltersChange(defaultFilters)}>
            <X size={14} /> Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
