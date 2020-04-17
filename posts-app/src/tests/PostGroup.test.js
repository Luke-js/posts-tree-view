import React from "react";
import { shallow } from "enzyme";
import PostGroup from "../components/PostGroup";

let wrapper;

afterEach(() => {
  wrapper.unmount();
});

describe("<PostGroup />", () => {
  it("renders accordion title and content", () => {
    wrapper = shallow(<PostGroup name="mock" posts={[{ id: 1 }, { id: 2 }]} />);

    expect(wrapper.exists("AccordionTitle")).toBeTruthy();
    expect(wrapper.exists("AccordionContent")).toBeTruthy();
    expect(wrapper.exists("Accordion")).toBeTruthy();
    expect(wrapper.find("Post").length).toEqual(2);
  });

  it("renders correct prop and display", () => {
    const name = "11-2019";
    const mockPosts = [
      {
        id: 1,
        location: "Dublin",
        time: "1552657573",
        author: "Mock User",
        text: "Mock text",
      },
      {
        id: 2,
        location: "London",
        time: "1552571173",
        author: "Mock User2",
        text: "Mock text2",
      },
    ];
    wrapper = shallow(<PostGroup name={name} posts={mockPosts} />);

    expect(wrapper.find("AccordionTitle").prop("active")).toBeTruthy();
    expect(wrapper.find("AccordionTitle").contains(name)).toBeTruthy();
    expect(wrapper.find("AccordionContent").prop("active")).toBeTruthy();

    expect(wrapper.find("Post").first().prop("post")).toEqual(mockPosts[0]);
    expect(wrapper.find("Post").last().prop("post")).toEqual(mockPosts[1]);
  });

  it("handles accordion title onclick event", () => {
    wrapper = shallow(<PostGroup name="mock" posts={[]} />);

    expect(wrapper.find("AccordionTitle").prop("active")).toBeTruthy();
    expect(wrapper.find("AccordionContent").prop("active")).toBeTruthy();

    wrapper.find("AccordionTitle").simulate("click");

    expect(wrapper.find("AccordionTitle").prop("active")).toBeFalsy();
    expect(wrapper.find("AccordionContent").prop("active")).toBeFalsy();
  });
});
