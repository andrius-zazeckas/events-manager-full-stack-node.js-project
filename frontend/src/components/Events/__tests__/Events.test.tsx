import { BrowserRouter } from "react-router-dom";
import { Events } from "../Events";
import renderer from "react-test-renderer";

describe("Events", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
  });
});
