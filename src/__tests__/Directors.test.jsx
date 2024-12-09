import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";
import Directors from "../pages/Directors";

const directors = [
  {
    id: 1,
    name: "Scott Derrickson",
    movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"],
  },
  {
    id: 2,
    name: "Mike Mitchell",
    movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"],
  },
  {
    id: 3,
    name: "Edward Zwick",
    movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/directors"],
});

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(directors),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");

  render(<RouterProvider router={router} />);
  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
});

test("renders 'Directors Page' directly without router", async () => {
  render(<Directors />);
  const h1 = await screen.findByText(/Directors Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders 'Directors Page' inside of a <h1 />", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByText(/Directors Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders each director's name", async () => {
  render(<RouterProvider router={router} />);
  for (const director of directors) {
    expect(await screen.findByText(director.name, { exact: false })).toBeInTheDocument();
  }
});

test("renders a <li /> for each movie", async () => {
  render(<RouterProvider router={router} />);
  for (const director of directors) {
    for (const movie of director.movies) {
      const li = await screen.findByText(movie, { exact: false });
      expect(li).toBeInTheDocument();
      expect(li.tagName).toBe("LI");
    }
  }
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={router} />);
  const navbar = document.querySelector(".navbar");
  expect(navbar).toBeInTheDocument();
});

