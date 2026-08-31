import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Handoff Lantern", () => {
  it("opens with a usable queue and selected handoff", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Make the next move obvious." })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Handoff queue" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: /payment retries above baseline details/i })).toBeInTheDocument();
    expect(screen.getAllByText("HND-241").length).toBeGreaterThan(0);
  });

  it("narrows the queue with search and filters", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: "Search handoffs" }), "inventory");
    expect(screen.getByRole("button", { name: /warehouse sync awaiting replay/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /payment retries above baseline/i })).not.toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: "Status" }), "accepted");
    expect(screen.getByRole("heading", { name: "No handoffs match" })).toBeInTheDocument();
  });

  it("restores the full queue from the empty state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: "Search handoffs" }), "no matching record");
    await user.click(screen.getByRole("button", { name: "Reset controls" }));

    expect(screen.getByRole("searchbox", { name: "Search handoffs" })).toHaveValue("");
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("advances a reviewed handoff to accepted", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Accept handoff" }));

    expect(screen.getByText("Accepted", { selector: ".status-pill" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Accept handoff" })).not.toBeInTheDocument();
    expect(screen.getByText("Handoff status changed to accepted.")).toBeInTheDocument();
  });

  it("updates checklist progress without closing details", async () => {
    const user = userEvent.setup();
    render(<App />);

    const decision = screen.getByRole("checkbox", { name: "Choose rollback or observe" });
    expect(decision).not.toBeChecked();
    await user.click(decision);

    expect(decision).toBeChecked();
    expect(screen.getByRole("complementary", { name: /payment retries above baseline details/i })).toBeInTheDocument();
  });
});
