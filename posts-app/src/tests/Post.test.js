import React from "react";
import { shallow } from "enzyme";
import Post from "../components/Post";
import moment from "moment";

let wrapper;

afterEach(() => {
  wrapper.unmount();
});

describe("<Post />", () => {
  it("renders necessary components", () => {
    wrapper = shallow(<Post post={{}} />);

    expect(wrapper.exists("Segment")).toBeTruthy();
    expect(wrapper.exists("AccordionTitle")).toBeTruthy();
    expect(wrapper.exists("AccordionContent")).toBeTruthy();
    expect(wrapper.exists("Container")).toBeTruthy();
    expect(wrapper.exists("PostForm")).toBeTruthy();
  });

  it("renders correct prop and display", () => {
    const mockPost = {
      id: 1,
      location: "Dublin",
      time: "1552657573",
      author: "Mock User",
      text: "Mock text",
    };
    wrapper = shallow(<Post post={mockPost} />);

    const time = moment.unix(mockPost.time).format("DD MMM YYYY [at] HH:mm");
    const desc = "from " + mockPost.location + " on " + time;
    expect(wrapper.find("AccordionTitle").prop("active")).toBeFalsy();
    expect(
      wrapper.find("AccordionTitle").contains(mockPost.author)
    ).toBeTruthy();
    expect(wrapper.find("AccordionTitle").contains(desc)).toBeTruthy();

    expect(wrapper.find("AccordionContent").prop("active")).toBeFalsy();
    expect(
      wrapper.find("AccordionContent").contains(mockPost.text)
    ).toBeTruthy();

    expect(wrapper.find("PostForm").prop("author")).toEqual(mockPost.author);
    expect(wrapper.find("PostForm").prop("location")).toEqual(
      mockPost.location
    );
  });

  it("handles accordion title onclick event", () => {
    wrapper = shallow(<Post post={{}} />);

    expect(wrapper.find("AccordionTitle").prop("active")).toBeFalsy();
    expect(wrapper.find("AccordionContent").prop("active")).toBeFalsy();

    wrapper.find("AccordionTitle").simulate("click");

    expect(wrapper.find("AccordionTitle").prop("active")).toBeTruthy();
    expect(wrapper.find("AccordionContent").prop("active")).toBeTruthy();
  });
});
