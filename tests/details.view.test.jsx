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
    name: "Alpha",
    date_utc: "2020-01-01T00:00:00Z",
    success: true,
    rocket: "r1",
    details: "Test details",
    links: { patch: {}, wikipedia: "https://example.com" },
  },
];
const rockets = [{ id: "r1", name: "Falcon 1" }];

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

describe("Details view", () => {
  it("opens modal with details and links", async () => {
    wrap(<App />);
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
    await userEvent.click(screen.getByRole("button", { name: "View Details" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test details")).toBeInTheDocument();
  });
});
