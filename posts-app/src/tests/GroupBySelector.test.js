import React from "react";
import { shallow } from "enzyme";
import GroupBySelector from "../components/GroupBySelector";

let wrapper;

afterEach(() => {
  wrapper.unmount();
});

describe("<GroupBySelector />", () => {
  it("renders selector", () => {
    const groupBy = "location";
    wrapper = shallow(<GroupBySelector value={groupBy} />);

    expect(wrapper.exists("Segment")).toBeTruthy();
    expect(wrapper.exists("Dropdown")).toBeTruthy();
    expect(wrapper.find("Dropdown").prop("defaultValue")).toEqual(groupBy);
  });

  it("handles dropdown onchange event", () => {
    const changeFn = jest.fn();
    wrapper = shallow(
      <GroupBySelector value="location" onGroupByChange={changeFn} />
    );

    const dropdown = wrapper.find("Dropdown");

    /* Placeholder empty event and data required */
    dropdown.simulate("change", {}, {});
    expect(changeFn).toHaveBeenCalled();
  });
});
