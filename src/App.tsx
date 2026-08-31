import { AppHeader } from "./components/AppHeader";
import { FilterToolbar } from "./components/FilterToolbar";
import { HandoffDetail } from "./components/HandoffDetail";
import { HandoffList } from "./components/HandoffList";
import { MetricsStrip } from "./components/MetricsStrip";
import { useHandoffDesk } from "./hooks/useHandoffDesk";
import "./styles.css";

export default function App() {
  const desk = useHandoffDesk();
  const openCount = desk.statusCounts.unread + desk.statusCounts.reviewing;

  return (
    <div className="app-shell">
      <AppHeader openCount={openCount} />
      <main id="main-content">
        <section className="page-heading">
          <div>
            <p className="eyebrow">Shift continuity</p>
            <h1>Make the next move obvious.</h1>
            <p>Review what changed, close the gaps, and leave the next shift a confident starting point.</p>
          </div>
          <div className="shift-stamp">
            <span>September 1</span>
            <strong>01:45 IST</strong>
          </div>
        </section>

        <MetricsStrip statusCounts={desk.statusCounts} criticalCount={desk.criticalCount} />
        <FilterToolbar
          filters={desk.filters}
          sort={desk.sort}
          owners={desk.owners}
          resultCount={desk.visibleHandoffs.length}
          onFiltersChange={desk.setFilters}
          onSortChange={desk.setSort}
        />

        <div className={`workspace${desk.selectedHandoff ? " workspace--detail" : ""}`}>
          <HandoffList
            handoffs={desk.visibleHandoffs}
            selectedId={desk.selectedId}
            onSelect={desk.setSelectedId}
            onReset={desk.resetFilters}
          />
          {desk.selectedHandoff && (
            <HandoffDetail
              handoff={desk.selectedHandoff}
              onClose={desk.closeDetails}
              onStatusChange={desk.changeStatus}
              onChecklistToggle={desk.toggleChecklistItem}
            />
          )}
        </div>
      </main>
      <p className="sr-only" aria-live="polite">{desk.announcement}</p>
    </div>
  );
}
