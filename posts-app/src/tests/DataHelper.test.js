import DataHelper from "../helpers/DataHelper";

describe("DataHelper", () => {
  it("generateDisplayText for time", () => {
    const attribute = "time";
    const expected = "Posts during week";

    const actual = new DataHelper().generateDisplayText(attribute);

    expect(actual).toEqual(expected);
  });

  it("generateDisplayText for location", () => {
    const attribute = "location";
    const expected = "Posts from";

    const actual = new DataHelper().generateDisplayText(attribute);

    expect(actual).toEqual(expected);
  });

  it("generateDisplayText for author", () => {
    const attribute = "author";
    const expected = "Posts by";

    const actual = new DataHelper().generateDisplayText(attribute);

    expect(actual).toEqual(expected);
  });

  it("generateDisplayText for unexpected", () => {
    const attribute = "unexpected";
    const expected = "Posts ";

    const actual = new DataHelper().generateDisplayText(attribute);

    expect(actual).toEqual(expected);
  });

  const posts = [
    {
      id: 1,
      location: "San Francisco",
      time: "1552657573",
      author: "Happy User",
      text:
        "Proper PDF conversion ensures that every element of your document remains just as you left it.",
    },
    {
      id: 4,
      location: "Sydney",
      time: "1552563973",
      author: "Happy User",
      text:
        "An expectation of digital efficiency has become the norm in our daily lives",
    },
    {
      id: 6,
      location: "Dublin",
      time: "1553099742",
      author: "Happy User",
      text:
        "An integrated productivity solution breaks information through barriers and allows workers to collaborate in real time.",
    },
  ];

  it("groupPostBy location", () => {
    const attribute = "location";

    const actual = new DataHelper().groupPostBy(posts, attribute);

    expect(actual.size).toEqual(3);
    expect(actual.get("San Francisco")).toEqual([posts[0]]);
    expect(actual.get("Sydney")).toEqual([posts[1]]);
    expect(actual.get("Dublin")).toEqual([posts[2]]);
  });

  it("groupPostBy author", () => {
    const attribute = "author";

    const actual = new DataHelper().groupPostBy(posts, attribute);

    expect(actual.size).toEqual(1);
    expect(actual.get("Happy User").length).toEqual(3);
  });

  it("groupPostBy time", () => {
    const attribute = "time";

    const actual = new DataHelper().groupPostBy(posts, attribute);

    expect(actual.size).toEqual(2);
    expect(actual.get("11-2019")).toEqual([posts[0], posts[1]]);
    expect(actual.get("12-2019")).toEqual([posts[2]]);
  });
});
