// App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("make sure that samroy.io is rending", () => {
  render(<App />);
  const textElement = screen.getByText(/samroy.io/i);
  expect(textElement).toBeInTheDocument();
});
