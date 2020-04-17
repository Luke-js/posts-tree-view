import React from "react";
import { Dropdown, Segment } from "semantic-ui-react";

const groupByOptions = [
  {
    key: "time",
    value: "time",
    text: "Date (posting week)",
  },
  {
    key: "author",
    value: "author",
    text: "Author",
  },
  {
    key: "location",
    value: "location",
    text: "Location",
  },
];

export default function GroupBySelector(props) {
  return (
    <Segment>
      <span className="bold">
        Group posts by{" "}
        <Dropdown
          inline
          options={groupByOptions}
          defaultValue={props.value}
          onChange={(event, data) => props.onGroupByChange(data.value)}
          className="blue"
        />
      </span>
    </Segment>
  );
}
