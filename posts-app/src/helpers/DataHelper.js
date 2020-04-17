import moment from "moment";

export default class DataHelper {
  generateDisplayText(attribute) {
    let text = "Posts ";
    switch (attribute) {
      case "time": {
        text = text + "during week";
        break;
      }
      case "author": {
        text = text + "by";
        break;
      }
      case "location": {
        text = text + "from";
        break;
      }
      default:
        break;
    }
    return text;
  }

  groupPostBy(posts, attribute) {
    let result = new Map();
    for (const post of posts) {
      let value = post[attribute];
      if (attribute === "time") {
        const postTime = moment.unix(value);
        value = postTime.format("W") + "-" + postTime.format("YYYY");
      }
      result.has(value)
        ? result.get(value).push(post)
        : result.set(value, [post]);
    }
    return result;
  }
}
