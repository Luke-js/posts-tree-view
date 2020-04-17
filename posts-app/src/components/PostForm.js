import React from "react";
import { Form, Input, Dropdown } from "semantic-ui-react";

const options = [
  {
    key: "San Francisco",
    value: "San Francisco",
    flag: "us",
    text: "San Francisco",
  },
  { key: "Sydney", value: "Sydney", flag: "au", text: "Sydney" },
  { key: "Dublin", value: "Dublin", flag: "ie", text: "Dublin" },
  { key: "London", value: "London", flag: "gb", text: "London" },
  { key: "Melbourne", value: "Melbourne", flag: "au", text: "Melbourne" },
];

export default function PostForm(props) {
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Author:</label>
          <Input
            fluid
            value={props.author}
            onChange={(event) =>
              props.onInputChange("author", event.target.value)
            }
            maxLength="30"
          />
        </Form.Field>
        <Form.Field>
          <label>Location:</label>
          <Dropdown
            fluid
            search
            selection
            options={options}
            value={props.location}
            onChange={(event, data) =>
              props.onInputChange("location", data.value)
            }
          />
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
