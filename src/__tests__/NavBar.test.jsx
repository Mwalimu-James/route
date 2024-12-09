import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

test('wraps content in a div with "navbar" class', () => {
  const { container } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  expect(container.querySelector(".navbar")).toBeInTheDocument();
});

test("renders a Home <NavLink>", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  const link = screen.getByText("Home");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("/");
});

test("renders an Actors <NavLink>", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  const link = screen.getByText("Actors");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("/actors");
});

test("renders a Directors <NavLink>", () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
  const link = screen.getByText("Directors");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.getAttribute("href")).toBe("/directors");
});
