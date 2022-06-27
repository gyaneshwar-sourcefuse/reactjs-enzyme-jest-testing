import { render } from "@testing-library/react";
import MainComponent from "../MainComponent";
import "@testing-library/jest-dom";

describe("MainComponent", () => {
    test("should render the component", () => {
        const { container } = render(<MainComponent />);
        expect(container.firstChild).not.toBeNull();
    });
});