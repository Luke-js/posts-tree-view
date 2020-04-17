import React from "react";
import { shallow } from "enzyme";
import App from "../components/App";

let wrapper;

beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  wrapper = shallow(<App />, { disableLifecycleMethods: true });
});

afterEach(() => {
  wrapper.unmount();
});

describe("<App />", () => {
  it("renders loader", () => {
    expect(wrapper.exists("Dimmer")).toBeTruthy();
    expect(wrapper.exists("Loader")).toBeTruthy();
  });

  it("renders error message", () => {
    const errMessage = "Mock error message";
    wrapper.setState({
      isLoaded: true,
      error: errMessage,
    });

    expect(wrapper.exists("Dimmer")).toBeTruthy();
    expect(wrapper.exists("Message")).toBeTruthy();
    expect(wrapper.find("Dimmer Message").contains(errMessage)).toBeTruthy();
  });

  it("renders posts message", (done) => {
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
        time: "1551571173",
        author: "Mock User2",
        text: "Mock text2",
      },
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPosts),
      })
    );

    wrapper.instance().componentDidMount();

    setTimeout(() => {
      const groupBy = "time";

      expect(wrapper.exists("Container")).toBeTruthy();
      expect(wrapper.exists("GroupBySelector")).toBeTruthy();
      expect(wrapper.exists("Accordion")).toBeTruthy();
      expect(wrapper.find("GroupBySelector").prop("value")).toEqual(groupBy);

      const groups = wrapper.find("Accordion PostGroup");
      expect(groups.length).toEqual(2);

      const group1 = groups.first();
      expect(group1.prop("name")).toEqual("11-2019");
      expect(group1.prop("groupBy")).toEqual(groupBy);
      expect(group1.prop("posts").length).toEqual(1);
      expect(group1.prop("posts")[0]).toEqual(mockPosts[0]);

      const group2 = groups.last();
      expect(group2.prop("name")).toEqual("9-2019");
      expect(group2.prop("groupBy")).toEqual(groupBy);
      expect(group2.prop("posts").length).toEqual(1);
      expect(group2.prop("posts")[0]).toEqual(mockPosts[1]);

      done();
    }, 300);
  });
});
