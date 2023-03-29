import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Login } from "../Login";

describe("Events", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(tree).toMatchSnapshot();
  });
});
