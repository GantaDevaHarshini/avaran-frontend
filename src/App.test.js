import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  Navigate: ({ to }) => <div>Navigate to {to}</div>,
  Route: ({ element }) => element,
  Routes: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
}), { virtual: true });

test("renders login page for guests", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});
