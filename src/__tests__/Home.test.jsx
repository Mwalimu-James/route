import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

const mockMovies = [
  { id: 1, title: "Doctor Strange" },
  { id: 2, title: "Inception" },
  { id: 3, title: "Interstellar" },
];

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockMovies),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

const router = createMemoryRouter(routes, { initialEntries: ["/"] });

test("renders 'Home Page' inside of an <h1 />", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByText(/Home Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("Displays a list of movie titles", async () => {
  render(<RouterProvider router={router} />);
  const titleList = await screen.findAllByRole("heading", { level: 2 });
  expect(titleList.length).toBe(mockMovies.length);
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBe(mockMovies[0].title);
});

test("Displays links for each associated movie", async () => {
  render(<RouterProvider router={router} />);
  const linkList = await screen.findAllByText(/View Info/);
  expect(linkList.length).toBe(mockMovies.length);
  expect(linkList[0].href).toContain(`/movie/${mockMovies[0].id}`);
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={router} />);
  const navbar = document.querySelector(".navbar");
  expect(navbar).toBeInTheDocument();
});
