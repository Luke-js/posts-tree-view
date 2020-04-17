import React from "react";
import { shallow } from "enzyme";
import PostForm from "../components/PostForm";

let wrapper;

afterEach(() => {
  wrapper.unmount();
});

describe("<PostForm />", () => {
  it("renders form", () => {
    const author = "Mock Author";
    const location = "Dublin";
    wrapper = shallow(<PostForm author={author} location={location} />);

    expect(wrapper.exists("Form")).toBeTruthy();
    expect(wrapper.exists("Input")).toBeTruthy();
    expect(wrapper.exists("Dropdown")).toBeTruthy();

    expect(wrapper.find("Input").prop("value")).toEqual(author);
    expect(wrapper.find("Dropdown").prop("value")).toEqual(location);
  });

  it("handles input onchange event", () => {
    const changeFn = jest.fn();
    wrapper = shallow(<PostForm onInputChange={changeFn} />);

    const input = wrapper.find("Input");
    input.simulate("change", { target: {} });
    expect(changeFn).toHaveBeenCalled();
  });

  it("handles dropdown onchange event", () => {
    const changeFn = jest.fn();
    wrapper = shallow(<PostForm onInputChange={changeFn} />);

    const dropdown = wrapper.find("Dropdown");

    /* Placeholder empty event and data required */
    dropdown.simulate("change", {}, {});
    expect(changeFn).toHaveBeenCalled();
  });
});
