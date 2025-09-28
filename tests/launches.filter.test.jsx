import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import { FavoritesProvider } from "../src/context/FavoritesContext.jsx";
import { ThemeProvider } from "../src/context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";

const launches = [
  {
    id: "1",
    name: "Alpha Mission",
    date_utc: "2020-01-01T00:00:00Z",
    success: true,
    rocket: "r1",
    links: { patch: {} },
  },
  {
    id: "2",
    name: "Beta Mission",
    date_utc: "2021-01-01T00:00:00Z",
    success: false,
    rocket: "r2",
    links: { patch: {} },
  },
];
const rockets = [
  { id: "r1", name: "Falcon 1" },
  { id: "r2", name: "Falcon 9" },
];

beforeEach(() => {
  globalThis.fetch = vi.fn((url) => {
    if (url.endsWith("/launches"))
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(launches),
      });
    if (url.endsWith("/rockets"))
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(rockets),
      });
    return Promise.reject(new Error("bad url"));
  });
});

function wrap(ui) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <FavoritesProvider>{ui}</FavoritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

describe("Filtering", () => {
  it("renders and filters by search and success", async () => {
    wrap(<App />);
    await waitFor(() =>
      expect(screen.getByText("Alpha Mission")).toBeInTheDocument()
    );
    const search = screen.getByLabelText("Search by mission name");
    await userEvent.type(search, "Beta");
    await waitFor(() =>
      expect(screen.getByText("Beta Mission")).toBeInTheDocument()
    );
    const successBtn = screen.getByRole("button", { name: /Success Only/ });
    await userEvent.click(successBtn);
    expect(screen.queryByText("Beta Mission")).not.toBeInTheDocument();
  });
});
