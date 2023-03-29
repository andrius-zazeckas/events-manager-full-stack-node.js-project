import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render login page", () => {
    render(<App />);
    expect(screen.getByLabelText("login page")).toBeVisible();
  });
});
