import { mount } from "enzyme";
import TodoComponent, { ACTION, initialState, reducer } from "../TodoComponent";
import { generateGuid } from "../utils";
import renderer from "react-test-renderer";

const component = () => {
    const wrapper = mount(<TodoComponent />);
    const addButton = wrapper.find('Button[id="todoAddBtn"]');
    const input = wrapper.find('FormControl[id="todoInput"]');

    return {
        wrapper,
        addButton,
        input,
    };
};

describe.skip("TodoComponent component", () => {

    it('should render TodoComponent component', () => {
        const component = renderer.create(<TodoComponent />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it("should render add button", () => {
        const { addButton } = component();
        expect(addButton).toHaveLength(1);
    });

    it("should render input", () => {
        const { input } = component();
        expect(input).toHaveLength(1);
    });

    it("should add todo", () => {
        const { wrapper, addButton, input } = component();

        // add todo
        input.simulate("change", { target: { value: "sample todo" } });
        addButton.simulate("click");

        const todos = wrapper.find(".todo-wrapper").hostNodes();
        expect(todos).toHaveLength(1);
    });

    it('should not add todo if text is empty', () => {
        const { wrapper, addButton } = component();
        addButton.simulate("click");
        const todos = wrapper.find(".todo-wrapper").hostNodes();
        expect(todos).toHaveLength(0);
    });

    it("should mark completed", () => {
        const { wrapper, addButton, input } = component();

        input.simulate("change", { target: { value: "sample todo 1" } });
        addButton.simulate("click");

        wrapper.find(".todo-wrapper").hostNodes().first().find(".todo").hostNodes().simulate("click");
        const completed = wrapper.find(".todo-wrapper").hostNodes().first().find(".todo").hostNodes().hasClass("strike");

        expect(completed).toBeTruthy();
    });

    it("should remove todo", () => {
        const { wrapper, addButton, input } = component();

        input.simulate("change", { target: { value: "sample todo 1" } });
        addButton.simulate("click");

        expect(wrapper.find(".todo-wrapper").at(0).exists()).toBeTruthy();

        wrapper.find(".todo-wrapper").at(0).find(".remove").hostNodes().simulate("click");

        expect(wrapper.find(".todo-wrapper").at(0).exists()).toBeFalsy();
    });

    it('generateGuid() should return uuid of length - 36', () => {
        const uuid = generateGuid();
        expect(uuid).toHaveLength(36);
    });

    it("reducer should return default state for invalid action type", () => {
        const action = {
            type: "INVALID"
        };
        const data = reducer(initialState, action);
        expect(data).toStrictEqual(initialState);
    });

    it('reducer should return all todos in case of invalid todo id for complete action', () => {

        const initialState = [{
            id: generateGuid(),
            is_completed: false,
            text: "sample todo 1"
        }];
        const action = {
            id: generateGuid(),
            type: ACTION.COMPLETE
        };
        const data = reducer(initialState, action);
        expect(data).toStrictEqual(initialState);

    });
});
