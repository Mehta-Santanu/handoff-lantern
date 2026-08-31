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
});
