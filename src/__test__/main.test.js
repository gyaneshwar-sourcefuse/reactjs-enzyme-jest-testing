import renderer from "react-test-renderer";
import MainComponent from "../MainComponent";

describe.skip("MainComponent", () => {
    it("should render MainComponent", () => {
        const component = renderer.create(<MainComponent />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});