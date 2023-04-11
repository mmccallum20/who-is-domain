import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders 'Domain Search' title", () => {
  render(<App />);
  const linkElement = screen.getByText(/Domain Search/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the title 'Show number of entries'", () => {
  render(<App />);
  const linkElement = screen.getByText(/Show number of entries/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the 'Submit' text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});
