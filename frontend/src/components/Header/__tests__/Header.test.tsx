import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Header } from "../Header";
import renderer from "react-test-renderer";

describe("Header", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
  });

  it.each(["home link", "logout link"])("should render %s", (link) => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(link)).toBeVisible();
  });
});
