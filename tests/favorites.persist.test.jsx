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
    links: { patch: {} },
  },
];
const rockets = [{ id: "r1", name: "Falcon 1" }];

beforeEach(() => {
  localStorage.clear();
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

describe("Favorites", () => {
  it("toggles and persists favorites", async () => {
    wrap(<App />);
    await waitFor(() => expect(screen.getByText("Alpha")).toBeInTheDocument());
    const star = screen.getByRole("button", { name: /Toggle favorite/ });
    await userEvent.click(star);
    expect(JSON.parse(localStorage.getItem("favorites"))).toContain("1");
  });
});
